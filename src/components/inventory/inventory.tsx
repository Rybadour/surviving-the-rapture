import { Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import { getItemIcon } from '../../shared/item-helper';
import useStore from '../../store';
import './inventory.css';

export function Inventory() {
    const inventory = useStore(s => s.inventory);

    return <div className="inventory">
      <h2>Inventory</h2>

      <div className="">
        <div className=""></div>
      </div>

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