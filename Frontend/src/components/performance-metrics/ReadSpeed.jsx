import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"

const chartData = [
  { trial: "First", postgresql: 186, clickhouse: 80 },
  { trial: "Second", postgresql: 305, clickhouse: 200 },
  { trial: "Third", postgresql: 237, clickhouse: 120 },
  { trial: "Fourth", postgresql: 73, clickhouse: 190 },
  { trial: "Fifth", postgresql: 209, clickhouse: 130 },
  { trial: "Sixth", postgresql: 214, clickhouse: 140 },
]

const chartConfig = {
  postgresql: {
    label: "PostgreSQL",
    color: "hsl(var(--chart-1))",
  },
  clickhouse: {
    label: "ClickHouse",
    color: "hsl(var(--chart-2))",
  },
}

export default function ReadSpeed() {
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="postgresql"
              type="monotone"
              stroke="var(--color-postgresql)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="clickhouse"
              type="monotone"
              stroke="var(--color-clickhouse)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
             Comparison of Read Speed <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
