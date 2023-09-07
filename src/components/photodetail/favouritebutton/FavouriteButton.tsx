import ActiveHeartIcon from "../../../assets/ic_heart_active.svg";
import HeartIcon from "../../../assets/ic_heart.svg";

export interface FavouriteButtonProps {
  isFavourite: boolean;
  onFavouriteToggle: (id: string) => void;
}

export const FavouriteButton = ({
  isFavourite,
  onFavouriteToggle,
}: FavouriteButtonProps) => {
  return (
    <button
      onClick={onFavouriteToggle}
      className={`hover:scale-110 duration-[100ms] ease-in-out`}
    >
      <img src={isFavourite ? ActiveHeartIcon : HeartIcon} alt="icon" />
    </button>
  );
};
