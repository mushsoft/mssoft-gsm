import { ScreenSpare, BatterySpare, ChargingFlexSpare } from '@/types/spares';
import { formatUGX } from '@/lib/formatters';

const PHONEHUB_SPARES_WHATSAPP_NUMBER = '256700000000';

export const handleSpareWhatsAppOrder = (
  item: ScreenSpare | BatterySpare | ChargingFlexSpare,
  userNote?: string
) => {
  const lineBreak = '\n';
  let message = '';

  if ('displayTech' in item) {
    // Screen Assembly
    message = [
      `🖥️ *PHONEHUB SCREEN SPARE ORDER*`,
      `-----------------------------------`,
      `• *Part:* ${item.title}`,
      `• *Grade:* ${item.qualityGrade}`,
      `• *Tech:* ${item.displayTech} (${item.refreshRate})`,
      `• *Frame:* ${item.includesFrame ? 'YES' : 'NO'}`,
      `• *Price:* ${formatUGX(item.priceUgx)}`,
      `-----------------------------------`,
      userNote ? `• *Note:* ${userNote}${lineBreak}` : '',
      `Is this display assembly available for dispatch?`
    ].filter(Boolean).join(lineBreak);

  } else if ('capacitymAh' in item) {
    // Battery Spare
    message = [
      `🔋 *PHONEHUB BATTERY SPARE ORDER*`,
      `-----------------------------------`,
      `• *Battery:* ${item.title}`,
      `• *Capacity:* ${item.capacitymAh} mAh`,
      `• *Health:* ${item.healthPercentage}% (${item.cycleCount} Cycles)`,
      `• *Grade:* ${item.grade}`,
      `• *BMS Attached:* ${item.includesBMS ? 'YES' : 'NO'}`,
      `• *Price:* ${formatUGX(item.priceUgx)}`,
      `-----------------------------------`,
      userNote ? `• *Note:* ${userNote}${lineBreak}` : '',
      `Is this battery stock available for dispatch?`
    ].filter(Boolean).join(lineBreak);

  } else if ('portType' in item) {
    // Charging Flex & Port Assembly
    message = [
      `🔌 *PHONEHUB CHARGING FLEX ORDER*`,
      `-----------------------------------`,
      `• *Part:* ${item.title}`,
      `• *Port Type:* ${item.portType}`,
      `• *Grade:* ${item.grade}`,
      `• *Fast Charge:* ${item.supportsFastCharging ? 'YES (Supported)' : 'NO (Standard)'}`,
      `• *Microphone:* ${item.includesMic ? 'Included on Flex' : 'No'}`,
      `• *Price:* ${formatUGX(item.priceUgx)}`,
      `-----------------------------------`,
      userNote ? `• *Note:* ${userNote}${lineBreak}` : '',
      `Please confirm stock for this charging flex assembly.`
    ].filter(Boolean).join(lineBreak);
  }

  const url = `https://wa.me/${PHONEHUB_SPARES_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};