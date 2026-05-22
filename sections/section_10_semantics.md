## What the persistent directions appear to encode

The geometric results tell us that the persistent directions exist, where they live in
the residual stream, and something about their relationship to attention-head geometry.
They do not tell us what information those directions carry. As a first pass, we
collected the highest-activating token windows for each of the top-31 directions from
the validation split and read them — a qualitative exercise we call a semantic dossier.
These are hypothesis-generating observations, not validated labels.

The clearest pattern is what the directions are not. They do not look like clean
single-topic features of the kind that might fire on sports text or cooking text across
any document that happens to mention those subjects. They look more like persistent
document-state axes: directions that stay highly activated across long stretches of a
document because the document's register, formatting conventions, or source template
remain constant, not because a particular word or concept keeps recurring
(@fig-semantic-spans).

Several directions have recognizable tentative patterns. The highest-lifetime direction
(rank 1, $\tau$ = 492) activates consistently on technical and instructional prose —
device configuration, software documentation, networking setup — and on the opposite
end of its range, narrative, historical, and devotional text. Rank 3 activates on
SEO-style product and catalog repetition; rank 5 on transactional and policy text
(refund policies, supplier codes, terms of service); rank 9 on religious and scriptural
prose; rank 29 on recipes and food writing; rank 31 on legal and regulatory text
including GDPR-style disclosures. Others are harder to label cleanly from the sampled
windows alone.

The span structure is consistent with the lifetime results. High-activation windows
for these directions tend to be contiguous and long — the direction stays elevated
across entire sections or documents rather than spiking at individual tokens and
returning to baseline. A direction that activates on legal boilerplate stays activated
for the entire clause structure of a legal document, not just at the word "hereinafter."
This is what a document-register axis would look like, and it is consistent with
autocorrelation lifetimes in the range of tens to hundreds of token positions.

One direction warrants a separate note. Direction 11 is the single PCA probe in the
top-31. Its activation scale is an order of magnitude larger than the time-lagged
directions, and its top windows include document boundaries and formatting artifacts.
It likely reflects broad residual variance and formatting structure rather than the
kind of document-register state the time-lagged directions appear to track, and should
not be interpreted alongside them.

These observations are grounded in the validation split only, and the labeling method
is coarse — keyword and density checks on small samples of top-activated windows.
The labels are noisy, overlapping, and in several cases not stable enough across
samples to report with confidence. The honest summary is that the persistent subspace
appears to track durable document register and source-template state rather than
local lexical content, but that characterization has not been validated against
held-out data with predeclared labels. That validation is the most direct next step
for strengthening the semantic interpretation.
