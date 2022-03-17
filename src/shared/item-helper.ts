import { ItemType } from "./types";

export function getItemIcon(item: ItemType): string {
  switch (item) {
    case ItemType.Wires:
      return 'icons/wire-coil.png'; 
    case ItemType.MachineParts:
      return 'icons/gears.png'; 
    case ItemType.ScrapMetal:
      return 'icons/lead-pipe.png'; 
    case ItemType.ScrapElectronics:
      return 'icons/electrical-resistance.png'; 
    case ItemType.CPU:
      return 'icons/cpu.png'; 
    case ItemType.MicroController:
      return 'icons/circuitry.png'; 
    case ItemType.Motor:
      return 'icons/turbine.png'; 
    case ItemType.LightBulb:
      return 'icons/light-bulb.png'; 
    default:
      return '';
  }
}