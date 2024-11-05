import React from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "../../lib/utils";

function DasboardHero() {
  return (
    <div className="h-[35rem] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("h-[96px] text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 z-20")}>
        Welcome to TradingDashboard
      </h1>
      <p className="font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto relative z-20">
      Explore our advanced trading dashboard and elevate your data insights today. Whether you're new to trading or a seasoned analyst, join us to unlock the full potential of real-time market data and performance tools.
      </p>
    </div>
  );
}

export default DasboardHero;
