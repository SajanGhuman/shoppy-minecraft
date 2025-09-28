interface ShopProps {
  name: string;
  owner: string;
  coordinates: { x: number; z: number };
  sells: string[];
  buys?: string[];
  extra?: string;
}

export default function ShopCard({ name, owner, coordinates, sells, buys, extra }: ShopProps) {
  return (
    <div className="p-4 bg-stone-800 text-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-1">{name}</h2>
      <p className="text-sm text-gray-300">Owner: {owner}</p>
      <p className="text-sm text-gray-300 mb-2">Coords: {coordinates.x}, {coordinates.z}</p>

      <h3 className="font-semibold mt-2">Sells:</h3>
      <ul className="list-disc list-inside text-sm mb-2">
        {sells.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      {buys && (
        <>
          <h3 className="font-semibold">Buys:</h3>
          <ul className="list-disc list-inside text-sm mb-2">
            {buys.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </>
      )}

      {extra && <p className="italic text-xs text-yellow-400">{extra}</p>}
    </div>
  );
}
