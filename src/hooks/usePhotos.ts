import { useEffect, useState } from "react";
import { useQuery } from "./useQuery";
import { debounce } from "lodash";
import { useGetPhotosQuery } from "../redux/services/photoGalleryApi";
import { useNavigate } from "react-router";

export interface UsePhotosOptions {
  albumId?: number;
  photoIds?: string[];
}

export const usePhotos = (options: UsePhotosOptions) => {
  const searchQuery = useQuery().get("search");
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const queryParams = {
    title_like: searchTerm?.trim(),
    albumId: options?.albumId,
    id: options?.photoIds?.slice((page - 1) * 10, (page - 1) * 10 + 10),
  };

  const { data, error, isLoading, isFetching } = useGetPhotosQuery({
    page,
    queryParams: queryParams,
  });

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [searchTerm]);

  const onLoadMore = () => {
    if (isLoading || isFetching || error) return;

    if (data?.totalPages > page) {
      setPage((prev) => prev + 1);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  const onSearch: void = debounce((newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    if (newSearchTerm) {
      navigate(`?search=${newSearchTerm}`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, 250);

  return {
    error,
    hasMore,
    isLoading,
    isFetching,
    photos: data?.photos || [],
    searchTerm,
    onLoadMore,
    onSearch,
  };
};
