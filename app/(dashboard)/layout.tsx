import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import LeftSideBar from "@/components/layout/LeftSideBar";
import Topbar from "@/components/layout/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex max-lg:flex-col">
      <LeftSideBar />
      <Topbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
