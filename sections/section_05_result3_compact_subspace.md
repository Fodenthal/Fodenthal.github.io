## The persistent signal concentrates in roughly 31 nonredundant directions

The heavy upper tail of the time-lagged lifetime distribution is not spread evenly
across all 256 time-lagged probes. It concentrates. I measured how many directions
are needed to account for 80% of the total lifetime excess, the cumulative sum of
$\tau$ values above the random baseline, across all 1,024 probes in the experiment
(@fig-lifetime-excess). That number is 31.

The distribution within those 31 directions is itself heavy-tailed. The single
highest-lifetime direction accounts for 44% of the top-31 excess, the top 5 account
for 64%, and the top 10 account for 75%. There is a dominant lead direction, and the
signal falls off from there. But it does not collapse to one direction repeated in
slightly different guises.

I checked this directly. Within the top-31 set, the median pairwise absolute cosine
similarity is 0.035 and the maximum is 0.237, well below the 0.95 deduplication
threshold used throughout the experiment, and close to what you would expect from
near-orthogonal directions in a high-dimensional space. The participation-ratio
effective rank of the top-31 set is 28.2 out of 31. These are 28-odd genuinely
distinct directions, not one slow axis copied with small perturbations.

The family composition of the top-31 is also consistent with the section 3 result:
30 of the 31 directions are time-lagged probes, and 1 is a PCA probe. The near-
absence of PCA directions from the top of the lifetime ranking confirms that
high-variance axes are not, in general, the persistent ones, even when selected from
the same pool of candidate directions.

Finally, a related projection-collapse result generalizes. A residual-first basis
built from candidate directions fitted on one train shard removes persistence from
independently fitted probes from a disjoint train shard. The same behavior appears on
a test split that was never used during direction fitting or selection. This supports
a reusable compact basis rather than a validation-specific collection of probes.

There is a further geometric question the current pilot has not answered: is a generic
random direction inside the headline top-31 span also slow, or are only the selected
directions slow? Pairwise nonredundancy and high effective rank do not settle that.
A random-in-span follow-up is needed before treating the recovered span as a uniformly
slow region.
