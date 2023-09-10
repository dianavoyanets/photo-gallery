import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Photo, ListPhoto } from "./types";

type QueryParams = {
  [key: string]: string | string[] | number | number[] | undefined;
};

export interface GetPhotosQueryOptions {
  queryParams: QueryParams;
  page: number;
  limit?: number;
}

export const photoGalleryApi = createApi({
  reducerPath: "photoGalleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query<ListPhoto, GetPhotosQueryOptions>({
      query: ({ page, limit = 20, queryParams }) => {
        const queryString = buildQueryString({
          ...queryParams,
          _page: page,
          _limit: limit,
        });

        return `photos?${queryString}`;
      },
      transformResponse: (response, meta) => {
        const photos = response as Photo[];
        const totalCount = Number(
          meta?.response?.headers.get("X-Total-Count") ?? 0
        );
        const totalPages =
          photos?.length > 0 ? Math.round(totalCount / photos.length) : 0;
        return {
          photos,
          totalCount,
          totalPages,
        } as ListPhoto;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg: { page } }) => {
        if (page === 1) {
          return newItems;
        } else {
          currentCache?.photos.push(...(newItems?.photos || []));
          return currentCache;
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
    }),
    getPhotoById: builder.query<Photo, number>({
      query: (id) => `photos/${id}`,
    }),
    getAlbums: builder.query<Album[]>({
      query: () => "/albums",
    }),
  }),
});

const buildQueryString = (params: QueryParams): string => {
  const queryString = Object.entries(params)
    .filter(([_, param]) => param !== undefined)
    .map(([key, param]) => {
      if (typeof param === "string" || typeof param === "number") {
        return `${key}=${encodeURIComponent(param)}`;
      } else if (Array.isArray(param)) {
        if (param.length === 0) {
          return `${key}=`;
        } else {
          return param
            .map((value) => `${key}=${encodeURIComponent(value)}`)
            .join("&");
        }
      }
      return "";
    })
    .filter((str) => str.length > 0)
    .join("&");

  return queryString;
};

export const { useGetPhotosQuery, useGetPhotoByIdQuery, useGetAlbumsQuery } =
  photoGalleryApi;
