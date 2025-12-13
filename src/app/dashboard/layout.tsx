import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - NutriDog Pro",
  description: "Painel de controle NutriDog Pro",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
