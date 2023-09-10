import React, { useEffect, useState } from "react";
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

export interface PhotoGalleryContainerProps {
  albumId?: number;
  photoIds?: string[];
}

export const PhotoGalleryContainer = ({
  albumId,
  photoIds,
}: PhotoGalleryContainerProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { albums, error: albumsError } = useAlbums();

  const [albumOptions, setAlbumOptions] = useState<ComboboxOption[]>();
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | undefined>(
    albumId
  );
  const [selectedAlbum, setSelectedAlbum] = useState<
    ComboboxOption | undefined
  >();

  useEffect(() => {
    if (albums && albums.length > 0) {
      const options = albums.map(({ id, title }) => {
        return { value: id, label: `#${id} ${title}` } as ComboboxOption;
      });
      setAlbumOptions(options);

      const selectedOption = options.find(
        ({ value }) => value === +selectedAlbumId
      );
      setSelectedAlbum(selectedOption);
    }
  }, [albums]);

  const {
    photos,
    error,
    isLoading,
    searchTerm,
    hasMore,
    onLoadMore,
    onSearch,
  } = usePhotos({ albumId: selectedAlbumId, photoIds });

  const onChangeAlbumHandler = (selectedOption: ComboboxOption) => {
    setSelectedAlbumId(selectedOption.value);
    setSelectedAlbum(selectedOption);

    if (
      location?.pathname.startsWith("/album/") &&
      albumId !== selectedOption.value
    ) {
      navigate(`/album/${selectedOption.value}`);
    }
  };

  return (
    <>
      <header className="flex items-start gap-8 flex-col-reverse md:flex-row sm:justify-between px-6 py-8">
        <Categories categories={defaultCategories} />
        <div className="flex flex-col w-full gap-4">
          <SearchInput value={searchTerm} onSearch={onSearch} />
          <Combobox
            error={albumsError?.message || albumsError?.error}
            label="Albums"
            placeholder="Choose an album"
            options={albumOptions}
            value={selectedAlbum}
            onChangeHandler={onChangeAlbumHandler}
          />
        </div>
      </header>
      <main>
        {error ? (
          <ErrorMessage message={error.message || error.error} />
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
