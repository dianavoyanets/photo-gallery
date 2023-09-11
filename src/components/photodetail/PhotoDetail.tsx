import { Link } from "react-router-dom";
import { FavouriteButton } from "./favouritebutton/FavouriteButton";
import { useState } from "react";
import { Spinner } from "../spinner/Spinner";

export interface PhotoDetailProps {
  albumId: string;
  url: string;
  title: string;
  isFavourite: boolean;
  onFavouriteToggle: (id: string) => void;
}

export const PhotoDetail = ({
  albumId,
  url,
  title,
  isFavourite,
  onFavouriteToggle,
}: PhotoDetailProps) => {
  const [isLoading, setLoading] = useState(true);

  const imageLoaded = () => {
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex flex-col bg-white border rounded-sm">
        {isLoading && <Spinner />}
        <img
          src={url}
          loading="lazy"
          decoding="async"
          onLoad={imageLoaded}
          className="w-full"
          alt={title}
        />
        <Link
          to={`/album/${albumId}`}
          className="w-fit bg-blue-100 text-black text-sm font-medium mx-4 my-4 px-2.5 py-2.5 rounded dark:bg-blue-900 dark:text-blue-300 hover:opacity-[0.8]"
        >
          #{albumId} Album
        </Link>
        <h4 className="font-semibold text-base mx-4 mt-2 mb-4">{title}</h4>
        <div className="flex items-center justify-between mx-4 mt-3 mb-3">
          <FavouriteButton
            isFavourite={isFavourite}
            onFavouriteToggle={onFavouriteToggle}
          />
        </div>
      </div>
    </div>
  );
};
