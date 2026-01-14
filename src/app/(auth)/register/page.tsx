import { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Rejestracja - Reviewslike",
  description:
    "Dołącz do Reviewslike, aby recenzować gry, tworzyć listy życzeń i odkrywać swoją następną ulubioną grę dzięki przemyśleniom społeczności.",
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
          Witaj w Reviewslike
        </h1>
        <div className="space-y-4 text-customWhite/90 text-lg md:text-xl">
          {/* <p>
            Miejsce na{" "}
            <span className="text-customWhite font-semibold">
              recenzje gier
            </span>{" "}
            i
            <span className="text-customWhite font-semibold">
              {" "}
              gamingowe przemyślenia
            </span>
            .
          </p> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-darkGreyBackground/50 p-4 rounded-xl">
              <h3 className="text-customWhite text-lg font-semibold mb-2">
                📝 Pisz recenzje
              </h3>
              <p className="text-sm text-customWhite/80">
                Dziel się swoimi przemyśleniami i doświadczeniami ze
                społecznością graczy
              </p>
            </div>
            <div className="bg-darkGreyBackground/50 p-4 rounded-xl">
              <h3 className="text-customWhite font-semibold mb-2 text-lg">
                ❤️ Lista życzeń
              </h3>
              <p className="text-sm text-customWhite/80">
                Śledź gry, które chcesz zagrać i zrecenzować później
              </p>
            </div>
            <div className="bg-darkGreyBackground/50 p-4 rounded-xl">
              <h3 className="text-customWhite font-semibold mb-2 text-lg">
                🎮 Odkrywaj
              </h3>
              <p className="text-sm text-customWhite/80">
                Znajdź swoją następną ulubioną grę dzięki recenzjom społeczności
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
