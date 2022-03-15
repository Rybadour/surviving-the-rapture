import * as d3 from "d3-timer";

import React, { createContext, useEffect, useState } from "react";
import { setCommentRange } from "typescript";

const maxCharge = 1;
const chargeSpeed = 0.1;
const chargeDecay = 0.01;

const defaultContext = {
  charge: 0,
  startCharge: () => {},
  stopCharge: () => {},
};
export const UnimatrixContext = createContext(defaultContext);

let lastTimer = 0;
export function UnimatrixProvider(props: Record<string, any>) {
  const [charge, setCharge] = useState(0);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    lastTimer = 0;
    const timer = d3.timer(frame);
    return () => timer.stop();
  });

  function frame(elapsed: number) {
    const delta = (elapsed - lastTimer)/1000;
    // Charge
    if (charging) {
      if (charge < maxCharge) {
        setCharge(charge + delta * chargeSpeed);
      }
    } else if (charge > 0) {
      setCharge(charge - delta * chargeDecay);
    }
  }

  function startCharge() {
    setCharging(true);
  }
  function stopCharge() {
    setCharging(false);
  }

  return <UnimatrixContext.Provider value={{ charge, startCharge, stopCharge }} {...props} />;
}
