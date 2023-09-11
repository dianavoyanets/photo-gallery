import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGetPhotosQuery } from "../redux/services/photoGalleryApi";

export interface UsePhotosOptions {
  title?: string;
  albumId?: string;
  photoIds?: string[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const usePhotos = ({
  title,
  albumId,
  photoIds,
  page,
  setPage,
}: UsePhotosOptions) => {
  const [hasMore, setHasMore] = useState(true);

  const { data, error, isLoading, isFetching } = useGetPhotosQuery({
    page,
    title,
    albumId,
    photoIds,
  });

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [title, albumId, photoIds]);

  const onLoadMore = () => {
    if (isLoading || isFetching || error) return;

    if (data && data?.totalPages > page) {
      setPage(page + 1);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  return {
    error,
    hasMore,
    isLoading,
    isFetching,
    photos: data?.photos || [],
    onLoadMore,
  };
};
