interface GamesSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const GamesSearch: React.FC<GamesSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col gap-4  w-full">
      <input
        type="text"
        placeholder="Szukaj gier..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="rounded-xl p-3 w-full max-w-md bg-lightGray outline-none caret-customWhite focus:bg-lightGrayHover text-customWhite placeholder-greyText"
      />
    </div>
  );
};

export default GamesSearch;
