# ADR 0003 — standalone Vite build path alongside the component library

- **日付**: 2026-11-02
- **ステータス**: Accepted
- **調査対象 capability**: 本 repo (`tool-business-mail-block`) を、component library としての公開 interface を保ったまま host 配下で静的配信できる SPA artifact にする.

## 解決したい問題

host (`my-web-2026`) は各 Tool を `/tools/<slug>/app/` 配下に静的配信し、sandbox iframe
(`sandbox="allow-scripts"`) で読み込む。本 Tool は Next.js 16 ホストにマウントされる
React 19 client component としてしか存在せず、standalone build 経路を持たないため、
host manifest では `delivery.kind: host_disabled` / `classification: needs_tool_side_fix`
になっている。

ADR 0001 は「host 相対 import (`../../../../src/components/tools-ui/ToolWrapper`) を
canonical な埋め込み位置でしか解決しない」という制約を、host 側の `tool-bridge-auditor`
が吸収する運用で解決した。しかしその import は host の `next/link` と host 側 hook
(`@/hooks/useAccessibility`) に依存しており、standalone artifact には持ち込めない。
host 側が「Tool は host repository から何も import してはならない」という方針を
Tool policy として持つ以上、この解決方法はそのままでは成立しない。

## 検討した選択肢

### A. 既存の relative import を維持し、host 側で alias を張る — 不採用

host 側に alias 設定が必要で、Tool repo 単独では build が成立しない。pilot
(`tool-color-palette` PR #6) が採用した「Tool 側が自分の shell を持つ」方向とは
方針が衝突しない。

### B. 同じ component tree を Next.js app として build する — 不採用

`next build` の出力は host の `/tools/<slug>/app/` 静的配信と形が合わない
(client asset のパス設計が host root 前提になる)。しかも host 相対 import を
解決する host checkout を build 环境中に要求する。

### C. Vite で SPA entry を追加し、host 相対 import をこの repo 所有の shell に置き換える — 採用

- `index.html` / `src/main.tsx` / `vite.config.ts` を追加し、`main.tsx` は既存の
  最上位 component (`BusinessMailBlockApp`) を `createRoot` で mount するだけ。
- `BusinessMailBlockTool` が import していた host の `ToolWrapper` は、この repo が
  所有する `src/components/ToolFrame.tsx` に置き換える。見た目の骨格 (見出し / 説明 /
  category badge / コンテンツ列) は同じで、host の breadcrumb (`/`, `/tools` への
  `next/link`) だけ落的とした。iframe 内では その route は host 側の route であり、
  Tool からは到達できないため。
- 公開 interface (`main` / `types` / `exports`) は変更しない。component library として
  の利用はそのまま成立する。

## 副次的な決定

### CSS layer

component tree は host 由来の utility class (`space-y-4`, `rounded-xl`,
`noto-sans-jp-light` など) 前提で書かれており、utility layer なしではレイアウトが
崩れる。

ただし host 側の要件は「**host stylesheet がない状態でも** utility class と同じ
見た目になること」なので、CSS フレームワークの出力には依存させない方針を取る。

- 宣言可能な property は **inline `style` prop** で各要素に持たせる
  (`src/components/*.tsx`)。class 名は意図の記述として残し、実効スタイルは
  inline style が担う。
- inline style で表現できないのは 3 種だけなので、`src/styles.css` に残す。

  1. base reset (Tailwind v4 preflight 相当の element default),
  2. `space-y-*` (子要素に付く margin),
  3. `sm:` / `lg:` の media query (viewport 依存の宣言).

- Tailwind は devDependency に持たない。build 時に utility CSS を生成しないため、
  配布物に utility class の定義を持ち込まず、host 側の stylesheet とも衝突しない。
- webfont は取得せず、system font stack を inline style で宣言する (外部 origin 0 件を
  維持するため)。
- 等価性は、旧 Tailwind build の出力 CSS (`dist/assets/*.css`) と新 build の
  宣言を要素単位で突き合わせて確認する (Tailwind の cascade 順も同じ順序で
  再現している)。

### opaque origin への適合

`sandbox="allow-scripts"` の iframe は opaque origin になる。

- `navigator.clipboard.writeText` は例外 / 存在しないため、`document.execCommand("copy")`
  へ fallback する。
- `window.prompt` は sandbox では dialog がブロックされ `null` を返す (user cancel と
  区別できない)。テンプレート保存は「無言で何も起きない」状態になるため、
  既存の `CustomBlockForm` と同じ形式の inline form (`TemplateSaveForm`) に置き換えた。
- `localStorage` / `sessionStorage` は本 Tool の component tree から参照されていない
  (状態は in-memory)。ただし host 側が同じ component を埋め込む場合は host 側の
  问题是であり、本 ADR の対象外。

### toolchain pin

`mise.toml` / `packageManager` が bun 1.3.10 を指す一方、commit 済み `bun.lock` は
`lockfileVersion: 2` で、bun 1.3.x は解析できない (`UnknownLockfileVersion` → lockfile を
無視 → `--frozen-lockfile` が "lockfile had changes" で失敗)。sibling tool repo
(`tool-color-palette` / `tool-text-counter` / `tool-svg2tsx` /
`tool-sequential-png-preview`) はいずれも bun 1.4.2 を pin しており、host 側の
`scripts/build-tools.mjs` の Bun version probe も同じ世代を前提にしている。
pin を 1.4.2 に揃えた。

## 結果

- `bun install --frozen-lockfile` → `bun run build` が standalone checkout で成立する
- `dist/index.html` の asset 参照は相対 (`./assets/...`) なので、host が
  `/tools/business-mail-block/app/` 配下で配信しても解決する
- 外部 origin は 0 件 (font / analytics / CDN / fetch なし)
- library としての `main` / `types` / `exports` は変更なし
- utility class の見た目は host stylesheet 不在でも同等 (旧 build の CSS と
  要素単位で宣言を比較して確認)

## 再評価条件

- host 側が Tool policy を変更し、Tool が host の shell / style を import できる
  契約に戻った場合
- host の Tool 配信が `same_origin_static` 以外の kinds (例: server-rendered) に
  変わった場合
- Bun 4.x 等の新しい lockfile version が出た場合 (pin の再確認)
