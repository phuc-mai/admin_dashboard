import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Luxira",
  description: "Auth for E-commerce admin dashboard Luxira.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex items-center justify-center h-screen">
        {children}
      </div>
  );
}
