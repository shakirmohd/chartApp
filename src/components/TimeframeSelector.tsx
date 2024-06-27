// src/components/TimeframeSelector.tsx
import React from "react";
import styled from "styled-components";

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center
  margin-bottom: 20px;
`;

const Button = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: ${(props) => (props.active ? "#007bff" : "#f8f9fa")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e2e6ea")};
  }
`;

interface TimeframeSelectorProps {
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  timeframe,
  setTimeframe,
}) => {
  return (
    <SelectorContainer>
      <Button
        active={timeframe === "daily"}
        onClick={() => setTimeframe("daily")}
      >
        Daily
      </Button>
      <Button
        active={timeframe === "weekly"}
        onClick={() => setTimeframe("weekly")}
      >
        Weekly
      </Button>
      <Button
        active={timeframe === "monthly"}
        onClick={() => setTimeframe("monthly")}
      >
        Monthly
      </Button>
    </SelectorContainer>
  );
};

export default TimeframeSelector;
