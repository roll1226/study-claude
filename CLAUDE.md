# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Preference

**IMPORTANT: Always respond in Japanese (日本語) unless the user explicitly requests English.**

## Project Overview

React 19 + TypeScript + Vite study/learning project using rolldown-vite (Vite 7.2.5) as the build tool with React Compiler enabled.

## Development Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - TypeScript type-check and production build
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

## Key Technical Details

### Build System
- Uses `rolldown-vite@7.2.5` instead of standard Vite (overridden in package.json)
- React Compiler (babel-plugin-react-compiler) is enabled, which impacts dev/build performance
- TypeScript compiler runs before Vite build during production builds

### TypeScript Configuration
- Strict mode enabled with additional linting options (noUnusedLocals, noUnusedParameters)
- Uses "bundler" module resolution
- Target: ES2022
- JSX mode: react-jsx (new JSX transform)

### ESLint
- Uses flat config format (eslint.config.js)
- Configured with TypeScript ESLint, React Hooks rules, and React Refresh
- Ignores `dist` directory

### Project Structure
- Entry point: [src/main.tsx](src/main.tsx) renders [src/App.tsx](src/App.tsx)
- Simple single-page application structure
- Styling via CSS modules ([src/App.css](src/App.css), [src/index.css](src/index.css))

## Important Notes

- This project uses React 19, which may have API differences from earlier versions
- The React Compiler is experimental and automatically optimizes React components
- When modifying Vite config, remember this uses rolldown-vite, not standard Vite
