# OS Scheduling Simulator - Complete Project Documentation

## 📚 Project Overview

This is an **interactive web-based Operating System CPU Scheduling Simulator** built with React and Vite. It helps students and developers understand how different CPU scheduling algorithms work by providing real-time visualization through Gantt charts and detailed performance metrics.

## 🎯 Key Features

### 1. **Multiple Scheduling Algorithms**
- **FCFS (First Come First Served)**: Simple non-preemptive scheduling
- **SJF (Shortest Job First)**: Prioritizes processes with shortest burst time
- **Round Robin**: Time-sliced scheduling with configurable time quantum
- **Priority Scheduling**: Processes scheduled based on priority levels

### 2. **Interactive Process Management**
- Add processes with custom parameters:
  - Process Name
  - Arrival Time (when process arrives in queue)
  - Burst Time (CPU time needed)
  - Priority Level (1-10, lower = higher priority)
- View list of all added processes
- Remove individual processes
- Clear all processes at once

### 3. **Automatic Algorithm Analysis**
- Automatically compares all 4 algorithms
- Selects the **best algorithm** based on:
  - Average Waiting Time
  - Average Turnaround Time
  - Process characteristics
- Provides intelligent recommendations

### 4. **Visual Gantt Chart**
- Beautiful color-coded Gantt chart visualization
- Shows execution timeline for each process
- Interactive tooltips with detailed information
- Process legend with color coding

### 5. **Detailed Performance Metrics**
- Average Waiting Time
- Average Turnaround Time
- Total Execution Time (Makespan)
- Individual process statistics:
  - Start time
  - End time
  - Duration
  - Waiting time
  - Turnaround time

## 🚀 How to Use

### Installation & Setup

1. **Navigate to project directory:**
   ```bash
   cd d:\Scheduling
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - Local: `http://localhost:5173/`

### Step-by-Step Usage

#### Step 1: Add Processes
1. Fill in the process form on the left panel:
   - **Process Name**: Give it an identifier (e.g., P1, P2)
   - **Arrival Time**: When does the process arrive? (e.g., 0, 1, 2)
   - **Burst Time**: How long does it need to run? (e.g., 8, 4, 2)
   - **Priority**: Importance level 1-10 (1 = highest priority)

2. Click **"Add Process"** button
3. Repeat for multiple processes

#### Step 2: Run Scheduling Analysis
1. Once you have 1+ processes, click **"Analyze & Run Scheduling"** button
2. The system will:
   - Calculate all 4 algorithms
   - Compare performance metrics
   - Select the best algorithm
   - Display Gantt chart

#### Step 3: View Results
- **Gantt Chart**: Visual timeline of process execution
- **Algorithm Comparison**: Table showing metrics for all algorithms
- **Recommendations**: AI insights about why this algorithm was chosen
- **Metrics Details**: Detailed statistics in metric cards

#### Step 4: Try Different Algorithms
- Click "View Chart" button for any algorithm to see its Gantt chart
- Compare execution patterns between algorithms
- Observe differences in waiting and turnaround times

#### Step 5: Add More Processes
- Continue adding more processes
- The scheduler **automatically re-analyzes** with the new data
- See how algorithm selection changes with different process sets

## 🔍 Understanding the Algorithms

### FCFS - First Come First Served
```
Process P1 arrives → P2 arrives → P3 arrives
        ↓              ↓              ↓
     [P1 runs]    [P2 runs]    [P3 runs]

Characteristics:
✓ Simple and fair
✓ Non-preemptive
✗ Long waiting times possible
✗ Not optimal for variable burst times
```

**Best for:** Processes with similar burst times, simple FIFO requirement

### SJF - Shortest Job First
```
Processes ordered by burst time: P2(4) → P3(2) → P1(8)
                                   ↓       ↓       ↓
                            [P2 runs] [P3] [P1]

Characteristics:
✓ Minimizes average waiting time
✓ Optimal for preemptive scheduling
✗ May cause starvation of long processes
✗ Burst time must be known in advance
```

**Best for:** Known burst times, minimizing waiting time

### Round Robin (Time Quantum = 4)
```
Time slots of 4 units: [P1:4] [P2:4] [P3:2] [P1:4] [P2:4] ...
Each process gets equal CPU time

Characteristics:
✓ Fair scheduling
✓ Prevents starvation
✓ Good for interactive systems
✗ More context switches
✗ Higher overhead
```

**Best for:** Interactive systems, preventing starvation, fairness

### Priority Scheduling
```
Priority 1 (highest): P2 → P1 → P3 (lower priority)
                       ↓       ↓       ↓
                   [P2 runs] [P1] [P3]

Characteristics:
✓ Supports critical processes
✓ Flexible priority levels
✗ Low priority processes may starve
✗ Requires priority information
```

**Best for:** Real-time systems, critical processes, mixed workloads

## 📊 Performance Metrics Explained

### Waiting Time
- **Definition**: Time process waits in ready queue before execution
- **Formula**: Start Time - Arrival Time
- **Lower is better**: Minimizes idle waiting

