import { usePhotoGallery } from "../hooks/usePhotoGallery";
import { GalleryContainer } from "./GalleryContainer";

export const GalleryPage = () => {
  const photoGallery = usePhotoGallery();
  return <GalleryContainer {...photoGallery} />;
};
