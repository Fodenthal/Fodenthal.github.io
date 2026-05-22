## Persistent directions live inside the PCA span, not outside it

Section 3 established that individual PCA axes are not persistent: the 90th-percentile
lifetime of PCA probes is 1.0, identical to random directions. A natural inference is
that the persistent directions must live somewhere PCA doesn't look — perhaps in the
low-variance tail of the residual spectrum, where the model might quietly maintain
long-lived signals without disturbing the high-variance structure. That inference is
wrong, and correcting it is the most structurally important result in this experiment.

To test where the persistent directions live, we measured *projection collapse*: the
degree to which a given basis removes the autocorrelation of a set of held-out probe
directions. Concretely, we took 128 time-lagged probe directions that were fitted on a
separate training shard — directions the basis construction never saw — and projected
them into the orthogonal complement of an increasing number $k$ of basis vectors. If
the held-out probes lose their persistence after projection, they were living in the
basis span. If they retain it, they were not. We evaluated three bases: the residual-
first basis (the leading directions fitted directly on the persistent probes), a PCA
basis (the top-$k$ principal components of the residual stream), and a random-control
basis (randomly sampled unit vectors).

At $k = 256$, the residual-first and PCA bases collapse the held-out probes
essentially completely, with collapse values of 0.998 and 0.998 respectively
(@fig-projection-collapse). The random-control basis collapses them by only 0.097 to
0.110 — roughly one-tenth as much. The persistent directions are not in a generic
subspace; they are in a specific one. And that specific subspace is almost entirely
contained within the top 256 principal components of the residual stream.

This is the apparent paradox: individual PCA axes, evaluated one at a time, show no
more persistence than random directions. Yet the PCA subspace, taken as a whole,
contains the persistent directions almost perfectly. How can both be true?

The answer is that the persistent directions are *rotations within the PCA span* — not
the principal axes themselves, but other directions that lie inside the subspace those
axes define (@fig-pca-schematic). Think of a two-dimensional ellipse. PCA finds its
major and minor axes — the directions of maximum and minimum variance. But there are
infinitely many other directions that lie within the plane of the ellipse, at angles
between the principal axes, that PCA does not identify as special. The persistent
directions are the analogue of those intermediate axes: they live in the high-variance
subspace of the residual stream, but at orientations that maximize autocorrelation
rather than variance. PCA, which optimizes variance, does not find them. Time-lagged
probes, which directly optimize lagged covariance, do.

What this rules out is a natural alternative model of how a transformer might maintain
long-timescale information: by reserving a quiet, low-variance corner of the residual
stream for stable signals that won't interfere with the high-variance computation
happening elsewhere. The data do not support this picture. The persistent subspace is
embedded inside the high-variance PCA span, not orthogonal to it. If anything, the
PCA span is a marginally *more* efficient basis for the persistent directions than the
residual-first basis itself: at $k = 64$, PCA collapse reaches 0.841 versus 0.821 for
residual-first on the held-out test split, suggesting the persistent directions are
somewhat better aligned with the leading PCA axes than with the leading residual-first
directions at small $k$.

The methodological consequence is direct. Scanning the principal components of the
residual stream — a common first step in residual-stream analysis — will not find
these directions, because persistence and variance are not the same axis. Finding the
persistent subspace requires optimizing for temporal stability explicitly, which is
what the time-lagged probe construction does. The subspace itself is not hidden; it is
hiding in plain sight inside the most visible part of the residual stream, at angles
that variance-based methods do not select.
