## A heavy tail that only time-lagged probes reveal

We evaluated all three probe families on the validation split and measured the
distribution of lifetimes $\tau$ across directions (@fig-tau-histograms). The result
is unambiguous: random and PCA probes are almost entirely short-lived, while time-lagged
probes expose a pronounced heavy upper tail.

For random directions, the distribution is flat and low. The 90th-percentile lifetime
(Q90) is 1.0 — meaning that nine out of ten randomly chosen directions in the 2304-
dimensional residual stream carry no detectable autocorrelation beyond a single token
position. This is the baseline: generic directions are not temporally structured.

For PCA directions, the result is nearly identical. Q90 $\tau$ = 1.0, the same as
random. The high-variance axes of the residual stream are not, in general, the
persistent ones. We will return to this — it turns out to be the most structurally
important finding in the experiment — but for now the takeaway is simply that PCA and
random probes are indistinguishable by lifetime.

Time-lagged probes tell a different story. The distribution has a long right tail: Q90
$\tau$ = 11.5, Q95 $\tau$ = 17.0. Some directions carry a recognizable signal across
more than a dozen token positions before decaying. The top direction has $\tau$ = 492,
meaning its within-document autocorrelation stays above $1/e$ for nearly half the
document length. Across the full set of 256 time-lagged probes, the Q90 lifetime is
11.5× higher than the random baseline.

This gap is not a fitting artifact. The time-lagged directions were fitted on training
data and evaluated on a held-out validation split, so overfitting to the training
documents cannot explain the result. The fit itself is numerically healthy: the
generalized eigenproblem required no ridge regularization beyond the default, the
condition number was 148, and every one of the 256 output directions passed a
positive-persistence filter on held-out validation data. The heavy tail is a property
of the residual stream, not of the fitting procedure.

The contrast between the three families points directly at the key methodological
lesson. PCA and time-lagged probes are both unsupervised methods for finding
structured directions in the residual stream, but they optimize different objectives.
PCA finds directions that explain the most variance in the residual stream at a single
token position. Time-lagged probes find directions whose projections are stable across
token positions — a direction at position $t$ that still carries signal at position
$t + k$. These are different questions, and the residual stream answers them
differently: high variance is common, long lifetime is rare, and the two properties
do not co-occur reliably. The consequences of that separation are what the rest of
this post is about.
