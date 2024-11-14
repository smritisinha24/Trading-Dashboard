import React, { useState, useMemo, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

import { Button } from '../ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { Dialog, DialogTrigger } from '../ui/dialog';

import tradingData from "../../assets/data/staticData.json"
import Pagination from './../../helper/pagination/Pagination.jsx';
import { ArrowUpDownIcon } from 'lucide-react';
import TradeDetailsDialog from './TradeDetailsDialog';

const dummyTradingData = [
  {
    "symbol": "A",
    "prev_close": 954.63,
    "iep": 960.4,
    "chng": 5.77,
    "pct_chng": 0.6,
    "final_value": 960.4,
    "final_quantity": 984247,
    "value": 43.75,
    "ffm_cap": 210.25,
    "week_52_high": 1720.44,
    "week_52_low": 277.06,
    "final_price": 950.91,
    "day_high": 958.19,
    "day_low": 945.3
  },
  {
    "symbol": "AA",
    "prev_close": 785.42,
    "iep": 761.41,
    "chng": -24.01,
    "pct_chng": -3.06,
    "final_value": 761.41,
    "final_quantity": 862255,
    "value": 43.11,
    "ffm_cap": 840.59,
    "week_52_high": 875.75,
    "week_52_low": 330.98,
    "final_price": 793.54,
    "day_high": 794.93,
    "day_low": 791.55
  },
  {
    "symbol": "AAA",
    "prev_close": 138.3,
    "iep": 88.54,
    "chng": -49.76,
    "pct_chng": -35.98,
    "final_value": 88.54,
    "final_quantity": 294138,
    "value": 23.08,
    "ffm_cap": 293.31,
    "week_52_high": 509.58,
    "week_52_low": 497.65,
    "final_price": 138.71,
    "day_high": 142.27,
    "day_low": 130.92
  },
  {
    "symbol": "AAAU",
    "prev_close": 306.26,
    "iep": 267.01,
    "chng": -39.25,
    "pct_chng": -12.82,
    "final_value": 267.01,
    "final_quantity": 272872,
    "value": 23.87,
    "ffm_cap": 503.06,
    "week_52_high": 1927.29,
    "week_52_low": 441.77,
    "final_price": 298.96,
    "day_high": 308.05,
    "day_low": 297.09
  },
  {
    "symbol": "AACG",
    "prev_close": 845.76,
    "iep": 873.4,
    "chng": 27.64,
    "pct_chng": 3.27,
    "final_value": 873.4,
    "final_quantity": 309200,
    "value": 38.92,
    "ffm_cap": 591.38,
    "week_52_high": 1407.38,
    "week_52_low": 413.98,
    "final_price": 849.23,
    "day_high": 850.3,
    "day_low": 847.11
  },
  {
    "symbol": "AACT",
    "prev_close": 386.57,
    "iep": 360.86,
    "chng": -25.71,
    "pct_chng": -6.65,
    "final_value": 360.86,
    "final_quantity": 997509,
    "value": 24.91,
    "ffm_cap": 293.9,
    "week_52_high": 739.4,
    "week_52_low": 244.37,
    "final_price": 393.15,
    "day_high": 401.63,
    "day_low": 393.07
  },
]

const DisplayTradeData = React.forwardRef((props, ref) => {
  const [database, setDatabase] = useState('PostgreSQL');
  const [openGraphDialog, setOpenGraphDialog] = useState(false)
  const [tradeData, setTradeData] = useState(tradingData);
  
  useEffect(() => {
    if (database === 'PostgreSQL') {
      setTradeData(tradingData);
    }
    else{
      setTradeData(dummyTradingData);
    }
  }, [database])


  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return tradeData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, tradeData]);

  

  return (
    <>
      <div ref={ref} className="py-2 bg-gray-950">
        <div className='mb-2'>
          <div className="text-center">
            <p className="m-3 mb-3 text-3xl leading-8 font-extrabold tracking-tight text-teal-500 sm:text-4xl capitalize">Mockup Trade Data</p>
          </div>

          <div className='flex justify-start items-center mb-2 px-4 gap-3'>
              <DropdownMenu className='rounded-lg px-4'> 
                <DropdownMenuTrigger asChild>
                  <Button 
                     className="flex items-center gap-1 rounded-xl border border-gray-800 text-white bg-gray-700 px-4 py-2 ml-2 hover:bg-gray-500"
                  >   
                  <span>Current DB : {database}</span>
                  <ArrowUpDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-900 text-gray-300">
                    <DropdownMenuLabel className='font-semibold text-base'>Select Database</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={database} onValueChange={setDatabase}>
                      <DropdownMenuRadioItem value="PostgreSQL" className='cursor-pointer'>PostgreSQL</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="ClickHouse" className='cursor-pointer'>ClickHouse</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
             </DropdownMenu>

             <DropdownMenu className='rounded-lg px-4'> 
                <DropdownMenuTrigger asChild>
                  <Button 
                     className="flex items-center gap-1 rounded-xl border border-gray-800 text-white bg-gray-700 px-4 py-2 ml-2 hover:bg-gray-500"
                  >   
                  <span>Current Rows Per Page : {pageSize}</span>
                  <ArrowUpDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-900 text-gray-300">
                    <DropdownMenuLabel className='font-semibold text-base'>Select Rows Per Page</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={pageSize} onValueChange={setPageSize}>
                      <DropdownMenuRadioItem value={10} className='cursor-pointer'>10</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={50} className='cursor-pointer'>50</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={1000} className='cursor-pointer'>1000</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={tradingData.length} className='cursor-pointer'>All</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
             </DropdownMenu>

             <div className='outline outline-gray-500 py-1 px-3 rounded-xl font-semibold'>Read Speed: 90 ms</div>
             <div className='outline outline-gray-500 py-1 px-3 rounded-xl font-semibold'>Throughput: 900 bytes/second </div>
          </div>
        </div>
      
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Prev Close</TableHead>
                <TableHead>IEP</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Percentage Change</TableHead>
                <TableHead>Final Value</TableHead>
                <TableHead>Final Quantity</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>FFM_CAP</TableHead>
                <TableHead>WEEK_52_HIGH</TableHead>
                <TableHead>WEEK_52_LOW</TableHead>
                <TableHead>Final Price</TableHead>
                <TableHead>Day High</TableHead>
                <TableHead>Day Low</TableHead>
                <TableHead className='sr-only'>Graph Section</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTableData.map((data) => (
                <TableRow key={data?.symbol}>
                  <TableCell>{data?.symbol}</TableCell>
                  <TableCell>{data?.prev_close}</TableCell>
                  <TableCell>{data?.iep}</TableCell>
                  <TableCell>{data?.chng}</TableCell>
                  <TableCell>{data?.pct_chng}</TableCell>
                  <TableCell>{data?.final_value}</TableCell>
                  <TableCell>{data?.final_quantity}</TableCell>
                  <TableCell>{data?.value}</TableCell>
                  <TableCell>{data?.ffm_cap}</TableCell>
                  <TableCell>{data?.week_52_high}</TableCell>
                  <TableCell>{data?.week_52_low}</TableCell>
                  <TableCell>{data?.final_price}</TableCell>
                  <TableCell>{data?.day_high}</TableCell>
                  <TableCell>{data?.day_low}</TableCell>
                  <TableCell>
                        <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className='rounded-full bg-gray-600 hover:bg-black text-white'>View Graph</Button>
                            </DialogTrigger>

                            <TradeDetailsDialog tradeDataDetails={data}/>
                        </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Pagination
            className="w-full flex justify-center text-white mt-2 mb-2"
            currentPage={currentPage}
            totalCount={tradeData.length}
            pageSize={pageSize}
            onPageChange={page => setCurrentPage(page)}
          />
      </div>
    </>

  )
})

export default DisplayTradeData