import { PhotoDetail } from "../components/photodetail/PhotoDetail";
import { BackButton } from "../components/backbutton/Button";
import { Spinner } from "../components/spinner/Spinner";
import { ErrorMessage } from "../components/errormessage/ErrorMessage";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleFavourite } from "../redux/features/favouritesPhotoSlice";
import { useGetPhotoByIdQuery } from "../redux/services/photoGalleryApi";
import { NoResults } from "../components/noresults/NoResults";

export const PhotoDetailsPage = () => {
  const { id } = useParams<{ id: number }>();

  const dispatch = useAppDispatch();
  const { favouritePhotoIds } = useAppSelector(
    (state) => state.favouritesPhoto
  );

  const {
    error,
    isLoading,
    isFetching,
    data: photo,
  } = useGetPhotoByIdQuery(id);

  const onFavouriteToggle = (photoId: number) => {
    dispatch(toggleFavourite(photoId));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex px-6 py-8 self-start">
        <BackButton buttonText="Back" />
      </div>
      {error ? (
        <ErrorMessage message={error.message} />
      ) : isFetching || isLoading ? (
        <Spinner />
      ) : photo ? (
        <PhotoDetail
          albumId={photo.albumId}
          url={photo.url}
          title={photo.title}
          isFavourite={favouritePhotoIds.includes(id)}
          onFavouriteToggle={() => onFavouriteToggle(id)}
        />
      ) : (
        <NoResults />
      )}
    </div>
  );
};
