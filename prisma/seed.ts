import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
  {
    slug: "samsung-galaxy-a54-5g-screen",
    title: "Samsung Galaxy A54 5G Display Assembly",
    description: "Original service pack OLED display assembly with touch panel, FHD+ 6.4\".",
    price: 240000,
    stock: 12,
    category: "SPARE_PART" as const,
    subcategory: "SCREEN",
    brand: "Samsung",
    modelName: "Galaxy A54 5G",
    images: [],
    specs: { size: "6.4\"", resolution: "1080 x 2340 px (FHD+)", quality: "Original Service Pack" },
  },
  {
    slug: "iphone-13-oled-screen",
    title: "iPhone 13 OLED Screen Replacement with Touch Panel",
    description: "OLED replacement screen with digitizer, fits A2633 / A2482 / A2631 / A2634.",
    price: 380000,
    stock: 8,
    category: "SPARE_PART" as const,
    subcategory: "SCREEN",
    brand: "Apple",
    modelName: "iPhone 13",
    images: [],
    specs: { size: "6.1\"", resolution: "1170 x 2532 px", quality: "OLED" },
  },
  {
    slug: "tecno-camon-20-pro-battery",
    title: "Tecno Camon 20 / 20 Pro Battery (BL-49NX)",
    description: "OEM replacement battery, 5000 mAh, fits CK7n / CK8n / CK6.",
    price: 45000,
    stock: 20,
    category: "SPARE_PART" as const,
    subcategory: "BATTERY",
    brand: "Tecno",
    modelName: "Camon 20 Pro",
    images: [],
    specs: { capacity: "5000 mAh", quality: "OEM Replacement" },
  },
  {
    slug: "20w-fast-charger-type-c",
    title: "20W Fast Charger Adapter + Type-C Cable",
    description: "Fast charging adapter with Type-C cable, compatible with most Android devices.",
    price: 45000,
    stock: 30,
    category: "ACCESSORY" as const,
    subcategory: "CHARGER",
    brand: "Samsung",
    modelName: null,
    images: [],
    specs: { wattage: "20W", connector: "USB-C" },
  },
  {
    slug: "kada-858d-hot-air-station",
    title: "858D Hot Air Rework Soldering Station",
    description: "Digital ESD hot air station for SMD component micro-soldering, 110V-220V.",
    price: 220000,
    stock: 6,
    category: "REPAIR_TOOL" as const,
    subcategory: "BLOWER",
    brand: "KADA",
    modelName: null,
    images: [],
    specs: { temperature: "100°C-500°C", display: "LED Display" },
  },
  {
    slug: "samsung-galaxy-a14-brand-new",
    title: "Samsung Galaxy A14 4G (64GB/4GB) - Brand New Sealed",
    description: "Brand new, factory sealed, full manufacturer warranty.",
    price: 550000,
    stock: 15,
    category: "PHONE" as const,
    subcategory: null,
    brand: "Samsung",
    modelName: "Galaxy A14",
    images: [],
    specs: { storage: "64GB", ram: "4GB", condition: "Brand New" },
  },
];

