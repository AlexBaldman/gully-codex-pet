Create one horizontal animation strip for Codex pet `gully`, state `running-right`.

Use the attached canonical base for identity. Use the attached layout guide only for slot count, spacing, centering, and padding; do not draw the guide.

Output exactly 8 full-body frames in one left-to-right row on flat pure green #00FF00. Treat the row as 8 invisible equal-width slots: one centered complete pose per slot, evenly spaced, with no overlap, clipping, empty slots, labels, or borders.

Identity: same pet in every frame: A compact anthropomorphic Western gull beach bum with white head and belly, medium-gray folded wings, charcoal wing tips and tail, orange-gold beak and legs. Permanent oversized dark sunglasses with warm magenta frames sit low on his beak so he can peer over them with tired bloodshot eyes and a knowing crooked smirk. He always wears an ostentatious thick gold chain with a large gold triangle pendant containing a single bloodshot, hungover-looking eye motif. He always carries a short clear rocks glass of dark rum-and-cola with ice in his right wing and keeps a slowly smoked hand-rolled joint at the corner of his beak; the ember may be lit or out but no detached smoke cloud. Thugged-out, shameless, sly, sun-baked, dryly funny, slightly rumpled, but charming and helpful. Props are part of identity and remain attached and consistent in every pose.. Preserve silhouette, face, proportions, markings, palette, material, style, and props.
Style: Pet-safe sprite: compact full-body mascot, readable in a 192x208 cell, clear silhouette, simple face, stable palette/materials, and crisp edges for chroma-key extraction. Style `pixel`: Pixel-art-adjacent digital mascot with a chunky silhouette, simple dark outline, limited palette, flat cel shading, and visible stepped edges. User style notes: Premium high-resolution pixel art with hand-placed clusters, crisp dark navy-brown outline, selective anti-aliasing, tactile feather volume, and compact proportions matching built-in Codex pets. Blend Hoots-like sprite readability with the neon cyan/magenta rim-light, sunglasses attitude, expressive brow, and rich host polish of current Jeopardish art. Keep the seagull small and cute, not human-bodied. Core palette: coastal white, gull gray, charcoal, orange-gold, heavy gold jewelry, smoky magenta sunglasses, dark cola; restrained cyan and magenta rim lighting only. All items must remain bold and readable after reduction to a 192x208 pet cell..
Animation continuity: keep apparent pet scale and baseline stable within the row unless the state itself intentionally changes vertical position, such as `jumping`. Move the pose within the slot instead of redrawing the pet larger or smaller frame to frame.

State action: Dragging-right loop: show directional movement to the right through body and limb poses only.

State requirements:
- Show directional drag movement to the right through body, limb, and prop movement only.
- The row must unmistakably face and travel right.
- The movement cadence must alternate visibly across the 8 frames instead of repeating one nearly static stride.
- Do not draw speed lines, dust clouds, floor shadows, motion trails, or detached motion effects.

Clean extraction: crisp opaque edges, safe padding, no scenery, text, guide marks, checkerboard, shadows, glows, motion blur, speed lines, dust, detached effects, stray pixels, or chroma-key colors inside the pet.
