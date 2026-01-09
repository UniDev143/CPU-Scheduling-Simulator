# 🖥️ OS Scheduling Simulator

An interactive web-based CPU scheduling algorithm visualizer built with React and Vite. Perfect for learning operating system concepts and understanding how different scheduling algorithms work.

## ✨ Features

- 🎯 **4 Scheduling Algorithms**: FCFS, SJF, Round Robin, Priority Scheduling
- 📊 **Gantt Chart Visualization**: Beautiful color-coded process timelines
- 📈 **Performance Metrics**: Waiting time, turnaround time, makespan
- 🤖 **Algorithm Analysis**: Automatically selects the best algorithm for your workload
- ⚡ **Real-time Updates**: Add processes and see results instantly
- 💡 **Learning Insights**: AI-powered recommendations and explanations
- 📱 **Responsive Design**: Works on desktop and tablet devices

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager

### Installation

1. **Navigate to project**:
```bash
cd d:\Scheduling
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open in browser**:
```
http://localhost:5173/
```

## 📖 How to Use

### 1️⃣ Add Processes
Fill in the process details:
- **Process Name**: Identifier (P1, P2, etc.)
- **Arrival Time**: When the process arrives (0, 1, 2, etc.)
- **Burst Time**: CPU time needed (4, 8, 12, etc.)
- **Priority**: Importance level (1-10, lower = higher)

### 2️⃣ Analyze Scheduling
Click **"Analyze & Run Scheduling"** to:
- Test all 4 algorithms
- Compare performance metrics
- Get algorithm recommendations
- View Gantt chart

### 3️⃣ Explore Results
- See visual Gantt chart
- Review performance comparison
- Understand why algorithm was selected
- Try other algorithms with "View Chart"

### 4️⃣ Dynamic Updates
- Keep adding more processes
- Scheduler automatically re-analyzes
- Observe how results change

## 📚 Scheduling Algorithms

### FCFS (First Come First Served)
Processes execute in arrival order. Simple but not always optimal.

### SJF (Shortest Job First)
Prioritizes processes with shortest burst time. Minimizes waiting time.

### Round Robin (Time Quantum = 4)
Each process gets equal time slices. Prevents starvation.

### Priority Scheduling
Processes execute based on priority levels. Supports critical tasks.

## 📊 Project Structure

```
src/
├── components/
│   ├── ProcessForm.jsx      # Process input form
│   ├── GanttChart.jsx       # Chart visualization
│   └── AnalysisResults.jsx  # Results comparison
├── algorithms/
│   └── schedulingAlgorithms.js  # Core scheduling logic
├── styles/
│   ├── ProcessForm.css
│   ├── GanttChart.css
│   └── AnalysisResults.css
├── App.jsx                  # Main component
├── App.css                  # App styling
└── main.jsx                # Entry point
```

## 🛠️ Technology Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Recharts 2** - Chart visualization
- **CSS3** - Modern styling

## 📖 Full Documentation

For comprehensive guide including:
- Detailed algorithm explanations
- Example scenarios
- Learning outcomes
- Advanced features
- Troubleshooting

👉 **See [PROJECT_GUIDE.md](PROJECT_GUIDE.md)**

## 🎓 Learning Outcomes

Understand:
- How CPU scheduling algorithms work
- Trade-offs between different strategies
- Performance metrics and optimization
- Process states and transitions
- Real-world scheduling challenges

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🐛 Troubleshooting

**Port already in use?**
```bash
npm run dev -- --port 3000
```

**Missing recharts?**
```bash
npm install recharts
```

**Styling issues?**
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache
- Check if CSS files exist in `src/styles/`

## 💡 Tips for Learning

1. Start with 3-4 processes
2. Observe metric differences
3. Try extreme cases (very long/short bursts)
4. Switch between algorithms
5. Predict results before analyzing
6. Document your findings

## 🚀 Future Enhancements

- [ ] Preemptive SJF implementation
- [ ] Context switching overhead
- [ ] Process state diagram
- [ ] Step-by-step animation
- [ ] Export results as CSV/PDF
- [ ] Multiple queue scheduling

## 📄 License

Educational project for learning purposes.

## 🎯 Educational Purpose

This project is designed for:
- Operating System course projects
- Learning CPU scheduling concepts
- Understanding algorithm performance
- Interactive algorithm visualization
- Computer Science education

---

**Created**: January 2026  
**For**: OS Scheduling Project  
**Tech**: React + Vite + Recharts
