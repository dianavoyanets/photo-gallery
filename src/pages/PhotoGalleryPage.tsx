import { PhotoGalleryContainer } from "./PhotoGalleryContainer";
import { motion } from "framer-motion";

export const PhotoGalleryPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PhotoGalleryContainer />
    </motion.main>
  );
};
