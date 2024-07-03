import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ResponsiveLine } from "@nivo/line";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function Component() {
  const [lineColor, setLineColor] = useState("#4338ca");
  const [dataPointColor, setDataPointColor] = useState("#a5b4fc");
  const [lineWidth, setLineWidth] = useState(2);
  const [dataPointSize, setDataPointSize] = useState(6);
  const data = [
    { date: "2023-01-01", sales: 1000 },
    { date: "2023-02-01", sales: 1200 },
    { date: "2023-03-01", sales: 1500 },
    { date: "2023-04-01", sales: 1800 },
    { date: "2023-05-01", sales: 2000 },
    { date: "2023-06-01", sales: 1900 },
    { date: "2023-07-01", sales: 2100 },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Sales Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <TimeseriesChart
                className="aspect-[16/9]"
                data={data}
                type="line"
                xAccessor={(d) => new Date(d.date)}
                yAccessor={(d) => d.sales}
                lineColor={lineColor}
                dataPointColor={dataPointColor}
                lineWidth={lineWidth}
                dataPointSize={dataPointSize}
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Configure Chart Colors and Sizes</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div>
                  <Label htmlFor="lineColor">Line Color</Label>
                  <Input
                    id="lineColor"
                    type="color"
                    value={lineColor}
                    onChange={(e) => setLineColor(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dataPointColor">Data Point Color</Label>
                  <Input
                    id="dataPointColor"
                    type="color"
                    value={dataPointColor}
                    onChange={(e) => setDataPointColor(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lineWidth">Line Width</Label>
                  <Input
                    id="lineWidth"
                    type="number"
                    min="1"
                    max="10"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="dataPointSize">Data Point Size</Label>
                  <Input
                    id="dataPointSize"
                    type="number"
                    min="2"
                    max="20"
                    value={dataPointSize}
                    onChange={(e) => setDataPointSize(parseInt(e.target.value))}
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TimeseriesChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "2018-01-01", y: 7 },
              { x: "2018-01-02", y: 5 },
              { x: "2018-01-03", y: 11 },
              { x: "2018-01-04", y: 9 },
              { x: "2018-01-05", y: 12 },
              { x: "2018-01-06", y: 16 },
              { x: "2018-01-07", y: 13 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "2018-01-01", y: 9 },
              { x: "2018-01-02", y: 8 },
              { x: "2018-01-03", y: 13 },
              { x: "2018-01-04", y: 6 },
              { x: "2018-01-05", y: 8 },
              { x: "2018-01-06", y: 14 },
              { x: "2018-01-07", y: 11 },
            ],
          },
        ]}
        margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          useUTC: false,
          precision: "day",
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          format: "%d",
          tickValues: "every 1 day",
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
