import IspCard from "@/components/isp-card";

// Sample Test Point Data (This will come from your database)
const samplePoints = [
  {
    id: "1",
    brand: "Tecno",
    modelName: "Spark 8 Pro",
    chipset: "MediaTek MT6769V",
    title: "eMMC ISP Pinout (CLK, CMD, DAT0, VCC, VCCQ)",
    diagramUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
    notes: "VCC & VCCQ require 3.3V / 1.8V external power during read/write operations.",
  },
  {
    id: "2",
    brand: "Samsung",
    modelName: "Galaxy A12",
    chipset: "Exynos 850",
    title: "UFS ISP Point & Test Point EDL Mode",
    diagramUrl: "https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800&auto=format&fit=crop",
    notes: "Short TP to GND while plugging in USB cable to force EDL mode.",
  },
];

export default function TestPointsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-amber-400">ISP Pinouts & Test Points</h1>
        <p className="text-slate-400 mt-2">
          High-resolution pinouts for eMMC, UFS, and EDL flashing for phone repair technicians.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {samplePoints.map((tp) => (
            <IspCard key={tp.id} {...tp} />
          ))}
        </div>
      </div>
    </main>
  );
}