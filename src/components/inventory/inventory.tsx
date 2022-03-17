import { useContext } from 'react';
import { InventoryContext } from '../../contexts/inventory';
import { getItemIcon } from '../../shared/item-helper';
import { ItemType } from '../../shared/types';
import './inventory.css';

export function Inventory() {
    const inventory = useContext(InventoryContext);

    return <div className="inventory">
      <h2>Inventory</h2>

      <div className="inventory-grid">
        {Array.from(inventory.items, ([item, quantity]) => 
          <Item key={item} type={item} quantity={quantity} />
        )}
      </div>
    </div>;
}

type ItemProps = {
  type: ItemType,
  quantity: number,
};

function Item(props: ItemProps) {
  return <div className="item">
    <img src={getItemIcon(props.type)} />
    <span className="quantity">{props.quantity.toLocaleString()}</span>
  </div>;
}