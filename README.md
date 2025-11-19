📷 **React Picsum Photo Gallery**

This project is a React-based gallery that pulls images from the [Lorem Picsum](https://picsum.photos/) API. Users can browse an infinite-scrolling grid, preview photos in a modal, or jump into a dedicated detail page for more information—all while images are prefetched and cached for a smooth experience.

---

## ✨ Features
- Responsive photo grid displaying author info, thumbnails, and hover effects.
- Infinite scroll powered by `PhotosContext` + `useInfiniteScroll`.
- Aggressive image prefetching and caching (thumbnails + full downloads).
- Photo detail experiences via modal (`PhotoDetailModal`) and page (`PhotoDetailPage`).
- Loading/error feedback through shared `Loader` and `ErrorMessage` components.
- React Router v6 routing with `/photos`, `/photos/:id`, and a 404 fallback.

---

## 🛠️ Tech Stack
- React 18 + React Router
- Tailwind utility classes (imported through PostCSS)
- Fetch API for HTTP calls
- Custom hooks for data/state management (usePhotos, usePrefetchImages, etc.)

---

## 📂 Project Structure
```
src/
├─ api/
│  └─ picsumApi.js
├─ components/
│  ├─ common/
│  │  ├─ ErrorMessage.jsx
│  │  └─ Loader.jsx
│  └─ photos/
│     ├─ ModalImage.jsx
│     ├─ PhotoDetailModal.css
│     ├─ PhotoDetailModal.jsx
│     ├─ PhotoGrid.jsx
│     └─ PhotoItem.jsx
├─ context/
│  └─ PhotosContext.jsx
├─ hooks/
│  ├─ useImageCache.js
│  ├─ useInfiniteScroll.js
│  ├─ usePhotos.js
│  ├─ usePrefetchImages.js
│  └─ usePrefetchOnScroll.js
├─ pages/
│  ├─ HomePage.jsx
│  ├─ NotFoundPage.jsx
│  └─ PhotoDetailPage.jsx
├─ services/
│  └─ imageCacheService.js
├─ App.css
├─ App.jsx
├─ App.test.js
├─ index.css
├─ index.js
├─ logo.svg
├─ reportWebVitals.js
└─ setupTests.js
```

---

## ⚙️ How It Works
1. **Routing** – `App.jsx` wires `/photos`, `/photos/:id`, and `*` routes using `BrowserRouter`.
2. **Home feed** – `HomePage.jsx` consumes `PhotosContext` to render the grid, watch an intersection trigger, and show a modal when a photo is selected.
3. **Prefetching** – hooks (`usePrefetchImages`, `usePrefetchOnScroll`) and `imageCacheService` warm up thumbnails, large downloads, and metadata for upcoming content.
4. **Photo detail** – The modal uses `PhotoDetailModal.jsx` while the standalone page fetches richer data through `fetchPhotoDetails`.

---

## 🚀 Getting Started
```bash
git clone <your-repo-url>
cd picsum-gallery
npm install
npm start
```
Visit `http://localhost:3000` to explore the gallery.

---

## ✅ Scripts
- `npm start` – run the development server.
- `npm test` – execute CRA’s test suite (includes the default smoke test).
- `npm run build` – generate a production build.

---

## 📌 Notes
- Tailwind styles are brought in via `@import 'tailwindcss/*'` inside `src/index.css`, keeping CRA’s CSS tooling happy.
- Components and hooks include concise comments that describe their role, making the codebase easy to navigate for contributors.
