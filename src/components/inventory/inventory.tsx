import { Tooltip } from '@mui/material';
import { getItemIcon } from '../../shared/item-helper';
import useStore from '../../store';
import './inventory.css';
import { formatNumber } from '../../shared/utils';
import globals from '../../config/global'

export function Inventory() {
    const { flashlight, items } = useStore(s => s.inventory);

    return <div className="inventory flex flex-col items-center">
      <h2 className="text-2xl mb-4">Inventory</h2>

      <div className="flex flex-col gap-3 mb-8">
        {flashlight.found &&
          <div className="flex gap-4">
            <div className="flex gap-0.5 items-center">
              <img src="icons/flashlight.png" className="w-6 h-6" />
              <b>Flashlight</b>
            </div>
            <div className="flex gap-0.5 items-center">
              
              <img src={`icons/battery-${getBatteryPercentIncrement(flashlight.battery)}.png`} className="w-6 h-6" />
              <span className="text-sm text-gray-400">{formatNumber(flashlight.battery, 0, 2)} seconds</span>
            </div>
          </div>}
      </div>

      <div className="inventory-grid justify-center">
        {Array.from(items)
          .filter(([_, quantity]) => quantity > 0)
          .map(([item, quantity]) =>
            <Tooltip key={item} placement="bottom" arrow title={item}>
              <div className="item">
                <img src={getItemIcon(item)} />
                <span className="quantity">{quantity.toLocaleString()}</span>
              </div>
            </Tooltip>
          )}
      </div>
    </div>;
}

function getBatteryPercentIncrement(batterySecs: number) {
  const percent = batterySecs / globals.FLASHLIGHT_MAX_BATTERY;
  if (percent >= 0.85) {
    return 100;
  } else if (percent >= 0.65) {
    return 75;
  } else if (percent >= 0.35) {
    return 50;
  } else if (percent >= 0.15) {
    return 25;
  } else {
    return 0;
  }
}