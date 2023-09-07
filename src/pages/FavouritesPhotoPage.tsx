import { usePhotoGallery } from "../hooks/usePhotoGallery";
import { useAppSelector } from "../redux/hooks";
import { GalleryContainer } from "./GalleryContainer";

export const FavouritesPhotoPage = () => {
  const { favouritePhotoIds: photoIds } = useAppSelector(
    (state) => state.favouritesPhoto
  );

  const photoGallery = usePhotoGallery({ photoIds });

  return <GalleryContainer {...photoGallery} />;
};
