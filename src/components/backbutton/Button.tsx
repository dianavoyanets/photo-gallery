import ArrowIcon from "../../assets/ic_arrow.svg";

export interface BackButtonProps {
  onClickHandler: () => void;
  buttonText: string;
  className: string;
}

export const BackButton = ({
  onClickHandler,
  buttonText,
  className,
}: BackButtonProps) => {
  return (
    <div
      className={`flex justify-center items-center cursor-pointer pr-4 mb-2 ${className}`}
      onClick={onClickHandler}
    >
      <div className="text-base flex h-8 items-center gap-x-2 font-semibold uppercase text-black">
        <img src={ArrowIcon} alt="arrow-icon" />
        {buttonText}
      </div>
    </div>
  );
};
