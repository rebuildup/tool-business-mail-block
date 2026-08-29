# ADR 0001 — Tool embedding contract and standalone-dev limitation

- **日付**: 2026-08-29
- **ステータス**: Accepted
- **調査対象 capability**: 単独 repo として GitHub で配布しつつ, `my-web-2025` ホストに submodule として埋め込まれるツールコンポーネントの開発・検証.

## 解決したい問題

`tool-business-mail-block-work` は standalone な GitHub repo (`https://github.com/rebuildup/tool-business-mail-block.git`) として公開され, `my-web-2025/.gitmodules` で `external/business-mail-block/` に submodule 登録される. 開発時は standalone checkout (`~/Desktop/tool-business-mail-block-work/`) で作業し, host checkout の `external/business-mail-block/` と同期される.

`BusinessMailBlockTool.tsx` の `ToolWrapper` import は:

```ts
import ToolWrapper from "../../../../external/ui/src/ToolWrapper";
```

これは `external/business-mail-block/src/components/BusinessMailBlockTool.tsx` から `external/ui/src/ToolWrapper` への相対参照であり, **canonical な埋め込み位置** (`my-web-2025/external/business-mail-block/`) でしか解決しない.

## 検討した選択肢

### A. 相対 import を維持 (採用)

- 利点: 配布ファイル数とビルド設定が増えない. host の `ToolWrapper` 変更が即時反映される (consume ではなく co-locate).
- 負債: standalone checkout では `bun run type-check` が import 解決失敗で red.

### B. `@rebuildup/my-web-tools-ui` package 経由

- 利点: standalone checkout でも import が解決する.
- 負債: npm package の publish が必要. host 側の linker (`link:../../ui/src`) との二重管理. sibling (`text-counter`, `color-palette`) もこの方式を採用しておらず, 同じ relative 方式を維持するのが一貫する.

### C. tsconfig `paths` での alias

- 利点: standalone でも import を変更せず解決できる.
- 負債: tsconfig-only の解決なので, バンドラ・ランタイム側で個別対応が必要. host の Next.js が `transpilePackages` 等で吸収する責務と競合しやすい.

### D. `import.meta.resolve` 等の動的解決

- 不採用. Webpack/Turbopack の bundle 挙動が不安定.

## 決定

**選択肢 A を採用する.**

理由:

1. host の sibling tool (`text-counter`, `color-palette`, `sequential-png-preview` 等) はすべて同じ relative 方式であり, これが repo family の canonical contract.
2. host (`my-web-2025`) の `tool-bridge-auditor` agent がブリッジ整合性を read-only 監査する責務を負っており, そちらで吸収される.
3. standalone checkout における type-check / lint の不成立は host checkout での検証を必須とすることで運用でカバーする.

## 結果

- `AGENTS.md` 3 章・13 章に standalone の制約を明記.
- standalone 検証は host checkout 配下 (`my-web-2025/external/business-mail-block/`) で行うか, tsconfig `paths` 等のローカル workaround をユーザー判断で追加可能 (本 ADR では推奨しない).

## 再評価条件

- いずれかの sibling tool が package 経由に移行し, host 側で linker 互換が検証された場合.
- host が npm registry への publish を CI で自動化する場合.
- standalone 用に dev shell が必要になった場合 (例: Vite + Biome を standalone checkout に導入).

## 既知の quality debt (2026-08 監査時点)

| 項目 | 状態 | 影響 |
|------|------|------|
| `lucide-react` が dependencies に未宣言 | 各 component が icon を import しているが `package.json` に未記載 | host checkout では peerDeps 経由で解決するが, standalone では install 失敗 |
| `ToolWrapper` import が host 埋め込み位置専用 | standalone で red | 開発者が host checkout を意識する必要あり |
| lockfile 未生成 | `bun.lock` が repo に存在しない | 再現性確認不可 |
| Biome / tsconfig 未配置 | 検証コマンドが存在しない | 本 ADR 002 で解消 |