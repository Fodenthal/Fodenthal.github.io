## High variance and attention alignment are not enough

Section 6 established that the persistent directions live inside the top-256 PCA span.
That raises an immediate question: what distinguishes them from the other directions
that also live inside that span? In particular, the top PCA directions themselves are
fully contained there by definition, and they occupy a region of the residual stream
with high attention-head activity. If the persistent directions are inside the PCA span,
and the top PCA directions are inside the PCA span, what property separates the two?

To answer this, we ran a stress test comparing five direction groups head-to-head:
the top-31 persistent directions, 31 random directions, 31 low-lifetime time-lagged
directions, the top-31 PCA directions, and 31 directions sampled uniformly at random
from within the top-128 PCA span (@fig-pca-vs-persistent). For each group we measured
two quantities: raw attention alignment (how strongly each direction projects onto the
leading principal components of each attention head's output), and M0 excess (how
much that attention alignment exceeds what residual PCA alone would predict). The
contrast between these two metrics is where the result lives.

On raw attention alignment, the top PCA directions score higher than the persistent
directions. The median head-subspace projection norm is 0.208 for top PCA versus
0.187 for persistent. By this metric, the high-variance axes of the residual stream
are *more* attention-aligned than the directions we identified as persistent.

On M0 excess, the picture reverses completely. The persistent directions have a median
M0 excess of +0.116: they project onto attention-head output subspaces substantially
more than residual PCA geometry predicts. The top PCA directions have a median M0
excess of −0.399: they project onto attention-head output subspaces *less* than
residual PCA predicts, despite their higher raw alignment. The gap between the two
groups is 0.52, larger than either group's absolute value.

What M0 excess measures is the part of attention alignment that cannot be explained
by generic residual anisotropy. The residual stream is not isotropic: it has a
dominant high-variance subspace, and attention heads write into that subspace too.
Raw alignment between a residual direction and an attention head's output is therefore
partly a consequence of both living in the same high-variance region, rather than a
specific geometric relationship between them. M0 excess controls for this by
subtracting the alignment you would expect from a direction's position in the residual
PCA spectrum. A positive excess means the direction is more specifically coupled to
attention-head geometry than its residual-PCA containment alone would predict. A
negative excess means the opposite: the alignment is more than accounted for by the
shared high-variance subspace, and there is nothing specifically attention-like about
the direction's geometry beyond that.

The top PCA directions have negative M0 excess precisely because they are the
high-variance residual axes, so their attention alignment is entirely explained by the
fact that both they and attention outputs live in the high-variance region. The
persistent directions, by contrast, have positive excess: their attention alignment
is not fully explained by their PCA containment, which means they are specifically
coupled to where attention heads write, over and above what their position in the
variance spectrum would predict.

The random-in-PCA-span group closes the argument. These directions are, by
construction, inside the top-128 PCA span, the same region as the persistent
directions, but sampled without regard to persistence or attention geometry. Their
M0 excess is −0.172: negative, like the top PCA directions, not positive like the
persistent ones. Being inside the PCA span is necessary for persistence, as section 6
showed, but it is not sufficient. What additionally distinguishes the persistent
directions is a specific geometric relationship to attention-head output subspaces
that survives controlling for generic residual anisotropy.

Taken together, the two centerpiece results describe a set of directions that can only
be identified by holding three properties jointly: they must be inside the high-
variance PCA span, they must have positive attention-specific M0 excess, and they must
be directly optimized for temporal stability. No pair of these three is enough.
Variance alone finds the PCA directions: high raw alignment, negative M0 excess, no
persistence. Attention alignment alone finds directions that are well-explained by
shared high-variance geometry. Only the combination, surfaced by time-lagged probes
and confirmed by the M0 stress test, recovers the persistent subspace.
