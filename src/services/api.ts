export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface FetchPhotosOptions {
  queryParams: { [key: string]: string | string[] | number[] | undefined };
  page?: number;
  limit?: number;
}

export interface PhotoList {
  total: number;
  photos: Photo[];
}

export const fetchPhotoById = async (id: string): Promise<Photo> => {
  if (!id) {
    throw new Error(`Invalid ID ${id} provided!`);
  }

  const url = `${import.meta.env.VITE_BASE_API_URL}/photos/${id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Api response was not OK");
  }

  const photo = await response.json();
  return photo;
};

export const fetchPhotos = async ({
  queryParams,
  page = 1,
  limit = 10,
}: FetchPhotosOptions): Promise<PhotoList> => {
  const queryString = buildQueryString({
    ...queryParams,
    _page: page,
    _limit: limit,
  });

  const url = `${import.meta.env.VITE_BASE_API_URL}/photos?${
    queryString ? queryString : ""
  }`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Api response was not OK");
  }

  const total = Number(response.headers.get("X-Total-Count"));
  const photos = await response.json();

  return { total, photos };
};

const buildQueryString = (params: {
  [key: string]: string | string[] | number[] | undefined;
}): string => {
  const queryString = Object.entries(params)
    .filter(([_, param]) => param !== undefined)
    .map(([key, param]) => {
      if (typeof param === "string" || typeof param === "number") {
        return `${key}=${encodeURIComponent(param)}`;
      } else if (Array.isArray(param) && param.length > 0) {
        return param
          .map((value) => `${key}=${encodeURIComponent(value)}`)
          .join("&");
      }
      return "";
    })
    .filter((str) => str !== "")
    .join("&");

  return queryString;
};
