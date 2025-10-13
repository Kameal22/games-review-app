import UserInfo from "./_components/user-info";
import UserReviews from "./_components/reviews/user-reviews";
import UserUtils from "./_components/user-utils/user-utils";

const User: React.FC = () => {
  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <div className="bg-lightGray rounded-xl p-4 w-full h-full flex flex-col gap-4">
        <UserInfo />

        <div className="flex flex-col lg:flex-row grow gap-4">
          <UserReviews />
          <UserUtils />
        </div>
      </div>
    </div>
  );
};

export default User;
