import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/header";
import Toast from "./_components/toast";
import Provider from "./provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Home | Reviewslike",
    template: "%s | Reviewslike",
  },
  description: "Reviewslike Homepage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body
          style={{
            height: "calc(100vh - 7rem)",
            backgroundImage:
              "url('https://ftw.usatoday.com/wp-content/uploads/sites/90/2021/11/ELDENRING_01_4K-15314260c26da42169f3.33853039-1.jpg?w=1000&h=600&crop=1')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.9,
            zIndex: -1,
          }}
          className={poppins.className}
        >
          <Header />
          {children}
          <Toast />
        </body>
      </Provider>
    </html>
  );
}
