# Reproducible examples

- locomotion-v3-pilot.json: complete 20-seed, three-method, exact 250,000-step pilot.
- locomotion/PILOT.md: seed-level statistics, uncertainty and failed reliability gate.
- locomotion/pilot-results.csv: per-run data and declared AUC convention.
- locomotion/learning-curves.svg: median and IQR against actual training steps.
- locomotion/reproduction.json: stored winning episodes re-evaluated with the packaged kernels.
- profile-v3.json: local instrumented profiling under concurrent CPU load.
- build2-history/: explicitly historical Build 2 examples. These are not V3 gait evidence.

The pilot source fingerprint was captured before later presentation/export fixes.
Numerical CPG, CMA-ES, physics and environment kernels were unchanged during
that pilot. The final package has its own application source fingerprint.
The reproduction check verifies the stored training and validation episode
metrics against the final kernels; historical source fingerprints are retained.

The 80% reliability target was not met: CPG+CMA-ES passed at least four of
five validation courses in 3/20 runs. This is an exploratory small-budget
pilot, not a confirmatory claim. No result was discarded for being unsuccessful.
