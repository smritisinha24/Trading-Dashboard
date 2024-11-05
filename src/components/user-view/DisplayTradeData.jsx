import React from 'react'

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

import tradingData from "../../assets/data/staticData.json"
  
function DisplayTradeData() {
  return (
    <>
      <div className="py-2 bg-gray-950">
        <div>
          <div className="text-center">
            
            <p className="m-3 mb-8 text-3xl leading-8 font-extrabold tracking-tight text-teal-500 sm:text-4xl capitalize">Mockup Trade Data</p>
          </div>
        </div>
      
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Traded Volume <br/> (in Lakhs)</TableHead>
                <TableHead>Traded Value <br/> (in Crores)</TableHead>
                <TableHead>Total Market Cap <br/> (in Crores)</TableHead>
                <TableHead>Free Float Market Cap <br/> <p className='text-center'>(in Crores)</p></TableHead>
                <TableHead>Impact Cost</TableHead>
                <TableHead>Deliverable Traded <br/> Quantity (%)</TableHead>
                <TableHead>Applicale Maargin Rate</TableHead>
                <TableHead>Face Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tradingData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.symbol}</TableCell>
                  <TableCell>{data.traded_volume_lakhs}</TableCell>
                  <TableCell>{data.traded_value_cr}</TableCell>
                  <TableCell>{data.total_market_cap_cr}</TableCell>
                  <TableCell className='text-center'>{data.free_float_market_cap_cr}</TableCell>
                  <TableCell>{data.impact_cost}</TableCell>
                  <TableCell>{data.percent_deliverable_traded_quantity}</TableCell>
                  <TableCell>{data.applicable_margin_rate}</TableCell>
                  <TableCell>{data.face_value}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter> */}

          </Table>
      </div>
    </>

  )
}

export default DisplayTradeData