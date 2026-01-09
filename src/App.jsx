import React, { useState, useEffect } from 'react';
import ProcessForm from './components/ProcessForm';
import GanttChart from './components/GanttChart';
import AnalysisResults from './components/AnalysisResults';
import { analyzeAndSelectAlgorithm, FCFS, SJF, RoundRobin, PriorityScheduling } from './algorithms/schedulingAlgorithms';
import './App.css';

// Helper function to generate random value between min and max
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate default processes with random values
const generateDefaultProcesses = () => {
  const processes = [];
  for (let i = 1; i <= 4; i++) {
    processes.push({
      id: `process-${Date.now()}-${i}`,
      name: `P${i}`,
      arrival: getRandomInt(0, 3),
      burst: getRandomInt(3, 7),
      priority: getRandomInt(1, 4)
    });
  }
  return processes;
};

function App() {
  const [processes, setProcesses] = useState(generateDefaultProcesses());
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('FCFS');
  const [currentTimeline, setCurrentTimeline] = useState([]);
  const [hasRun, setHasRun] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Add a new process
  const handleAddProcess = (newProcess) => {
    setProcesses([...processes, newProcess]);
    // Reset analysis when new process is added
    if (hasRun) {
      handleAnalyzeAndSchedule([...processes, newProcess]);
    }
  };

  // Run the scheduling analysis
  const handleAnalyzeAndSchedule = (processList = processes) => {
    if (processList.length === 0) {
      alert('Please add at least one process');
      return;
    }

    setIsLoading(true);
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      try {
        const analysis = analyzeAndSelectAlgorithm(processList);
        setAnalysisData(analysis);
        setSelectedAlgorithm(analysis.selectedAlgorithm);
        setCurrentTimeline(analysis.selectedResult.timeline);
        setHasRun(true);
      } catch (error) {
        console.error('Analysis error:', error);
        alert('Error during analysis: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    }, 0);
  };

  // Handle algorithm selection from results
  const handleSelectAlgorithm = (algo) => {
    setSelectedAlgorithm(algo);
    setCurrentTimeline(analysisData.results[algo].timeline);
  };

  // Remove a process
  const handleRemoveProcess = (processId) => {
    const updatedProcesses = processes.filter(p => p.id !== processId);
    setProcesses(updatedProcesses);
    
    if (updatedProcesses.length === 0) {
      setAnalysisData(null);
      setCurrentTimeline([]);
      setHasRun(false);
    } else if (hasRun) {
      handleAnalyzeAndSchedule(updatedProcesses);
    }
  };

  // Clear all processes
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all processes?')) {
      setProcesses([]);
      setAnalysisData(null);
      setCurrentTimeline([]);
      setHasRun(false);
    }
  };

  // Regenerate default processes with new random values
  const handleRegenerateProcesses = () => {
    const newProcesses = generateDefaultProcesses();
    setProcesses(newProcesses);
    setAnalysisData(null);
    setCurrentTimeline([]);
    setHasRun(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🖥️ CPU Scheduling Simulator</h1>
          <p className="subtitle">Learn CPU Scheduling Algorithms with Interactive Visualization</p>
        </div>
      </header>

      <main className="app-main">
        <div className="main-content">
          <div className="left-panel">
            <ProcessForm onAddProcess={handleAddProcess} processes={processes} />
            
            {processes.length > 0 && (
              <div className="process-actions">
                <button 
                  className="run-btn"
                  onClick={() => handleAnalyzeAndSchedule()}
                  disabled={isLoading}
                >
                  {isLoading ? '⏳ Analyzing...' : '📊 Analyze & Run Scheduling'}
                </button>
                <button 
                  className="clear-btn"
                  onClick={handleClearAll}
                  disabled={isLoading}
                >
                  🗑️ Clear All
                </button>
                <button 
                  className="regenerate-btn"
                  onClick={handleRegenerateProcesses}
                  disabled={isLoading}
                >
                  🔄 Regenerate
                </button>
              </div>
            )}

            {processes.length > 0 && (
              <div className="process-manager">
                <h3>Manage Processes</h3>
                <div className="processes-mini-list">
                  {processes.map((process, index) => (
                    <div key={process.id} className="process-item">
                      <span className="process-info">
                        <strong>{process.name}</strong> - Arr: {process.arrival}, Burst: {process.burst}, Pri: {process.priority}
                      </span>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveProcess(process.id)}
                        title="Remove process"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="right-panel">
            {hasRun ? (
              <>
                <GanttChart timeline={currentTimeline} algorithm={selectedAlgorithm} />
                <AnalysisResults 
                  analysisData={analysisData}
                  onSelectAlgorithm={handleSelectAlgorithm}
                />
              </>
            ) : (
              <div className="welcome-section">
                <div className="welcome-content">
                  <h2>Welcome to OS Scheduler Simulator</h2>
                  <p>This tool helps you understand CPU scheduling algorithms used in operating systems.</p>
                  
                  <div className="instructions">
                    <h3>How to Use:</h3>
                    <ol>
                      <li><strong>Add Processes:</strong> Fill in the process details (name, arrival time, burst time, priority)</li>
                      <li><strong>Analyze:</strong> Click "Analyze & Run Scheduling" to compare all algorithms</li>
                      <li><strong>View Results:</strong> See the Gantt chart and detailed metrics</li>
                      <li><strong>Add More:</strong> Continue adding processes - the scheduler will re-analyze automatically</li>
                    </ol>
                  </div>

                  <div className="algorithms-info">
                    <h3>Algorithms Available:</h3>
                    <div className="algo-list">
                      <div className="algo-item">
                        <h4>FCFS</h4>
                        <p>First Come First Served</p>
                      </div>
                      <div className="algo-item">
                        <h4>SJF</h4>
                        <p>Shortest Job First</p>
                      </div>
                      <div className="algo-item">
                        <h4>Round Robin</h4>
                        <p>Time Quantum: 4 units</p>
                      </div>
                      <div className="algo-item">
                        <h4>Priority</h4>
                        <p>Priority Based Scheduling</p>
                      </div>
                    </div>
                  </div>

                  <div className="learning-tips">
                    <h3>💡 Learning Tips:</h3>
                    <ul>
                      <li>Try processes with similar arrival times to see FCFS behavior</li>
                      <li>Use varied burst times to observe SJF effectiveness</li>
                      <li>Set different priorities to understand priority scheduling</li>
                      <li>Observe average waiting time and turnaround time metrics</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Operating System Scheduling Project | For Educational Purposes</p>
      </footer>
    </div>
  );
}

export default App;
