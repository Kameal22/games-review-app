import GameInfo from "./_components/game-info";

const Game: React.FC = () => {
  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <div className="bg-lightGray rounded-xl pt-4 pr-8 pl-8 pb-4 w-[90%] h-[90%] flex flex-col gap-4 m-auto">
        <p className="text-5xl font-semibold text-customWhite text-center">
          Elden Ring
        </p>

        <div className="flex grow items-center justify-between">
          <div className="flex grow items-center justify-centerflex-1">
            <img
              src="https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg?t=1650626414"
              alt="Game Image"
              className="object-cover w-[720px] rounded-lg"
            />
          </div>
          <GameInfo />
        </div>
      </div>
    </div>
  );
};

export default Game;
