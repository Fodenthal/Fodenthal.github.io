# Voice & Constraints — Residual Geometry Blog Post

Use this document as the system context at the top of every section-writing session.

---

## One-sentence claim

> *The residual stream of a large language model contains a compact subspace of directions with autocorrelation lifetimes an order of magnitude longer than chance — and these directions live inside the high-variance PCA span, not outside it, which means neither PCA nor attention alignment alone can find them.*

Every section should be traceable back to this claim. If a paragraph can't be connected to it, cut it or move it to the appendix.

---

## Working memory analogy — how and where to use it

The post uses a working memory / cognitive science analogy as a reader orientation device, not as a scientific claim. The three-way decomposition is:

- Persistent residual directions ≈ working memory: maintained across time, limited capacity, globally usable
- Fast-decaying residual directions ≈ local processors / transient computation: fast, specialized, not globally maintained
- Model weights ≈ long-term memory: learned knowledge, not the subject of this experiment

**Where it appears:**
- Section 1 (hook): 2–3 sentences to motivate the question. Frame it as "transformers might have something like working memory — here is what we found when we looked for it." The analogy is the entry point, not the conclusion.
- Section 11 (synthesis): one sentence to close the loop. Nothing more.
- Nowhere else.

**Required hedge whenever the analogy is invoked:** "We found a working-memory-like state geometry, not the whole active workspace of the model." Use this line or something very close to it. It prevents the reader from concluding the model *has* working memory.

**Do not say:**
- "The model has working memory"
- "These directions are working memory"
- "The persistent subspace is the model's working memory"

**Do say:**
- "The persistent directions are *working-memory-like* in a narrow geometric sense"
- "The complement — fast-decaying directions — is not 'not thinking'; it is more like local, transient computation"
- "The analogy is useful for orientation, not as a mechanistic claim"

The key insight from cognitive science that makes the analogy apt: not all active computation is globally maintained state. In human cognition, early visual processing, syntactic parsing, motor preparation, and automatic associations are all happening "right now" but are not in working memory. The same distinction applies here: the fast-decaying majority of residual directions are not unimportant — they may carry most of the intelligence. The persistent subspace is the small part that stays available across many token positions.

---

## What this post is

A technical blog post reporting a mechanistic interpretability pilot experiment on
Gemma-2-2B. The findings are real, the pilot is clean, and the scope is deliberately
narrow. The post should feel like a confident, honest lab report — not a press release,
not a speculative essay.

It will be published in Quarto. Figures are externally generated and referenced by name.
Each section draft should include a `@fig-xxx` cross-reference placeholder where a
figure belongs, using the figure names listed in the outline.

---

## Audience

ML researchers and technically literate practitioners who:

- Know what a transformer residual stream is and roughly what it does
- Are familiar with PCA and autocorrelation at a conceptual level
- Are not necessarily familiar with mechanistic interpretability or this specific line of
  work
- Read carefully and will notice if a claim is overclaimed or a caveat is missing

Write for a reader who will push back. Do not write for a reader who needs to be
impressed.

---

## Tone

**Precise without being dry.** The two counterintuitive geometry results (sections 6 and
7) should genuinely land as surprising — the writing should carry the reader to the
punchline clearly. But do not editorialize. Let the numbers do the work.

**Confident about what is supported. Honest about what is not.** The post covers two
distinct claim tiers: results supported by locked experiments (claim levels 1–7a), and
exploratory findings that are hypothesis-generating only (semantic dossiers, M1-lite
ablations). The writing must keep these cleanly separated at all times. A reader should
never have to wonder which tier a given statement belongs to.

**Not modest to the point of being evasive.** This is a real result. Don't undermine it
with unnecessary hedging on the things that are actually supported.

---

## Voice

- First person plural ("we measured," "we found") — this is collaborative research
- Active voice strongly preferred; passive only where natural
- Short paragraphs (3–5 sentences typical). No paragraph should contain more than one
  main idea.
- Lead with the result, then the support. Do not build up to findings; state them and
  then explain them.
- Figures carry the empirical weight. Prose should interpret and contextualize, not
  repeat what is already visible in a figure.

---

## Words and phrases to avoid

| Avoid | Why |
|---|---|
| "interestingly" | Signals the writer is surprised; show it structurally instead |
| "fascinating," "remarkable," "exciting" | Editorializing |
| "clearly," "obviously," "simply" | Condescending; if it were obvious we wouldn't need the experiment |
| "the model knows," "the model thinks," "the model believes" | Anthropomorphizing; say what is geometrically or computationally observed |
| "proves," "demonstrates conclusively" | Overclaiming; say "supports," "is consistent with," "provides evidence for" |
| "persistent state" as a settled term for what the model is doing | This is a geometric property of the residual stream. Whether the model is actively *maintaining* state is an open question. Say "persistent residual directions" or "directions with long autocorrelation lifetimes." |
| "semantic axis," "semantic direction" as a settled label | The semantic dossiers are hypothesis-generating. Say "directions that appear to activate on," not "directions that encode." |
| Scare quotes on technical terms once introduced | Define the term once properly, then use it plainly |

---

## What can and cannot be claimed

### Supported (use freely, cite figures)

- Residual-stream directions have a non-uniform distribution of temporal persistence (τ)
- Time-lagged probes reveal a heavy-tailed persistence distribution that random and PCA
  probes miss
- The signal collapses under document permutation (94.1% top-decile τ reduction)
- The top persistent signal concentrates in ~31 nonredundant directions (effective rank
  28.2, pairwise abs-cosine max 0.237)
- The persistent subspace is strongly contained in the top-256 PCA span (collapse 0.998)
  even though individual PCA axes are not persistent (Q90 τ = 1.0)
