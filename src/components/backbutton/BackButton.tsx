import { useNavigate } from "react-router";
import ArrowIcon from "../../assets/ic_arrow.svg";

export interface BackButtonProps {
  buttonText: string;
  className?: string;
}

export const BackButton = ({ buttonText, className }: BackButtonProps) => {
  const navigation = useNavigate();

  return (
    <button
      role="navigation"
      className={`flex justify-center items-center cursor-pointer pr-4 mb-2 ${className}`}
      onClick={() => navigation(-1)}
    >
      <div className="text-base flex h-8 items-center gap-x-2 font-semibold uppercase text-black">
        <img src={ArrowIcon} alt="arrow-icon" />
        {buttonText}
      </div>
    </button>
  );
};
