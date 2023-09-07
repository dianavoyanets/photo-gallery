import { PhotoCard } from "../photocard/PhotoCard";
import { Link } from "react-router-dom";

export interface PhotoGalleryProps {
  photos: Photo[];
}

export const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[20px] m-[20px]">
      {photos.map(({ id, title, thumbnailUrl }, index) => {
        return (
          <Link
            to={`/photo/${id}`}
            key={`${title}-${id}-${index}`}
            className="flex"
          >
            <PhotoCard title={title} url={thumbnailUrl} />
          </Link>
        );
      })}
    </div>
  );
};
