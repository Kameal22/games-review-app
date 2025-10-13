interface GamesSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const GamesSearch: React.FC<GamesSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <p className="text-center text-customWhite text-xl lg:text-2xl">
        Search Reviews
      </p>
      <input
        type="text"
        placeholder="Search for games..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="rounded-xl p-3 w-full max-w-md bg-lightGray outline-none caret-customWhite focus:bg-lightGrayHover text-customWhite placeholder-greyText"
      />
    </div>
  );
};

export default GamesSearch;
