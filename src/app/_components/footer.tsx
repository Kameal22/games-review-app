const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-darkGreyBackground px-4 lg:px-6 py-2 border-t border-lightGray">
      <div className="flex items-center justify-center">
        <p className="text-greyText text-xs text-center">
          Game data and images courtesy of{" "}
          <a
            href="https://rawg.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
          >
            RAWG
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
