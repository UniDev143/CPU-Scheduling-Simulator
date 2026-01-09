# Test Scenarios - OS Scheduling Simulator

## 🧪 Pre-built Test Cases

Use these ready-to-test scenarios to understand different scheduling algorithms.

---

## Test Scenario 1: FCFS Advantage
### When: Processes with similar burst times

**Processes to Add:**
```
P1: Arrival=0, Burst=5, Priority=1
P2: Arrival=1, Burst=6, Priority=1
P3: Arrival=2, Burst=4, Priority=1
```

**Expected Results:**
- FCFS should be competitive
- No huge variance in burst times
- Convoy effect is minimal

**Analysis:**
- Avg Wait (FCFS): ~5 ms
- Avg TT (FCFS): ~10 ms
- FCFS is fair and reasonable

**Learning Point:** When burst times are similar, FCFS works fine!

---

## Test Scenario 2: SJF Wins
### When: High variance in burst times

**Processes to Add:**
```
P1: Arrival=0, Burst=30, Priority=1
P2: Arrival=1, Burst=2, Priority=1
P3: Arrival=2, Burst=1, Priority=1
P4: Arrival=3, Burst=5, Priority=1
```

**Expected Results:**
- SJF should win significantly
- FCFS should be worst
- RR should be in middle

**Analysis:**
| Algorithm | Avg Wait | Avg TT |
|-----------|----------|--------|
| FCFS | 21 | 35 |
| SJF | 2.5 | 17 |
| RR | 11 | 25 |
| Priority | 21 | 35 |

**Learning Point:** SJF dramatically improves waiting time with varied bursts!

---

## Test Scenario 3: Priority Scheduling
### When: Different importance levels

**Processes to Add:**
```
P1: Arrival=0, Burst=15, Priority=4 (Low)
P2: Arrival=1, Burst=5, Priority=1 (Highest)
P3: Arrival=2, Burst=3, Priority=2 (High)
P4: Arrival=3, Burst=2, Priority=3 (Low)
```

**Expected Results:**
- Priority should win
- P2 executes quickly despite high burst
- P1 waits (low priority)

