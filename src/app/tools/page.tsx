import ProductCard from "@/src/components/product-card";

const sampleTools = [
  { id: "1", title: "858D Hot Air Rework Soldering Station", brand: "KADA", price: 220000, category: "REPAIR_TOOL" },
  { id: "2", title: "Precision Screwdriver Kit (24-in-1)", brand: "JIAFA", price: 35000, category: "REPAIR_TOOL" },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-amber-400">Technician Repair Tools</h1>
        <p className="text-slate-400 mt-2">Professional heat guns, soldering irons, microscopes, and opening toolkits.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {sampleTools.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}