import { Routes, Route } from "react-router-dom";
import { GalleryPage } from "./pages/GalleryPage";
import { PhotoDetailsPage } from "./pages/PhotoDetailsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AlbumPage } from "./pages/AlbumPage";
import { FavouritesPhotoPage } from "./pages/FavouritesPhotoPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GalleryPage />} />
      <Route path="/album/:albumId?" element={<AlbumPage />} />
      <Route path="/photo/favourites" element={<FavouritesPhotoPage />} />
      <Route path="/photo/:id" element={<PhotoDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
