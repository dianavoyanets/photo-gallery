export const NoResults = () => {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[34px] relative flex justify-center overflow-x-hidden overflow-y-hidden pb-28 pt-20 lg:pb-36 lg:pt-32">
      <div className="relative flex h-[40vh] flex-col justify-center gap-y-3 text-center">
        <h2 className="font-cal leading-[100%] md:!leading-h1 text-[40px] md:text-5xl lg:text-[50px] xl:text-6xl">
          No results found.
        </h2>
      </div>
    </div>
  );
};
