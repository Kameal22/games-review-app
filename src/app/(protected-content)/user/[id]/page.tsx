import UserInfo from "./_components/user-info";
import UserReviews from "./_components/reviews/user-reviews";
import UserUtils from "./_components/user-utils/user-utils";

const User: React.FC = () => {
  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <div className="bg-lightGray rounded-xl p-4 w-[90%] h-[90%] flex flex-col gap-4 m-auto">
        <UserInfo />

        <div className="flex grow">
          <UserReviews />
          <UserUtils />
        </div>
      </div>
    </div>
  );
};

export default User;
