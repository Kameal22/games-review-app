import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
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
        <body className={poppins.className}>
          <Header />
          {children}
        </body>
      </Provider>
    </html>
  );
}
