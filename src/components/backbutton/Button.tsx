import { Link } from "react-router-dom";
import ArrowIcon from "../../assets/ic_arrow.svg";

export interface BackButtonProps {
  link: string;
  buttonText: string;
}

export const BackButton = ({ link, buttonText }: BackButtonProps) => {
  return (
    <div className="relative mx-auto w-full cursor-pointer px-4 md:px-[34px] mb-2 max-w-[790px] lg:max-w-[1440px] xl:mt-16">
      <Link
        className="text-base flex h-8 w-fit items-center gap-x-2 font-semibold uppercase text-black md:-ml-[5px] lg:relative"
        to={link}
      >
        <img src={ArrowIcon} alt="arrow-icon" />
        {buttonText}
      </Link>
    </div>
  );
};
