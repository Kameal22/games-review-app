import Register from "./(auth)/register/page";

export default function Home() {
  return (
    <div
      style={{ height: "calc(100vh - 7rem)" }}
      className="flex items-center justify-center bg-darkBackground"
    >
      <Register />
    </div>
  );
}
