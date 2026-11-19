# Client photos with AI (ChatGPT)

The client sends a few raw photos of the bride and the groom. ChatGPT turns them into every photo the site shows, with their real faces. Everything else on the site (stage, roses, frames, event pictures) stays the same for every client.

## What to ask the client for (raw photos)

- **Bride:** 3 to 5 clear photos. One straight face photo in daylight, one from the side, one full-length. No sunglasses, no heavy filter, no beauty app.
- **Groom:** same, 3 to 5 clear photos.
- **Together:** 1 or 2 photos of them together if they have one (helps with height and how they stand together).

More angles give a better likeness. Blurry, dark or filtered photos make the face drift.

## The photos the site needs

| # | File name | Shape | Where it shows on the site |
|---|---|---|---|
| 1 | `couple` | 4:3 landscape | first page, inside the gold frame; also on the printed wedding card |
| 2 | `bride` | 3:4 portrait | "The Bride" arch |
| 3 | `groom` | 3:4 portrait | "The Groom" arch |
| 4 | `kolkata-1` | 4:3 landscape | story gallery, photo 1 |
| 5 | `kolkata-2` | 3:2 landscape | story gallery, photo 2 |
| 6 | `kolkata-3` | 3:2 landscape | story gallery, photo 3 |
| 7 | `kolkata-4` | 4:3 landscape | story gallery, photo 4 |
| 8 | `kolkata-5` | 4:3 landscape | story gallery, photo 5 |
| 9 | `closing` | 3:4 portrait | last page, "আসবেন কিন্তু" arch |

Optional: `venue` (3:2). Use the real venue photo if the client has one; the prompt is at the end.

Not needed from the client: the stage, the event pictures (আশীর্বাদ, গায়ে হলুদ, বিয়ে, বৌভাত), the roses, frames, chandelier and alpona. They have no faces and stay as they are.

## How to run it in ChatGPT

1. Open **one new chat** and keep all 9 photos in that same chat, so ChatGPT remembers the faces.
2. Attach all the raw photos and paste **Step 0** first.
3. Then paste the prompts **in order**, one per message. Make `couple` first and get it right before moving on, because every later photo is matched to it.
4. If a face drifts, reply: `The face changed. Use the raw photos again and keep exactly the same face, then redo this image.`
5. Download each picture and name it with the file name from the table (e.g. `bride.png`). Send them to me and I convert, crop and put them on the site.

Replace the parts in `[square brackets]` if the client wants something different (saree colour, places). If not, paste as it is.

---

## Step 0: set the rules (paste first, with all raw photos attached)

```
I am making a Bengali wedding invitation website. I have attached real photos of the bride and the groom. You will make several photos of this same couple for me, one per message.

Rules for every image in this chat:
- Keep their real faces exactly: same face shape, eyes, nose, lips, eyebrows, jawline, teeth, hairline, skin tone and body build. They must be clearly recognisable to their own family.
- Do not beautify, slim, lighten the skin or change age. Natural skin texture, no plastic or airbrushed look.
- If the groom has a beard, moustache or glasses in the photos, keep them. Same for the bride's glasses or nose piercing.
- The woman in the photos is the bride and the man is the groom.
- Photorealistic, like a real professional Bengali wedding photographer's work. Warm, rich colours.
- No text, no logo, no watermark, no frame or border in any image.

Reply "ready" and wait for my first image prompt.
```

---

## 1. `couple` (4:3 landscape)

```
Image 1. Landscape 4:3.
An editorial wedding portrait of the bride and groom from the attached photos, standing side by side and close together, waist-up, both looking at the camera with soft, warm smiles. Keep their real faces exactly.
Bride: [red Banarasi silk saree with a wide gold zari border], heavy antique gold jewellery (necklaces, jhumkas), a nath (nose ring), a white shola mukut (crown) on her head, small white chandan dots in an arc above her eyebrows, red bindi, red and white shankha-pola bangles, alta-red fingertips.
Groom: [cream silk panjabi with fine gold embroidery], a deep red silk shawl over one shoulder, a tall white conical shola topor on his head, white chandan dots on his forehead.
Background: a softly blurred old Kolkata rajbari interior, carved arches and warm crystal chandelier bokeh in deep red and gold.
Their faces sit in the middle third of the picture with some space above the mukut and topor. 85 mm lens look, warm light from the front left, sharp eyes. Photorealistic. No text, no watermark.
```

## 2. `bride` (3:4 portrait)

```
Image 2. Portrait 3:4.
A solo portrait of the bride: same face as the attached photos and the same outfit, jewellery and white shola mukut as Image 1. Waist-up, body turned slightly to her left, eyes to the camera, a soft smile. She holds a single dark red rose in both hands near her chest.
Soft window light from the left. Background: blurred rajbari arches with a crystal chandelier glowing at the top right.
Her head and the full mukut sit in the upper part of the frame with a little space above the mukut, and her hands with the rose are fully in the frame. Keep the sides of the picture filled with background, not empty. Photorealistic, natural skin. No text, no watermark.
```

