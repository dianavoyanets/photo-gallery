import { useEffect, useState } from "react";
import { SearchInput } from "../components/search/Search";
import { NoResults } from "../components/noresults/NoResults";
import { ErrorMessage } from "../components/errormessage/ErrorMessage";
import { InfiniteLoader } from "../components/infinityloader/InfinityLoader";
import { Spinner } from "../components/spinner/Spinner";
import { Categories } from "../components/categories/Categories";
import { defaultCategories } from "../constants";
import { PhotoGallery } from "../components/photogallery/PhotoGallery";
import { Combobox, ComboboxOption } from "../components/combobox/Combobox";
import { useAlbums } from "../hooks/useAlbums";
import { usePhotos } from "../hooks/usePhotos";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "../hooks/useQuery";
import { debounce } from "lodash";
import { getErrorMessage } from "../redux/utils";

export interface PhotoGalleryContainerProps {
  albumId?: string;
  photoIds?: string[];
}

export const PhotoGalleryContainer = ({
  albumId,
  photoIds,
}: PhotoGalleryContainerProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = useQuery().get("search");
  const [searchTerm, setSearchTerm] = useState<string | undefined>(
    searchQuery || undefined
  );
  const [page, setPage] = useState<number>(1);

  const [albumOptions, setAlbumOptions] = useState<ComboboxOption[]>();
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | undefined>(
    albumId
  );
  const [selectedAlbum, setSelectedAlbum] = useState<
    ComboboxOption | undefined
  >();

  const { albums, error: albumsError } = useAlbums();

  const { photos, error, isLoading, hasMore, onLoadMore } = usePhotos({
    page,
    albumId: selectedAlbumId,
    title: searchTerm,
    photoIds,
    setPage,
  });

  const onChangeAlbumHandler = (selectedOption: ComboboxOption | null) => {
    if (!selectedOption) return;

    setSelectedAlbumId(selectedOption.value);
    setSelectedAlbum(selectedOption);
    setPage(1);

    if (
      location?.pathname.startsWith("/album/") &&
      albumId !== selectedOption.value
    ) {
      navigate(`/album/${selectedOption.value}`);
    }
  };

  const onSearch = debounce((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    if (newSearchTerm) {
      window.history.pushState({}, "", `?search=${newSearchTerm}`);
    } else {
      window.history.pushState({}, "", "/");
    }
  }, 250);

  useEffect(() => {
    if (albums && albums.length > 0) {
      const options = albums.map(({ id, title }) => {
        return {
          value: id.toString(),
          label: `#${id} ${title}`,
        } as ComboboxOption;
      });
      setAlbumOptions(options);

      if (selectedAlbumId) {
        const selectedOption = options.find(
          ({ value }) => value === selectedAlbumId
        );
        setSelectedAlbum(selectedOption);
      }
    }
  }, [albums]);

  return (
    <>
      <header className="flex items-start gap-8 flex-col-reverse md:flex-row sm:justify-between px-6 py-8">
        <div className="flex flex-col w-full md:max-w-[500px]">
          <Categories categories={defaultCategories} />
          {!albumsError ? (
            <Combobox
              placeholder="Choose an album"
              options={albumOptions || []}
              value={selectedAlbum}
              onChangeHandler={onChangeAlbumHandler}
            />
          ) : (
            <ErrorMessage message={getErrorMessage(albumsError)} />
          )}
        </div>
        <div className="flex flex-col w-full gap-4">
          <SearchInput value={searchTerm} onSearch={onSearch} />
        </div>
      </header>
      <main>
        {error ? (
          <ErrorMessage message={getErrorMessage(error)} />
        ) : isLoading ? (
          <Spinner />
        ) : photos?.length > 0 ? (
          <InfiniteLoader
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={onLoadMore}
          >
            <PhotoGallery photos={photos} />
          </InfiniteLoader>
        ) : (
          <NoResults />
        )}
      </main>
    </>
  );
};
