# Build 1 verification

## Automated checks
Run the three commands under Verification in README.md. They cover:

- All four original controllers: exact equivalence with the original physics.
- Deterministic neural episodes, 24 bounded physical observations and bounded actions.
- Neural causality: zero-output policies do not inherit scripted movement.
- Fixed weights within an episode; exact ancestry/crossover/mutation reconstruction.
- Disjoint training, validation and final-test seeds; uncertainty calculations.
- Actual Node worker threads: serial, one-worker and three-worker results match exactly for all four tasks over three courses.
- UI state transitions: 18 candidates, normal-speed replay gate, pause/resume, generation winner versus best-ever, checkpoint call and held-out selection isolation.

The optional headless runner was also exercised for two car generations with two workers. This confirms execution and export, not reliable convergence on every task.

## Browser checks completed

The desktop page rendered with the retained artwork, neural graph, sensor readings and 18 canvases. A neural car generation completed 54 episodes across three training courses, replayed its winner at normal speed, and saved its checkpoint. A five-course held-out validation completed without changing the generation.

## Remaining browser checks

The browser service usage limit interrupted final interactive QA. Mobile layout, file download/import, checkpoint restoration after reload, independent-study controls, the final-test button and intervention-result presentation have not received final end-to-end browser verification. Their implementation and relevant core/state logic are included; do not treat these UI paths as browser-certified.

This is a functional Build 1 research prototype. It does not establish scientific novelty or publication readiness, and does not implement within-lifetime learning, NEAT, MAP-Elites or PPO.
