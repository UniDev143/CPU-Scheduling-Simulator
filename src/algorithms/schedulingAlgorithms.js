// FCFS - First Come First Served
export const FCFS = (processes) => {
  const sorted = [...processes].sort((a, b) => {
    if (a.arrival === b.arrival) return String(a.id).localeCompare(String(b.id));
    return a.arrival - b.arrival;
  });
  const timeline = [];
  let currentTime = 0;

  sorted.forEach((process) => {
    const startTime = Math.max(currentTime, process.arrival);
    const endTime = startTime + process.burst;
    timeline.push({
      id: process.id,
      name: process.name,
      start: startTime,
      end: endTime,
      duration: process.burst,
      algorithm: 'FCFS'
    });
    currentTime = endTime;
  });

  return calculateMetrics(timeline, processes);
};

// SJF - Shortest Job First (Preemptive)
export const SJF = (processes) => {
  const timeline = [];
  const remaining = processes.map(p => ({
    ...p,
    remainingTime: p.burst
  }));
  
  let currentTime = 0;
  const scheduled = new Set();

  while (scheduled.size < processes.length) {
    const available = remaining.filter(
      p => p.arrival <= currentTime && !scheduled.has(p.id)
    );

    if (available.length === 0) {
      const nextProcess = remaining.find(p => !scheduled.has(p.id));
      if (nextProcess) {
        currentTime = nextProcess.arrival;
      }
      continue;
    }

    const process = available.reduce((min, p) => {
      if (p.burst === min.burst) return String(p.id).localeCompare(String(min.id)) < 0 ? p : min;
      return p.burst < min.burst ? p : min;
    });

    const startTime = currentTime;
    const endTime = startTime + process.burst;
    
    timeline.push({
      id: process.id,
      name: process.name,
      start: startTime,
      end: endTime,
      duration: process.burst,
      algorithm: 'SJF'
    });

    scheduled.add(process.id);
    currentTime = endTime;
  }

  return calculateMetrics(timeline, processes);
};

// Round Robin
export const RoundRobin = (processes, timeQuantum = 4) => {
  // Sort processes by arrival time, then by ID for consistent ordering
  const sortedProcesses = [...processes].sort((a, b) => {
    if (a.arrival === b.arrival) return String(a.id).localeCompare(String(b.id));
    return a.arrival - b.arrival;
  }).map(p => ({
    ...p,
    remainingTime: p.burst
  }));

  const timeline = [];
  const readyQueue = [];
  let currentTime = 0;
  let processIndex = 0;

  // Add first process(es) that arrive at time 0 or earliest
  while (processIndex < sortedProcesses.length && sortedProcesses[processIndex].arrival <= currentTime) {
    readyQueue.push(sortedProcesses[processIndex]);
    processIndex++;
  }

  while (readyQueue.length > 0 || processIndex < sortedProcesses.length) {
    // If no process in ready queue, jump to next arrival time
    if (readyQueue.length === 0 && processIndex < sortedProcesses.length) {
      currentTime = Math.max(currentTime, sortedProcesses[processIndex].arrival);
      while (processIndex < sortedProcesses.length && sortedProcesses[processIndex].arrival <= currentTime) {
        readyQueue.push(sortedProcesses[processIndex]);
        processIndex++;
      }
    }

    if (readyQueue.length === 0) break;

    const process = readyQueue.shift();
    const executeTime = Math.min(timeQuantum, process.remainingTime);
    const startTime = currentTime;
    const endTime = startTime + executeTime;

    timeline.push({
      id: process.id,
      name: process.name,
      start: startTime,
      end: endTime,
      duration: executeTime,
      algorithm: 'RR'
    });

    process.remainingTime -= executeTime;
    currentTime = endTime;

    // Add newly arrived processes to ready queue
    while (processIndex < sortedProcesses.length && sortedProcesses[processIndex].arrival <= currentTime) {
      readyQueue.push(sortedProcesses[processIndex]);
      processIndex++;
    }

    // If process not finished, add back to queue
    if (process.remainingTime > 0) {
      readyQueue.push(process);
    }
  }

  return calculateMetrics(timeline, processes);
};

// Priority Based Scheduling
export const PriorityScheduling = (processes) => {
  const sorted = [...processes].sort((a, b) => {
    if (a.priority === b.priority) {
      if (a.arrival === b.arrival) return String(a.id).localeCompare(String(b.id));
      return a.arrival - b.arrival;
    }
    return a.priority - b.priority;
  });

  const timeline = [];
  let currentTime = 0;

  sorted.forEach((process) => {
    const startTime = Math.max(currentTime, process.arrival);
    const endTime = startTime + process.burst;
    
    timeline.push({
      id: process.id,
      name: process.name,
      start: startTime,
      end: endTime,
      duration: process.burst,
      priority: process.priority,
      algorithm: 'Priority'
    });
    
    currentTime = endTime;
  });

  return calculateMetrics(timeline, processes);
};

// Calculate scheduling metrics
const calculateMetrics = (timeline, processes) => {
  // Calculate waiting time per process (completion time - arrival time - burst time)
  const processMetrics = {};
  
  processes.forEach(process => {
    const completionTime = Math.max(...timeline.filter(t => t.id === process.id).map(t => t.end));
    const waitingTime = completionTime - process.arrival - process.burst;
    processMetrics[process.id] = { waitingTime, completionTime };
  });

  const metrics = timeline.map(task => ({
    ...task,
    waitingTime: processMetrics[task.id].waitingTime
  }));

  const totalWaitingTime = Object.values(processMetrics).reduce((sum, m) => sum + m.waitingTime, 0);

  return {
    timeline: metrics,
    avgWaitingTime: (totalWaitingTime / processes.length).toFixed(2),
    totalTime: Math.max(...metrics.map(t => t.end)),
    processCount: processes.length
  };
};

// Analyze and suggest best algorithm
export const analyzeAndSelectAlgorithm = (processes) => {
  const results = {
    FCFS: FCFS(processes),
    SJF: SJF(processes),
    RoundRobin: RoundRobin(processes, 4),
    Priority: PriorityScheduling(processes)
  };

  let bestAlgorithm = 'FCFS';
  let bestScore = Infinity;

  Object.entries(results).forEach(([algo, result]) => {
    const score = parseFloat(result.avgWaitingTime);
    
    if (score < bestScore) {
      bestScore = score;
      bestAlgorithm = algo;
    }
  });

  const recommendations = generateRecommendations(results, bestAlgorithm, processes);

  return {
    results,
    selectedAlgorithm: bestAlgorithm,
    selectedResult: results[bestAlgorithm],
    recommendations
  };
};

// Generate recommendations based on process characteristics
const generateRecommendations = (results, bestAlgorithm, processes) => {
  const recommendations = [];
  
  const hasHighPriority = processes.some(p => p.priority && p.priority > 1);
  if (hasHighPriority) {
    recommendations.push('Priority scheduling is useful because processes have different priorities');
  }

  const hasHighVariance = checkBurstTimeVariance(processes);
  if (hasHighVariance) {
    recommendations.push('SJF performs well with varied burst times in your process set');
  }

  const bestResult = results[bestAlgorithm];
  recommendations.push(`Selected algorithm provides ${bestResult.avgWaitingTime} units average waiting time`);

  return recommendations;
};

// Check if burst times have high variance
const checkBurstTimeVariance = (processes) => {
  if (processes.length < 2) return false;
  const avg = processes.reduce((sum, p) => sum + p.burst, 0) / processes.length;
  const variance = processes.reduce((sum, p) => sum + Math.pow(p.burst - avg, 2), 0) / processes.length;
  return variance > avg * 0.5;
};
