# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Legacy site ported into React as `LegacySite.jsx`.

Notes & caveats:

- The original template referenced several vendor CSS/JS files (Bootstrap, AOS, Swiper, GLightbox, Typed.js, PureCounter, Isotope, etc.). These were not added to the project automatically. If you want the exact original behaviors and styles, install and include those libraries (or copy the `assets` folder):

  - `bootstrap`, `bootstrap-icons` (CSS)
  - `aos` (JS + CSS)
  - `swiper` (JS + CSS)
  - `glightbox` (JS + CSS)
  - `typed.js` or keep the in-component typed implementation
  - `purecounter`, `isotope`, `imagesloaded`, `waypoints`

- I implemented lightweight JS replacements inside `LegacySite.jsx` for:

  - Typed headline (simple implementation)
  - Mobile nav toggling
  - Scroll-based header site name reveal and active nav link updates
  - Counters and progress bar animation via IntersectionObserver

- Assets referenced from `assets/img/...` were not included. You can add an `assets` folder under `public` or `src` and update paths accordingly.

How to use:

- The component is automatically mounted in `src/App.jsx`.
- Run `npm run dev` to preview locally.

If you'd like, I can:

- Add the missing vendor libraries and wire them up, or
- Replace vendor-dependent features with full React implementations (e.g., Swiper -> `swiper` React component).
