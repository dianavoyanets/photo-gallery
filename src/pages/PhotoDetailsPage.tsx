import { PhotoDetail } from "../components/photodetail/PhotoDetail";
import { usePhotoDetail } from "../hooks/usePhotoDetail";
import { BackButton } from "../components/backbutton/Button";
import { Spinner } from "../components/spinner/Spinner";
import { ErrorMessage } from "../components/errormessage/ErrorMessage";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleFavorite } from "../redux/features/favouritesPhotoSlice";

export const PhotoDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { favoritePhotoIds } = useAppSelector((state) => state.favouritesPhoto);

  const { id } = useParams();

  const { photo, isLoading, error } = usePhotoDetail(id);
  const { albumId, url, title } = { ...photo };
  const isFavourite = favoritePhotoIds.includes(id);

  const onFavoriteToggle = (photoId: string) => {
    dispatch(toggleFavorite(photoId));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <BackButton link="/" buttonText="Back" />
      {isLoading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {photo && !isLoading && (
        <PhotoDetail
          albumId={albumId}
          url={url}
          title={title}
          isFavorite={isFavourite}
          onFavoriteToggle={() => onFavoriteToggle(id)}
        />
      )}
    </div>
  );
};
