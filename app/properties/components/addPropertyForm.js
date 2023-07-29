export default function AddPropertyForm() {
  return (
    <>
      <div className="p-6 border-b-2 border-gray-800">
        <div className="flex flex-col mb-2">
          <label className="mb-2">Display name</label>
          <input
            className="h-12 border rounded-lg border-gray-800 text-sm px-2"
            placeholder="93 18th St."
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="mb-2">Address</label>
          <input
            className="h-12 border rounded-lg border-gray-800 text-sm px-2"
            placeholder="93 18th Street, Jersey City, NJ 07310"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="mb-2">Unit</label>
          <input
            className="h-12 border rounded-lg border-gray-800 text-sm px-2"
            placeholder="Unit. 811"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="mb-2">Color</label>
          <input
            type="color"
            className="h-12 w-full border rounded-lg border-gray-800 text-sm px-2"
            value="#7393B3"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between p-6">
        <button className="h-12 px-4 py-2 rounded-lg border border-gray-800">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-r from-teal-200 to-lime-200 text-gray-700">
          Add Property
        </button>
      </div>
    </>
  );
}
