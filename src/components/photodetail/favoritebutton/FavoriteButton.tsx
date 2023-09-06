import ActiveHeartIcon from "../../../assets/ic_heart_active.svg";
import HeartIcon from "../../../assets/ic_heart.svg";

export interface FavoriteButtonProps {
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}
export const FavoriteButton = ({
  isFavorite,
  onFavoriteToggle,
}: FavoriteButtonProps) => {
  return (
    <button
      onClick={onFavoriteToggle}
      className={` hover:scale-110 duration-[100ms] ease-in-out`}
    >
      <img src={isFavorite ? ActiveHeartIcon : HeartIcon} alt="icon" />
    </button>
  );
};
