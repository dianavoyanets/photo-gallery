import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadPhotoById } from "../redux/features/photoSlice";

export const usePhotoDetail = (photoId: string) => {
  const dispatch = useAppDispatch();
  const { error, isLoading, photo } = useAppSelector((state) => state.photo);

  useEffect(() => {
    dispatch(loadPhotoById(photoId));
  }, [photoId]);

  return { photo, isLoading, error };
};
