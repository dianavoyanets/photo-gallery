import { useEffect, useState } from "react";
import { useQuery } from "./useQuery";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setHasMore,
  setPage,
  setPhotos,
  loadPhotos,
} from "../redux/features/photosSlice";

export interface UsePhotoGaleryOptions {
  albumId?: string;
  photoIds?: string[];
}

export const usePhotoGalery = (options: UsePhotoGaleryOptions) => {
  const dispatch = useAppDispatch();
  const { photos, hasMore, page, isLoading, error } = useAppSelector(
    (state) => state.photos
  );

  const searchQuery = useQuery().get("search");
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);

  useEffect(() => {
    dispatch(setPhotos([]));
    dispatch(setPage(1));
    dispatch(setHasMore(true));
    onLoadMore();
  }, [searchTerm]);

  const onLoadMore = async () => {
    if (!hasMore || isLoading || error) return;

    const queryParams = {
      title_like: searchTerm?.trim(),
      albumId: options?.albumId?.trim(),
      id: options?.photoIds?.slice((page - 1) * 10, (page - 1) * 10 + 10),
    };

    dispatch(loadPhotos({ queryParams, page }));
  };

  const onSearch = debounce((newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    dispatch(setPage(1));

    if (newSearchTerm) {
      navigate(`${location.pathname}?search=${newSearchTerm}`);
    } else {
      navigate("");
    }
  }, 250);

  return {
    error,
    hasMore,
    isLoading,
    photos,
    searchTerm,
    onLoadMore,
    onSearch,
  };
};
