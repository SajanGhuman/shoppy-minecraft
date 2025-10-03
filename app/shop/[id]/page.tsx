import shops from "@/public/shops.json";
import Link from "next/link";

interface ShopItem {
  name: string;
  price?: number;
  quantity?: number;
  image?: string;
}

interface ShopPageProps {
  params: {
    id: string;
  };
}

export default function ShopPage({ params }: ShopPageProps) {
  const shop = shops.find((s) => s.id.toString() === params.id);

  if (!shop) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[url('/textures/dirt.png')] bg-repeat">
        <h1 className="text-3xl font-bold text-red-500 pixel-font">
          Shop not found ❌
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 text-black bg-[url('/textures/grass.png')] bg-main bg-cover bg-center bg-fixed flex flex-col gap-8 items-center">
      {/* Shop Header */}
      <div className="w-full max-w-3xl rounded-2xl bg-white/30 backdrop-blur-md border border-white/30 shadow-xl p-6 text-center flex flex-col gap-4">
        <h1 className="text-5xl font-bold drop-shadow-lg pixel-font">
          {shop.name}
        </h1>
        <div className="flex items-center justify-center gap-3 text-lg">
          <img
            src={`/owners/avatar.png`}
            alt={shop.owner}
            className="w-6 h-6"
          />
          <span>{shop.owner}</span>
        </div>
        <p className="text-lg">📍 {shop.coords.join(", ")}</p>
      </div>

      {/* Sells Section */}
      <section className="w-full max-w-5xl rounded-2xl bg-white/30 backdrop-blur-md border border-white/30 shadow-lg p-6">
        <h2 className="text-3xl text-green-700 mb-6 pixel-font">🟩 Sells</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {shop.sells.map((item: ShopItem, i: number) => (
            <div
              key={i}
              className="flex flex-col items-center p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 shadow-md hover:scale-105 transition-transform"
            >
              <img
                src={item.image ? `/items/${item.image}` : "/items/diamond.png"}
                alt={item.name}
                className="w-24 h-24 object-contain mb-3"
              />
              <span className="text-lg font-semibold text-center">
                {item.name}
              </span>
              {item.quantity && (
                <span className="text-sm text-gray-700">
                  Qty: {item.quantity}
                </span>
              )}
              {item.price !== undefined && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm">{item.price}</span>
                  <img
                    src="/items/diamond.png"
                    alt="Diamond"
                    className="w-5 h-5"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Buys Section */}
      {shop.buys && (
        <section className="w-full max-w-5xl rounded-2xl bg-white/30 backdrop-blur-md border border-white/30 shadow-lg p-6">
          <h2 className="text-3xl text-red-700 mb-6 pixel-font">🟥 Buys</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {shop.buys.map((item: ShopItem, i: number) => (
              <div
                key={i}
                className="flex flex-col items-center p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 shadow-md hover:scale-105 transition-transform"
              >
                <img
                  src={
                    item.image ? `/items/${item.image}` : "/items/diamond.png"
                  }
                  alt={item.name}
                  className="w-24 h-24 object-contain mb-3"
                />
                <span className="text-lg font-semibold text-center">
                  {item.name}
                </span>
                {item.quantity && (
                  <span className="text-sm text-gray-700">
                    Qty: {item.quantity}
                  </span>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src="/items/diamond.png"
                    alt="Diamond"
                    className="w-5 h-5"
                  />
                  <span className="text-sm">
                    {item.price !== undefined ? item.price : "Buying"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back Button */}
      <div className="w-full max-w-3xl flex justify-center">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl text-lg font-bold pixel-font bg-white/30 backdrop-blur-md border border-white/30 shadow-lg hover:scale-105 transition-transform"
        >
          ⬅ Back to Directory
        </Link>
      </div>
    </main>
  );
}
