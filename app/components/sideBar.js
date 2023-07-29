import Link from "next/link";

export default function SideBar({currentPage}) {
  return (
    <div className="border-r-2 border-gray-800 w-[250px] h-full">
      <div className="p-6 border-b-2 border-gray-800">
        <div className="flex flex-row justify-start items-center">
          <div className="h-10 w-10 rounded-full border flex justify-center items-center">
            B
          </div>
          <h5 className="ml-2">Bill</h5>
        </div>
      </div>
      <div className="p-6 flex flex-col">
        <Link href="/" className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-500 ${currentPage === "activities" && "bg-gray-500"}`}>
          Activities
        </Link>
        <Link href="#" className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-500 ${currentPage === "directory" && "bg-gray-500"}`}>
          Directory
        </Link>
        <Link href="#" className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-500 ${currentPage === "leases" && "bg-gray-500"}`}>
          Leases
        </Link>
        <Link href="/properties" className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-500 ${currentPage === "properties" && "bg-gray-500"}`}>
          Properties
        </Link>
        <Link href="#" className={`flex items-center mb-2 text-left h-12 pl-4 rounded-lg w-full font-bold hover:bg-gray-500 ${currentPage === "settings" && "bg-gray-500"}`}>
          Settings
        </Link>
      </div>
    </div>
  );
}
