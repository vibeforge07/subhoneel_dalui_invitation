# Images + video for Biyer Card (Rajbari theme)

## Status

- **On the page now:** all of Rounds 1–3 except the videos. Stage (closed + open, wide + tall), couple, bride, groom, gold frame, garland, roses, vase, chandelier, petal, damask, parchment, five Kolkata photos, four event pictures, venue, closing.
- **Videos, all in use:** `video (2)` / `video (3)` are the cover (curtains part when the guest taps, trimmed to 7.9 s: `opening-wide.mp4`, `opening-tall.mp4`; their first frames are the cover images). `video (4)` / `video (5)` are the living hero background, seamless 8.5 s loops (`hero-tall.mp4`, `hero-wide.mp4`). The opening dissolves into the loop 1.3 s before it ends. Originals stay in `assets/raw_videos/`.
- **Note:** all four videos carry Gemini's visible sparkle watermark (✦) near the bottom-right corner. To get rid of it, regenerate them with a plan or tool that doesn't add a visible mark, using the same prompts and frames.
- **Still optional:** the **Round 4** gold illustrations, the **Round 5** wedding-card art and the **Round 6** white alpona at the bottom of this file.
- Your original files are kept in `assets/_raw/` (not uploaded to GitHub). The page uses the cleaned `.webp` copies. When you add a new picture, drop it in `assets/` and tell me; I'll clean and convert it.

Every prompt below is complete on its own: copy the whole block, paste, generate.
Save each result in `assets/` with the file name shown (any format: png / jpg / webp / mp4). I convert, compress, cut backgrounds and grab frames myself.

