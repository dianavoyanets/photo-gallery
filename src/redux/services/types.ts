export interface ListPhoto {
  totalCount: number;
  totalPages: number;
  photos: Photo[];
}

export interface Photo {
  albumId: string;
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Album {
  id: string;
  title: string;
  userId: string;
}