### Turnaround Time
- **Definition**: Total time from arrival to completion
- **Formula**: Completion Time - Arrival Time
- **Lower is better**: Faster overall execution

### Makespan (Total Execution Time)
- **Definition**: Time when last process completes
- **Formula**: Maximum of all completion times
- **Shows**: Overall system workload duration

## 💡 Example Scenarios

### Scenario 1: Similar Burst Times
**Processes:**
- P1: Arrival=0, Burst=5, Priority=1
- P2: Arrival=1, Burst=6, Priority=1
- P3: Arrival=2, Burst=5, Priority=1

**Expected:** FCFS performs well ≈ 5.33 avg waiting

### Scenario 2: Varied Burst Times
**Processes:**
- P1: Arrival=0, Burst=20, Priority=1
- P2: Arrival=1, Burst=3, Priority=1
- P3: Arrival=2, Burst=1, Priority=1

**Expected:** SJF performs well ≈ 4.67 avg waiting

### Scenario 3: Priority-Based
**Processes:**
- P1: Arrival=0, Burst=10, Priority=3 (low)
- P2: Arrival=1, Burst=5, Priority=1 (high)
- P3: Arrival=2, Burst=3, Priority=2 (medium)

**Expected:** Priority Scheduling better ≈ 5 avg waiting

### Scenario 4: Fair Scheduling
**Processes:**
- P1: Arrival=0, Burst=15, Priority=1
- P2: Arrival=0, Burst=15, Priority=1
- P3: Arrival=0, Burst=15, Priority=1

**Expected:** RR prevents any starvation ≈ equal access

## 📁 Project Structure

```
Scheduling/
├── src/
│   ├── components/
│   │   ├── ProcessForm.jsx         # Add process form
│   │   ├── GanttChart.jsx          # Chart visualization
│   │   └── AnalysisResults.jsx     # Results & comparison
│   ├── algorithms/
│   │   └── schedulingAlgorithms.js # Core algorithms
│   ├── styles/
│   │   ├── ProcessForm.css
│   │   ├── GanttChart.css
│   │   └── AnalysisResults.css
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App styling
│   ├── index.css                   # Global styles
│   ├── main.jsx                    # Entry point
│   └── assets/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🛠️ Technology Stack

- **React 19.2**: Component-based UI framework
- **Vite 7.2**: Fast build tool and dev server
- **Recharts 2.x**: Professional chart visualization library
- **CSS3**: Modern styling with gradients and animations
- **JavaScript ES6+**: Modern JavaScript features

## 🎓 Learning Outcomes

After using this simulator, you'll understand:

1. ✅ How CPU scheduling algorithms work
2. ✅ Trade-offs between different scheduling strategies
3. ✅ Performance metrics (waiting time, turnaround time)
4. ✅ Process states and transitions
5. ✅ Real-world scheduling challenges
6. ✅ When to use which algorithm
7. ✅ Impact of priority and burst time on scheduling

## 🚀 Advanced Features

### Algorithm Selection Logic
The system uses a scoring algorithm:
```
Score = Average Waiting Time + Average Turnaround Time
Best Algorithm = Algorithm with LOWEST score
```

### Smart Recommendations
- Detects if processes have priorities
- Checks burst time variance
- Provides contextual suggestions
- Explains why algorithm was chosen

### Real-Time Updates
- Add processes dynamically
- Scheduler re-analyzes automatically
- Switch between algorithms instantly
- No page refresh needed

## 📝 Tips for Best Learning Experience

1. **Start Simple**: Add 3-4 processes with clear patterns
2. **Observe Metrics**: Focus on average waiting time differences
3. **Experiment**: Try extreme cases (very long/short bursts)
4. **Compare**: Switch between algorithms to see patterns
5. **Document**: Take notes on which algorithm works best when
6. **Challenge Yourself**: Predict which algorithm will be best before analyzing

## 🐛 Troubleshooting

**Issue**: Port 5173 already in use
```bash
# Find process using port
netstat -ano | findstr :5173

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

**Issue**: Recharts not loading
```bash
npm install recharts --save
npm run dev
```

**Issue**: Styling looks broken
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check if CSS files are in `src/styles/` folder

## 📚 Further Reading

- Operating System Concepts (Silberschatz, Galvin, Gagne)
- CPU Scheduling Algorithms: https://en.wikipedia.org/wiki/Scheduling_(computing)
- React Documentation: https://react.dev/
- Recharts Guide: https://recharts.org/

## 🎯 Project Enhancements (Future Ideas)

- [ ] Preemptive SJF with interrupts
- [ ] Aging algorithm for priority scheduling
- [ ] Context switching overhead calculation
- [ ] Export results as CSV/PDF
- [ ] Multiple queue scheduling
- [ ] I/O operations simulation
- [ ] Process state diagram
- [ ] Code animation/step-through mode

## 📞 Support & Questions

For issues or questions:
1. Check the troubleshooting section above
2. Review algorithm explanations
3. Experiment with the simulator
4. Consult OS textbooks
5. Check Recharts & React documentation

---

**Version**: 1.0  
**Last Updated**: January 2, 2026  
**For Educational Purposes**
