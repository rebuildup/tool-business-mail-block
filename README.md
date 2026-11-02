# rebuildup/tool-business-mail-block

ビジネスメールをブロック単位で組み立てる React コンポーネント。

この repo は 2 つの公開経路を持つ。

1. **Component library** — `import BusinessMailBlockApp from "@rebuildup/tool-business-mail-block";`
   （公開 entry は `src/index.ts`。host の Next.js app にマウントする）
2. **Standalone SPA** — `bun run build` が `dist/` に静的配信可能な artifact を出力する。
   host (`my-web-2026`) は `/tools/business-mail-block/app/` 配下でこれを配信し、
   sandbox iframe に読み込む。

## 開発

```bash
bun install --frozen-lockfile
bun run dev         # Vite dev server
bun run build       # dist/ へ静的 artifact を出力
bun run preview     # dist/ をローカルで配信
bun run type-check  # tsc --noEmit
bun run lint        # biome check .
```

toolchain は `mise.toml` の Bun 固定に従う (`mise exec -- bun ...`)。

## 配信時の注意

- `vite.config.ts` の `base: "./"` が必須。host は成果物をサブパス
  (`/tools/business-mail-block/app/`) 配下で配信するため、Vite の既定 base (`/`) では
  asset が host root を参照して 404 になる。
- artifact は外部 origin を含まない（webfont / analytics / CDN / fetch なし）。
  sandbox iframe の opaque origin でも動くよう、clipboard とテンプレート保存は
  `window.prompt` に依存しない実装にしてある。

詳細は [`docs/adr/0003-standalone-vite-build-path.md`](docs/adr/0003-standalone-vite-build-path.md) を参照。
