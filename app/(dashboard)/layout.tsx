import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import LeftSideBar from "@/components/layout/LeftSideBar";
import MainContainer from "@/components/layout/MainContainer";

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
    <div className="flex">
      <LeftSideBar />
      <MainContainer>
        {children}
      </MainContainer>
    </div>
  );
}
