import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ResponsiveLine } from "@nivo/line";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LineChart() {
  const [lineColor1, setLineColor1] = useState("#2563eb");
  const [lineColor2, setLineColor2] = useState("#e11d48");
  const [color1Copied, setColor1Copied] = useState(false);
  const [color2Copied, setColor2Copied] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);
  const [dataPointSize, setDataPointSize] = useState(6);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full flex flex-row">
        <div className="flex-1">
          <Card className="border-none">
            <CardContent>
              <TimeseriesChart
                lineColor1={lineColor1}
                lineColor2={lineColor2}
                lineWidth={lineWidth}
                dataPointSize={dataPointSize}
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Configure Chart Colors and Sizes</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div>
                  <Label htmlFor="lineColor">Line Color 1</Label>
                  <div className="flex flex-row">
                    <Input
                      id="lineColor1"
                      type="color"
                      value={lineColor1}
                      onChange={(e) => {
                        setLineColor1(e.target.value);
                        setColor1Copied(false);
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(lineColor1);
                        setColor1Copied(true);
                      }}
                    >
                      {color1Copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="lineColor">Line Color 2</Label>
                  <div className="flex flex-row">
                    <Input
                      id="lineColor2"
                      type="color"
                      value={lineColor2}
                      onChange={(e) => {
                        setLineColor2(e.target.value);
                        setColor2Copied(false);
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(lineColor2);
                        setColor2Copied(true);
                      }}
                    >
                      {color2Copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
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
    <div className="aspect-[16/9]">
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
        colors={[props.lineColor1, props.lineColor2]}
        pointSize={props.dataPointSize}
        useMesh={true}
        gridYValues={6}
        lineWidth={props.lineWidth}
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
