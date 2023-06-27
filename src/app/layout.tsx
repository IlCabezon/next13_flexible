// native
import { ReactNode } from "react";

// styles
import './globals.css'

// components
import { Navbar, Footer } from './components'

export const metadata = {
  title: "Flexibble",
  description: "Showcase and discover developer projects",
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
