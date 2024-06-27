# React Chart Application

This application is a dynamic, interactive chart component built with React and Recharts. It visualizes time-series data with various features for data exploration and export.

## Live Demo

You can view a live demo of the application here: [Chart Application](https://chart-app-nu.vercel.app/)

## Features

- Interactive line chart with zoom functionality
- Daily, weekly, and monthly data views
- Custom tooltips for data points
- Modal view for detailed data point information
- Data filtering capability
- Chart export functionality (JPG and PNG formats)
- Responsive design

## Technologies Used

- React
- TypeScript
- Recharts
- React Modal
- Framer Motion
- HTML2Canvas
- Styled Components

## Installation

1. Clone the repository:

```bash
gh repo clone shakirmohd/chartApp
```
2. Navigate to the project directory:

```bash
cd my-chart-app
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

## Usage

The Chart component accepts two props:

- `data`: An array of DataPoint objects
- `timeframe`: A string indicating the current timeframe ('daily', 'weekly', or 'monthly')

Example:

```jsx
<Chart data={data} timeframe="daily" />
```

## Data Filtering

Use the input field at the top of the chart to filter data points based on their values.

## Zooming
Use the brush component at the bottom of the chart to zoom into specific time ranges.

## Exporting
Click on the "Export as JPG" or "Export as PNG" buttons to download the chart as an image.

## Detailed Data View
Click on any data point to open a modal with detailed information about that point.

## Customization
The chart's appearance can be customized by modifying the theme object in the styles/chart.ts file.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
