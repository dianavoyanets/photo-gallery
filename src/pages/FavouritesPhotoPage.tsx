import { useAppSelector } from "../redux/hooks";
import { PhotoGalleryContainer } from "./PhotoGalleryContainer";

export const FavouritesPhotoPage = () => {
  const { favouritePhotoIds: photoIds } = useAppSelector(
    (state) => state.favouritesPhoto
  );

  return <PhotoGalleryContainer photoIds={photoIds} />;
};
