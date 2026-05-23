## The picture that emerges

Across the preceding sections, a consistent geometric picture has taken shape. The
layer-12 residual stream of Gemma-2-2B contains a compact, generalizing, nonredundant
subspace of roughly 31 directions with autocorrelation lifetimes an order of magnitude
longer than chance. That signal requires sequential context to exist, since it collapses
under document permutation, and the directions that carry it appear to track durable
document register and source-template state rather than local lexical content.

The geometry of that subspace is specific in two ways that are not obvious in advance.
First, it lives inside the high-variance PCA span rather than outside it, at angles
the principal components do not occupy. Second, it cannot be identified by high
variance or raw attention alignment alone: the top PCA directions have both properties
and yet have no persistence. What distinguishes the persistent directions is a
positive attention-specific M0 excess, a geometric coupling to late attention-head
outputs that survives controlling for generic residual anisotropy, concentrated
in layers 10–12.

In the narrow sense suggested by section 1, this is a working-memory-like state
geometry: a small set of directions that remain available across many token positions,
embedded inside a much larger stream of fast-decaying computation. I found that
geometry; I did not find evidence that specific attention heads causally maintain it,
which is the question a follow-up experiment will address.

The scope of these results is deliberately narrow: one hook point (layer 12), one
model (Gemma-2-2B), one corpus (C4). The pilot is clean and the findings are
internally consistent, but whether the same structure appears across layers, models,
and corpora is an open question, not an assumption.
