import { ParamsProp } from "@/types/general";
import "../global.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: ParamsProp;
}>) {
  return (
    <html lang={locale}>
      <body>
        <div className={inter.className}>{children}</div>
      </body>
    </html>
  );
}
