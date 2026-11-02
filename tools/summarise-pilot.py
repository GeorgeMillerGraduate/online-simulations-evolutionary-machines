"""Reproducible seed-level summaries and an exact SVG learning curve; standard library only."""
import json,sys,statistics,random,csv,html
from pathlib import Path
source=Path(sys.argv[1]);dest=Path(sys.argv[2]);dest.mkdir(parents=True,exist_ok=True)
d=json.loads(source.read_text());rows=d['results'];methods=['cmaes','random-cpg','mlp-ga'];budget=d['budgetPerRun']
def ci(values):
 r=random.Random(42);n=len(values);samples=sorted(statistics.mean(r.choices(values,k=n)) for _ in range(1000));return statistics.mean(values),samples[25],samples[974]
def at(row,x):
 hist=row['history'];last_x=0;last_y=0
 for point in hist:
  if point['steps']>x:
   return last_y
  last_x,last_y=point['steps'],point['fitness']
 return last_y
pairs={m:{r['seed']:r for r in rows if r['method']==m} for m in methods}
lines=['# Build 3 exact-budget locomotion pilot','',f"Completed {len(rows)} of {d['plannedRuns']*3} independent method runs. Each run used exactly {budget:,} training physics steps. Three common training scenarios; five disjoint held-out scenarios per selected winner. No final-test scores were consulted.",'','| Method | Runs | Mean held-out net distance (m), 95% seed-bootstrap interval | Training runs meeting criterion on all 3 courses | Runs passing ≥4/5 validation courses |','| --- | ---: | --- | ---: | ---: |']
for m in methods:
 group=list(pairs[m].values())
 if not group:continue
 vals=[statistics.mean(e['distance'] for e in r['validation']) for r in group];avg,lo,hi=ci(vals);train=sum(all(e['success'] for e in r['best']['episodes']) for r in group);success=sum(sum(e['success'] for e in r['validation'])>=4 for r in group)
 lines.append(f'| {m} | {len(group)} | {avg:.3f} [{lo:.3f}, {hi:.3f}] | {train}/{len(group)} | {success}/{len(group)} |')
lines+=['','Learning curves carry forward the last completed-cohort best return at each step coordinate. Before the first completed cohort, the display baseline is zero; it is not a measured candidate. Training AUC uses that declared convention. CPG+CMA-ES begins around a disclosed hand-specified controller prior; random CPG samples the full gene range. This comparison tests the configured methods, not an isolated causal effect of covariance adaptation.','','Intervals resample independent optimisation runs, not the five course measurements as independent runs. The declared success criterion is 4 m net travel, sufficient upright duration and no fall. Passing an optimiser unit test is not evidence of locomotion.','']
for m in methods:
 group=list(pairs[m].values());n=len(group)
 if n:
  k=sum(sum(e['success'] for e in r['validation'])>=4 for r in group);z=1.96;p=k/n;den=1+z*z/n;centre=(p+z*z/(2*n))/den;half=z*((p*(1-p)/n+z*z/(4*n*n))**.5)/den
  lines.append(f'{m}: reliable-run proportion {k}/{n}; 95% Wilson interval [{max(0,centre-half):.1%}, {min(1,centre+half):.1%}].')
for baseline in ['random-cpg','mlp-ga']:
 seeds=sorted(set(pairs['cmaes'])&set(pairs[baseline]))
 if seeds:
  delta=[statistics.mean(e['distance'] for e in pairs['cmaes'][s]['validation'])-statistics.mean(e['distance'] for e in pairs[baseline][s]['validation']) for s in seeds];mean,lo,hi=ci(delta);lines.append(f'CPG+CMA-ES minus {baseline}: paired mean held-out-distance difference {mean:.3f} m; 95% seed-bootstrap interval [{lo:.3f}, {hi:.3f}], n={len(seeds)} pairs.')
lines+=['','## Acceptance gate','','The paper calls for at least 80% reliable walking across independent runs. Consult the counts above: implementation completeness and empirical success are separate. A failure of this gate is reported, never replaced with a scripted gait. This pilot uses a small compute budget; it does not establish publication-level superiority or robust terrain generalisation.','','## Reproduce','','```','node tools/locomotion-benchmark.cjs --runs 20 --steps 250000 --workers 4 --output pilot.json','python3 tools/summarise-pilot.py pilot.json summary','```','','Partial final cohorts consume the remaining step allowance but do not update the optimiser or select a winner. Source versions in each manifest identify the runtime used. Current source and old Build 2 comparisons remain separately labelled.']
(dest/'PILOT.md').write_text('\n'.join(lines)+'\n')
with (dest/'pilot-results.csv').open('w',newline='') as f:
 w=csv.writer(f);w.writerow(['seed','method','training_steps','generations','validation_mean_net_distance','validation_success_fraction','training_auc','source_sha256'])
 for r in sorted(rows,key=lambda r:(r['seed'],r['method'])):
  area=sum((at(r,budget*i/200)+at(r,budget*(i+1)/200))/2*budget/200 for i in range(200));w.writerow([r['seed'],r['method'],r['steps'],r['generation'],statistics.mean(e['distance'] for e in r['validation']),statistics.mean(int(e['success']) for e in r['validation']),area,r['manifest']['sourceSHA256']])
# Median and IQR at matched physical-step coordinates.
curves={}
for m in methods:
 group=list(pairs[m].values())
 if group:
  curve=[]
  for i in range(101):
   values=sorted(at(r,budget*i/100) for r in group);n=len(values);curve.append((budget*i/100,statistics.median(values),values[int((n-1)*.25)],values[int((n-1)*.75)]))
  curves[m]=curve
width,height=900,450;left,top,pw,ph=75,35,790,340;values=[v for curve in curves.values() for _,a,b,c in curve for v in [a,b,c]];low=min(0,min(values,default=0));high=max(1,max(values,default=1));X=lambda x:left+x/budget*pw;Y=lambda y:top+ph-(y-low)/max(1e-9,high-low)*ph
svg=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}"><rect width="100%" height="100%" fill="#fdfbf7"/><g font-family="Arial" font-size="13" fill="#5c4936">']
for i in range(6):
 y=low+(high-low)*i/5;svg.append(f'<path d="M {left} {Y(y):.2f} H {left+pw}" stroke="#ded4c3"/><text x="65" y="{Y(y)+4:.2f}" text-anchor="end">{y:.1f}</text>')
colors={'cmaes':'#a5512f','random-cpg':'#3b7b7c','mlp-ga':'#897543'}
for j,(m,curve) in enumerate(curves.items()):
 points=[(X(x),Y(hi)) for x,med,lo,hi in curve]+[(X(x),Y(lo)) for x,med,lo,hi in reversed(curve)];svg.append('<polygon points="'+' '.join(f'{x:.2f},{y:.2f}' for x,y in points)+f'" fill="{colors[m]}" opacity=".13"/>');svg.append('<polyline points="'+' '.join(f'{X(x):.2f},{Y(med):.2f}' for x,med,lo,hi in curve)+f'" fill="none" stroke="{colors[m]}" stroke-width="2"/>');svg.append(f'<text x="{80+j*260}" y="425" fill="{colors[m]}">{html.escape(m)} · median / IQR</text>')
svg.append(f'<text x="75" y="20">Best training return across independent runs</text><text x="460" y="405" text-anchor="middle">Training physics steps · exact run ceiling {budget:,}</text><text x="75" y="395">0</text><text x="865" y="395" text-anchor="end">{budget:,}</text></g></svg>');(dest/'learning-curves.svg').write_text(''.join(svg));print('\n'.join(lines[:12]))
