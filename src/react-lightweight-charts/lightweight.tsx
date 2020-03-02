import React, { useState, useRef, useEffect } from 'react';

import {
  createChart, PriceLineSource, LineStyle, SeriesOptionsCommon, PriceScaleOptions, LineWidth, PriceScaleMargins, WatermarkOptions, LayoutOptions, CrosshairOptions, TimeScaleOptions, GridOptions, LocalizationOptions, HandleScrollOptions, HandleScaleOptions
} from 'lightweight-charts';


export interface ChartData {
  time: string; // 2019-02-15
  value: number;
}

export interface PriceFormat {
  type: 'price' | 'volume' | 'percent' | 'custom';
  precision: number;
  minMove: number;
  formatter?: (arg: 'price' | 'volume' | 'percent' | 'custom') => string[] | undefined;
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
  data?: ChartData[];
  width?: number;
  height?: number;
	watermark?: WatermarkOptions;
	layout?: LayoutOptions;
	priceScale?: PriceScaleOptions;
	timeScale?: TimeScaleOptions;
	crosshair?: CrosshairOptions;
	grid?: GridOptions;
	localization?: LocalizationOptions;
	handleScroll?: HandleScrollOptions | boolean;
	handleScale?: HandleScaleOptions | boolean;

  series?: 'line' | 'bar' | 'area';
  overlay?: boolean;
  title?: string;
  scaleMargins?: PriceScaleMargins;
  priceLineVisible?:	boolean;
  priceLineSource?: PriceLineSource;
  priceLineWidth?: LineWidth;
  priceLineColor?: string;
  priceLineStyle?: LineStyle;
  lastValueVisible?: boolean;
  baseLineVisible?: boolean;
  baseLineColor?: string;
  baseLineWidth?: LineWidth;
  baseLineStyle?: LineStyle;
  priceFormat?: PriceFormat;
  // timeScale?: TimeScale;
}

const Lightweight: React.FC<LightweightProps> = (props) => {
  const {
    data,
    width,
    height,
    watermark,
    layout,
    priceScale,
    timeScale,
    crosshair,
    grid,
    localization,
    handleScroll,
    handleScale,

    series,

    title,
    scaleMargins,
    priceLineVisible,
    priceLineSource,
    priceLineWidth,
    priceLineColor,
    priceLineStyle,
    lastValueVisible,
    baseLineVisible,
    baseLineColor,
    baseLineWidth,
    baseLineStyle,

    priceFormat
  } = props;
  const chartRef = useRef<any | null>(null);
  const [appliedSeries, setAppliedSeries] = useState<any | null>(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      width,
      height,
      watermark,
      layout,
      priceScale,
      timeScale,
      crosshair,
      grid,
      localization,
      handleScroll,
      handleScale,
    });
    chart.applyOptions({
      timeScale: { rightOffset: 11, timeVisible: true },
      priceScale: { autoScale: true },
    });
    if (series === 'line') {
      const addedSeries = chart.addLineSeries({
        title,
        priceLineVisible,
        priceLineSource,
        priceLineWidth,
        priceLineColor,
        priceLineStyle,
        lastValueVisible,
        baseLineVisible,
        baseLineColor,
        baseLineStyle,
	      priceFormat,
	      baseLineWidth,
      });
      setAppliedSeries(addedSeries)
    } else if (series === 'bar') {
      const addedSeries = chart.addBarSeries({overlay: true});
      setAppliedSeries(addedSeries)
    } else if (series === 'area') {
      const addedSeries = chart.addAreaSeries({overlay: true});
      setAppliedSeries(addedSeries)
    }
  }, [
    chartRef,
    data,
    width,
    height,
    watermark,
    layout,
    priceScale,
    timeScale,
    crosshair,
    grid,
    localization,
    handleScroll,
    handleScale,

    series,

    title,
    scaleMargins,
    priceLineVisible,
    priceLineSource,
    priceLineWidth,
    priceLineColor,
    priceLineStyle,
    lastValueVisible,
    baseLineVisible,
    baseLineColor,
    baseLineWidth,
    baseLineStyle,
    priceFormat
  ]);

  useEffect(() => {
    if (appliedSeries) {
      appliedSeries.setData(data);
    }
  }, [appliedSeries, data]);

  return (
    <div>
      <div
        ref={chartRef}
			/>
    </div>
  )
}

export default Lightweight;
