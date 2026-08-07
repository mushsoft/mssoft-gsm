export type ScreenQualityGrade = 'Original Service Pack' | 'OEM Pulled' | 'Hard OLED' | 'Incell / High Copy';
export type DisplayTech = 'Dynamic AMOLED 2X' | 'Super AMOLED' | 'OLED' | 'IPS LCD';

export interface ScreenSpare {
  id: string;
  title: string;
  brand: string;
  compatibleModels: string[]; // e.g., ["SM-S928B", "SM-S928U"]
  displayTech: DisplayTech;
  refreshRate: string;         // e.g., "120Hz"
  qualityGrade: ScreenQualityGrade;
  includesFrame: boolean;       // Display with Frame vs Screen Only
  priceUgx: number;
  inStock: boolean;
  warrantyDays: number;         // e.g., 30 Days Test Warranty
  image: string;
  installationDifficulty: 'Easy (Frame Included)' | 'Moderate' | 'Advanced (Glue Required)';
}
// --- BATTERY SPARES ---
export type BatteryGrade = 'Original Service Pack' | 'High Capacity OEM' | 'Standard Aftermarket';

export interface BatterySpare {
  id: string;
  type: 'battery';
  title: string;
  brand: string;
  compatibleModels: string[]; // e.g., ["SM-G998B", "SM-G998U"]
  capacitymAh: number;        // e.g., 5000
  grade: BatteryGrade;
  cycleCount: number;         // 0 for new stock, or actual read count for pulled OEM
  includesBMS: boolean;       // True if pre-soldered flex BMS board is attached
  healthPercentage: number;   // e.g., 100% or 95%+
  voltage: string;            // e.g., "3.88V / 4.45V"
  warrantyDays: number;
  priceUgx: number;
  inStock: boolean;
  image: string;
}

// --- CHARGING FLEX & PORT SPARES ---
export type FlexQualityGrade = 'Original Service Pack' | 'OEM Pulled' | 'High Copy';

export interface ChargingFlexSpare {
  id: string;
  type: 'charging-flex';
  title: string;
  brand: string;
  compatibleModels: string[];    // e.g. ["SM-A546B", "SM-A546U"]
  portType: 'USB-C' | 'Lightning' | 'Micro-USB';
  grade: FlexQualityGrade;
  includesMic: boolean;           // Primary microphone built onto flex
  supportsFastCharging: boolean;  // Full IC pass-through for 25W/45W/PD fast charge
  supportsOTG: boolean;           // OTG & Data transfer support
  priceUgx: number;
  inStock: boolean;
  warrantyDays: number;
  image: string;
}

export type SubTabType = 'screens' | 'batteries' | 'charging-flex';