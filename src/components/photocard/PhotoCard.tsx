export interface PhotoItemProps {
  title: string;
  url: string;
}

export const PhotoCard = ({ title, url }: PhotoItemProps) => {
  return (
    <div className="flex flex-col w-full cursor-pointer bg-gray-100 p-4 transition-transform transform scale-100 hover:scale-110">
      <div className="flex flex-col w-full bg-white border h-full">
        <img
          src={url}
          loading="lazy"
          decoding="async"
          className="h-auto max-w-full max-h-[200px] min-w-[150px] min-h-[150px] object-contain"
          alt={title}
        />
        <h4 className="font-semibold text-base text-black mx-4 mt-2 mb-4">
          {title}
        </h4>
      </div>
    </div>
  );
};
