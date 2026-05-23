## Introduction

Not everything your brain is doing right now is in working memory. Early visual
processing, syntactic parsing, word retrieval, and motor preparation are all active,
but most of it is fast, local, and transient. Working memory is the smaller part: the
information that stays available across time, that can guide ongoing reasoning and
flexible response. The distinction is not between thinking and not thinking. It is
between computation that persists and computation that does not.

Transformers have no explicit analogue of working memory. There is no designated
register, no gated state, no mechanism whose purpose is to keep information online
across token positions. What there is, at every layer, is a residual stream: a
high-dimensional vector that accumulates the contributions of attention and MLP blocks
as the model processes each token. The question I asked is whether that stream has
any internal temporal structure, meaning whether some of its directions carry stable
signals across many positions while others decay within one or two tokens. If so, those
long-lived directions would be working-memory-like in a narrow geometric sense: not
all of the model's active computation, but the part that stays available across time.

This was an independent experiment; I used Codex and Claude as coding and reasoning
assistants. What I found, in a pilot experiment on Gemma-2-2B, is that the answer is yes, and
that the geometry of the persistent directions is counterintuitive in two ways. The
persistent directions do not live in a quiet, low-variance corner of the residual
stream where the model might stash long-lived signals without disturbing its main
computation. They live inside the high-variance subspace that PCA finds, at angles
the principal components do not occupy. And they cannot be identified by high variance
or by how strongly they align with attention-head outputs. The high-variance axes
of the residual stream score better on both criteria, and have no persistence at all.
Finding the persistent subspace requires a different objective entirely.

This post reports the experiment: how I measured persistence, what the distribution
looks like across direction families, where the persistent directions live in the
residual stream, and what a first qualitative look at their activations suggests they
might be tracking. I also report, honestly, what I was not able to establish.
