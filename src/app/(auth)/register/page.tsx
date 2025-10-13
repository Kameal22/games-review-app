import { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Sign Up - Reviewslike",
  description:
    "Join Reviewslike to review games, create wishlists, and discover your next favorite game through community insights.",
};

const Register: React.FC = () => {
  return (
    <div
      style={{ minHeight: "calc(100vh - 7rem)" }}
      className="flex flex-col items-center justify-center gap-8 bg-darkBackground px-4 py-8 w-full"
    >
      {/* Website Description Section */}
      <div className="text-center max-w-2xl mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-customWhite mb-6">
          Welcome to Reviewslike
        </h1>
        <div className="space-y-4 text-customWhite/90 text-lg md:text-xl">
          <p>
            Your ultimate destination for{" "}
            <span className="text-customWhite font-semibold">game reviews</span>{" "}
            and
            <span className="text-customWhite font-semibold">
              {" "}
              gaming insights
            </span>
            .
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-darkGreyBackground/50 p-4 rounded-xl">
              <h3 className="text-customWhite font-semibold mb-2">
                📝 Write Reviews
              </h3>
              <p className="text-sm text-customWhite/80">
                Share your thoughts and experiences with the gaming community
              </p>
            </div>
            <div className="bg-darkGreyBackground/50 p-4 rounded-xl">
              <h3 className="text-customWhite font-semibold mb-2">
                ❤️ Wishlist Games
              </h3>
              <p className="text-sm text-customWhite/80">
                Keep track of games you want to play and review later
              </p>
            </div>
            <div className="bg-darkGreyBackground/50 p-4 rounded-xl">
              <h3 className="text-customWhite font-semibold mb-2">
                🎮 Discover
              </h3>
              <p className="text-sm text-customWhite/80">
                Find your next favorite game through community reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      <RegisterForm />
    </div>
  );
};

export default Register;
