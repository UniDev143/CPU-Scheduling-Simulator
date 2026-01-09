# Quick Start Guide - OS Scheduling Simulator

## 🎯 Get Started in 5 Minutes

### Step 1: Run the Application
```bash
cd d:\Scheduling
npm install          # if not already done
npm run dev
```

Open browser: `http://localhost:5173/`

### Step 2: Add Your First Process

1. In the **"Add New Process"** form (left panel), fill:
   - Process Name: `P1`
   - Arrival Time: `0`
   - Burst Time: `8`
   - Priority: `1`

2. Click **"Add Process"** button

### Step 3: Add More Processes

Add these processes:
- P2: Arrival=1, Burst=4, Priority=1
- P3: Arrival=2, Burst=2, Priority=1
- P4: Arrival=3, Burst=3, Priority=1

You should see them in the "Added Processes" table.

### Step 4: Analyze

Click **"📊 Analyze & Run Scheduling"** button

The app will:
✅ Test all 4 algorithms
✅ Show Gantt chart
✅ Compare metrics
✅ Recommend best algorithm

### Step 5: Explore Results

- **View the Gantt Chart**: See process execution timeline
- **Compare Metrics**: Check waiting times for each algorithm
- **Try Other Algorithms**: Click "View Chart" to see other algorithms' results

### Step 6: Add More Processes

Keep adding processes - the scheduler will re-analyze automatically!

## 📊 Example: Understanding Results

### Your Gantt Chart Shows:
```
Timeline →
P1: [====8 units====]
P2:                 [==4==]
P3:                      [2]
P4:                        [3]
```

### Metrics Table Shows:
| Algorithm | Avg Waiting | Avg Turnaround |
|-----------|------------|----------------|
| FCFS      | 5.75 ms    | 10 ms          |
| SJF       | 3.75 ms    | 8 ms           |
| RR        | 6.25 ms    | 11 ms          |
| Priority  | 5.75 ms    | 10 ms          |

**Best**: SJF (lowest scores) ✅

## 💡 Try These Scenarios

### Scenario 1: Test FCFS
Add processes with **same arrival time**:
- P1: Arr=0, Burst=10
- P2: Arr=0, Burst=5
- P3: Arr=0, Burst=3

**Result**: FCFS will be good!

### Scenario 2: Test SJF
Add processes with **very different burst times**:
- P1: Arr=0, Burst=30
- P2: Arr=1, Burst=2
- P3: Arr=2, Burst=1

**Result**: SJF will shine!

### Scenario 3: Test Priority
Add processes with **different priorities**:
- P1: Arr=0, Burst=10, Pri=3 (low)
- P2: Arr=1, Burst=5, Pri=1 (high)
- P3: Arr=2, Burst=3, Pri=2 (medium)

**Result**: Priority scheduling needed!

## 🎓 What to Learn

After each test, ask yourself:

1. **Why did this algorithm win?**
   - Read the explanation in "Why [Algorithm]?" section

2. **What's the waiting time?**
   - How long does each process wait in queue?

3. **What's the turnaround time?**
   - Total time from arrival to completion?

4. **Could I predict this?**
   - Try to guess before clicking analyze!

## 🔧 Common Tasks

### Remove a Process
Click the **✕** button next to process name in the "Manage Processes" section

### Remove All Processes
Click **"🗑️ Clear All"** button

### Try Another Algorithm
In the results table, click **"View Chart"** for any algorithm

### Reset Everything
1. Clear all processes
2. Add new ones
3. Analyze again

## 📱 Tips

✅ **Do**: Start with 3-4 processes for clarity
✅ **Do**: Mix different burst times and priorities
✅ **Do**: Compare algorithms side-by-side
✅ **Do**: Take notes on patterns

❌ **Don't**: Add too many processes at once
❌ **Don't**: Use same burst time for all processes
❌ **Don't**: Forget to click "Analyze" after adding

## 🎯 Learning Milestones

1. ✅ Add and remove processes
2. ✅ Run scheduling analysis
3. ✅ Understand Gantt chart
4. ✅ Read performance metrics
5. ✅ Identify best algorithm
6. ✅ Explain why each algorithm performs differently
7. ✅ Predict algorithm outcome before analyzing

## 🆘 Need Help?

**Port Error?**
```bash
npm run dev -- --port 3000
```

**Missing library?**
```bash
npm install recharts
```

**Styles broken?**
- Hard refresh: Ctrl+Shift+R
- Clear cache: Ctrl+Shift+Delete

**Want detailed guide?**
→ See [PROJECT_GUIDE.md](PROJECT_GUIDE.md)

## 🚀 You're Ready!

Now you understand:
- How scheduling algorithms work
- How to measure performance
- Which algorithm works when
- Real OS concepts in action

**Happy learning!** 🎓
