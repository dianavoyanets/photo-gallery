import { useParams } from "react-router";
import { GalleryContainer } from "./GalleryContainer";
import { defaultCategories } from "../constants";
import { usePhotoGallery } from "../hooks/usePhotoGallery";

export const AlbumPage = () => {
  const { albumId } = useParams();

  const categories = [
    ...defaultCategories,
    {
      id: "album",
      value: `#${albumId} Album`,
      route: `/album/${albumId}`,
    },
  ];

  const photoGallery = usePhotoGallery({ albumId });

  return <GalleryContainer {...photoGallery} categories={categories} />;
};
