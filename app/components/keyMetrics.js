export default function KeyMetrics() {
  return (
    <div className="mb-4">
      <h4 className="mb-4">Key Metrics</h4>
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col justify-center border-2 rounded-lg border-gray-500 px-12 pt-6 pb-10 basis-1/3">
          <p className="text-green-500 font-bold">Income</p>
          <h4>$12,230.00</h4>
        </div>
        <div className="flex flex-col border-2 rounded-lg border-gray-500 px-12 pt-6 pb-10 basis-1/3">
          <p className="text-red-500 font-bold">Expenses</p>
          <h4>$2,230.00</h4>
        </div>
        <div className="flex flex-col border-2 rounded-lg border-gray-500 px-12 pt-6 pb-10 basis-1/3">
          <p className="text-purple-500 font-bold">Net</p>
          <h4>$10,000.00</h4>
        </div>
      </div>
    </div>
  );
}
