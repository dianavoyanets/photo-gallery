import { useGetAlbumsQuery } from "../redux/services/photoGalleryApi";

export const useAlbums = () => {
  const { data: albums, error, isLoading, isFetching } = useGetAlbumsQuery();

  return {
    error,
    isLoading,
    isFetching,
    albums: albums || [],
  };
};
