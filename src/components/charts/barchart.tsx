import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function BarChartComponent() {
  const [barColor1, setBarColor1] = useState("#2563eb");
  const [barColor2, setBarColor2] = useState("#e11d48");
  const [color1Copied, setColor1Copied] = useState(false);
  const [color2Copied, setColor2Copied] = useState(false);
  const [barWidth, setBarWidth] = useState(0.8);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full flex flex-row">
        <div className="flex-1">
          <Card className="border-none">
            <CardContent>
              <BarChart
                barColor1={barColor1}
                barColor2={barColor2}
                barWidth={barWidth}
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
                  <Label htmlFor="barColor1">Bar Color 1</Label>
                  <div className="flex flex-row">
                    <Input
                      id="barColor1"
                      type="color"
                      value={barColor1}
                      onChange={(e) => {
                        setBarColor1(e.target.value);
                        setColor1Copied(false);
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(barColor1);
                        setColor1Copied(true);
                      }}
                    >
                      {color1Copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="barColor2">Bar Color 2</Label>
                  <div className="flex flex-row">
                    <Input
                      id="barColor2"
                      type="color"
                      value={barColor2}
                      onChange={(e) => {
                        setBarColor2(e.target.value);
                        setColor2Copied(false);
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(barColor2);
                        setColor2Copied(true);
                      }}
                    >
                      {color2Copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="barWidth">Bar Width</Label>
                  <Input
                    id="barWidth"
                    type="number"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={barWidth}
                    onChange={(e) => setBarWidth(parseFloat(e.target.value))}
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

function BarChart(props) {
  return (
    <div className="aspect-[16/9]">
      <ResponsiveBar
        data={[
          { day: "Monday", value1: 30, value2: 20 },
          { day: "Tuesday", value1: 50, value2: 80 },
          { day: "Wednesday", value1: 70, value2: 50 },
          { day: "Thursday", value1: 40, value2: 90 },
          { day: "Friday", value1: 60, value2: 40 },
          { day: "Saturday", value1: 80, value2: 70 },
          { day: "Sunday", value1: 90, value2: 30 },
        ]}
        keys={["value1", "value2"]}
        indexBy="day"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={props.barWidth}
        colors={[props.barColor1, props.barColor2]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Days',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Values',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        theme={{
          tooltip: {
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          labels: {
            text: {
              fontSize: '14px',
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
