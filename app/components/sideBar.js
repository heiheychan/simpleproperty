import Link from "next/link";

export default function SideBar({ currentPage }) {
  return (
    <div className="border-r-2 border-gray-800 basis-1/5 h-full flex flex-col">
      <div className="p-6 border-b-2 border-gray-800">
        <div className="flex flex-row justify-start items-center">
          <div className="h-10 w-10 rounded-full border flex justify-center items-center">
            B
          </div>
          <h5 className="ml-2">Bill</h5>
        </div>
      </div>
      <div className="p-6 grow flex flex-col justify-between">
        <div className="flex flex-col">
          <Link
            href="/"
            className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-700 ${
              currentPage === "activities" && "bg-gray-700"
            }`}
          >
            Activities
          </Link>
          <Link
            href="#"
            className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-700 ${
              currentPage === "directory" && "bg-gray-700"
            }`}
          >
            Directory
          </Link>
          <Link
            href="#"
            className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-700 ${
              currentPage === "leases" && "bg-gray-700"
            }`}
          >
            Leases
          </Link>
          <Link
            href="/properties"
            className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-700 ${
              currentPage === "properties" && "bg-gray-700"
            }`}
          >
            Properties
          </Link>
          <Link
            href="#"
            className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-700 ${
              currentPage === "settings" && "bg-gray-700"
            }`}
          >
            Settings
          </Link>
        </div>
        <button className="flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full border  text-red-500 font-bold border-red-500 ">
          Sign out
        </button>
      </div>
    </div>
  );
}
