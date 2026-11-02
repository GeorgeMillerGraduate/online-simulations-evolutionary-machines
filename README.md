# JengaCode Evolutionary Machines — Build 1

A complete browser-local laboratory for fixed-topology neuroevolution and
controlled physical experiments. Built 29 October 2026. No pretrained policy,
remote AI service, API key, account, build tool or GPU is required.

## Install
Extract the evolutionary-machines folder into public_html/apps/, replacing
that app's files. Its URL remains /apps/evolutionary-machines/; existing
homepage and application-directory links continue to work. Hard refresh once
with Ctrl+Shift+R after upload. Keep your other site folders.

For Windows local preview, run START-PREVIEW.bat with Python installed.
Workers require HTTP: opening index.html as file:// is not supported.

## What Build 1 adds
1. Separate physics, sensor, controller, evolution, evaluation, storage and UI modules.
2. The original four controllers preserved in js/physics/legacy.js as baselines.
3. Twenty-four real, bounded physical observations, including ray-cast ground probes.
4. A small tanh neural policy with 8, 16 or 32 hidden neurons.
5. Genetic evolution of policy weights; optional physical-parameter evolution.
6. Real activation/weight visualisation, all sensor values and motor commands.
7. Eighteen live candidate screens and a normal-speed generation-winner replay.
8. A research mode that skips presentation replays.
9. One, two or four evaluation workers, capped to available hardware.
10. Immutable manifests, source hashes, ancestry, crossover/mutation records,
    per-course results, JSON/CSV exports and local checkpoint storage.
11. Separate training, validation and final-test seed sets, with 1/3/5 training,
    five validation and ten final-test courses.
12. Fitness/course-uncertainty, performance, energy, success, measured behaviour,
    genome-variation and independent-run study charts.

The four original machine artworks and side-view brass sprites are retained.
The new scientific graphics are native canvas drawings of actual values.

## Start an experiment
Choose a machine and controller, then press Evolve. A generation is scored on
all training courses before selecting parents. In demonstration mode, its
winner then plays on the first training course at 1x; the next generation
waits for this replay. Its replay score and training mean are intentionally
labelled separately. Research mode runs generations without presentation waits.

Choose 10, 25, 50 or 250 generations as a run budget. The default population
is 18; larger populations still preview only the first 18 candidates. Worker
snapshots show live training courses at about 10 Hz. Final card scores show
mean training fitness and percentage task success.

Pause preserves the active operation. Stop cancels unfinished computation
and keeps completed results. Scientific setting changes start a new run.
Demonstrations pause when their tab is hidden; research/study computation may
continue, subject to browser background throttling. Keep the tab open.

Neural mode uses randomly initialised weights; there is no hidden gait or
pretrained controller. Cars may find useful constant motor policies quickly.
Walking and jumping may require long runs and can fail. A failed machine is
not replaced with a scripted success. The legacy mode is available for a
known functional baseline. With fixed bodies, a legacy run is repeated
measurement; enable physical parameter evolution to optimise that baseline.

## Models and inference
Neural policy: h=tanh(W1*x+b1), action=tanh(W2*h+b2).
24 inputs; selectable hidden width; 2 car, 4 walker, 1 jumper or 1 balancer outputs.
Weights are Float32-valued, bounded to [-8,8]. Inference uses JS numeric
accumulators. Weights remain fixed for the entire lifetime/episode.

Physics runs at 60 Hz; policy inference at 20 Hz with actions held between
inferences. Motor budgets and physical limits are applied at every physics
step. Car actions request wheel speeds up to +/-18 rad/s; walkers request
four joint speeds up to +/-8 rad/s; the hopper requests telescopic speed up
to +/-13 m/s; the balancer requests force bounded by its force-limit gene.
Torque/force caps and work budgets still apply.

Input definitions are in js/simulation/sensors.js. Normalisation is fixed and
clipped to [-1,1], so no validation/test preprocessing is fit. Ground probes
ray-cast actual static fixtures; a missing hit is explicitly represented by +1.
Unused joint/gap/contact channels are zero. Tilt uses the pole for balancing.