**Tools**
- Images: **Gemini** gives exact 16:9 / 9:16 and keeps faces the same across pictures. **ChatGPT** gives real transparent PNGs (it makes 3:2 instead of 16:9, which is fine, I crop).
- Video: **Kling** (free daily credits, "Start & End frames") or **Google Flow** ("Frames to video"). If your tool takes only one picture (Gemini app's Veo), give it the closed-curtain picture; I'll take the last frame of the video for the page.

**Order matters:** make `stage-open-wide` first, then *edit that same image* into `stage-closed-wide`. That keeps the two frames identical, so the video can go from one to the other. For the bride, groom and later photos, attach `couple` so the faces stay the same.

---

## ROUND 1: the opening + bride and groom (do these first)

### 1. `stage-open-wide` (16:9)
```
Wide 16:9, perfectly symmetrical front view of a grand old Kolkata rajbari hall turned into a wedding stage. A tall gilded carved arch in the centre; heavy crimson velvet curtains pulled open and tied back on both sides; every crystal chandelier lit with warm golden light; black-and-white checkered marble floor scattered with rose petals. Keep the middle band of the picture (from 25% to 75% of the height, across the centre and both sides) calm and darker, because a portrait frame and large gold names will be placed there. Put the richness at the top (chandeliers, swags of red roses and tuberose), at the bottom (banks of red roses, brass vases, the checkered floor) and at the far left and right edges (columns wrapped in rose garlands). No people. Style: royal Bengali wedding inside an old Kolkata rajbari (heritage palace); deep oxblood and crimson red, antique gold, warm ivory; dark velvety crimson roses (never pink or orange), white rajnigandha (tuberose) strings, crystal chandeliers, brass lamps, warm candlelight, rich shadows; photorealistic, cinematic, very detailed. No text, no letters, no logos, no watermark.
```

### 2. `stage-closed-wide` (16:9): edit image 1
```
Edit the previous image. Keep the exact same hall, arch, decorations, camera angle and framing. Change only two things: close the crimson velvet curtains so the two halves meet exactly at the vertical centre line and hide the stage behind them; and switch every chandelier off so the hall is dim and moody, with just a thin warm line of light glowing through the gap between the curtains. Same 16:9 size. No people, no text, no watermark.
```

### 3. `stage-open-tall` (9:16)
```
Recreate the open, lit wedding stage from the previous image as a tall 9:16 portrait: the same old Kolkata rajbari hall, gilded arch, open crimson curtains, lit crystal chandeliers, red roses, tuberose strings and black-and-white checkered floor, perfectly symmetrical. Keep the area from 20% to 75% of the height calm and darker, because a portrait frame and names go there. No people. Photorealistic, cinematic, warm candlelight, deep crimson and antique gold. No text, no letters, no watermark.
```

### 4. `stage-closed-tall` (9:16): edit image 3
```
Edit the previous 9:16 image. Keep everything identical, but close the crimson velvet curtains so they meet exactly at the vertical centre line, and switch the chandeliers off so the hall is dim, leaving only a thin warm line of light in the gap between the curtains. No people, no text, no watermark.
```

### 5. `couple` (4:5)
```
Portrait 4:5. Editorial wedding photograph of a Bengali bride and groom standing side by side, waist-up, close together, looking at the camera with soft warm smiles. Bride, early twenties: red Banarasi silk saree with a gold zari border, heavy antique gold jewellery, a nath (nose ring), a white shola mukut (crown) on her head, small white chandan dots above her eyebrows, red bindi, red-and-white shankha-pola bangles. Groom, late twenties: cream silk panjabi, a deep red silk shawl over one shoulder, a tall white conical shola topor on his head, chandan dots on his forehead. Background: softly blurred old Kolkata rajbari interior with chandelier bokeh in deep red and gold. Natural skin texture (not airbrushed), sharp faces, 85mm lens look, warm light. Centred, with a little space above their heads. Photorealistic. No text, no watermark.
```

### 6. `bride` (4:5): attach `couple`
```
Use the attached photo. The same bride: same face, same red Banarasi saree, jewellery and white shola mukut. Solo portrait 4:5, waist-up, body turned slightly, eyes to the camera, holding a single dark red rose near her chest. Soft window light from the left, blurred rajbari arches and a crystal chandelier behind. Photorealistic, natural skin texture. No text, no watermark.
```

### 7. `groom` (4:5): attach `couple`
```
Use the attached photo. The same groom: same face, same cream silk panjabi, red shawl and white shola topor. Solo portrait 4:5, waist-up, body turned slightly, gentle confident smile, holding a thick garland of dark red roses and white tuberose in both hands. Soft warm light, blurred rajbari arches and a crystal chandelier behind. Photorealistic, natural skin texture. No text, no watermark.
```

### 8. `opening-wide` (video, 16:9, 5–10 seconds)
Start frame: `stage-closed-wide`. End frame: `stage-open-wide`.
```
The heavy crimson velvet curtains slowly part from the centre and draw back to both sides, revealing the royal wedding hall behind them. As they open, the crystal chandeliers switch on one by one and warm golden light fills the hall; a few red rose petals drift down. Very slow, smooth camera push-in. Elegant and cinematic. No people, no text. The last second holds still on the fully lit stage.
```
Negative prompt (if the tool has the box):
```
people, faces, hands, text, letters, watermark, logo, camera shake, fast motion, morphing, flicker, distortion, blur
```

### 9. `opening-tall` (video, 9:16)
Same prompt and negative prompt as 8, start frame `stage-closed-tall`, end frame `stage-open-tall`.
If your tool can't do 9:16, skip it: phones will use the wide video cropped to the middle, and the curtains part right there anyway.

---

## ROUND 2: decoration

Transparent ones: in ChatGPT keep the last sentence as it is. In Gemini it will draw the blue background instead, which I cut out.

### 10. `frame-gold` (4:5, transparent)
```
An ornate antique gilded picture frame, heavy carved Baroque-Indian style, rectangular, portrait 4:5, front view. A lush cluster of dark crimson roses, buds and white tuberose rests on its top-left and bottom-right corners. The inside of the frame is completely EMPTY with no picture: a clean opening about 72% of the frame's width and 76% of its height. Photorealistic, warm light, rich detail. No text, no watermark. Transparent background (PNG), including inside the opening. If transparency isn't possible, use a flat pure blue #0000FF background (also inside the opening) with nothing else on it.
```

### 11. `garland` (wide, transparent)
```
One single horizontal garland that runs across the full width of the image, edge to edge, gently wavy: a thick rope of dark velvety crimson roses, two strings of white tuberose buds, small green leaves and tiny gold beads. Straight-on view, lots of empty space above and below it. Photorealistic, rich detail, warm light. No text, no watermark. Transparent background (PNG). If transparency isn't possible, use a flat pure blue #0000FF background with nothing else on it.
```

### 12. `roses-corner` (1:1, transparent)
```
A big lush cluster of dark velvety crimson roses, buds, dark green leaves and a few hanging white tuberose strings, growing out of the TOP-LEFT corner of a square image: dense in the corner, thinning towards the centre, the rest of the image empty. Photorealistic, rich detail, warm light. No text, no watermark. Transparent background (PNG). If transparency isn't possible, use a flat pure blue #0000FF background with nothing else on it.
```

### 13. `vase` (3:4, transparent)
```
A tall engraved antique brass vase overflowing with dark velvety crimson roses, buds, leaves and a few long white tuberose stalks arching out. Straight-on, centred, the whole vase visible including its base, portrait 3:4. Photorealistic, warm light, rich detail. No text, no watermark. Transparent background (PNG). If transparency isn't possible, use a flat pure blue #0000FF background with nothing else on it.
```

### 14. `chandelier` (3:4, transparent)
```
A single ornate crystal chandelier with lit candles and hanging crystal drops, glowing warmly, hanging from a short gold chain at the top edge of the image. Straight-on view, portrait 3:4. Photorealistic, rich detail. No text, no watermark. Transparent background (PNG). If transparency isn't possible, use a flat pure blue #0000FF background with nothing else on it.
```

### 15. `petal` (1:1, transparent)
```
One single dark crimson rose petal, slightly curled, velvety, seen from above, sharp focus, soft light, square image. Nothing else in the picture. Transparent background (PNG). If transparency isn't possible, use a flat pure blue #0000FF background with nothing else on it.
```

### 16. `damask` (1:1, seamless tile)
```
Seamless tileable wallpaper texture, square: deep oxblood red (#3a0a12) silk with a subtle antique-gold Mughal damask / ogee pattern, slightly worn sheen, even lighting, no vignette, no shadows, flat front view. It must repeat without a visible seam. No text.
```

### 17. `parchment` (3:4)
```
Top-down photo of one sheet of aged ivory handmade cotton paper, portrait 3:4, with soft deckled (torn) edges and a thin antique-gold border line printed near the edge, very subtle fibres, even soft light, on a plain dark background. No text, no watermark.
```

---

## ROUND 3: the story (Kolkata photos, events, venue, closing)

### 18–22. `kolkata-1` … `kolkata-5`: attach `couple` each time
```
Use the attached photo: the same bride and groom, same faces, now in casual ethnic clothes (she in a cotton saree, he in a kurta). Portrait 4:5. They are sitting on the steps of Prinsep Ghat at golden hour, the Vidyasagar Setu bridge behind them, laughing. Natural candid pre-wedding photograph, warm light, photorealistic. No text, no watermark.
```
For the other four, change the size and the scene sentence:
- `kolkata-2` (3:2): `They are browsing old books at a College Street pavement book stall, warm afternoon light.`
- `kolkata-3` (3:2): `They are in a wooden country boat on the Hooghly river at sunset, Howrah Bridge behind them.`
- `kolkata-4` (4:5): `They are walking on the Victoria Memorial lawns on a winter afternoon; she has a shawl around her shoulders.`
- `kolkata-5` (4:5): `They are on the red-oxide staircase of an old north Kolkata rajbari with green wooden shutters, playful.`

### 23. `event-ashirbad` (4:5)
```
Still life, portrait 4:5, no people: a brass plate with dhaan-durba (paddy grains and durba grass), a small bowl of sandalwood paste, a lit brass diya and a few dark red roses on red silk. Shallow depth of field, warm candlelight, deep crimson and antique gold, photorealistic. No text, no watermark.
```

### 24. `event-holud` (4:5)
```
Still life, portrait 4:5, no people: a brass bowl of fresh turmeric paste with mango leaves, a corner of a yellow saree with a red border and two dark red roses, on an old wooden floor. Soft warm morning light, shallow depth of field, photorealistic. No text, no watermark.
```

### 25. `event-biye` (4:5)
```
Still life, portrait 4:5, no people: a white shola topor and a white shola mukut side by side on red velvet, with thick garlands of dark red roses and white tuberose and a lit brass diya. Warm candlelight, deep crimson and antique gold, shallow depth of field, photorealistic. No text, no watermark.
```

### 26. `event-boubhat` (4:5)
```
Still life, portrait 4:5, no people: a green banana leaf with white rice, a little ghee and five small fried items, beside a folded new red Banarasi saree on a brass plate. Warm light, shallow depth of field, photorealistic. No text, no watermark.
```

### 27. `venue` (3:2)
```
Landscape 3:2: an old Kolkata heritage mansion at night dressed for a wedding, white colonial facade with columns and arched windows, warm fairy lights draped across it, a red carpet up the front steps lined with brass vases of dark red roses, soft mist. No people. Photorealistic, cinematic. No text, no watermark.
```

### 28. `closing` (16:9): attach `couple`
```
Use the attached photo: the same bride and groom, seen from behind, walking hand in hand into a grand old Kolkata rajbari hall lit by crystal chandeliers, rose petals on the black-and-white checkered marble floor, warm golden light ahead of them. Wide 16:9; they are small, in the centre of the frame. Photorealistic, cinematic. No text, no watermark.
```

---

## OPTIONAL: a living hero background

### 29. `hero-loop` (video, 16:9, 5 seconds). Start frame: `stage-open-wide`
```
The camera stays completely still. Only tiny movements: candle flames flicker, chandelier crystals sparkle, a few rose petals drift down slowly. Calm. No people, no text.
```
Negative prompt: same as video 8. I'll make it loop seamlessly.

---

## ROUND 4: illustrated gold art (optional, the Meenakshi-card look)

These are drawn illustrations, not photos: antique gold foil with crimson, like the ornaments on a printed luxury card. The page has a spot ready for each one and shows it as soon as the file exists. Transparent background matters for all three: in ChatGPT keep the last sentence; in Gemini you'll get the blue background, which I cut out.

### 30. `lotus-gold` (1:1, transparent): flanks the "বিয়ের রাত" title
```
A lush cluster of three large lotus flowers with deep crimson-red petals edged in antique gold, gold-veined leaves and curling gold vines, drawn as a luxury Indian wedding-card illustration: gold-foil line work with a subtle 3D emboss, very detailed, warm light. The cluster grows in from the left edge and leans to the right. Nothing else in the picture, no text, no watermark. Transparent background (PNG). If transparency isn't possible, use a flat pure blue #0000FF background with nothing else on it.
```

### 31. `temples-gold` (wide 4:1, transparent): along the foot of the date arch
```
A very wide panorama of Bengal temple architecture drawn as an antique-gold engraved illustration: a nine-spired navaratna temple like Dakshineswar in the centre, curved-roof aat-chala terracotta temples on both sides of it, and a colonial rajbari mansion with columns at each far end, with palm and banana trees between them. Monochrome antique gold with fine line work and soft shading, like gold foil on a luxury wedding card. All buildings stand on one baseline along the bottom edge. No text, no watermark. Transparent background (PNG). If transparency isn't possible, use a flat pure blue #0000FF background with nothing else on it.
```

### 32. `peacock` (3:4, transparent): the two bottom corners of the venue page
```
A single peacock standing in profile and facing right, its long tail trailing down behind it, drawn as a luxury Indian wedding-card illustration in antique gold with deep crimson and ivory feather details: gold-foil line work, subtle 3D emboss, very detailed. Nothing else in the picture, no text, no watermark. Transparent background (PNG). If transparency isn't possible, use a flat pure blue #0000FF background with nothing else on it.
```

---

## ROUND 5: the wedding card that comes out of the envelope (optional)

The card already works with drawn pages. Each of these three replaces one drawn part as soon as the file is in `assets/`. A card page is 5:7 (portrait); Gemini's 3:4 is fine, I crop.

### 33. `card-cover` (5:7, or 3:4)
```
Front cover of a luxury Bengali wedding card, portrait 5:7, photographed flat from straight above: thick card covered in deep maroon (#5c0d1b) raw silk with a subtle tone-on-tone damask weave, a double antique-gold foil border with ornate corner filigree, and a small gold butterfly (prajapati) motif embossed near the top. The whole centre stays plain and empty so text can be printed on it later. Even soft light, slight foil sheen, crisp edges filling the whole frame, no background around the card. No text, no letters, no watermark.
```

### 34. `card-paper` (5:7, or 3:4)
```
One inside page of a luxury Bengali wedding card, portrait 5:7, photographed flat from straight above: thick ivory cotton card stock with a faint embossed paisley and damask pattern, a thin double antique-gold foil border set a little in from the edge, small gold filigree in the four corners. The middle is plain and empty so text can be printed on it later. Even soft light, very subtle paper texture, the page fills the whole frame edge to edge, no background around it. No text, no letters, no watermark.
```

### 35. `card-photo-frame` (5:6, transparent)
```
An ornate antique-gold photo frame for a Bengali wedding card, portrait 5:6: a tall arch with a rounded top and a flat bottom, carved with tiny lotus buds, beads and filigree, polished gold with a soft 3D emboss and warm highlights, the frame band fairly thin. The opening inside the arch is completely empty. Nothing else in the picture, no text, no watermark. Transparent background and transparent opening (PNG). If transparency isn't possible, use a flat pure blue #0000FF for both the background and the opening, with nothing else on it.
```

---

## ROUND 6: white alpona behind the wedding card

Two of these turn slowly on either side of the open card, behind the card and the drapes (one large one behind the card on phones). The page only uses the white of the picture, so a pure black background works as well as a transparent one. Save it as `assets/alpona.png` (square, 2048 px if the tool allows).

### 36. `alpona` (1:1, white on pure black)
```
A large circular Bengali wedding alpona seen from straight above, painted in pure white rice paste (pituli) with a fine brush and fingertip on a flat pure black background, square image, the circle filling almost the whole frame. Perfectly radially symmetric, like a mandala: a full-bloom lotus in the centre, then rings of kolka (paisley) motifs, rings of conch shells (shankha), pairs of fish facing each other, betel leaves (paan pata), paddy-ear sprigs (dhaaner shish) and creeper vines, with small dots and fine dashed lines between the rings, finished with an outer border of scalloped lotus petals. Elegant, artistic and detailed, with the slightly uneven, hand-painted edge of real rice paste, not a vector graphic. Only white and black: no colour, no grey background, no shadows, no floor texture, no hands, no text, no watermark.
```