- Persistent directions have higher M0 attention-excess than top PCA directions, which
  have negative M0 excess despite higher raw attention alignment
- Held-out validation and test projections confirm subspace generalization

### Exploratory only — frame explicitly as hypothesis-generating

- The semantic dossier findings: directions appear to activate on document
  register/template/domain (technical, legal, SEO, biomedical, devotional). These are
  qualitative observations on the validation split only. Do not call these validated
  labels or confirmed semantic features.
- M1-lite ablation results (L12H7, L11H0, L12H6): head-specific effects are suggestive
  but head sets were selected post-hoc from validation diagnostics.
- M3/M3b per-head transport structure for L12H7 and L12H6: interesting but not
  claim-level evidence.

### Do not claim under any circumstances

- The identified attention heads causally write, route, or maintain the persistent
  directions
- Locked group-specific attention transport has been demonstrated
- The directions encode validated semantic variables or discourse features
- The result generalizes beyond layer 12, Gemma-2-2B, and C4 before the full-scale run
- The persistent subspace is PCA-orthogonal or invisible to PCA (the opposite is true)

---

## Technical vocabulary (use these terms consistently)

| Term | Definition (remind yourself before each section) |
|---|---|
| **residual stream** | The summed vector that accumulates across layers; measured here at the post-block-12 hook |
| **probe direction** / **probe** | A unit vector in residual-stream space onto which the stream is projected to get a scalar time series |
| **τ (lifetime)** | The lag at which within-document autocorrelation of a probe's scalar projection drops below 1/e |
| **lifetime excess** | τ minus the random-direction median τ (= 1.0); measures how much longer a direction persists than chance |
| **time-lagged probe** | A direction optimized to maximize lagged covariance (generalized eigenproblem); distinct from PCA which maximizes variance |
| **PCA-contained** | The persistent subspace is spanned within the top-k PCA directions as a subspace, even though individual PCA axes are not persistent |
| **projection collapse** | The fraction by which a basis removes the autocorrelation of a held-out probe set; measures whether the probe directions live in the basis span |
| **M0** | Block-output subspace comparison: tests whether persistent directions align with attention or MLP block outputs more than residual PCA predicts |
| **M0 excess / ΔE** | Attention (or MLP) overlap minus residual-PCA baseline; the key comparative metric |
| **document permutation control** | Shuffling token order within a document before recomputing τ; destroys sequential structure while preserving the token multiset |
| **semantic dossier** | A qualitative first-pass reading of the top-activated token windows for a given probe direction; hypothesis-generating only |

---

## Numbers to keep consistent (do not paraphrase these)

- Model: Gemma-2-2B, layer 12, residual width 2304, 8 attention heads, 4 KV groups
- Dataset: 5,000 C4 documents × 1,024 tokens; 80/10/10 train/val/test split
- Probe counts: 512 random, 256 PCA, 256 time-lagged (1,024 total; all 1,024
  deduplicated cleanly at cosine threshold 0.95)
- τ by family (validation): random Q90 = 1.0, PCA Q90 = 1.0, time-lagged Q90 = 11.5,
  Q95 = 17.0; top direction τ = 492
- Permutation collapse: top-decile time-lagged τ drops from 17 to 1 (94.1%)
- k_80pct_lifetime_excess = 31; effective rank = 28.2; pairwise abs-cosine max = 0.237,
  median = 0.035
- Projection collapse at k=256: residual-first = 0.998, PCA = 0.998, random-control =
  0.097–0.110
- M0 ΔE_attn: 0.081–0.107 across residual-PCA control settings k=0,16,32,64,128; all
  CIs exclude zero
- Group M0 medians: persistent_top31 = +0.116, top_pca31 = −0.399
- Group raw alignment: persistent head_subspace = 0.187, top_pca31 = 0.208

---

## Figure reference names (use these exactly in `@fig-xxx` callouts)

| Figure | Reference name | Section |
|---|---|---|
| τ histograms by probe family | `@fig-tau-histograms` | §3 |
| Permutation collapse | `@fig-permutation-collapse` | §4 |
| Projection-collapse curves by basis | `@fig-projection-collapse` | §6 |
| PCA-containment schematic | `@fig-pca-schematic` | §6 |
| Lifetime-excess cumulative curve | `@fig-lifetime-excess` | §5 |
| PCA-vs-persistent stress test | `@fig-pca-vs-persistent` | §7 |
| Semantic spans (qualitative) | `@fig-semantic-spans` | §10 |
| (Appendix) Singular spectrum | `@fig-singular-spectrum` | appendix |
| (Appendix) Pairwise cosine heatmap | `@fig-cosine-heatmap` | appendix |
| (Appendix) Attention alignment controls | `@fig-alignment-controls` | appendix |
| (Appendix) M0 by layer bar chart | `@fig-m0-by-layer` | appendix |

---

## Structure reminder (do not re-derive this each session)

1. Hook
2. Methods
3. Result 1: heavy-tailed persistence (B1) — `@fig-tau-histograms`
4. Result 2: permutation collapse — `@fig-permutation-collapse`
5. Result 3: compact, nonredundant subspace — `@fig-lifetime-excess`
6. Counterintuitive result 1: PCA-containment — `@fig-projection-collapse`, `@fig-pca-schematic`
7. Counterintuitive result 2: PCA-vs-persistent stress test — `@fig-pca-vs-persistent`
8. Result 4: attention alignment (M0)
9. What we couldn't establish: causal routing
10. What the directions appear to encode (semantic dossiers) — `@fig-semantic-spans`
11. Synthesis
12. Open questions
13. Hook (write last)

Write sections in order 2 → 12 → 1. Each section is one conversation.
