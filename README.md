# fort-ui

Touch-first Cupertino-inspired copy-paste UI components for React and Tailwind CSS, powered by Base UI, Fumadocs, and a dedicated CLI + registry.

## Development

```bash
npm run dev
```

Open http://localhost:3000 for the interactive preview or http://localhost:3000/docs for documentation.

## Scripts

- `npm run dev` : Start the Next.js + Fumadocs development server
- `npm run registry:build` : Build `registry.json` (`public/r/`), `registry.pro.json` (`server/r/pro/`), and `registry.native.json` (`public/r/native/`)
- `npm run fort-ui -- <cmd>` : Run the local `fort-ui` CLI (`init`, `add`, `list`, `auth`)
- `npm run cli:test` : Run CLI integration tests (Web, Pro API auth, Expo) and native TypeScript checks
- `npm run types:check` : Run `next typegen` and TypeScript typechecking
- `npm run build` : Rebuild registries and build the production Next.js bundle

## Structure

- `registry/web/ui/` : 27 Web component source files (25 Free + 2 Pro)
- `registry/native/` : Expo / React Native semantic tokens and 14 core native components
- `app/api/r/pro/` : Metadata catalog and token-protected Pro component download endpoints
- `packages/cli/` : `fort-ui` CLI package (`init`, `add`, `list`, `auth`) with Web & Expo auto-detection
- `lib/pro-registry.mjs` : Bearer token verification and allowlisted Pro payload loader
- `lib/utils.ts` : Shared `cn()` class helper
- `lib/shared.ts` : App name, repo config, and `donateConfig.url` (Saweria / Buy Me a Coffee)
- `registry.json`, `registry.pro.json`, `registry.native.json` : Registry manifests consumed by `shadcn build`
- `content/docs/` : Fumadocs MDX documentation pages
- `components/` : Documentation preview helpers, Buy Me a Coffee button, and interactive demos
