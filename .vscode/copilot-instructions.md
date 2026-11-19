# Copilot Instructions for cinemaSeatManager

## Project Overview

This is a **TypeScript + Vite + Tailwind CSS** starter template, part of the 4Geeks Academy bootcamp. It's a beginner-level project designed to teach fundamental web development with modern tooling.

**Repository**: 4GeeksAcademy/cinemaSeatManager.NataliaStiopu  
**Key Technologies**: TypeScript, Vite, Tailwind CSS v4, HTML/CSS  
**Build Tool**: Vite  
**Package Manager**: npm

## Development Setup

### Installation & Running
- Install dependencies: `npm install`
- Start development server: `npm run start` or `npm run dev`
- Run TypeScript check only: `npm run typecheck`
- Execute TypeScript directly: `npm run console` (runs `src/main.ts`)
- Build for production: `npm run build`
- Preview production build: `npm run preview`

The dev server listens on `0.0.0.0:5173` for compatibility with GitHub Codespaces and remote development environments.

## Code Structure

### File Organization
- **`src/main.ts`**: Primary TypeScript entry point for all application logic
- **`src/style.css`**: Application styles (Tailwind CSS v4 is pre-imported)
- **`index.html`**: HTML shell and page structure
- **`public/`**: Static assets (reference with absolute paths like `/image-name.ext`)
- **`tsconfig.json`**: Strict TypeScript configuration targeting ES2020
- **`vite.config.ts`**: Vite configuration with Tailwind CSS plugin
- **`learn.json`**: Project metadata for 4Geeks Academy curriculum

### Key Configuration Details
- **TypeScript Target**: ES2020
- **Module System**: ESNext
- **Module Resolution**: Bundler
- **Strict Mode**: Enabled (`strict: true`)
- **CSS Framework**: Tailwind CSS v4 with Vite plugin

## Development Guidelines

### TypeScript Standards
- Maintain strict TypeScript mode—enable all type checking
- Use type annotations for function parameters and return types
- Avoid `any` types; use proper union types or generics instead
- Run `npm run typecheck` regularly to catch errors early
- Ensure no emit errors; the build will fail otherwise

### File Organization
- Add new TypeScript files to `src/` and import them in `src/main.ts`
- Keep the project modular: separate concerns into distinct files
- Use consistent file naming conventions (camelCase for functions/utilities, PascalCase for classes)

### Styling
- Use **Tailwind CSS v4** exclusively for styling (avoid inline or separate CSS files unless necessary)
- Reference the [Tailwind CSS documentation](https://tailwindcss.com/docs) for utility classes
- Tailwind is pre-imported in `style.css`
- If you see the "Hello Rigo" card and "If you can see this, Tailwind is working" message, Tailwind is properly configured

### Static Assets
- Place images and other static files in the `public/` directory
- Reference them in HTML with absolute paths: `<img src="/image-name.ext" alt="..." />`
- These files are served directly without bundling

## Hot Reload & Debugging

### Live Reload Behavior
- Changes to any file in `src/` trigger automatic browser refresh
- If changes don't appear, perform a hard refresh:
  - **Mac**: Cmd + Shift + R
  - **Windows/Linux**: Ctrl + Shift + R
- Clear browser cache if experiencing stale content

### Console Output
- View TypeScript console output by running `npm run console`
- Browser console output appears in VS Code's terminal or browser DevTools

## Deployment

### Publishing
This template is configured for seamless deployment to **Vercel**:
1. Connect your GitHub repository to Vercel
2. Vercel automatically detects the Vite configuration
3. Build and deployment are handled automatically

## Common Workflows

### Adding a New Feature
1. Create a new TypeScript file in `src/` (e.g., `src/features/myFeature.ts`)
2. Implement your logic with proper TypeScript types
3. Import and call the function/class from `src/main.ts`
4. Update styles in `style.css` using Tailwind CSS classes
5. Run `npm run start` to test with hot reload
6. Run `npm run typecheck` to verify type safety

### Updating Dependencies
- Check current versions: `npm list`
- Update: `npm install` (for `package-lock.json` changes)
- Rebuild: `npm run build`

## VS Code Recommended Settings

```json
{
  "files.autoSave": "off",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Education Context

This project is part of the **4Geeks Academy curriculum**, designed to teach:
- TypeScript fundamentals and type safety
- Modern build tools (Vite) for fast development
- Utility-first CSS with Tailwind CSS
- Component-based HTML structure
- Professional development workflows

**Learn More**: Visit [4Geeks Academy](https://4geeksacademy.com/) or explore the [school's GitHub page](https://github.com/4geeksacademy/) for more templates and resources.

---

**Last Updated**: 2026-11-19  
**For Questions**: Follow official Vite, TypeScript, and Tailwind CSS documentation for framework-specific issues.
