import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Brush, Label,
  Legend
} from 'recharts';
import Modal from 'react-modal';
import { AnimatePresence, motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { ThemeProvider } from 'styled-components';
import { Input, BackButton, TooltipText, ChartHeader, theme, GlobalStyle, ChartWrapper, ButtonContainer, StyledButton, ChartContainer, TooltipContainer, customStyles, ModalContent, FilterContainer } from '../styles/chart';
import { DataPoint } from '../types';

interface ChartProps {
  data: DataPoint[];
  timeframe: string;
}

const Chart: React.FC<ChartProps> = ({ data, timeframe }) => {
  const [zoomDomain, setZoomDomain] = useState<[number, number] | undefined>(undefined);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [clickedPoint, setClickedPoint] = useState<DataPoint | null>(null);
  const [filteredData, setFilteredData] = useState<DataPoint[]>([]);
  const [filterValue, setFilterValue] = useState<number | ''>('');
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processedData = data.map(point => ({
      ...point,
      timestamp: new Date(point.timestamp).getTime()
    }));
    setFilteredData(processedData);
    setZoomDomain(undefined);
  }, [data]);

  const formatXAxis = useCallback((tickItem: number) => {
    const date = new Date(tickItem);
    switch (timeframe) {
      case 'daily':
        return date.toLocaleDateString();
      case 'weekly':
        return `Week ${Math.ceil(date.getDate() / 7)} - ${date.toLocaleDateString('default', { month: 'short' })}`;
      case 'monthly':
        return date.toLocaleDateString('default', { month: 'short', year: 'numeric' });
      default:
        return date.toLocaleDateString();
    }
  }, [timeframe]);

  const handleZoom = useCallback((domain: { startIndex?: number; endIndex?: number }) => {
    if (domain.startIndex !== undefined && domain.endIndex !== undefined && filteredData.length > 0) {
      const startTimestamp = Number(filteredData[domain.startIndex].timestamp);
      const endTimestamp = Number(filteredData[domain.endIndex].timestamp);
      setZoomDomain([startTimestamp, endTimestamp]);
    } else {
      setZoomDomain(undefined);
    }
  }, [filteredData]);

  const customTooltip = useCallback(({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <TooltipContainer>
          <TooltipText>{`Date: ${new Date(label).toLocaleDateString()}`}</TooltipText>
          <TooltipText>{`Value: ${payload[0].value.toFixed(2)}`}</TooltipText>
        </TooltipContainer>
      );
    }
    return null;
  }, []);

  const handlePointClick = useCallback((data: any, index: number | undefined) => {
    if (index !== undefined) {
      setClickedPoint(data);
      setIsOpen(true);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setClickedPoint(null);
  }, []);

  const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? '' : Number(event.target.value);
    setFilterValue(value);

    if (value === '') {
      setFilteredData(data.map(point => ({
        ...point,
        timestamp: new Date(point.timestamp).getTime()
      })));
    } else {
      const filtered = data
        .filter(point => point.value >= value)
        .map(point => ({
          ...point,
          timestamp: new Date(point.timestamp).getTime()
        }));
      setFilteredData(filtered);
    }
    setZoomDomain(undefined);
  }, [data]);

  const handleBackClick = useCallback(() => {
    setFilterValue('');
    setFilteredData(data.map(point => ({
      ...point,
      timestamp: new Date(point.timestamp).getTime()
    })));
    setZoomDomain(undefined);
  }, [data]);

  const exportChart = useCallback((format: 'jpg' | 'png') => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const image = canvas.toDataURL(`image/${format}`);
        const link = document.createElement('a');
        link.href = image;
        link.download = `chart.${format}`;
        link.click();
      });
    }
  }, []);

  if (filteredData.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ChartContainer>
          <h1>No data available to display</h1>
          <BackButton onClick={handleBackClick}>Back to Chart</BackButton>
        </ChartContainer>
      </ThemeProvider>
    );
  }
  

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ChartContainer>
        <ChartHeader>
          <FilterContainer>
          <label htmlFor="filter">Filter by values: </label>
            <Input
              id="filter"
              type="number"
              value={filterValue}
              onChange={handleFilterChange}
              placeholder="Enter value"
            />
          </FilterContainer>
          <ButtonContainer>
            <StyledButton onClick={() => exportChart('jpg')}>Export as JPG</StyledButton>
            <StyledButton onClick={() => exportChart('png')}>Export as PNG</StyledButton>
          </ButtonContainer>
        </ChartHeader>
        <ChartWrapper ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              onClick={(e) => {
                if (e && e.activePayload) {
                  handlePointClick(e.activePayload[0].payload, e.activeTooltipIndex);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                domain={zoomDomain || ['dataMin', 'dataMax']}
                type="number"
                scale="time"
                tickCount={5}
                stroke={theme.colors.text.secondary}
              />
              <YAxis domain={['auto', 'auto']} stroke={theme.colors.text.secondary}>
                <Label
                  angle={-90}
                  value="Value"
                  position="insideLeft"
                  style={{ textAnchor: 'middle', fill: theme.colors.text.secondary }}
                />
              </YAxis>
              <Tooltip content={customTooltip} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={theme.colors.secondary}
                dot={true}
                activeDot={{ r: 4 }}
                animationDuration={500}
                animationEasing="ease-in-out"
              />
              <Legend wrapperStyle={{ fontFamily: theme.fonts.main, color: theme.colors.text.secondary }} />
              <Brush
                height={30}
                stroke={theme.colors.secondary}
                onChange={handleZoom}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>
        <AnimatePresence>
          {modalIsOpen && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Data Point Details"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {clickedPoint && (
                  <ModalContent>
                    <h2>Data Point Details</h2>
                    <p>{`Date: ${new Date(clickedPoint.timestamp).toLocaleDateString()}`}</p>
                    <p>{`Value: ${clickedPoint.value.toFixed(2)}`}</p>
                    <StyledButton onClick={closeModal}>Close</StyledButton>
                  </ModalContent>
                )}
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
      </ChartContainer>
    </ThemeProvider>
  );
};

export default Chart;