**Analysis:**
- P2 starts at time 5 (right after arrival + P2's execution)
- P1 waits long (lowest priority)
- Real-time system behavior

**Learning Point:** Priority scheduling is essential for mixed-importance workloads!

---

## Test Scenario 4: Round Robin Fairness
### When: Need fair resource allocation

**Processes to Add:**
```
P1: Arrival=0, Burst=20, Priority=1
P2: Arrival=0, Burst=20, Priority=1
P3: Arrival=0, Burst=20, Priority=1
P4: Arrival=0, Burst=20, Priority=1
```

**Expected Results:**
- All algorithms have similar results
- RR shows context switches
- Fair time distribution
- Total time = 80 units

**Analysis:**
- Each process gets 5 units per quantum (time=4)
- Executes in 4 rounds
- All finish at same time
- Equal fairness

**Learning Point:** For identical workloads, all algorithms equivalent but RR shows overhead!

---

## Test Scenario 5: Starvation Risk
### When: Priority scheduling with continuous arrivals

**Processes to Add:**
```
P1: Arrival=0, Burst=10, Priority=5 (Lowest)
P2: Arrival=1, Burst=3, Priority=1 (High)
P3: Arrival=5, Burst=2, Priority=1 (High)
P4: Arrival=10, Burst=2, Priority=1 (High)
```

**Expected Results:**
- Priority: P1 keeps waiting
- SJF: P1 waits but eventually runs
- FCFS: All run fairly
- RR: All get time

**Analysis:**
- P1 never runs until all high-priority finish
- Starvation: Low priority waits indefinitely
- Would need aging to prevent

**Learning Point:** Low-priority processes can starve in priority scheduling!

---

## Test Scenario 6: Best Case for FCFS
### When: Arrival order matches burst time order

**Processes to Add:**
```
P1: Arrival=0, Burst=3, Priority=1
P2: Arrival=1, Burst=4, Priority=1
P3: Arrival=2, Burst=5, Priority=1
P4: Arrival=3, Burst=6, Priority=1
```

**Expected Results:**
- FCFS nearly optimal
- Follows arrival order naturally
- SJF might be very close (same order!)

**Analysis:**
- Avg Wait: ~4 ms
- No convoy effect
- Lucky case for FCFS!

**Learning Point:** FCFS works when arrival order is already optimal!

---

## Test Scenario 7: Worst Case for FCFS
### When: Largest job arrives first

**Processes to Add:**
```
P1: Arrival=0, Burst=100, Priority=1 (Big)
P2: Arrival=1, Burst=1, Priority=1 (Tiny)
P3: Arrival=2, Burst=1, Priority=1 (Tiny)
P4: Arrival=3, Burst=1, Priority=1 (Tiny)
```

**Expected Results:**
- FCFS terrible
- SJF much better
- RR middle ground

**Analysis:**
| Algorithm | Avg Wait |
|-----------|----------|
| FCFS | 76 |
| SJF | 1 |
| RR | 38 |

**Learning Point:** FCFS convoy effect is terrible with small jobs waiting for large job!

---

## Test Scenario 8: Round Robin Time Quantum
### Test 1: Very Small Quantum (TQ=1)

**Processes to Add:**
```
P1: Arrival=0, Burst=4
P2: Arrival=0, Burst=4
```

**Expected Results:**
- Many context switches (8)
- High overhead
- Fair distribution

**Analysis:**
```
Time: 0-1: P1, 1-2: P2, 2-3: P1, 3-4: P2, ...
Context switches add overhead!
```

**Learning Point:** Small quantum = more fairness but more overhead!

---

## Test Scenario 9: Round Robin Time Quantum
### Test 2: Very Large Quantum (TQ=100)

**Processes to Add:**
```
P1: Arrival=0, Burst=10
P2: Arrival=1, Burst=5
P3: Arrival=2, Burst=3
```

**Expected Results:**
- Few context switches
- Behaves like FCFS
- Less overhead

**Analysis:**
- Each process finishes within one quantum
- Effectively becomes FCFS
- No real preemption

**Learning Point:** Large quantum = less overhead but less fairness!

---

## Test Scenario 10: Mixed Realistic Workload
### When: Simulating real OS behavior

**Processes to Add:**
```
P1: Arrival=0, Burst=12, Priority=2 (User app)
P2: Arrival=2, Burst=3, Priority=1 (System task)
P3: Arrival=5, Burst=8, Priority=3 (Background)
P4: Arrival=7, Burst=2, Priority=1 (System task)
```

**Expected Results:**
- Different algorithms handle differently
- Priority/SJF likely better
- Real-world scenario

**Analysis:**
- System tasks (priority 1) run quickly
- User app (priority 2) runs next
- Background last

**Learning Point:** Real systems need mixed strategy!

---

## 📊 Scenario Comparison Matrix

| Scenario | Best Algorithm | Why | Key Lesson |
|----------|---|---|---|
| 1 | FCFS/Any | Similar bursts | Order matters |
| 2 | SJF | Varied bursts | Minimize wait |
| 3 | Priority | Mixed importance | Critical first |
| 4 | RR | Fairness needed | Equal access |
| 5 | FCFS | Prevent starvation | Fairness |
| 6 | FCFS | Lucky order | Situational |
| 7 | SJF | Convoy effect | Avoid long jobs |
| 8 | RR | Fairness focus | Overhead cost |
| 9 | RR | Efficiency focus | Quantum tuning |
| 10 | Priority | Real-world | Combined approach |

---

## 🎯 Guided Exercises

### Exercise 1: Find Best Time Quantum
**Task:** Test RR with different quantum values

**Steps:**
1. Add 4 processes with burst=8 each
2. Note results with current RR
3. Change algorithm visualization logic to test TQ=2, 4, 8
4. Compare overhead vs fairness

**Question:** Which quantum is best?

---

### Exercise 2: Detect Starvation
**Task:** Create scenario causing starvation

**Steps:**
1. Use Scenario 5
2. Note P1 doesn't execute in Priority scheduling
3. Explain why
4. Suggest solution (aging)

**Question:** How would you prevent starvation?

---

### Exercise 3: Algorithm Selection Logic
**Task:** Predict which algorithm wins

**Steps:**
1. Create custom scenario
2. Predict winner before analyzing
3. Check actual results
4. Explain differences

**Question:** Were you right? Why/why not?

---

### Exercise 4: Convoy Effect
**Task:** Demonstrate convoy effect

**Steps:**
1. Use Scenario 7 (worst case)
2. Observe FCFS timeline
3. Note small jobs waiting
4. Compare with SJF

**Question:** Why is it called "convoy"?

---

### Exercise 5: Priority Inversion
**Task:** Create priority inversion scenario

**Steps:**
1. High priority task arrives
2. But low priority is running
3. Medium priority task also waits
4. Observe the inversion

**Question:** What's the solution?

---

## 📈 Data Collection Template

### For Each Scenario:

```
Scenario: ________________
Processes Added:
- P1: Arr=___, Burst=___, Pri=___
- P2: Arr=___, Burst=___, Pri=___
- P3: Arr=___, Burst=___, Pri=___

Results:
┌─────────┬──────────┬────────┬──────────┐
│ Algo    │ Avg Wait │ Avg TT │ Makespan │
├─────────┼──────────┼────────┼──────────┤
│ FCFS    │    __    │   __   │    __    │
│ SJF     │    __    │   __   │    __    │
│ RR      │    __    │   __   │    __    │
│ Pri     │    __    │   __   │    __    │
└─────────┴──────────┴────────┴──────────┘

Winner: ________________
Why: ___________________
Key Observation: ________
```

---

## 💡 Investigation Questions

For each scenario, answer:

1. **Why did [algorithm] win?**
   - What characteristic of the workload favors it?
   
2. **What would make [algorithm] perform worse?**
   - Change what parameter?

3. **How does this apply in real systems?**
   - Can you name real scenarios?

4. **What if we combined approaches?**
   - Could a hybrid work better?

5. **Can you predict the exact numbers?**
   - Try to calculate by hand first

---

## 🚀 Progressive Difficulty

### Level 1: Easy (Single concept)
- Scenario 1, 4, 6

### Level 2: Intermediate (Multiple concepts)
- Scenario 2, 3, 7

### Level 3: Advanced (Complex patterns)
- Scenario 5, 8, 9

### Level 4: Expert (Real-world)
- Scenario 10, Custom scenarios

---

## 📝 Your Test Log

Add your own scenarios here and record results!

### Custom Test 1:
```
Processes: ___________________
Expected Winner: _______________
Actual Winner: _________________
Explanation: ___________________
```

### Custom Test 2:
```
Processes: ___________________
Expected Winner: _______________
Actual Winner: _________________
Explanation: ___________________
```

---

## ✅ Verification Tests

Before submitting project, test all scenarios:

- [ ] Scenario 1: FCFS works for similar bursts
- [ ] Scenario 2: SJF minimizes wait time
- [ ] Scenario 3: Priority executes important jobs first
- [ ] Scenario 4: RR provides fairness
- [ ] Scenario 5: Starvation demonstrated
- [ ] Scenario 6: FCFS best case
- [ ] Scenario 7: FCFS worst case
- [ ] Scenario 8: Small quantum overhead
- [ ] Scenario 9: Large quantum efficiency
- [ ] Scenario 10: Mixed workload handled

---

**Ready to test? Pick a scenario and start learning!** 🎓
