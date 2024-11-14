import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle 
} from '../ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ArrowUpDownIcon } from 'lucide-react';
import { Separator } from '../ui/separator'
import { useSelector } from 'react-redux'

function SearchBar() {
  const [database, setDatabase] = useState('PostgreSQL');
  const [keyWord, setKeyWord] = useState("")
  const searchDataStock = useSelector((state) => state.search.searchStockData)

  return (
    <div className='md:px-6 px-4 py-8 bg-gray-900 w-full'>
        <div className='flex justify-start items-center mb-2 gap-3'>
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
        </div>
        <div className='flex justify-center mb-8'>
           <div className='w-full flex items-center mt-2'>
              <Input
                name='keyword'
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                className='py-6 rounded-l-2xl bg-yellow-50 text-black'
                placeholder='Search By Symbol ...'
              />

              <Button className='bg-green-500 hover:bg-green-800 text-white h-full rounded-r-2xl'>
                Search
              </Button>
           </div>
        </div>
        {searchDataStock ? 
         <div>
            <div className="mt-5 flex justify-center items-center">
                <Button 
                  className='bg-red-800 hover:bg-red-900 text-white rounded-2xl'
                  onClick={() => setKeyWord("")}
                >
                    Clear Search Results
                </Button>
            </div>
            <div className="mt-4 flex justify-center items-center gap-4">
                <div className='outline outline-gray-500 py-1 px-3 rounded-full font-semibold bg-gray-700'>Read Speed: 90 ms</div>
                <div className='outline outline-gray-500 py-1 px-3 rounded-full font-semibold bg-gray-700'>Throughput: 900 bytes/second </div> 
            </div>
            <div className="mt-5 flex justify-center items-center">
                <div className="grid grid-cols-1">
                    <Card className='w-full rounded-xl bg-yellow-50 text-black'>
                        <CardHeader>
                            <CardTitle>Stock Details</CardTitle>
                            <CardDescription>Display specific stock data from stock_data table using symbol</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>

                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <div className="mt-5 w-full flex justify-center items-center">   
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <Card className='rounded-xl bg-yellow-50 text-black'>
                            <CardHeader>
                                <CardTitle>Trade Info</CardTitle>
                                <CardDescription>Display data from trade_info table using specific symbol</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>

                            <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                        </Card>
                    </div>
                    <div>
                        <Card className='rounded-xl bg-yellow-50 text-black'>
                            <CardHeader>
                                <CardTitle>Price Info</CardTitle>
                                <CardDescription>Display data from price_info table using specific symbol</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>

                            <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex justify-center items-center">
                <Button 
                  className='bg-red-800 hover:bg-red-900 text-white rounded-2xl'
                  onClick={() => setKeyWord("")}
                >
                    Clear Search Results
                </Button>
            </div>
          </div>
          :
          <div className='flex justify-center items-center'>
             <p className='text-2xl font-bold text-red-600'>No Results To Display</p>
          </div>
        }
    </div>
  )
}

export default SearchBar