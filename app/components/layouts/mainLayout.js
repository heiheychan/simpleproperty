import SideBar from "../sideBar";

export default function MainLayout({ children, currentPage }) {
  return (
    <div className="h-screen flex flex-row">
      <SideBar currentPage={currentPage} />
      <div className="basis-4/5 p-6 flex flex-col">{children}</div>
    </div>
  );
}
