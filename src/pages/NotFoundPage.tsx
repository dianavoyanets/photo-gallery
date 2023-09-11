import { motion } from "framer-motion";

export const NotFoundPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[34px] relative flex justify-center overflow-x-hidden overflow-y-hidden pb-28 pt-20 lg:pb-36 lg:pt-32">
        <div className="relative flex h-[40vh] flex-col justify-center gap-y-3 text-center">
          404 | This page could not be found. Go back to home page.
        </div>
      </div>
    </motion.main>
  );
};
