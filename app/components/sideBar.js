import Link from "next/link";
import { BsGithub } from "react-icons/bs";

export default function SideBar({ currentPage }) {
  return (
    <div className="border-r-2 border-gray-800 basis-1/5 h-full flex flex-col">
      <div className="p-6 border-b-2 border-gray-800">
        <div className="flex flex-row justify-start items-center">
          <div className="h-10 w-10 rounded-full border flex justify-center items-center">
            D
          </div>
          <h5 className="ml-2">Demo</h5>
          <p className="text-xs ml-2">Feel free to play around!</p>
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
          {/* <Link
            href="#"
            className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-700 ${
              currentPage === "directory" && "bg-gray-700"
            }`}
          >
            Directory
          </Link> */}
          {/* <Link
            href="#"
            className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-700 ${
              currentPage === "leases" && "bg-gray-700"
            }`}
          >
            Leases
          </Link> */}
          <Link
            href="/properties"
            className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-700 ${
              currentPage === "properties" && "bg-gray-700"
            }`}
          >
            Properties
          </Link>
          {/* <Link
            href="#"
            className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-700 ${
              currentPage === "settings" && "bg-gray-700"
            }`}
          >
            Settings
          </Link> */}
        </div>
        <div className="flex flex-row justify-between items-center">
          <Link
            href="/about-me"
            className="max-w-[180px] flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full border  text-green-500 font-bold border-green-500 "
          >
            About me
          </Link>
          <Link
            href="https://github.com/heiheychan/simpleproperty"
            target="_blank"
          >
            <BsGithub size={35} />
          </Link>
        </div>
      </div>
    </div>
  );
}
