## Open questions

**Semantic validation.** The dossier observations in section 10 are grounded in
validation-split qualitative analysis only. The most direct next step is to predefine
a label set — technical prose, legal/regulatory, product catalog, biomedical citation,
devotional, and so on — and test whether the top-31 directions are enriched for those
labels on held-out test projections. A positive result would elevate the
register/template interpretation from hypothesis to evidence.

**Causal routing.** The geometric alignment between persistent directions and late
attention-head outputs (sections 7–8) is consistent with those heads playing a causal
role in writing or maintaining the persistent signal, but does not establish it. A
prospectively locked transport and ablation experiment — with head sets declared before
any validation diagnostics are examined — is the required next step for claim levels
7b and 8.

**Cross-layer structure.** We measured persistence at a single hook point. Whether the
persistent subspace is stable across layers — whether layers 8, 10, and 11 share the
same ~31 directions — can be tested by computing subspace principal angles between
layers. A stable subspace across the latter half of the network would suggest the
persistent geometry is a global property of how the model organizes context, not a
local artifact of a single layer.

**Cross-model generalization.** The same analysis applied to Llama, Mistral, and
Pythia family models would test whether state-lifetime geometry is a general property
of transformer residual streams or specific to Gemma's architecture and training. A
consistent structure across training setups would be a stronger result than the current
single-model pilot.

**Connection to sparse autoencoders.** If the persistent directions project
substantially onto known SAE features with established semantic interpretations, that
would provide an independent route to characterizing what they carry — bridging the
geometric characterization reported here with the feature-level characterization that
SAE-based interpretability work has developed.
