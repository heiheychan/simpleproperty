export default function DataTable() {
  return (
    <div className="grow overflow-scroll flex flex-col">
      <div className="flex justify-between mb-4 items-center">
        <h4>All Records</h4>
        <div>
          <button className="px-4 border rounded-lg h-8 text-sm">Export all fitlered</button>
        </div>
      </div>
      <input
        className="w-full mb-4 px-4 py-2 border rounded-lg bg-gray-100 text-black"
        placeholder="Search by the amount and summary"
      ></input>
      <div className="grow overflow-scroll">
        <table className="w-full text-left bg-gray-800 rounded-lg">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Summary</th>
              <th className="px-4 py-2">Created at</th>
              <th className="px-4 py-2">Updated at</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">3,200</td>
              <td className="px-4 py-2">Rental Income</td>
              <td className="px-4 py-2">02/10/2023</td>
              <td className="px-4 py-2">02/11/2023</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
