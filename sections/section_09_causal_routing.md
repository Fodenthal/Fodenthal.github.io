## What I could not establish: causal routing

The geometric results in sections 6–8 raise a natural next question: do the attention
heads whose outputs align with the persistent directions actually cause or maintain
that persistence? Establishing this requires moving from geometry to intervention:
measuring what happens to the persistent directions when specific heads are perturbed,
or testing whether identified heads systematically route the persistent signal across
token positions. I ran two tests toward this goal. Neither produced claim-level
evidence.

The first was a locked transport test (M3): I asked whether the attention heads most
geometrically aligned with the persistent directions route those directions' projections
across positions more than matched control heads do. The locked result was negative at
the group level: the aligned-head group did not beat same-layer random controls. This
does not mean the aligned heads play no causal role; it means that geometric alignment,
as identified by the Stage 06 procedure, does not cleanly predict transport specificity
at the group level. Some random-control heads matched or exceeded the transport signal
of the aligned-head candidates.

Per-head exploratory analysis identified L12H7 and L12H6 as individually interesting:
both show head-specific transport structure consistent with support and suppressive
roles respectively. A separate exploratory ablation (M1-lite) found that ablating
L12H7 and L11H0 reduced held-out persistence, while ablating L12H6 increased it. These
patterns are suggestive of specific causal roles. They are not claim-level evidence
because the head sets were selected from validation-stage diagnostics after the locked
test ran, so the analysis is post-hoc, and the results cannot be treated as prospectively
confirmed.

The clean boundary is this: the geometric results in sections 3–8 are supported by
locked experiments on held-out data. The causal routing question is open. Answering
it requires a prospectively locked follow-up with head sets declared before any
validation data are examined, which is the planned next step for this line of work.
