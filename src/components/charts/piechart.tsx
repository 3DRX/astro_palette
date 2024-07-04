import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ResponsivePie } from "@nivo/pie";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function PieChartComponent() {
  const [sliceColor1, setSliceColor1] = useState("#2563eb");
  const [sliceColor2, setSliceColor2] = useState("#e11d48");
  const [color1Copied, setColor1Copied] = useState(false);
  const [color2Copied, setColor2Copied] = useState(false);
  const [sliceInnerWidth, setSliceInnerWidth] = useState(30);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full flex flex-row">
        <div className="flex-1">
          <Card className="border-none">
            <CardContent>
              <PieChart
                sliceColor1={sliceColor1}
                sliceColor2={sliceColor2}
                sliceInnerWidth={sliceInnerWidth}
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
                  <Label htmlFor="sliceColor1">Slice Color 1</Label>
                  <div className="flex flex-row">
                    <Input
                      id="sliceColor1"
                      type="color"
                      value={sliceColor1}
                      onChange={(e) => {
                        setSliceColor1(e.target.value);
                        setColor1Copied(false);
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(sliceColor1);
                        setColor1Copied(true);
                      }}
                    >
                      {color1Copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="sliceColor2">Slice Color 2</Label>
                  <div className="flex flex-row">
                    <Input
                      id="sliceColor2"
                      type="color"
                      value={sliceColor2}
                      onChange={(e) => {
                        setSliceColor2(e.target.value);
                        setColor2Copied(false);
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(sliceColor2);
                        setColor2Copied(true);
                      }}
                    >
                      {color2Copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="sliceInnerWidth">Slice Inner Width</Label>
                  <Input
                    id="sliceInnerWidth"
                    type="number"
                    min="0"
                    max="100"
                    value={sliceInnerWidth}
                    onChange={(e) => setSliceInnerWidth(parseInt(e.target.value))}
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

function PieChart(props) {
  return (
    <div className="aspect-[16/9]">
      <ResponsivePie
        data={[
          { id: "Slice 1", value: 55 },
          { id: "Slice 2", value: 45 }
        ]}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={props.sliceInnerWidth / 100}
        padAngle={0.7}
        cornerRadius={3}
        colors={[props.sliceColor1, props.sliceColor2]}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          labels: {
            text: {
              fontSize: "14px",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
