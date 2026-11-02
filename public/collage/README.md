# Personal hero photographs

The hero uses exactly three local photos, with a CSS placeholder for each file
that has not been added. No stock images or external requests are used.

Place your files in this folder:

| File | Position | Display crop |
| --- | --- | --- |
| `personality.jpg` | Photo 01: main, largest | Portrait, 4:5 |
| `interests.jpg` | Photo 02: behind the main photo | Portrait, 10:11 |
| `achievements.jpg` | Photo 03: lower right | Landscape, 6:5 |

Then edit `src/data/collagePhotos.js`:

- Set each `alt` to an accurate, meaningful description of your actual photo.
- Set `caption` to your own short caption, or leave it empty. Captions appear
  below the image and are always available without clicking or hovering.
- Adjust `objectPosition` (for example, `"50% 30%"`) if the crop misses the subject.
- If you use a different filename or format, update its `src` to
  `"/collage/your-filename.webp"`, for example. Keep the three entries in order.

Supported extensions: lowercase `.jpg`, `.jpeg`, `.png`, `.webp`, and `.avif`.
Use optimized files, preferably around 800–1200 pixels on the longest edge and
under 300 KB each. Keep captions short to preserve the layered composition.

The development server detects newly added files automatically. A production
build discovers the available images at build time, so rebuild after adding or
replacing photos. Missing files make no image request; a file that cannot decode
also falls back to its placeholder without displaying a broken-image icon.
