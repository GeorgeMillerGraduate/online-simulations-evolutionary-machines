# Sources and artwork

## Physics
Planck 1.5.1 — Erin Catto, Ali Shakiba and contributors.
https://github.com/piqnt/planck.js
https://piqnt.dev/planck.js/docs/
MIT licence, included in vendor/LICENSE.txt. Runtime bundled locally.

## Original application
JengaCode machine models, genomes, evaluation, genetic selection, concurrent
worker batches, charts, controls and canvas renderer are original application
code. No third-party evolutionary vehicle app was copied. No pretrained model
or dataset is used. Header compass follows the existing JengaCode apps.

## Original AI-generated illustrations, 29 October 2026
images/car-study.webp — brass experimental motor carriage and chassis studies.
images/walker-study.webp — articulated brass walking automaton and gait studies.
images/jumper-study.webp — spring jumping automaton and sequential leap studies.
images/balancer-study.webp — brass balancing automaton on a wheeled platform.

Prompt family: nineteenth-century scientific engraving of the relevant brass
and walnut mechanism, detailed etched metal and restrained copper highlights,
sepia linework on ivory parchment, full subject visible, portrait 2:3, fine
border, no text or interface. Generated specifically for JengaCode with the
built-in image-generation tool; optimised to 640×960 WebP.

images/parts/*.png — nine transparent brass game sprites: head, torso, thigh,
shin with foot, upper arm, forearm, chassis, wheel and telescopic spring.
Prompt: orthographic 2D side-view Victorian mechanical game assets, isolated
on transparent alpha, engraved brass/copper/walnut, no text, arranged as a
nine-part sheet. Individual assets cropped and alpha-preserved, then mapped
onto physical bodies in canvas. They are decorative skins; the underlying
rigid-body shapes determine collision and motion. Generated specifically for
JengaCode with the built-in image-generation tool. No external image sources.

images/mechanical-study.webp is the original edition's generated workbench
illustration, retained for compatibility with existing links.
No remote fonts, analytics, CDNs or external computation at runtime.

## Side-elevation edition
Four new original side-view plates: images/car-side-study.webp, walker-side-study.webp, jumper-side-study.webp and balancer-side-study.webp. Nine new transparent parts in images/parts-side/*.png. Generated specifically for JengaCode, 29 October 2026.
Prompt: true right-facing orthographic side elevation of realistic machined brass, copper, dark steel and walnut automata; profile head and torso with a single visible shoulder bearing, upright pivoted limb segments, side-on chassis, circular spoked wheel and telescopic spring; no typography, isolated transparent parts. Portrait plates use the same materials, ivory parchment, fine scientific engraving, marginal mechanical studies and a thin border.
Sprites were cropped from the generated alpha sheet and mapped to the actual rigid-body transforms; decorative arm casings follow opposite physical thigh angles without adding forces. The four plates are optimised 640×960 WebP. Previous artwork retained for compatibility.

## Build 1 scientific implementation
All neural-network kernels, sensors, environment adapters, genetic operators,
parallel scheduler, statistical summaries, recorder, headless runner and
scientific canvas graphics were written for this JengaCode app. The neural
controller is a small feedforward tanh network with evolved weights; it uses
no third-party pretrained model or dataset. Legacy controllers remain intact.

Planck documentation consulted for motor limits and physical ray-cast sensors:
https://piqnt.dev/planck.js/docs/joint/revolute-joint.html
https://piqnt.com/planck.js/docs/api/classes/World.html

Architecture and experimental priorities informed by the two user-supplied
Evolutionary Machines research reports. The implemented scope is Build 1,
not the reports' longer-term NEAT, quality-diversity or reinforcement-learning
programme. The app does not claim an original algorithm or publication result.
