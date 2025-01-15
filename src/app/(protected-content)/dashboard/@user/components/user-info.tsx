const UserInfo: React.FC = () => {
  return (
    <div className="flex items-center w-full gap-6 p-2">
      <div className="w-14 h-14">
        <img
          src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
          alt="User Avatar"
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-semibold text-customWhite">John Doe</span>
        <span className="text-sm text-greyText">@johndoe</span>
      </div>
    </div>
  );
};

export default UserInfo;
