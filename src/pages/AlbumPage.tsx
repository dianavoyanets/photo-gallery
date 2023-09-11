import { useParams } from "react-router";
import { PhotoGalleryContainer } from "./PhotoGalleryContainer";
import { motion } from "framer-motion";

export const AlbumPage = () => {
  const { albumId } = useParams<{ albumId: string }>();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PhotoGalleryContainer albumId={albumId} />
    </motion.main>
  );
};
