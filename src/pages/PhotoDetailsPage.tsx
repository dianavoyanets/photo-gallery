import { PhotoDetail } from "../components/photodetail/PhotoDetail";
import { BackButton } from "../components/backbutton/Button";
import { Spinner } from "../components/spinner/Spinner";
import { ErrorMessage } from "../components/errormessage/ErrorMessage";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleFavourite } from "../redux/features/favouritesPhotoSlice";
import { useGetPhotoByIdQuery } from "../redux/services/photoGalleryApi";

export const PhotoDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { favouritePhotoIds } = useAppSelector(
    (state) => state.favouritesPhoto
  );

  const { error, isLoading, data: photo } = useGetPhotoByIdQuery(id);

  const onFavouriteToggle = (photoId: string) => {
    dispatch(toggleFavourite(photoId));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex px-6 py-8 self-start">
        <BackButton buttonText="Back" onClickHandler={() => navigate(-1)} />
      </div>
      {isLoading && <Spinner />}
      {error && <ErrorMessage message={error.message} />}
      <div className="flex flex-1" />
      {photo && !isLoading && (
        <PhotoDetail
          albumId={photo.albumId}
          url={photo.url}
          title={photo.title}
          isFavourite={favouritePhotoIds.includes(id)}
          onFavouriteToggle={() => onFavouriteToggle(id)}
        />
      )}
    </div>
  );
};
