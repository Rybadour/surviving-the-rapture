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
    case ItemType.GasCan:
      return 'icons/jerrycan.png';
    case ItemType.AAA_Battery:
      return 'icons/batteries.png';
    case ItemType.RechargeableBattery:
      return 'icons/charging.png';
    case ItemType.BrokenFlashlight:
      return 'icons/broken-flashlight.png';
    case ItemType.Flashlight:
      return 'icons/flashlight.png';
    case ItemType.RubberHose:
      return 'icons/rope-coil.png';
    default:
      return '';
  }
}