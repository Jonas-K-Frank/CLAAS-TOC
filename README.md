# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# CLAAS TCO‑kalkulator

React‑komponent der beregner Total Cost of Ownership (TCO) for en traktor.

## Installation

1. Kopiér `TCOCalculator.jsx` til dit React‑projekt.
2. Sørg for at have Tailwind og shadcn/ui sat op (se https://ui.shadcn.com/docs/installation).
3. Importer og brug komponenten:

```jsx
import TCOCalculator from "./TCOCalculator";

function Page() {
  return <TCOCalculator />;
}
```

## Konfiguration

Standard‑værdier kan justeres i komponentens `useState`‑init.
