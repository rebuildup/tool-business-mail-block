# ADR 0002 — Toolchain (Bun + Biome + tsc) and quality gate

- **日付**: 2026-08-29
- **ステータス**: Accepted
- **調査対象 capability**: standalone tool repo の package 管理, lint / format, 型検証, 将来の test / CI 配置.

## 解決したい問題

2026-08 時点で本 repo は:

- 開発 script がない (`package.json` の `scripts` が空).
- lint / format tool がない (Biome 未配置).
- tsconfig がなく, `tsc --noEmit` が成立しない.
- lockfile (`bun.lock`) がない.

host (`my-web-2025`) は Bun 固定 / Biome 2.5 / tsc / Jest 30 / Knip / Playwright / Lighthouse を使う. sibling tool (embedded) は `text-counter` / `color-palette` 等, 同じく script / devDep を持たない minimal shape である. sibling tool (standalone, Vite ベース) である `tool-ae-expression-work` / `tool-pomodoro-work` は Vite + Biome + tsc + minimal `bun run test` を持つ.

## 検討した範囲 (per §6, §25, §26)

### Package manager: **Bun**

- host と揃える. 公式 policy と一致. `packageManager` フィールドで pin.

### Linter / Formatter: **Biome 2.5**

- host と揃える. ESLint / Prettier の二重設定を避ける. Biome の `biome.json` を `external/ui/biome.json` と整合する形で配置.

### Type-check: **TypeScript 7 系** (`tsc --noEmit`)

- host は `typescript@^7.0.2` を使う. sibling standalone は `~5.6.2`. host 側に揃えるのが妥当.

### Test runner: **導入しない (本 init)**

- sibling embedded tool (`text-counter`, `color-palette`) に test はない.
- sibling standalone tool の `test` script は `bun run lint && bun run build` のみで, 単体テストは持たない.
- 本 repo には pure な `validation.ts` 1 ファイル + React hook + 9 component がある. behavior test 追加は scope creep に近い.
- 後日 `validation.ts` の unit test や `useMailBlockState` の hook test が望まれたら Vitest を再評価する.

### Dep analyzer (Knip): **導入しない (本 init)**

- 本 repo は deps が 3 つ (react, react-dom, @hello-pangea/dnd) + 1 unlisted (lucide-react) のみ. Knip の早期投資価値は薄い.

### CI: **導入しない (本 init)**

- host (`my-web-2025`) の `.github/workflows/` がこの submodule を含む host build を実行する責務を負う. tool 個別の CI を立てると double-running になり, host 側で submodule commit を検知できなくなる.

### Plugin / MCP: **導入しない (本 init)**

- 必要 capability は host 側に集約. 単独 repo に MCP を増やす理由はない.

## 決定

| 項目 | 採用 | バージョン | 配置 |
|------|------|-----------|------|
| Package manager | Bun | `1.3.10` | `package.json#packageManager` |
| Linter / Formatter | Biome | `^2.5.7` | `devDependencies` + `biome.json` |
| Type-check | TypeScript | `^7.0.2` | `devDependencies` + `tsconfig.json` |
| Test runner | (none) | — | — |
| Dep analyzer | (none) | — | — |
| CI | (host-owned) | — | — |

## canonical 検証コマンド

```bash
bun install --frozen-lockfile
bun run type-check          # tsc --noEmit
bun run lint                # biome check .
bun run format              # biome format --write (任意)
```

standalone checkout では `ToolWrapper` import 解決のため `tsc --noEmit` は red になる. host checkout 配下 (`my-web-2025/external/business-mail-block/`) で実行することを canonical とする (ADR 0001 参照).

## 再評価条件

- host が Vitest を primary に切り替えた場合.
- sibling embedded tool のいずれかが Vitest を導入し, 横断的な test contract が決まった場合.
- standalone dev shell (Vite 等) を追加で要求する声が複数発生した場合.

## 関連

- ADR 0001 — embedding contract (standalone 検証の限界).
- `external/ui/biome.json` — host の canonical Biome config を参考.
- `my-web-2025/AGENTS.md` 2 章 — host の toolchain.