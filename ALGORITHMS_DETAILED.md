# CPU Scheduling Algorithms - Detailed Comparison

## 📊 Algorithm Overview Table

| Aspect | FCFS | SJF | Round Robin | Priority |
|--------|------|-----|------------|----------|
| **Complexity** | Simple | Complex | Medium | Medium |
| **Preemption** | No | No | Yes | No |
| **Avg Waiting** | High | Very Low | Medium | Variable |
| **Avg Turnaround** | High | Low | Medium | Variable |
| **Starvation Risk** | No | Yes | No | Yes |
| **Context Switches** | Low | Low | High | Low |
| **Best For** | Simple FIFO | Batch jobs | Interactive | Real-time |
| **Real World Use** | Rare | Batch systems | Timesharing | Mixed |

---

## 🔍 Detailed Algorithm Analysis

### 1. FCFS (First Come First Served)

#### How It Works
```
Queue: P1(8) → P2(4) → P3(2) → P4(3)
       ↓
Timeline: [P1:8] [P2:4] [P3:2] [P4:3]
         0       8      12     14
```

#### Key Characteristics
- ✅ **Non-preemptive**: Process runs to completion
- ✅ **Fair**: Processes get equal chance
- ✅ **Simple**: Easy to understand and implement
- ❌ **Convoy Effect**: Long process delays short ones
- ❌ **High Waiting Time**: Especially with varied burst times

#### Waiting Time Calculation
```
P1: Wait = 0 - 0 = 0
P2: Wait = 8 - 1 = 7
P3: Wait = 12 - 2 = 10
P4: Wait = 14 - 3 = 11
Average = (0 + 7 + 10 + 11) / 4 = 7 units
```

#### When to Use
- Processes have similar burst times
- FIFO is requirement
- Simple scheduling needed
- Batch processing

#### Real World Example
```
Bank Teller Queue:
Customer 1 takes 5 min
Customer 2 takes 2 min
Customer 3 takes 3 min

Each waits for previous to finish
FCFS = fairest approach
```

---

### 2. SJF (Shortest Job First)

#### How It Works
```
Processes by burst: P3(2) → P4(3) → P2(4) → P1(8)
                    ↓       ↓       ↓       ↓
Timeline:         [P3:2] [P4:3] [P2:4] [P1:8]
                 0       2       5       9
```

#### Key Characteristics
- ✅ **Optimal**: Minimizes average waiting time
- ✅ **Efficient**: Shorter jobs don't wait long
- ❌ **Starvation**: Long jobs may wait indefinitely
- ❌ **Requires Knowledge**: Must know burst time in advance
- ❌ **Unfair**: Favors short jobs

#### Waiting Time Calculation
```
P3: Wait = 0 - 2 = -2 (arrives after, adjusted)
P4: Wait = 2 - 3 = -1 (arrives after, adjusted)
P2: Wait = 5 - 1 = 4
P1: Wait = 9 - 0 = 9
Average = (0 + 4 + 1 + 5) / 4 = 2.5 units
```

#### Starvation Problem
```
Long job P1 (burst=100) arrives
Short jobs keep arriving:
P2(1), P3(1), P4(1), P5(1)...

P1 keeps waiting! This is STARVATION.
```

**Solution**: Aging - increase priority if waited long enough

#### When to Use
- Burst times known/predictable
- Batch processing systems
- Background job scheduling
- Testing/batch jobs

#### Real World Example
```
CPU Scheduling in Batch Systems:
Long compilation (20 min) vs
Short calculations (1 min each)

SJF: All short jobs finish,
     then long compilation
```

---

### 3. Round Robin (RR)

#### How It Works (Time Quantum = 4)
```
Ready Queue: P1(8) → P2(4) → P3(2) → P4(3)

Time 0-4:  [P1] (4) → re-queue (4 remaining)
Time 4-8:  [P2] (4) → done
Time 8-12: [P3] (2) → done, [P4] (3) runs rest
Time 12-15:[P4] (3) → done, [P1] (4) runs rest
Time 15-19:[P1] (4) → done
```

#### Key Characteristics
- ✅ **Fair**: Each process gets equal time
- ✅ **No Starvation**: Everyone eventually executes
- ✅ **Interactive**: Good for timesharing
- ❌ **High Overhead**: Many context switches
- ❌ **Time Quantum Critical**: Too high = FCFS, too low = thrashing

#### Context Switch Impact
```
With Time Quantum = 4:
P1(8) needs 2 switches
P2(4) needs 1 switch
Total = 7 context switches + overhead

Context switch time = 0.5ms each = 3.5ms total
This reduces effective throughput!
```

#### Waiting Time Calculation
```
P1: Waits between quantum 0 and quantum 3
    Wait = (4 + 4 + 4) = 12 units
P2: Wait = (4 + 0) = 4 units
P3: Wait = (4 + 4) = 8 units
P4: Wait = (4 + 4 + 4) = 12 units
Average = (12 + 4 + 8 + 12) / 4 = 9 units
```

#### Time Quantum Selection
```
TQ = 1ms:   Too low - thrashing, high overhead
TQ = 5ms:   Good for interactive systems
TQ = 20ms:  Better for batch, less switching
TQ = ∞:     Same as FCFS

Rule of Thumb:
- 80% of jobs should finish within 1 quantum
- Typical range: 10-100ms
```

#### When to Use
- Interactive/timesharing systems
- Fair scheduling required
- Prevent starvation necessary
- General-purpose OS

