import React, { useState, useRef, useEffect } from 'react';

import {
  createChart, PriceLineSource, LineStyle
} from 'lightweight-charts';


export interface ChartData {
  time: string; // 2019-02-15
  value: number;
}

export interface PriceFormat {
  type: 'price' | 'volume' | 'percent' | 'custom';
  precision: number;
  minMove: number;
  formatter: (arg: 'price' | 'volume' | 'percent' | 'custom') => string[] | undefined;
}

export interface TimeScale {
  rightOffset: number;
  barSpacing: number;
  fixLeftEdge: boolean;
  lockVisibleTimeRangeOnResize: boolean;
  rightBarStaysOnScroll: boolean;
  borderVisible: boolean;
  borderColor: string;
  visible: boolean;
  timeVisible: boolean;
  secondsVisible: boolean;
}

export interface LightweightProps {
  data: ChartData[];
  width: number;
  height: number;
  series: 'line' | 'bar' | 'area';
  overlay: boolean;
  title: string;
  scaleMargins: {
    top: number;
    bottom: number;
  } | undefined;
  priceLineVisible:	boolean;
  priceLineSource: PriceLineSource;
  priceLineColor: string;
  priceLineStyle: LineStyle;
  lastValueVisible: boolean;
  baseLineVisible: boolean;
  baseLineColor: string;
  baseLineWidth: number;
  baseLineStyle: LineStyle;
  priceFormat: PriceFormat;
  timeScale: TimeScale;
}

const Lightweight: React.FC<LightweightProps> = (props) => {
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
