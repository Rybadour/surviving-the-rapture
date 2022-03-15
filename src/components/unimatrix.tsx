import { useContext } from "react";

import './unimatrix.css';
import { UnimatrixContext } from "../contexts/unimatrix";

export function Unimatrix() {
    const unimatrix = useContext(UnimatrixContext);
    const {energy, charge} = unimatrix.stats;

    return <div className="unimatrix">
      <header className="App-header">Unimatrix</header>

      <div className="energy">
        <div className="energy-value">{energy.toFixed(1)} joules</div>
        <div className="energy-progress"></div>
      </div>

      <div className="charge" onMouseDown={unimatrix.startCharge} onMouseUp={unimatrix.stopCharge}>
        <div className="charge-value">{charge.toFixed(2)} J/s</div>
        <div className="charge-progress">
          <div className="charge-progress-bar" style={{width: (charge/1)*100 + "%"}}></div>
        </div>
      </div>
    </div>;
}