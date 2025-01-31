const GamesSearch: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <p className="text-center text-customWhite text-2xl">Search Games</p>
      <input
        type="text"
        placeholder="Search.."
        className="rounded-xl p-3 w-2/4 bg-lightGray outline-none caret-customWhite focus:bg-lightGrayHover"
      />
    </div>
  );
};

export default GamesSearch;
