import React from "react";
import { SearchInput } from "../components/search/Search";
import { NoResults } from "../components/noresults/NoResults";
import { ErrorMessage } from "../components/errormessage/ErrorMessage";
import { InfiniteLoader } from "../components/infinityloader/InfinityLoader";
import { Spinner } from "../components/spinner/Spinner";
import { Categories } from "../components/categories/Categories";
import { defaultCategories } from "../constants";
import { PhotoGallery } from "../components/photogallery/PhotoGallery";
import { Category } from "../components/categoryitem/CategoryItem";
import { Photo } from "../redux/services/types";

export interface GalleryContainerProps {
  error?: Error;
  hasMore: boolean;
  isLoading: boolean;
  isFetching: boolean;
  searchTerm: string;
  photos: Photo[];
  categories: Category[];
  onLoadMore: () => void;
  onSearch: () => void;
}

export const GalleryContainer = ({
  error,
  hasMore,
  isLoading,
  isFetching,
  photos,
  searchTerm,
  categories = defaultCategories,
  onLoadMore,
  onSearch,
}: GalleryContainerProps) => {
  return (
    <>
      <div className="flex items-start gap-8 flex-col-reverse sm:flex-row sm:justify-between px-6 py-8">
        <Categories categories={categories} />
        <SearchInput value={searchTerm} onSearch={onSearch} />
      </div>
      {!photos.length && !isLoading && !error && !isFetching && <NoResults />}
      {error && <ErrorMessage message={error.message} />}
      {isLoading && <Spinner />}
      <InfiniteLoader
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
      >
        <PhotoGallery photos={photos} />
      </InfiniteLoader>
    </>
  );
};
