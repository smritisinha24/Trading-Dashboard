import React from 'react'

import { Copy } from "lucide-react"
import { Button } from "../ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

import PrevVsFinalGraph from '../data-graphs/PrevVsFinalGraph'
import HighVsLowGraph from '../data-graphs/HighVsLowGraph'
import DayHighVsLowVsFinalGraph from '../data-graphs/DayHighVsLowVsFinalGraph'

function TradeDetailsDialog({tradeDataDetails}) {
  const High = tradeDataDetails.week_52_high;
  const Low = tradeDataDetails.week_52_low;

  const dayHigh = tradeDataDetails.day_high;
  const dayLow = tradeDataDetails.day_low;
  const dayFinal = tradeDataDetails.final_price;

  const prevClose = tradeDataDetails.prev_close;
  const finalValue = tradeDataDetails.final_value;

  return (
    <DialogContent className="sm:max-w-[500px] max-h-[100vh] bg-gray-800 text-white rounded-full   overflow-auto">
        <DialogHeader>
          <DialogTitle>Explore Graphs</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <HighVsLowGraph high={High} low={Low}/>
            <DayHighVsLowVsFinalGraph dayHigh={dayHigh} dayLow={dayLow} dayFinal={dayFinal}/>
            <PrevVsFinalGraph prevClose={prevClose} finalValue={finalValue}/>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className='rounded-xl bg-red-600 hover:bg-red-950'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
  )
}

export default TradeDetailsDialog