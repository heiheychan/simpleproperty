"use client"

export default function Modal({ children, open, setOpen, formName }) {

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen ${open ? "flex": "hidden"} justify-center items-center`}>
      <div className="w-full h-full absolute bg-gray-500 opacity-50" onClick={() => {setOpen(false)}}></div>
      <div className="absolute z-10 bg-black rounded-lg border-gray-800 border min-w-[390px]">
      <div className="p-6 border-b-2 border-gray-800 flex flex-row justify-between">
        <h3>{formName}</h3>
        {/* <button>Exit</button> */}
      </div>
        {children}
      </div>
    </div>
  );
}
