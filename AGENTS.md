# プロジェクト不変条件 (canonical agent contract)

このリポジトリは `my-web-2025` ホストに git submodule として埋め込まれる単独ツール (`external/business-mail-block/`) である. AI エージェントが作業するときの canonical な不変条件をここに集約する. 詳細手順は Skill / docs/ / ADR 側へ委譲する.

## 1. プロジェクト境界

- 役割: Next.js 16 ホストにマウントされる React 19 クライアントコンポーネント. 単独 deploy / 単独配信はしない.
- 埋め込み位置 (canonical): `<my-web-2025>/external/business-mail-block/`. 開発・検証はこのレイアウトを前提とする.
- 配布 import: `import BusinessMailBlockApp from "@rebuildup/tool-business-mail-block";` 形式. 公開 entry は `src/index.ts` → `BusinessMailBlockApp`.
- 共有 UI: `<my-web-2025>/external/ui/src/ToolWrapper` を相対 import で参照. 単独 checkout では解決不可なので、host checkout と組わせて検証する.

## 2. ツールチェーン

- Package manager: **Bun** (`packageManager` フィールドで pin). `bun add` / `bun install --frozen-lockfile` のみ. npm / pnpm / yarn / npx の常用禁止.
- Lint / Format: **Biome 2.5** (`bun run lint` / `bun run format`).
- Type-check: **TypeScript** (`bun run type-check`, `tsc --noEmit`).
- 検索: `rg` / `rg --files` を第一選択.
- Python script 新規追加禁止. 自動化は TypeScript / shell / PowerShell.

## 3. 検証 (canonical gate)

実装タスクは次の **フルセット** を warning 0 / error 0 で通すまで完了ではない.

```bash
bun install --frozen-lockfile
bun run type-check          # tsc --noEmit
bun run lint                # biome check .
```

UI 変更を含む場合は host (`my-web-2025`) の Playwright 経路で実描画を確認する. standalone checkout では `external/ui/src/ToolWrapper` の解決が必要なため、host checkout と組わせて初めて full gate が成立する.

## 4. ディレクトリ責務

- `src/index.ts` 公開 entry. `BusinessMailBlockApp` を default + named で再 export.
- `src/BusinessMailBlockApp.tsx` ホスト `ToolWrapper` への薄い wrapper.
- `src/components/` 機能コンポーネント群. `BusinessMailBlockTool` がルート, `useMailBlockState` が状態 hook, `constants.ts` がブロック / テンプレートのシードデータ, `validation.ts` が pure な検証ロジック, `types.ts` がドメイン型.
- `docs/adr/` 意思決定の記録. 本 init で整備.
- `.tmp/` 検証アーティファクト置き場 (commit しない). `.reference/` 参照用外部 repo (commit しない).

## 5. 設計 / 仕様

コンポーネント設計は `docs/adr/0001-tool-embedding-contract.md` を起点にする. host (`my-web-2025`) の `docs/01_global.md` 〜 `07_rules.md` に横断設計があるため、host 側の更新が先行したら本 repo の `useMailBlockState` / `validation.ts` が壊れないかを先に確認する.

## 6. Skill / Agent 発見

本 repo はスコープが小さく、現時点で追加する Skill はない. host 側の Skill (`react-doctor`, `verify-and-commit` 等) は host checkout 内で利用する. host の `tool-bridge-auditor` が本 repo を含むブリッジ整合性の read-only 監査を担当する.

## 7. ブランチ / worktree

ローカル `main` のみで作業. feature branch / 一時 branch / worktree は AI エージェント側で勝手に作らない. ユーザーが指定した場合のみ例外. `git status` で無関係な未コミット変更がないか毎回確認し、干渉しない.

## 8. コミット / メッセージ

- プレフィックス: `feat|fix|refactor|test|docs|build|ci|chore|perf` の conventional prefix.
- 件名は 50 字以内目安. 本文に変更理由と検証結果.
- 関連 ADR / host の docs を本文で参照.
- 1 タスク = 1 commit を基本とする. 検証と無関係な整形は含めない.

## 9. セキュリティ / 秘密情報

- `.env*` は git ignore. 例外は `.env*.example` のみ.
- 共有 UI (`external/ui`) 以外から外部ネットワークへ到達しない. clipboard / download など browser API のみ.
- 個人情報: 収集しない. メール本文生成のみ.

## 10. モード / 権限 / 信頼

AI エージェントの mode / permission / authentication gate は正当な user gate として扱う. bypass を試みない. 必要な操作が mode 制約を超えるなら、ユーザーに明示的に mode 変更を依頼する.

## 11. サブエージェント並列化

論理的に駆動可能な最大数の subagent を使う. 直列化が必要なのは次の場合のみ:

- 同一ファイルの同時編集
- shared mutable state の競合
- Git index / HEAD 操作の競合
- 公式 phase 依存(例: 検証 → commit)

disjoint file ownership を割り当て、各 subagent の完了作業は自分の担当変更のみを含む独立 commit にする. コミット操作自体は直列化する.

## 12. 既存変更の保護

`git status` で未コミット変更が現れた場合、それはユーザーの作業である可能性が高い. 上書き / stage / commit せず、ユーザーに確認する. 同じファイルに自分が書き込む必要があるなら明示的に合意を取る.

## 13. Fresh-clone 再現性

fresh clone から `git submodule update --init --recursive && bun install --frozen-lockfile && bun run type-check && bun run lint` が host checkout 配下で green になる状態が ideal. 隠れた global npm / pip / dotenv への暗黙依存を持たない.

## 14. 既知の quality debt (2026-08 監査時点)

`docs/adr/0001-tool-embedding-contract.md` 末尾を参照.