## 3. `groom` (3:4 portrait)

```
Image 3. Portrait 3:4.
A solo portrait of the groom: same face as the attached photos and the same panjabi, red shawl and white topor as Image 1. Waist-up, body turned slightly to his right, a gentle confident smile, eyes to the camera. He holds a thick garland of dark red roses and white tuberose in both hands.
Soft warm light. Background: blurred rajbari arches, cream pillars and a crystal chandelier glowing at the top left.
His head and the full topor sit in the upper part of the frame with a little space above the topor, and the garland is fully in the frame. Keep the sides of the picture filled with background, not empty. Photorealistic, natural skin. No text, no watermark.
```

## 4 to 8. The story gallery (pre-wedding shoot)

These are their "pre-wedding" photos around Kolkata. Same faces, but casual ethnic clothes, no wedding jewellery. If the client wants other places (their college, the café where they met, Darjeeling, Puri beach), just swap the place sentence.

### 4. `kolkata-1` (4:3 landscape)

```
Image 4. Landscape 4:3. A candid pre-wedding photograph of the same couple, same faces as the attached photos.
Clothes: she wears a [soft yellow handloom cotton saree with a thin red border] and small silver earrings; he wears a [white cotton kurta with rolled sleeves].
Place: [sitting on the old stone steps of Prinsep Ghat at golden hour, the Vidyasagar Setu bridge and the Hooghly river behind them]. They are laughing at something, turned towards each other.
Natural, unposed, warm low sun, light film-like colours. Both faces clearly visible. Photorealistic. No text, no watermark.
```

### 5. `kolkata-2` (3:2 landscape)

```
Image 5. Landscape 3:2. Same couple, same faces, same style of casual ethnic clothes (a different saree and kurta colour from Image 4).
Place: [at a College Street pavement book stall, stacks of old books around them; she reads a page of an old book aloud while he leans in, smiling], warm afternoon light.
Candid, natural, both faces clearly visible. Photorealistic. No text, no watermark.
```

### 6. `kolkata-3` (3:2 landscape)

```
Image 6. Landscape 3:2. Same couple, same faces, casual ethnic clothes.
Place: [sitting together in a wooden country boat on the Hooghly river at sunset, Howrah Bridge silhouetted behind them, orange sky reflected on the water]. Her head rests on his shoulder.
The couple fills the left or right third of the frame and the bridge is clearly visible. Cinematic, warm, photorealistic. No text, no watermark.
```

### 7. `kolkata-4` (4:3 landscape)

```
Image 7. Landscape 4:3. Same couple, same faces.
Clothes: winter look. She wears a [maroon saree with a cream Kashmiri shawl around her shoulders]; he wears a [kurta with a brown Nehru jacket].
Place: [walking hand in hand on the green lawns of the Victoria Memorial on a soft winter afternoon, the white marble dome behind them]. They look at each other, mid-step.
Candid, soft light, both faces visible. Photorealistic. No text, no watermark.
```

### 8. `kolkata-5` (4:3 landscape)

```
Image 8. Landscape 4:3. Same couple, same faces.
Clothes: she wears a [red and white Bengali taant saree]; he wears a [white dhoti-panjabi].
Place: [on the red-oxide staircase of an old north Kolkata rajbari with green wooden shutters and a courtyard]. Playful: she is one step above him, pulling his hand, both laughing.
Warm daylight, candid, both faces visible. Photorealistic. No text, no watermark.
```

## 9. `closing` (3:4 portrait)

```
Image 9. Portrait 3:4.
The same bride and groom in their wedding clothes from Image 1, seen from behind, walking hand in hand away from the camera into a grand old Kolkata rajbari hall lit by crystal chandeliers. Red rose petals on a black and white checkered marble floor, warm golden light ahead of them.
Keep her red saree, the white mukut, his cream panjabi, red shawl and white topor exactly as in Image 1, so the family knows it is them.
They are in the centre of the frame and fill about half of its height; the chandelier and the hall fill the top. Photorealistic, cinematic. No text, no watermark.
```

## Optional: `venue` (3:2 landscape)

Best: ask the client for a real photo of the venue. If they only have a poor one, attach it and paste:

```
Landscape 3:2. Use the attached photo of the wedding venue. Make it a clean, beautiful evening photograph of the same building: same shape, same entrance and the same name board if there is one. Add warm fairy lights and marigold garlands on the entrance, a little blue-hour sky. Do not invent a different building. Photorealistic. No people in front, no text added, no watermark.
```

---

## After generating: what to tell the client

Along with the photos, collect the story captions for the 5 gallery photos (a few words each, e.g. "প্রথম দেখা"). The place name under each photo comes from what you used in the prompt.
