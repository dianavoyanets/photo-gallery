import { PhotoDetail } from "../components/photodetail/PhotoDetail";
import { BackButton } from "../components/backbutton/BackButton";
import { Spinner } from "../components/spinner/Spinner";
import { ErrorMessage } from "../components/errormessage/ErrorMessage";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleFavourite } from "../redux/features/favouritesPhotoSlice";
import { useGetPhotoByIdQuery } from "../redux/services/photoGalleryApi";
import { NoResults } from "../components/noresults/NoResults";
import { motion } from "framer-motion";
import { getErrorMessage } from "../redux/utils";

export const PhotoDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { favouritePhotoIds } = useAppSelector(
    (state) => state.favouritesPhoto
  );

  const {
    error,
    isLoading,
    isFetching,
    data: photo,
  } = useGetPhotoByIdQuery(id!);

  const onFavouriteToggle = (photoId?: string) => {
    if (photoId) {
      dispatch(toggleFavourite(photoId));
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="flex px-6 py-8 self-start">
          <BackButton buttonText="Back" />
        </div>
        {error ? (
          <ErrorMessage message={getErrorMessage(error)} />
        ) : isFetching || isLoading ? (
          <Spinner />
        ) : photo ? (
          <PhotoDetail
            albumId={photo.albumId}
            url={photo.url}
            title={photo.title}
            isFavourite={id ? favouritePhotoIds.includes(id) : false}
            onFavouriteToggle={() => onFavouriteToggle(id)}
          />
        ) : (
          <NoResults />
        )}
      </div>
    </motion.main>
  );
};
