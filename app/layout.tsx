import type { Metadata } from "next";
import { Inter, Luckiest_Guy } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
// Font files can be located inside of `pages`
const myFont = localFont({ src: './fonts/AVGARDD_2.woff', weight: '400', style: "normal" })
// If loading a variable font, you don't need to specify the font weight
const luckiest_guy = Luckiest_Guy({
	subsets: ["latin"],
	weight: [ "400"],
    style: ["normal"],
    display: 'swap'
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en" className="m-0 p-0">
			<body className={luckiest_guy.className}>{children}</body>
		</html>
  );
}
