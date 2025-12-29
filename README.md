## Known Edge Case: Saved News Spacing

On the Saved News page, the spacing and background color below the card list are Figma-accurate for typical cases (multiple rows of cards) on both desktop and mobile. However, in edge cases where there is only one row of cards on mobile, or no saved news cards at all, there may be extra white space between the gray background and the footer, or the background may not appear. This is due to the flex and padding logic required to match the Figma spec for the main use cases.

No Figma design specifications were provided for these edge cases. This behavior is noted and intentional, as the implementation prioritizes Figma-accurate layout for the primary scenarios. If future design guidance is provided for these edge cases, the implementation can be updated accordingly.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