#### Real World Example
```
Classroom PC Lab:
Each student's program gets 50ms
Time up? Next student's program runs
Fair for everyone!
```

---

### 4. Priority Scheduling

#### How It Works
```
Processes by Priority (1=highest):
P2(Pri=1) → P4(Pri=2) → P3(Pri=3) → P1(Pri=4)

                    ↓       ↓       ↓       ↓
Timeline:         [P2:4] [P4:3] [P3:2] [P1:8]
                 0       4       7       9
```

#### Key Characteristics
- ✅ **Flexible**: Handles different importance levels
- ✅ **Responsive**: Critical jobs run first
- ❌ **Starvation**: Low priority jobs may wait forever
- ❌ **Complex**: Must manage priorities
- ❌ **Unfair**: Biased toward important jobs

#### Priority Inversion Problem
```
High Priority (HP) task blocked by Low Priority (LP) task:

HP task: Needs resource held by LP
LP task: Not running (low priority)
Medium Priority: Running instead!

Result: HP waits for MP to finish, then LP!
```

**Solution**: Priority Inheritance - LP inherits HP's priority

#### Aging Mechanism
```
Process waiting too long → increase priority
Example:
P1: Initial Priority = 10
    After 2 sec wait: Priority = 9
    After 4 sec wait: Priority = 8
    ...becomes highest priority if waits long enough
```

#### Waiting Time Calculation
```
P2(1): Wait = 0 - 1 = -1 (arrives after, adjusted to 0)
P4(2): Wait = 4 - 3 = 1
P3(3): Wait = 7 - 2 = 5
P1(4): Wait = 9 - 0 = 9
Average = (0 + 1 + 5 + 9) / 4 = 3.75 units
```

#### When to Use
- Real-time systems
- Mixed workloads
- Critical applications
- System with important tasks

#### Real World Example
```
Operating System:
Priority 1: Interrupt handlers
Priority 2: System tasks
Priority 3: User applications
Priority 4: Background tasks

System stays responsive!
```

---

## 🎯 Algorithm Selection Decision Tree

```
START
  ↓
Is this a batch system?
  ├─ YES → Burst times known? 
  │         ├─ YES → Use SJF
  │         └─ NO  → Use FCFS
  │
  └─ NO (Interactive System)
      ↓
      Need different importance levels?
        ├─ YES → Use Priority Scheduling
        │        (with aging to prevent starvation)
        │
        └─ NO  → Use Round Robin
                 (fair, prevents starvation)
```

---

## 📈 Performance Comparison Example

### Scenario: Mixed Workload
```
P1: Arrival=0, Burst=20, Priority=3
P2: Arrival=1, Burst=5,  Priority=1
P3: Arrival=2, Burst=3,  Priority=2
P4: Arrival=3, Burst=2,  Priority=4
```

### Results Table
```
Algorithm    | Avg Wait | Avg TT | Makes | Context Switches
-------------|----------|--------|-------|------------------
FCFS         | 15.5     | 25.5   | 30    | 1
SJF          | 5.75     | 15.75  | 30    | 1
RR (TQ=4)    | 9.75     | 19.75  | 30    | 8
Priority     | 5.75     | 15.75  | 30    | 1
```

### Winner: SJF and Priority (tied)
- Both minimize waiting time
- Priority is better for real systems (handles importance)
- SJF would cause starvation if new jobs kept arriving

---

## 🚨 Common Issues & Solutions

### Issue 1: Starvation in SJF
```
Problem:
Long job P1 keeps waiting while short jobs arrive

Solution:
- Use Aging: Long wait → increase priority
- Limit queue size
- Hybrid approach: SJF + Priority
```

### Issue 2: Context Switch Overhead
```
Problem:
Too many context switches waste CPU time

Solution:
- Increase time quantum
- Reduce number of processes
- Use scheduling with less overhead (FCFS, SJF)
```

### Issue 3: Priority Inversion
```
Problem:
High priority blocked by low priority task

Solution:
- Priority inheritance
- Priority ceiling protocol
- Prevent priority inversions in design
```

---

## 🧮 Key Formulas

```
Waiting Time = Start Time - Arrival Time
Turnaround Time = Completion Time - Arrival Time
Response Time = First Run Time - Arrival Time
Average WT = Sum(Waiting Times) / Number of Processes
Average TT = Sum(Turnaround Times) / Number of Processes
Throughput = Number of Processes / Total Time
CPU Utilization = Total Busy Time / Total Time
```

---

## 💻 Implementation Tips

### Testing FCFS
- Use processes with similar arrival times
- Mix burst times to see convoy effect
- Small number of processes (3-5)

### Testing SJF  
- Use very different burst times
- Watch short jobs execute first
- Observe potential starvation with new arrivals

### Testing Round Robin
- Use long and short jobs together
- Observe fair distribution
- Experiment with different time quantums

### Testing Priority
- Assign different priority values
- See critical jobs execute first
- Combine with aging simulation

---

## 📚 Further Reading

- Silberschatz: OS Concepts (Chapter 9-10)
- Tanenbaum: Modern Operating Systems (Chapter 2)
- CPU Scheduling: https://en.wikipedia.org/wiki/Scheduling_(computing)
- Real-time Systems: https://en.wikipedia.org/wiki/Real-time_computing

---

**Remember**: No single algorithm is best for all scenarios!
The choice depends on your specific requirements and constraints.
