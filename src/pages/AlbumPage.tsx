import { useParams } from "react-router";
import { PhotoGalleryContainer } from "./PhotoGalleryContainer";

export const AlbumPage = () => {
  const { albumId } = useParams<{ albumId: number }>();
  return <PhotoGalleryContainer albumId={albumId} />;
};
