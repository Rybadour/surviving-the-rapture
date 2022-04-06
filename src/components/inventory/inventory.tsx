import { Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import { InventoryContext } from '../../contexts/inventory';
import { getItemIcon } from '../../shared/item-helper';
import RaptureTooltip from '../../shared/rapture-tooltip';
import { ItemType } from '../../shared/types';
import './inventory.css';

export function Inventory() {
    const inventory = useContext(InventoryContext);

    return <div className="inventory">
      <h2>Inventory</h2>

      <div className="inventory-grid">
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