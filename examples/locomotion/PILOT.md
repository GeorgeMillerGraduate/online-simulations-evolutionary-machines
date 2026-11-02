# Build 3 exact-budget locomotion pilot

Completed 60 of 60 independent method runs. Each run used exactly 250,000 training physics steps. Three common training scenarios; five disjoint held-out scenarios per selected winner. No final-test scores were consulted.

| Method | Runs | Mean held-out net distance (m), 95% seed-bootstrap interval | Training runs meeting criterion on all 3 courses | Runs passing ≥4/5 validation courses |
| --- | ---: | --- | ---: | ---: |
| cmaes | 20 | 3.704 [2.812, 4.562] | 9/20 | 3/20 |
| random-cpg | 20 | 1.433 [0.801, 2.116] | 1/20 | 1/20 |
| mlp-ga | 20 | 1.405 [1.025, 2.002] | 0/20 | 1/20 |

Learning curves carry forward the last completed-cohort best return at each step coordinate. Before the first completed cohort, the display baseline is zero; it is not a measured candidate. Training AUC uses that declared convention. CPG+CMA-ES begins around a disclosed hand-specified controller prior; random CPG samples the full gene range. This comparison tests the configured methods, not an isolated causal effect of covariance adaptation.

Intervals resample independent optimisation runs, not the five course measurements as independent runs. The declared success criterion is 4 m net travel, sufficient upright duration and no fall. Passing an optimiser unit test is not evidence of locomotion.

cmaes: reliable-run proportion 3/20; 95% Wilson interval [5.2%, 36.0%].
random-cpg: reliable-run proportion 1/20; 95% Wilson interval [0.9%, 23.6%].
mlp-ga: reliable-run proportion 1/20; 95% Wilson interval [0.9%, 23.6%].
CPG+CMA-ES minus random-cpg: paired mean held-out-distance difference 2.270 m; 95% seed-bootstrap interval [1.455, 3.101], n=20 pairs.
CPG+CMA-ES minus mlp-ga: paired mean held-out-distance difference 2.299 m; 95% seed-bootstrap interval [1.356, 3.251], n=20 pairs.

## Acceptance gate

The paper calls for at least 80% reliable walking across independent runs. Consult the counts above: implementation completeness and empirical success are separate. A failure of this gate is reported, never replaced with a scripted gait. This pilot uses a small compute budget; it does not establish publication-level superiority or robust terrain generalisation.

## Reproduce

```
node tools/locomotion-benchmark.cjs --runs 20 --steps 250000 --workers 4 --output pilot.json
python3 tools/summarise-pilot.py pilot.json summary
```

Partial final cohorts consume the remaining step allowance but do not update the optimiser or select a winner. Source versions in each manifest identify the runtime used. Current source and old Build 2 comparisons remain separately labelled.
