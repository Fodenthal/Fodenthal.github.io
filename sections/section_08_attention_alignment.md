## Attention alignment is robust and concentrated in late layers

Section 7 established that the persistent directions have positive M0 excess, meaning their
attention alignment is not fully explained by shared residual anisotropy. Here I
report how robust that excess is and where in the network it comes from.

The excess survives across all five residual-PCA control settings I tested
($k \in \{0, 16, 32, 64, 128\}$ principal components removed before computing
alignment). The estimated $\Delta E_{\text{attn}}$ ranges from 0.081 to 0.107 across
these settings, and the bootstrap 95% confidence intervals exclude zero at every
level (see appendix, @fig-alignment-controls). Removing more of the residual PCA
structure does not close the gap; if anything, the excess becomes more stable at
higher $k$, where the residual directions are more cleanly orthogonalized from the
dominant variance structure. The attention-specific geometric coupling of the
persistent directions is not a residual-anisotropy artifact at any tested control
strength.

The signal is concentrated in the latter portion of the network. Breaking down M0
excess by layer, the attention excess is positive and robust in layers 10, 11, and 12,
which are the last three layers before the hook point, and weakest or absent in earlier
layers (see appendix, @fig-m0-by-layer). Layer 11 shows strong attention excess at
every control setting; layer 12 shows the strongest excess after residual-PCA control
is applied. This late-layer concentration is consistent with a picture in which
persistent geometric organization accumulates as information moves through the network,
rather than being established in early layers and preserved unchanged.

MLP block outputs show a different pattern. Raw MLP excess is not positive, but
after stronger residual-PCA controls ($k = 32$–$128$), a secondary late-layer MLP
signal becomes detectable, particularly in layers 10–12. I report this without
overinterpreting it: MLP involvement is plausible, but attention is the primary and
more robust geometric signal at every control level.

What all of this establishes is geometric in nature. The persistent directions point
in similar directions to where late attention heads write into the residual stream,
and that similarity is not explained by shared high-variance geometry. This does not
mean those heads create, maintain, or route the persistent signal. That is a causal
question, and the geometric alignment result does not answer it. The next section
addresses what I was and was not able to establish causally.
