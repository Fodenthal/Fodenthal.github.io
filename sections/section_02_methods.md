## How I measured persistence

The core measurement is straightforward. I take a unit vector $v$ in residual-stream
space, a *probe direction*, and project the residual stream onto it at every token
position within a document. This gives a scalar time series, one value per token. I
then measure the within-document autocorrelation of that series: specifically, the lag
$\tau$ at which autocorrelation drops below $1/e$. A direction with $\tau = 1$ carries
essentially no signal from one position to the next. A direction with $\tau = 20$ carries
a recognizable signal across twenty token positions before it fades. I call $\tau$ the
*lifetime* of a probe direction.

I ran this measurement on Gemma-2-2B, hooking into the residual stream after block 12
(of 26), in the latter half of the network, where representations are generally thought
to be most semantically organized. This residual stream has a width of 2304 dimensions. The dataset was 5,000 documents from C4,
each truncated to 1,024 tokens, split 80/10/10 into train, validation, and test. Probe
directions were always fitted on training data; lifetimes were always evaluated on the
held-out validation and test splits.

Before computing autocorrelation, I subtract the per-document mean of each projection,
which I call within-document demeaning. Without this, a document that activates a
direction strongly throughout (because, say, it is entirely about a single topic) would
show spuriously high autocorrelation just from its elevated baseline. Demeaning ensures
the measurement targets sequential structure, asking whether the projection at position $t$ predicts the
projection at position $t + k$, rather than document-level offsets.

I fitted three families of probe directions, each asking a different question about
the residual stream. *Random probes* are uniformly sampled unit vectors: they provide
an unbiased baseline for what autocorrelation looks like in a generic direction. *PCA
probes* are the top principal components of the residual stream covariance, fitted on
training tokens: they are the directions that explain the most variance. *Time-lagged
probes* are the leading generalized eigenvectors of the lagged covariance matrix,
fitted to maximize the correlation between projections at positions $t$ and $t + k$
across a range of lags. I fitted 512 random probes, 256 PCA probes, and 256
time-lagged probes, for 1,024 total. All deduplicated cleanly at a cosine
similarity threshold of 0.95, confirming there were no near-duplicate directions across
or within families.

The distinction between PCA and time-lagged probes matters. PCA solves
$\max_{\|v\|=1} \operatorname{Var}(v^\top r_t)$: it finds directions with the highest
spread. Time-lagged probes solve a different problem:
$\max_{\|v\|=1} \operatorname{Corr}(v^\top r_t,\, v^\top r_{t+k})$: they find
directions where knowing the projection at one position tells you something about the
projection many positions later. A direction can score well on one and poorly on the
other. High variance does not imply high autocorrelation, and a direction with moderate
variance can be highly autocorrelated. The three families are designed to test whether
persistence is broad (random probes), whether it aligns with the high-variance
residual axes (PCA probes), or whether it requires an objective that directly targets
temporal stability (time-lagged probes).

Finally, I ran a document permutation control throughout. For each document, I
shuffled the token order uniformly at random before re-evaluating probe lifetimes. This
destroys sequential structure while preserving the set of tokens that appear in each
document. Any persistence that survives permutation is a property of which tokens
appear, essentially document topic, rather than of their ordering. Any persistence
that collapses under permutation depends on sequential context. I return to this
control in the next section, where it provides the cleanest result in the experiment.
