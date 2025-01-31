const LatestReview: React.FC = () => {
  return (
    <div className="bg-lightGray rounded-xl p-4 mt-6 flex items-center w-full cursor-pointer hover:bg-lightGrayHover">
      <div className="flex-grow">
        <img
          src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <p className="text-customWhite text-sm flex-grow">Rating: 9/10</p>
      <p className="text-customWhite text-sm flex-grow">
        Reviewed by: John Doe
      </p>
    </div>
  );
};

export default LatestReview;
