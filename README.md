# Unifi Digital Acquisition Team — website

A one-page team showcase built from the Figma file *Unifi Team Website Revised*.
It's plain HTML, CSS and JavaScript: no installs, no build step, nothing to compile.

---

## The 30-second version

| I want to…                                   | Open this file                 |
| -------------------------------------------- | ------------------------------ |
| Change people, quotes, numbers, achievements, photos or the scrapbook | **`content.js`** |
| Add or swap a picture                         | the **`images/`** folder       |
| Change a fixed heading or paragraph           | `index.html`                   |

1. Open **`content.js`** in any text editor (Notepad works; [VS Code](https://code.visualstudio.com/) is nicer).
2. Change the words between the `"double quotes"`.
3. Save, then open **`index.html`** in your browser (double-click it). If it's already open, press **Ctrl + F5** to refresh.
4. If something is wrong, a **red box** appears at the top of the page explaining what to fix.

You never need to touch `css/` or `js/` for everyday updates.

---

## Folder map

```
index.html            the page (fixed headings and paragraphs)
content.js            ← everything you'll normally edit
favicon.ico           browser-tab icon
css/styles.css        the look (colours, sizes, animations)
js/main.js            the behaviour (builds the page from content.js)
images/
  team/<person>/      card.jpg (team card), profile.png (round popup photo), quote.png (round quote photo)
  achievements/       one landscape photo per achievement
  scrapbook/
    chapter-01/       01.jpg, 02.jpg … (up to 5 per chapter)
    chapter-02/ …
  brand/ hero/ journey/ icons/ decor/ favicon/   design artwork (rarely changes)
```

---

## Common jobs, step by step

### Update an impact number
In `content.js`, find `impact:` and change `value`, `title` or `text`.
The number counts up from 0 automatically (or from `countFrom`, if given).

### Edit someone's details
Find their block under `team:`. The top part (`name`, `persona`, `focus`, `summary`) is the card.
The `profile:` part is the popup that opens when you click the card.

### Change someone's photo
Easiest: replace the file in `images/team/<person>/` **keeping the same file name**.
Or put a new file there and update the path in `content.js`.

### Add a team member
1. Make a folder, e.g. `images/team/jane-doe/`, and put a portrait photo in it called `card.jpg`.
2. In `content.js`, copy one whole person block under `team:` — from its `{` to its `},` — and paste it where they should appear.
3. Change the text and set `card: "images/team/jane-doe/card.jpg"`.
   You can delete the `profile:` photo line; the card photo is then shown in a circle in the popup.
4. Optionally add their quote under `quotes:` (see below).

The design is built for **seven** people. With more or fewer, the cards wrap onto centred rows automatically.
Also update the wording in `index.html` that mentions seven ("MEET THE SEVEN", "Seven specialists").

### Remove a team member
Delete their block under `team:` (and their quote under `quotes:`, if they have one).

### Quotes ("Voices behind the work")
Each quote has a `name`, `text`, a card `colour` (`"navy"`, `"orange"` or `"blue"`) and a `photo`.
For the photo you can use their ready-made round `quote.png`, or simply their `card.jpg`:
it is cropped to a circle with a coloured ring automatically.
With exactly **seven** quotes they form the scattered collage from the design;
any other number shows them as a neat list instead. Long quotes shrink to fit their card.

### Add an achievement
Put a landscape photo in `images/achievements/`, then copy an achievement block in `content.js` and edit it.
The carousel takes any number of cards. It scrolls by itself (one card every 4 seconds, looping), pauses while the mouse is over it,
and stays still for visitors who have "reduce motion" turned on. With a mouse it can also be dragged (a "← Drag →" circle follows the mouse).
The speed is `SECONDS_PER_CARD` in `js/main.js`.

### Add a scrapbook chapter ("View our moments")
1. Make a folder `images/scrapbook/chapter-07/` and add **1 to 5** photos named `01.jpg`, `02.jpg`, …
2. Copy a chapter block under `scrapbook:` and change the `title`, `subtitle`, photo paths and captions.

Chapter numbers, page numbers and the little photo numbers are filled in automatically.
The page layout adapts to how many photos the chapter has (1–5).

### Change the "Behind the scenes" polaroids
Under `polaroids:` there are six blocks, one per polaroid. Each cycles through its `photos` list
every `seconds`. Give a polaroid a single photo to keep it still.

### Change a fixed heading or paragraph
Open `index.html`, press **Ctrl + F**, search for the words, and change only the text between the tags,
e.g. `<h2 …>BIG PROJECTS.<br>BIGGER IMPACT.</h2>` (`<br>` is a line break).

---

## Photo tips

| Where                       | Shape                                  | Good size         |
| --------------------------- | -------------------------------------- | ----------------- |
| Team card (`card.jpg`)      | portrait, roughly 9 : 10               | 600 × 670 px      |
| Profile popup (`profile.png`) | square, round with transparent corners (optional) | 600 × 600 px |
| Quote (`quote.png`)         | square, round with ring (optional)     | 260 × 260 px      |
| Achievement                 | landscape, roughly 8 : 5               | 900 × 560 px      |
| Scrapbook / polaroid        | any; it's cropped to fit               | ≤ 1600 px wide    |

- Keep each photo **under about 1 MB**. Phone photos are often 5–10 MB; shrink them first
  (Windows *Photos → Resize*, or any online image compressor).
- Name files in **lowercase-with-dashes**, no spaces: `jane-doe`, not `Jane Doe`.
- **Capital letters matter once the site is online.** `Card.JPG` and `card.jpg` both work on your PC,
  but only the exact match works on the web server. Copy file names exactly.

---

## Editing `content.js` without breaking it

`content.js` is a list of blocks. The rules are few:

- Text goes **inside double quotes**: `title: "IMPAK BIZ",`
- Items in a list are separated by **commas**. A comma after the last item is fine.
- Every `{` needs a matching `}` and every `[` a matching `]`. Copying whole blocks keeps them matched.
- A line break inside text is `\n`. A blank line is `\n\n`.
- If your text itself contains a double quote, write it as `\"`. Apostrophes (`'` or `’`) are fine as they are.
- Lines starting with `//` or between `/*` and `*/` are notes for humans and are ignored.

If the page shows **"content.js couldn't be read"**, there's a typo, usually a missing comma or quote.
Press **F12 → Console**: it names the line number. Undo your last change if in doubt.

---

## Publishing

There is no build step. Upload or commit the changed files (`content.js`, new images, etc.) to wherever the
site is hosted. If it's served from this GitHub repository (e.g. GitHub Pages), committing to the main branch
updates the site.

---

## For developers

- **Content rendering:** `js/main.js` reads `window.SITE_CONTENT` (from `content.js`) and builds the impact tiles,
  team cards + profile popups, quotes, achievements, polaroids and scrapbook. Problems found while reading it
  are listed in the red box and in the console. `content.js` is a script rather than JSON so the site also works
  when opened straight from disk (`file://`), where browsers block loading `.json` files.
- **Design layout presets** (card tilts and offsets, collage positions, polaroid spots, scrapbook spots) live at the
  top of `js/main.js` (`TEAM_SLOTS`, `QUOTE_SLOTS`, `POLAROID_SLOTS`, `SNAP_SLOTS`), taken from the Figma frame.
- **Collage scaling:** elements with `data-fit="<design width>"` are scaled down with CSS `zoom` to fit narrower screens.
- **Entrance animations:** elements with `data-reveal` animate in when their `data-seq` group scrolls into view.
  `data-reveal` picks the motion (`pop`, `drop`, `write`, `slide`…), `data-delay` / `data-stagger` / `data-start`
  (milliseconds) set the timing. Everything is visible without JavaScript and for people who prefer reduced motion.
- **Fonts:** Archivo Black, Roboto, Caveat and Plus Jakarta Sans from Google Fonts (needs an internet connection).
