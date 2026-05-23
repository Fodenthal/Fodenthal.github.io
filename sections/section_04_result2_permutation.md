## The signal depends on token order, not just token content

The persistence I measured could in principle reflect something simple: a document
that is entirely about one topic will have a residual stream that activates the same
directions throughout, producing high autocorrelation as a side effect of topical
coherence rather than sequential structure. The document permutation control tests
this directly.

I shuffled the token order within each document uniformly at random, then
re-evaluated probe lifetimes on the shuffled sequences (@fig-permutation-collapse).
Permutation preserves the set of tokens that appear in each document, and therefore
its topic, vocabulary, and overall content, while destroying all sequential structure.
Any autocorrelation that survives is a property of the token multiset; any
autocorrelation that collapses depends on the order tokens were seen.

The result is clean. For random and PCA probes, permutation changes nothing: both
families have Q90 $\tau$ = 1.0 before and after shuffling, which is consistent with
those directions having no sequential structure to destroy. For time-lagged probes,
the top-decile lifetime drops from 17 to 1, a 94.1% reduction. The persistent
directions lose essentially all of their signal when token order is scrambled.

This rules out the topic-coherence explanation. A direction that was tracking document
topic would survive permutation; these do not. The persistence is in the sequential
ordering of the residual stream, not in which tokens appeared.

What permutation does not rule out is more subtle. Natural text has local sequential
coherence: sentences follow from previous sentences, paragraphs follow from previous
paragraphs, and a model processing such text will produce a residual stream that
reflects that structure. The persistent directions I found could be the model
actively maintaining information across positions, or they could be a more passive
consequence of the model encoding locally coherent surface patterns. The permutation
result separates persistence from topic; it does not separate active maintenance from
passive reflection. I return to this question in section 10, where a qualitative
look at what the persistent directions activate on provides some traction, though
not a definitive answer.

Together with the within-document demeaning from section 2, the permutation control
provides a joint constraint: the persistence measured here is within-document, sequential,
and not explained by document-level offsets or token content. What remains is
structure that is specifically tied to the order in which the residual stream evolved
across a document.
