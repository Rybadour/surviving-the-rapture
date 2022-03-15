import { useContext } from "react";

import './unimatrix.css';
import { UnimatrixContext } from "../contexts/unimatrix";

export function Unimatrix() {
    const unimatrix = useContext(UnimatrixContext);

    return <div className="unimatrix">
      <header className="App-header">Unimatrix</header>

      <div className="energy">
        <div className="energy-value">9,999 joules</div>
        <div className="energy-progress"></div>
      </div>

      <div className="charge" onMouseDown={unimatrix.startCharge} onMouseUp={unimatrix.stopCharge}>
        <div className="charge-value">1.3 J/s</div>
        <div className="charge-progress">
          <div className="charge-progress-bar" style={{width: (unimatrix.charge/1)*100 + "%"}}></div>
        </div>
      </div>
    </div>;
}