# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tamiuzz corporate marketing website - a React 19 SPA built with Vite 7, featuring bilingual support (Arabic/English), dark mode, and lazy-loaded routes.

## Commands

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

No test suite is configured.

## Architecture

### Routing
- React Router v6 with lazy-loaded route components
- All routes wrapped in `RoutLayout` (provides header/footer)
- Route components live in `src/Routes/{RouteName}/`
- Lazy loading uses `createLazyLoadingComp()` from `src/Utilies/LazyLoadingHelper.jsx` with retry logic

### State Management (React Context)
- `IsThemeModeProvider` - Dark/light mode (persisted to localStorage)
- `AuthProvider` - User authentication and token management
- `IsMobileProvider` - Viewport detection (breakpoint: 991px)
- `HomeContentProvider` - Caches home page API data

### Internationalization
- i18next with HTTP backend
- Languages: Arabic (ar - default/fallback), English (en)
- Translation files: `public/locale/{lng}/translation.json`
- RTL support: Arabic sets `dir="rtl"` on body
- API requests include `Accept-Language` header

### API Integration
- Base URL: `https://api-landing.tamiuzz.com`
- Axios client with headers defined in `src/Utilies/data.jsx`
- Bearer token auth via `Authorization` header

### Styling
- CSS Modules for component styles (`*.module.css`)
- Bootstrap 5 utility classes
- CSS variables for theming (`:root` and `.dark` class)
- Primary color: #2644a2, Secondary: #e49d23

## Key Files

- `src/App.jsx` - Route definitions and context providers
- `src/i18n.js` - i18next configuration
- `src/Utilies/data.jsx` - API base URL, headers, contact info
- `src/Utilies/LazyLoadingHelper.jsx` - Lazy loading with retry logic
- `src/Component/RoutLayout/RoutLayout.jsx` - Main layout wrapper
- `vite.config.js` - Build config with manual chunk splitting (react, router)

## Component Organization

- `src/Routes/` - Page-level components (one folder per route)
- `src/Component/` - Reusable components
- `src/Component/Ui/` - Generic UI components (Modal, TextInput, Heading, Spinner, etc.)
- `src/Context/` - React Context providers
- `src/assets/Images/` - Static images
