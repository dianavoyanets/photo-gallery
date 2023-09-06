import { PhotoGalery } from "../components/galery/Galery";
import { SearchInput } from "../components/search/Search";
import { usePhotoGalery } from "../hooks/usePhotoGalery";
import { NoResults } from "../components/noresults/NoResults";
import { ErrorMessage } from "../components/errormessage/ErrorMessage";
import { InfiniteLoader } from "../components/infinityloader/InfinityLoader";
import { Spinner } from "../components/spinner/Spinner";
import { useParams } from "react-router";

export const AlbumPage = () => {
  const { albumId } = useParams();

  const {
    error,
    hasMore,
    isLoading,
    photos,
    searchTerm,
    onLoadMore,
    onSearch,
  } = usePhotoGalery({ albumId });

  return (
    <>
      <SearchInput value={searchTerm} onSearch={onSearch} />
      {searchTerm && !photos.length && !isLoading && !error && <NoResults />}
      {error && <ErrorMessage message={error} />}
      {isLoading && <Spinner />}
      <InfiniteLoader
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
      >
        <PhotoGalery photos={photos} />
      </InfiniteLoader>
    </>
  );
};
