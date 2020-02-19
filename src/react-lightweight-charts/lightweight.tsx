import React, { useState, useRef, useEffect } from "react";

import { createChart } from "lightweight-charts";


export interface ChartData {
  time: string; // 2019-02-15
  value: number;
}

interface lightweightProps {
  data: ChartData[];
  width: number;
  height: number;
}

const Lightweight: React.FC<lightweightProps> = (props) => {
  const { data, width, height } = props;
  const chartRef = useRef<any | null>(null);
  const [lines, setLines] = useState<any | null>(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      width,
      height,
    });
    chart.applyOptions({
      timeScale: { rightOffset: 11, timeVisible: true },
      priceScale: { autoScale: true }
    });
    const lineSeries = chart.addLineSeries({overlay: true});
    setLines(lineSeries)
  }, [chartRef, width, height]);

  useEffect(() => {
    if (lines) {
      lines.setData(data);
    }
  }, [lines, data]);

  return (
    <div>
      <div
        ref={chartRef}
			/>
    </div>
  )
}

export default Lightweight;
