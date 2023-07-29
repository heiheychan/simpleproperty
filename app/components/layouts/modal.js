export default function Modal({ children, hidden }) {
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen ${hidden ? "hidden" : "flex"} justify-center items-center`}>
      <div className="w-full h-full absolute bg-gray-500 opacity-50"></div>
      <div className="absolute z-10 bg-white w-[390px] rounded-lg p-6">
        {children}
      </div>
    </div>
  );
}
