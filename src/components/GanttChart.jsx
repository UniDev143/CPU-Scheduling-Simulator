import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import '../styles/GanttChart.css';

// Color palette for processes
const COLORS = [
  '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
  '#1abc9c', '#34495e', '#e67e22', '#c0392b', '#8e44ad'
];

export const GanttChart = ({ timeline, algorithm }) => {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="gantt-container">
        <p className="empty-message">Add processes and run scheduling to view Gantt chart</p>
      </div>
    );
  }

  // Create a map of process IDs to colors
  const processColorMap = {};
  timeline.forEach((task, index) => {
    if (!processColorMap[task.id]) {
      processColorMap[task.id] = COLORS[Object.keys(processColorMap).length % COLORS.length];
    }
  });

  // Calculate total execution time
  const totalExecutionTime = Math.max(...timeline.map(t => t.end));

  // Transform timeline data for Gantt chart - each entry becomes a row
  const chartData = timeline.map((task, index) => ({
    id: `${task.id}-${index}`,
    name: task.name,
    start: task.start,
    duration: task.duration,
    end: task.end,
    processId: task.id,
    value: task.duration,
    maxTime: totalExecutionTime
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="gantt-tooltip">
          <p><strong>{data.name}</strong></p>
          <p>Start: {data.start} units</p>
          <p>Duration: {data.duration} units</p>
          <p>End: {data.end} units</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="gantt-container">
      <h2>Gantt Chart - {algorithm} Algorithm</h2>
      <div className="gantt-chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, totalExecutionTime]} label={{ value: 'Time Units', position: 'insideBottomRight', offset: -5 }} />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="value"
              fill="#3498db"
              name="Process Duration"
              layout="vertical"
              shape={<GanttBarShape />}
              isAnimationActive={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={processColorMap[entry.processId]} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="gantt-legend">
        <h3>Process Legend</h3>
        <div className="legend-items">
          {Object.entries(processColorMap).map(([processId, color]) => {
            const processTask = timeline.find(t => t.id === parseInt(processId));
            if (!processTask) return null;
            return (
              <div key={processId} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: color }}></div>
                <span>{processTask.name} (ID: {processId})</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="gantt-info">
        <h3>Execution Timeline</h3>
        <table className="execution-table">
          <thead>
            <tr>
              <th>Process</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
              <th>Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((task) => (
              <tr key={`${task.id}-${task.start}`}>
                <td><strong>{task.name}</strong></td>
                <td>{task.start}</td>
                <td>{task.end}</td>
                <td>{task.end - task.start}</td>
                <td>{task.waitingTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Custom Gantt bar component that positions bars at correct time positions
const GanttBarShape = (props) => {
  const { fill, x, y, width, height, payload } = props;
  
  if (!payload) return null;

  // Get the start time and end time from payload
  const startTime = payload.start;
  const endTime = payload.end;
  const totalTime = payload.maxTime;
  
  // The key issue: width is the allocated bar width, not the full chart width
  // We need to calculate based on the time values and chart scale
  // Use the payload's time span to calculate the bar width
  const barWidth = width; // Full allocated width for this bar in recharts
  
  // Actually position from start to end on the full time scale
  // We need to calculate what portion of the chart (0 to totalTime) this bar represents
  const chartScaledWidth = barWidth * (totalTime / (endTime - startTime ));
  const scaledStartPixel = (startTime / totalTime) * chartScaledWidth;
  const scaledEndPixel = (endTime / totalTime) * chartScaledWidth;
  const actualBarWidth = scaledEndPixel - scaledStartPixel;

  return (
    <g>
      <rect
        x={x + scaledStartPixel}
        y={y}
        width={actualBarWidth}
        height={height}
        fill={fill}
      />
    </g>
  );
};

export default GanttChart;
