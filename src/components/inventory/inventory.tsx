import { Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import { getItemIcon } from '../../shared/item-helper';
import useStore from '../../store';
import './inventory.css';

export function Inventory() {
    const inventory = useStore(s => s.inventory);

    return <div className="inventory flex flex-col items-center">
      <h2 className="text-2xl mb-4">Inventory</h2>

      <div className="flex flex-col gap-3 mb-8">
        {inventory.flashlight.found &&
        <div className="flex gap-4">
          <div className="flex gap-0.5 items-center">
            <img src="icons/flashlight.png" className="w-6 h-6" />
            <b>Flashlight</b>
          </div>
          <div className="flex gap-0.5 items-center">
            <img src='icons/battery-0.png' className="w-6 h-6" />
            <span className="text-sm text-gray-400">0 seconds</span>
          </div>
        </div>}
      </div>

      <div className="inventory-grid justify-center">
        {Array.from(inventory.items, ([item, quantity]) => 
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