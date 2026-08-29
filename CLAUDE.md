# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. canonical な指示

このリポジトリの canonical な不変条件 (プロジェクト ID / ツールチェーン / 検証ゲート / アーキテクチャ / ブランチ / コミット規約 / 並列化方針) は **`AGENTS.md`** に集約されています. 必ず最初に全文を読み、参照してください.

## 2. Claude Code 固有の薄い注記

- **Harness 設定**: 本 repo には `.claude/settings.json` の hook を置いていません (host `my-web-2025` 側で一元管理). canonical な safety net は AGENTS.md / ADR に従うこと.
- **Skills**: 本 repo スコープでは独自 Skill を持ちません. 関連 Skill は host 側にあります (`react-doctor`, `verify-and-commit`, `tool-bridge-auditor` 等). 該当しそうなタスクでは Skill ツールで呼び出してください.
- **Agents**: read-only review agent は host 側 (`tool-bridge-auditor`). 検証用途で commit は行いません.
- **MCP**: 必要に応じて context7 / playwright を host 経由で利用する想定. 単独 checkout では `.codex/config.toml` 等は host 側を参照.
- **memory**: `~/.claude/projects/C--Users-rebui-Desktop-tool-business-mail-block-work/memory/` に project-local な永続 memory を保持できます. ユーザー / feedback / project / reference の 4 種で運用してください. コードから読み取れる事実は memory に書かない.

## 3. 典型的な Claude Code 作業の流れ

1. `AGENTS.md` を読む.
2. 関連 docs (`docs/adr/0001-tool-embedding-contract.md` 他) を読む.
3. host (`my-web-2025`) のチェックアウトが存在するか確認. standalone で型検証が必要な場合は host checkout 配下に submodule として配置する.
4. 実装. 検証は `bun install --frozen-lockfile && bun run type-check && bun run lint` を green にするまで続ける.
5. UI 変更は host の Playwright (または `mcp__playwright__*`) で実描画を確認.
6. `git status` で無関係な変更を確認してから commit / push.

## 4. やってはいけないこと (再掲)

- npx / npm / pnpm / yarn の常用 (Bun 運用が canonical).
- Python script の新規追加.
- `main` 以外への branch / worktree 自動作成.
- 検証エラー / 警告を skip / ignore / suppress しての green 偽装.
- `.env*` の実値コミット.
- 単独 checkout 状態で host import を書き換える (host の埋め込みレイアウトを前提とする).

詳細は `AGENTS.md` を参照してください.