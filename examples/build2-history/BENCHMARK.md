# Exploratory paired smoke benchmark

Three independently seeded car runs per method; three generations, 18 candidates, three training courses and a five-second trial cap. Each selected winner is frozen and measured on five held-out courses. No final test was consulted.

| Seed | MAP-Elites validation | Random validation | Difference | Training steps: MAP / random |
| --- | ---: | ---: | ---: | ---: |
| 43 | 231.238 | 368.975 | -137.737 | 48017 / 47290 |
| 11160 | 372.157 | 372.420 | -0.263 | 47076 / 45720 |
| 22277 | 373.010 | 127.784 | 245.225 | 44980 / 45350 |

Mean paired validation difference: 35.742. Seeded percentile bootstrap 95% interval: [-137.737, 245.225]. Median: -0.263.

This small smoke benchmark does not establish superiority. The interval includes zero, outcomes vary by seed, and actual physics-step counts differ. It demonstrates the reproducible comparison pathway and deliberately preserves unfavourable results. It is not a publication-grade study.

The complete raw candidates, manifests, source identity, training histories and per-course held-out measurements are in paired-map-random.json. Reproduce with:

```
node tools/benchmark.cjs --config examples/car-map.json --algorithm map --control random --runs 3 --generations 3 --workers 2 --output repeat.json
```
