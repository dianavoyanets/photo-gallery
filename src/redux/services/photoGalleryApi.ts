import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Photo, ListPhoto, Album } from "./types";

export interface GetPhotosQueryArgs {
  title?: string;
  albumId?: string;
  photoIds?: string[];
  page: number;
  limit?: number;
}

type QueryParams = {
  [key: string]: string | string[] | number | number[] | undefined;
};

export const photoGalleryApi = createApi({
  reducerPath: "photoGalleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query<ListPhoto, GetPhotosQueryArgs>({
      query: ({ page, limit = 20, title, albumId, photoIds }) => {
        const queryString = buildQueryString({
          _page: page,
          _limit: limit,
          title_like: title?.trim(),
          albumId,
          id: photoIds?.slice((page - 1) * limit, (page - 1) * limit + limit),
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
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getPhotoById: builder.query<Photo, string>({
      query: (id) => `photos/${id}`,
    }),
    getAlbums: builder.query<Album[], void>({
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
