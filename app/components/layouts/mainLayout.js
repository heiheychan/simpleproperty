import SideBar from "../sideBar";

export default function MainLayout({ children, currentPage }) {
  return (
    <div className="h-screen flex flex-row">
      <SideBar currentPage={currentPage} />
      <div className="grow p-6 flex flex-col overflow-scroll">{children}</div>
    </div>
  );
}
