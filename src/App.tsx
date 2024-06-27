import React, { useState, useEffect } from 'react';
import Chart from './components/Chart';
import TimeframeSelector from './components/TimeframeSelector';
import { AppContainer } from './styles/app';
import { DataPoint } from './types';
import jsonData from './data/data.json';
import { ChartHeader } from './styles/chart';

const App: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<string>('daily');

  useEffect(() => {
    const newData: DataPoint[] = jsonData.data.map(item => ({
      timestamp: item.timestamp,
      value: item.value
    }));
    setData(newData);
  }, []);

  return (
    <AppContainer>
      <ChartHeader>
      <h1>Chart Application</h1>
      <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      </ChartHeader>
      <Chart data={data} timeframe={timeframe} />
    </AppContainer>
  );
};

export default App;