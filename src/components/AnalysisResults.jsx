import React from 'react';
import '../styles/AnalysisResults.css';

export const AnalysisResults = ({ analysisData, onSelectAlgorithm }) => {
  if (!analysisData) {
    return (
      <div className="analysis-container">
        <p className="empty-message">Run scheduling analysis with at least one process</p>
      </div>
    );
  }

  const { results, selectedAlgorithm, recommendations } = analysisData;
  
  // Debug log to verify all algorithms are present
  console.log('AnalysisResults - analysisData:', analysisData);
  console.log('AnalysisResults - results:', results);
  console.log('AnalysisResults - results keys:', Object.keys(results));
  console.log('AnalysisResults - selectedAlgorithm:', selectedAlgorithm);

  const getAlgorithmDescription = (algo) => {
    const descriptions = {
      FCFS: 'First Come First Served - Processes are executed in arrival order',
      SJF: 'Shortest Job First - Process with shortest burst time executes first',
      RoundRobin: 'Round Robin - Each process gets equal time (4 units quantum)',
      Priority: 'Priority Scheduling - Processes with lower priority number execute first'
    };
    return descriptions[algo] || '';
  };

  return (
    <div className="analysis-container">
      <div className="analysis-header">
        <h2>Scheduling Analysis Results</h2>
        <div className="recommended-algo">
          <h3>🏆 Recommended Algorithm: <span className="algo-name">{selectedAlgorithm}</span></h3>
          <p className="algo-description">{getAlgorithmDescription(selectedAlgorithm)}</p>
        </div>
      </div>

      <div className="recommendations">
        <h3>📊 Analysis Insights</h3>
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      <div className="comparison-table">
        <h3>Algorithm Performance Comparison</h3>
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Avg Waiting Time</th>
              <th>Total Execution Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(results).map(([algo, result]) => (
              <tr key={algo} className={algo === selectedAlgorithm ? 'selected-algo' : ''}>
                <td className="algo-col">
                  <strong>{algo}</strong>
                </td>
                <td>{result.avgWaitingTime} units</td>
                <td>{result.totalTime} units</td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => onSelectAlgorithm(algo)}
                  >
                    View Chart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="algorithm-details">
        <h3>Detailed Metrics for {selectedAlgorithm}</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">Average Waiting Time</div>
            <div className="metric-value">{results[selectedAlgorithm].avgWaitingTime} units</div>
            <div className="metric-desc">Lower is better</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Total Execution Time</div>
            <div className="metric-value">{results[selectedAlgorithm].totalTime} units</div>
            <div className="metric-desc">Makespan</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Process Count</div>
            <div className="metric-value">{results[selectedAlgorithm].processCount}</div>
            <div className="metric-desc">Scheduled processes</div>
          </div>
        </div>
      </div>

      <div className="algo-explanation">
        <h3>Why {selectedAlgorithm}?</h3>
        <div className="explanation-text">
          {selectedAlgorithm === 'FCFS' && (
            <p>Simple and fair approach. Works well when process burst times are similar. Easy to understand and implement.</p>
          )}
          {selectedAlgorithm === 'SJF' && (
            <p>Minimizes average waiting time. Best for processes with varying burst times. However, it might cause starvation of longer processes if shorter ones keep arriving.</p>
          )}
          {selectedAlgorithm === 'RoundRobin' && (
            <p>Fair scheduling with time quantum. Prevents process starvation and provides responsive system. Good for interactive systems and real-time environments.</p>
          )}
          {selectedAlgorithm === 'Priority' && (
            <p>Useful when processes have different importance levels. Ensures critical processes are executed first. Used in many real-world operating systems.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
