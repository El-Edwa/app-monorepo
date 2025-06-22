# 🧩 Project Libraries & Dependencies

This document outlines the libraries and tools used in the **X Clone (Frontend)**, built using modern web technologies for performance, scalability, and maintainability.

---

## 🖼️ UI & Styling

### 🌀 Tailwind CSS

* **`tailwindcss`**: Utility-first CSS framework for fast UI development.
* **`@tailwindcss/vite`**: Tailwind CSS integration for Vite.
* **`tailwind-merge`**: Smart merging of Tailwind class names to avoid conflicts.
* **`tw-animate-css`**: Animate.css plugin for Tailwind to add animation utilities.


---

## ⚛️ React Ecosystem

* **`react` & `react-dom`**: Core libraries for building and rendering UI.
* **`react-router-dom`**: Declarative routing for single-page React applications.
* **`react-helmet`**: For managing changes to the document head (e.g., title, meta tags).
* **`react-icons`**: Provides access to popular icon libraries in a React-friendly way.

---

## 🧠 State Management

* **`@reduxjs/toolkit`**: Modern, opinionated Redux setup with simplified syntax.
* **`react-redux`**: Official React bindings for Redux.

---

## 🧪 Code Quality

* **`eslint`**: Linting tool for maintaining code quality and consistency.
* **`@eslint/js`**, **`eslint-plugin-react-hooks`**, **`eslint-plugin-react-refresh`**: ESLint plugins for JS rules, hooks validation, and hot reloading safety.
* **`typescript-eslint`**: Enables ESLint support for TypeScript.

---

## 🧱 Type Safety

* **`typescript`**: Strongly typed superset of JavaScript.
* **`@types/*` packages**: Type definitions for React, Node, ReactDOM, and others.

---

## ⚡ Tooling

* **`vite`**: Fast bundler and development server.
* **`@vitejs/plugin-react`**: React plugin for Vite with automatic Fast Refresh.
* **`tsc`**: TypeScript compiler used during build (`tsc -b`).

---

## 🛠 Scripts Overview

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Starts Vite development server            |
| `npm run build`   | Compiles TypeScript and builds production |
| `npm run lint`    | Runs ESLint on all files                  |
| `npm run preview` | Previews the production build             |
