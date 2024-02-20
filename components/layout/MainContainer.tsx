import Topbar from "./Topbar";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col">
      <Topbar />
      <div className="flex-1 text-grey-1">{children}</div>
    </div>
  );
};

export default MainContainer;
