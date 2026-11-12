# fort-ui

Touch-first copy-paste UI components for **React Web** (Tailwind CSS + Base UI) and **Expo / React Native**, inspired by clean Cupertino mobile ergonomics.

> `fort-ui` is an independent project and is not affiliated with or endorsed by Apple Inc.

## Documentation

Browse interactive component previews and guides at **[https://fortui.my.id](https://fortui.my.id/docs)**.

## Quick Start

### 1. Initialize your project

Run `init` from your Next.js, Vite, or Expo project root. The CLI automatically detects Web vs Expo / React Native, `src/` folders, CSS stylesheets, and package managers (`npm`, `pnpm`, `yarn`, `bun`).

```bash
npx fort-ui init
```

- **Web**: creates `fort-ui.json`, `lib/utils.ts`, and injects semantic `--fort-*` CSS tokens into `globals.css`.
- **Expo / React Native**: creates `fort-ui.json` (`"platform": "native"`) and installs `lib/fort-tokens.ts` (`useFortTheme()`).

### 2. Add components

```bash
# Add individual components
npx fort-ui add button switch grouped-list

# Add all available free components for the detected platform
npx fort-ui add --all

# Inspect available components
npx fort-ui list
npx fort-ui list --platform native
```

### 3. Install Pro components

Pro components (`activity-pill`, `swipe-row`) require a license token:

```bash
npx fort-ui auth <your-pro-token>
npx fort-ui add activity-pill swipe-row
```

## CLI Commands & Options

```text
Usage:
  fort-ui init [options]                Initialize fort-ui config, tokens, and utils
  fort-ui add <items...> [options]      Add component files to your project
  fort-ui list [options]                List available components from the registry
  fort-ui auth [token] [options]        Save, inspect, or clear your Pro license token

Options:
  --all                Add all available free components (and Pro if authenticated)
  --platform <name>    Target platform: web or native (auto-detected by default)
  --cwd <path>         Target project directory (default: current directory)
  --registry <url>     Registry base URL (default: https://fortui.my.id)
  --token <key>        Pro license token for authenticated downloads
  --clear              Clear the saved Pro license token (with fort-ui auth)
  --overwrite          Overwrite existing component files
  --no-install         Skip installing npm dependencies
  --no-css             Skip injecting CSS tokens during init
  -h, --help           Show help
```

## Support

If `fort-ui` helps your project, you can support development via Saweria: [https://saweria.co/sulthonmf](https://saweria.co/sulthonmf).
