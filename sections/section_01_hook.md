## Summary

- The residual stream is commonly analogized to the transformer's "working memory": at each token position, a high-dimensional vector accumulates the attention and MLP deltas. This picture considers state transformations along the depth axis, i.e. layer by layer.
- There is a second axis of token position. Within a layer, the model must also keep track of information at position $t$ which is useful at position $t + k$. This experiment aims to discover the geometry of how the model tracks state across tokens.
- I estimated the distribution of timescales across residual directions in Gemma-2-2B using random, PCA, and time-lagged probe families on 5,000 C4 documents, then investigated the properties of the long-lived directions: where they live in the ambient space, how many there are, what they appear to semantically encode, and whether their long life is tied to sequential context or just unigram statistics.

**Finding 1: The timescale distribution is extremely heavy-tailed.** Random and PCA directions have a 90th-percentile lifetime of 1 token, carrying essentially no signal across positions. Time-lagged probes have a 90th-percentile lifetime of 17 tokens vs. a baseline of 1.

**Finding 2: The long-lived directions are hidden inside the high-variance PCA span.** They don't sit in a quiet low-variance corner of the residual stream. Rather, they are rotations inside the high-variance subspace, but are not PCA components themselves.

**Finding 3: The persistent state occupies a subspace, not the full ambient space.** The long-lived directions form a proper geometric subspace of the residual stream. This is very different from working memory in our brains, where the relevant signals are more diffuse across the cortex and have no clean geometric boundary.

**Finding 4: The subspace is low-dimensional.** Roughly 31 nonredundant directions account for 80% of total lifetime excess above the random baseline. These directions are genuinely distinct from one another, as median pairwise cosine similarity is 0.035 and effective rank is 28/31.

**Finding 5: State lifetime is not a corpus artifact.** Shuffling token order within documents collapses the top-decile lifetime of high-persistence probes from 17 tokens to 1 (94% reduction). Shuffling preserves the token multiset but destroys sequential order, isolating signal tied to token ordering from signal tied to surface statistics.

---

*Do not want to overclaim here. This is heavily contingent on the subspace geometry and causal role holding across distributions, layers, and models, which has not been tested yet. The optimistic version is that the rank generalizes across these axes while specific directions vary. The C4 result is mild evidence for the distribution axis, as it spans a wide range of topics, registers, and domains, yet something in the model's weights organized the persistent signal into a low-dimensional structure regardless of what the tokens were about.*

---

### The Interpretability Case

- The two words in "mechanistic interpretability" pull in opposite directions. Mechanistic commits you to the model's actual internal operations, however alien. Interpretable commits you to human-legible semantics. The field exists on the premise that these two constraints have a joint solution.
- The timescale axis is one place they meet. It is measured in the model's native geometry, but the directions it surfaces are natural candidates for the semantic variables we most want to find: entities, topics, discourse state, goals, reasoning state.
- This is not an accident. In human cognition, what occupies working memory is not arbitrary: it is precisely the variables most causally upstream of ongoing behavior. The same logic applies here. A direction that persists across many token positions is, by definition, one that conditions future computation across those positions. Timescale is a proxy for causal centrality.
- That reach is wider than it first appears. A persistent direction at the final token position has a direct path to the output: it is what the unembedding matrix reads. A transient direction mid-sequence can only influence future outputs indirectly, through whatever attention heads happen to read it before it decays.
- And because generated tokens are appended back into context, a direction that shapes the output at one step can persist into the next, compounding across an entire generation. A transient feature explains a local prediction; a persistent one can shape a whole reasoning chain. This extends to every unit of analysis mech interp cares about: anything that reads from or writes to the residual stream has a timescale structure.

---

### Potential Applications

**Implication 1: Model components can be decomposed into a persistent component and a transient component.** If there exists a persistent residual subspace, every attention or MLP weight matrix that reads from or writes to the residual stream can be split into persistent and transient parts, e.g. PW versus (I−P)W.

**Implication 2: Steering interventions become more targeted.** If a steering vector "makes the model more honest," we could test whether it works by modifying the model's persistent discourse representation (what kind of conversation the model takes itself to be in) or by adding a local logit-level bias that nudges each token slightly toward honest-sounding completions. Only the former is actually changing maintained state.

**Implication 3: The KV cache may expose how persistent state is routed.** Keys and values that attract long-range attention may preferentially encode persistent directions. Testing this would connect residual-stream geometry to attention, the model's mechanism of moving information across positions.
