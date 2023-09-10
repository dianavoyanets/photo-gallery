export interface ListPhoto {
  totalCount: number;
  totalPages: number;
  photos: Photo[];
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Album {
  id: number;
  title: string;
  userId: number;
}