Build 1 has fixed physical topology and fixed network topology. Optional body
mutation changes existing dimensions, mass and controller-related parameters,
not limb counts. Decorative heads/arms/sprite details add no forces. Adjacent
parts share the legacy self-collision policy. This is an inspectable 2D model,
not an anatomically complete humanoid or a real-robot dynamics claim.

## Optimisation and records
The GA keeps two elites and uses tournament parent selection, uniform
crossover and bounded Gaussian mutations. Body and neural changes can be
independently frozen. IDs, parents, crossover choices, and before/after mutation
values are recorded so each child can be reconstructed.

Selection uses mean shaped task fitness over training courses. Fitness
components are displayed in the replay and exported per episode. The original
progress/upright/landing/finish rewards and absolute motor-work penalties are
preserved, making legacy equivalence testable. Gravity and friction vary by
course seed unless that option is disabled. They are identical for candidates
on the same seed. All result exports count physics steps and episodes.

Validation and final tests use disjoint seed sets and do not alter selection.
Final results appear only when requested. Repeatedly consulting them can still
bias a human experimenter; keep a fresh seed/config for confirmatory studies.
Intervals in the training/validation plots are Student-t 95% intervals across
courses, not across independently trained populations.

The Independent-runs study creates 3 or 5 separately seeded populations with
the current settings, trains each for 3, 5 or 10 generations, and validates its
winner. Its chart interval is across independent evolutionary runs. These small
sample counts support preliminary investigation, not a publication claim.
Episode counts are matched by the chosen design, but physics-step counts may
differ because trials can terminate early. Report both, not just generations.

Sensor and parameter knockout comparisons run both conditions on the same five
validation courses, report paired fitness differences and never change the GA.
Some knockout effects can be zero; the interface does not invent an effect.

## Save, restore and export
- Save shown controller exports its configuration and full weights/body genome.
- Full experiment JSON includes the immutable manifest/source SHA-256, current
  checkpoint, every completed generation's genomes/results/ancestry, held-out
  checks, independent studies and the currently recorded replay trace.
- CSV contains per-generation metrics, including physics work and uncertainty.
- Autosave commits checkpoint and generation record atomically to IndexedDB.
- Restore resumes the last locally saved run with compatible code/configuration.
- Import accepts new controller/experiment files and legacy v1/v2 genomes.
  File imports seed a NEW run and discard imported scores for selection.
  Historical data remains available in the original exported file; it is not
  silently trusted as measured evidence by a fresh browser session.
- Files larger than 32 MiB are rejected by the browser importer. Download exports
  before accumulating very long runs. Browser local storage can be cleared or
  exhausted; exported files are the durable copy.

Run IDs are stable configuration identifiers, not cryptographic security
checks. Source SHA-256 identifies this scientific implementation. Repeatability
is tested within the same runtime and across worker counts. Bit-identical
cross-browser floating-point behaviour is not promised.

## Headless CPU runner (optional)
Install Node.js separately, then from the extracted app directory:

node tools/headless.cjs --mode car --generations 10 --workers 2 --output run.json
node tools/headless.cjs --config config.json --generations 25 --output study.json

The runner uses the same browser scientific modules and browser worker protocol;
it atomically saves a compatible experiment after every generation. It is not
required by the webpage. Use --controller legacy for the original baseline.

## Verification
node tests/science.test.cjs
node tests/parallel.test.cjs
node tests/lifecycle.test.cjs

Tests cover baseline equivalence, neural causality, sensor bounds, immutable
within-life weights, actual motor limits, ancestry reconstruction, splits,
statistics, serial/worker equivalence and the generation replay lifecycle.

## Scientific scope
This is the research-ready first build. NEAT, MAP-Elites, structural body-graph
mutation, PPO and within-lifetime learning are not implemented or implied.
Source, methods and artwork credits are in CREDITS.md and credits.html.
