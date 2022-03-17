import * as d3 from "d3-timer";

import { createContext, useEffect, useState } from "react";

type Stats = {
  energy: number;
  charge: number;
};

const maxCharge = 1;
const chargeSpeed = 0.1;
const chargeDecay = 0.01;

const defaultContext = {
  stats: {energy: 0, charge: 0},
  startCharge: () => {},
  stopCharge: () => {},
};
export const UnimatrixContext = createContext(defaultContext);

let lastTimer = 0;
export function UnimatrixProvider(props: Record<string, any>) {
  const [stats, setStats] = useState<Stats>({
    energy: 0,
    charge: 0,
  });
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    lastTimer = 0;
    const timer = d3.timer(frame);
    return () => timer.stop();
  });

  function frame(elapsed: number) {
    const delta = (elapsed - lastTimer)/1000;
    let {charge, energy} = stats;

    // Charge
    if (charging) {
      if (charge < maxCharge) {
        charge += delta * chargeSpeed;
      }
    } else if (charge > 0) {
      charge -= delta * chargeDecay;
      if (charge < 0) {
        charge = 0;
      }
    }

    // Energy
    if (charge > 0) {
      energy += delta * charge;
    }

    if (charge != stats.charge || energy != stats.energy) {
      setStats({charge, energy});
    }
  }

  function startCharge() {
    setCharging(true);
  }
  function stopCharge() {
    setCharging(false);
  }

  return <UnimatrixContext.Provider value={{
    stats,
    startCharge, stopCharge
  }} {...props} />;
}
