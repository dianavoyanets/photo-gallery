import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PhotoGalleryPage } from "./pages/PhotoGalleryPage";
import { PhotoDetailsPage } from "./pages/PhotoDetailsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AlbumPage } from "./pages/AlbumPage";
import { FavouritesPhotoPage } from "./pages/FavouritesPhotoPage";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<PhotoGalleryPage />} />
        <Route path="/album/:albumId?" element={<AlbumPage />} />
        <Route path="/photo/favourites" element={<FavouritesPhotoPage />} />
        <Route path="/photo/:id" element={<PhotoDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
