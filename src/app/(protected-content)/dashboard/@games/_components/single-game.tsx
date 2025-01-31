type game = {
  name: string;
  genre: string;
  rating: number;
  user: string;
  image: string;
};

interface Props {
  data: game;
}

const SingleGame: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-lightGray rounded-xl p-2 flex items-center w-full cursor-pointer hover:bg-lightGrayHover">
      <div className="flex-grow">
        <img
          src={data.image}
          alt={data.name}
          className="w-32 h-20 object-cover rounded-lg"
        />
      </div>

      <p className="text-customWhite text-l flex-grow w-40">{data.name}</p>
      <p className="text-customWhite text-l flex-grow w-40">{data.genre}</p>
      <p className="text-customWhite text-sm flex-grow w-40">
        Rating: {data.rating}/10
      </p>
      <p className="text-customWhite text-sm flex-grow w-40">
        Reviewed by: {data.user}
      </p>
    </div>
  );
};

export default SingleGame;
