import UserInfo from "./_components/user-info";
import UserMenu from "./_components/user-menu";

const UserData: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full pb-12">
      <UserInfo />
      <UserMenu />
    </div>
  );
};

export default UserData;
