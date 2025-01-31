const UserInfo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <div className="w-24 h-24">
        <img
          src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
          alt="User Avatar"
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-semibold text-customWhite">John Doe</p>

        <p className="text-l text-customWhite">
          My cool description. Visit my Twitch - twitch.tv/john-doe
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