const repairGuides = [
  {
    title: 'How to Replace a Samsung Galaxy A54 5G Screen',
    brand: 'Samsung',
    modelName: 'Galaxy A54 5G',
    videoUrl: null,
    thumbnail: '',
    toolsUsed: ['Heat Gun', 'Plastic Pry Tools', 'Suction Cup', 'Y000 Screwdriver', 'Adhesive Strips'],
    content: `1. Power off the phone completely and remove the SIM tray.
2. Apply gentle heat around the screen edges with a heat gun (low setting) to soften the adhesive.
3. Use a suction cup on the lower edge of the screen and gently lift while sliding a plastic pry tool underneath to release the clips. Work slowly around all four edges.
4. Once the screen is loosened, lift it like a book from the bottom — the display flex cables are connected near the top, so don't pull it fully off yet.
5. Remove the screws covering the flex cable connector bracket, lift the bracket, and disconnect the display and fingerprint sensor cables with a spudger.
6. Transfer the fingerprint sensor and any small components from the old screen if the replacement doesn't include them.
7. Connect the new screen's flex cables, replace the bracket and screws, and power on the phone BEFORE sealing it to confirm the display and touch work correctly.
8. Once confirmed, apply new adhesive strips around the frame and press the screen firmly into place. Let it sit under light pressure for a few minutes.`,
  },
  {
    title: 'iPhone 13 Battery Replacement Guide',
    brand: 'Apple',
    modelName: 'iPhone 13',
    videoUrl: null,
    thumbnail: '',
    toolsUsed: ['Pentalobe Screwdriver', 'Suction Handle', 'Plastic Opening Tools', 'Tweezers'],
    content: `1. Power off the phone and remove the two pentalobe screws next to the charging port.
2. Use a suction handle to lift the screen slightly and insert an opening tool to release the display clips along the bottom edge, then swing the screen open like a book (it stays connected by ribbon cables).
3. Remove the screws securing the battery connector bracket and disconnect the battery from the logic board FIRST, before touching anything else, for safety.
4. Gently pull the stretch-release adhesive tabs underneath the battery to lift it out. Pull slowly and evenly to avoid puncturing the battery.
5. Clean the battery bay and apply new adhesive strips if they didn't come pre-installed on the replacement battery.
6. Set the new battery in place, reconnect the battery connector, then power on to confirm before closing.
7. Reconnect the display cables, close the screen, and replace the two pentalobe screws.
8. Use your phone's Battery Health setting to confirm the new battery is recognized correctly.`,
  },
  {
    title: 'Tecno Camon 20 Pro Charging Port Not Working — Fix Guide',
    brand: 'Tecno',
    modelName: 'Camon 20 Pro',
    videoUrl: null,
    thumbnail: '',
    toolsUsed: ['Precision Screwdriver Set', 'Plastic Pry Tools', 'Isopropyl Alcohol', 'Soft Brush'],
    content: `1. First, rule out a dirty port: power off the phone and clean the charging port gently with a soft brush and isopropyl alcohol. Let it dry fully before testing again.
2. If cleaning doesn't help, remove the back cover (gentle heat helps loosen the adhesive) and the screws securing the main board shield.
3. Locate the charging sub-board — on this model it's a separate flex board, not soldered directly to the motherboard, which makes this an easier repair.
4. Disconnect the battery connector before doing any other work.
5. Unscrew and lift out the charging sub-board, noting how the flex cable routes.
6. Install the replacement sub-board, reconnect its flex cable, and reconnect the battery.
7. Power on and test charging with a known-good cable BEFORE reassembling the back cover.
8. Once confirmed working, replace the shield, back cover, and any adhesive.`,
  },
  {
    title: 'Universal Back Glass Replacement — What to Know Before You Start',
    brand: 'Universal',
    modelName: 'Most Glass-Back Phones',
    videoUrl: null,
    thumbnail: '',
    toolsUsed: ['Low-Wattage Laser (or Heat Gun)', 'Suction Cup', 'Fine Wire or Pry Tool', 'UV Adhesive'],
    content: `Back glass replacement is one of the trickiest repairs to do cleanly without professional equipment, since the glass is fused directly to the frame (not held by screws or clips like the front screen).

1. Apply heat evenly across the back glass in small sections — never concentrate heat in one spot, as this can crack the glass further or damage internal components.
2. Once the adhesive softens, use a suction cup to lift a small section and carefully feed a thin wire or pry tool underneath to cut through the adhesive, working in small sections.
3. Remove all old glass fragments and adhesive residue completely — any leftover debris will prevent the new glass from sitting flush.
4. Check the wireless charging coil and any other components attached to the original back glass; these usually need to be transferred to the new glass.
5. Apply new adhesive (UV-cure adhesive gives the strongest, most water-resistant result) and press the new glass into place evenly.
6. Cure the adhesive per its instructions before handling the phone normally again.

Because of the risk of internal damage, this is the repair we most recommend leaving to a professional if you're not confident.`,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        subcategory: product.subcategory,
        brand: product.brand,
        modelName: product.modelName,
        images: product.images,
        specs: product.specs,
      },
      create: product,
    });
  }

  console.log(`Seeded ${products.length} products.`);

  for (const guide of repairGuides) {
    const existing = await prisma.repairGuide.findFirst({ where: { title: guide.title } });
    if (!existing) {
      await prisma.repairGuide.create({ data: guide });
    }
  }

  console.log(`Seeded ${repairGuides.length} repair guides.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
