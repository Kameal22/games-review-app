type review = {
  name: string;
  genre: string;
  rating: number;
  user: string;
  image: string;
  reviewId?: string;
  createdAt?: string;
};

interface Props {
  data: review;
}

const SingleReview: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-lightGray rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center w-full hover:bg-lightGrayHover gap-3">
      <div className="flex-shrink-0">
        <img
          src={data.image}
          alt={data.name}
          className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-4 min-w-0">
        <div className="flex-1 min-w-0">
          <p className="text-customWhite text-base lg:text-lg font-medium truncate">
            {data.name}
          </p>
          <p className="text-greyText text-sm hidden sm:block">{data.genre}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
          <p className="text-customWhite">
            <span className="sm:hidden">Genre: </span>
            {data.genre}
          </p>
          <p className="text-customWhite">Rating: {data.rating}/10</p>
          <p className="text-customWhite truncate">
            <span className="sm:hidden">By: </span>
            <span className="hidden sm:inline">Reviewed by: </span>
            {data.user}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
