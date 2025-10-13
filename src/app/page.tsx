import Login from "./(auth)/login/page";

export default function Home() {
  return (
    <div
      style={{ height: "calc(100vh - 7rem)" }}
      className="flex items-center justify-center bg-darkBackground"
    >
      <Login />
    </div>
  );
}
