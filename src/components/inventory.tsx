import { getItemIcon } from '../shared/item-helper';
import { ItemType } from '../shared/types';
import './inventory.css';

export function Inventory() {
    const items = [1, 5, 1299];
    return <div className="inventory">
      <header className="App-header">Inventory</header>

      <div className="inventory-grid">
        {items.map(i => <Item type={ItemType.Wires} quantity={i} />)}
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