# Asset remaster

Hisar was first built with every model, icon and effect made in code. This remaster replaces the weakest procedural
pieces with generated assets, keeps every procedural builder as a fallback, and does not change game rules or balance.

- **3D models:** Higgsfield `tripo_3d` (text-to-3D, standard texture, `pbr: false`, `face_limit` 1000-1500),
  then glTF-Transform: `center --pivot below`, `resize` (256 px, 512 px for towers and the ram), `webp`.
  Orientation, size and pivot height are normalised in code (`MODEL_YAW`, `TOWER_FIT`, `HEAD_SIZE`, `applyAssets()`).
- **2D:** Higgsfield `gpt_image_2_5` (quality high, transparent background): one 4x4 icon sheet sliced with sharp
  into 16 PNGs, and one logo crest.
- **Loading:** `GLTFLoader` at start-up while the title screen shows "Loading… n/12" and Play is disabled. Any model
  that fails keeps its procedural version. From `file://` the loader is skipped (Chrome blocks fetch there) and the
  original look is used; `?noassets` forces the same fallback over http. `?auto` starts at once as before and the
  models swap in when they arrive, so bot runs stay comparable with the original.
- All shared negative prompt for models: `realistic, photoreal, base, pedestal, ground` (+ `people`, `terrain` etc. where noted).
  Shared prompt suffix: `toy-like clay look, flat simple colours, chunky proportions`.

## Done

| Asset | Category | Replaced (why) | Tool / prompt | File | Format / size / tris | QC | Integrated | Remaining issues |
|---|---|---|---|---|---|---|---|---|
| raider | enemy | box-and-cone soldier (crude up close) | tripo_3d, orchestrator pilot: low-poly raider with spear | `assets/models/raider.glb` | GLB, 256 px WebP, 67 KB, 1,457 tris | good; faces +X, turned -90° | yes | – |
| rider | enemy | box horse | tripo_3d: "Low-poly stylized medieval cavalry rider game asset, raider warrior in red tunic and pointed iron helmet riding a brown horse, horse standing on four legs, whole horse visible, …" | `assets/models/rider.glb` | GLB, 256 px, 72 KB, 1,384 tris | good; faces -Z, turned 180° | yes | – |
| shield | enemy | cylinder with a board | tripo_3d: "Low-poly stylized medieval shieldbearer soldier game asset, stocky armoured warrior in grey chainmail and round iron helmet holding a large wooden tower shield with iron rim in front of him, standing pose, …" | `assets/models/shield.glb` | GLB, 256 px, 72 KB, 1,331 tris | good; shield is held at his side, not in front | yes | shield side-on, reads fine from the game camera |
| ram | enemy (boss) | box wagon + prism roof | tripo_3d: "Low-poly stylized medieval battering ram siege engine game asset, wooden wagon on four wooden wheels with a sloped plank roof, a big log ram with an iron ram head sticking out of the front, …" (neg. + people) | `assets/models/ram.glb` | GLB, 512 px, 76 KB, 1,364 tris | good; ram head already +Z | yes | ram log is short and stubby; colour is a bright orange wood |
| fortress | scenery (hero) | merged boxes/cylinders | tripo_3d, orchestrator pilot | `assets/models/fortress.glb` | GLB, 1024 px, 232 KB, 5,540 tris | good; gate faces +X, turned 180°, scale 14, gate wall on x = 25 | yes | – |
| tower-archer | tower base | stone cylinder + cone roof | tripo_3d: "Low-poly stylized medieval archer watchtower game asset, round beige stone tower with a few arrow slits, wooden lookout platform on top with four wooden posts holding a red cone roof, empty platform, …" (neg. + people, terrain) | `assets/models/tower-archer.glb` | GLB, 512 px, 76 KB, 1,434 tris | good; platform at 49 % of height (measured with `tools/assets/profile.mjs`) | yes | – |
| tower-cannon | tower base | stone drum with merlons | tripo_3d: "Low-poly stylized medieval cannon bastion game asset, short wide round beige stone bastion with crenellated battlements around a flat empty top, stone buttresses, no cannon, …" (neg. + cannon) | `assets/models/tower-cannon.glb` | GLB, 512 px, 71 KB, 1,382 tris | good; floor at 77 % | yes | small striped stub on one side (texture artefact) |
| tower-tar | tower base | stone box + tripod | tripo_3d: "Low-poly stylized medieval square stone tower game asset, squat square grey-beige stone tower with four corner merlons and a flat empty top, small red banner on one side, …" | `assets/models/tower-tar.glb` | GLB, 512 px, 59 KB, 1,092 tris | ok; texture is a little muddy | yes | the old wooden tripod is gone (the cauldron sits on the roof) |
| head-archer | tower turret | cylinder bowman | tripo_3d: "Low-poly stylized medieval archer game asset, small soldier in blue tunic and pointed iron helmet holding a wooden longbow drawn forward, standing pose, …" | `assets/models/head-archer.glb` | GLB, 256 px, 52 KB, 888 tris | good; turned -90° | yes | bow is drawn to the side; tiny on screen anyway |
| head-cannon | tower turret | box carriage + cylinder | tripo_3d: "Low-poly stylized medieval cannon game asset, dark iron cannon barrel on a small brown wooden carriage with two wheels, barrel pointing forward and slightly up, …" | `assets/models/head-cannon.glb` | GLB, 256 px, 50 KB, 938 tris | good; muzzle +X, turned -90° | yes | barrel is steep, closer to a mortar |
| head-tar | tower turret | cylinder pot + cones | tripo_3d: "Low-poly stylized medieval tar cauldron game asset, round black iron cauldron full of bubbling dark tar, standing on short legs over small orange flames and logs, …" | `assets/models/head-tar.glb` | GLB, 256 px, 46 KB, 901 tris | ok; tar surface is dark, flames visible below | yes | – |
| boat | scenery | box hull + plane sail | tripo_3d: "Low-poly stylized medieval fishing sailboat game asset, small wooden boat with one mast and a cream square sail, …" (neg. + water, people) | `assets/models/boat.glb` | GLB, 256 px, 53 KB, 916 tris | good | yes | – |
| icon sheet | UI | OS emoji (💰 ❤️ ⚔️ 🏹 💣 🔥 🗡️ 🐎 🛡️ 🐏 ⬆ 🎯 🏆 🔊 🔇 🏰): inconsistent per platform, 💣 anachronistic, 🐏 a pun | gpt_image_2_5 2k transparent: "Game UI icon sheet: exactly 16 icons arranged in a strict 4 by 4 grid … chunky stylized medieval game icons, soft painted clay look, thick dark brown outline, warm palette …" (coins, heart, crossed swords, longbow, cannon, cauldron over fire, curved sword, horse head, round shield, battering ram, gold arrow, archery target, trophy, speaker, muted speaker, castle tower) | `assets/ui/icons/*.png` (gold, lives, wave, archer, cannon, tar, raider, rider, shield, ram, upgrade, target, trophy, sound-on, sound-off, fortress) | 16 × PNG 96 px, 4-9 KB each | good; glow removed (alpha < 70 → 0) and specks from neighbour cells dropped | yes (top bar, build cards, tower panel, wave preview, title, sound button) | `fortress` icon not used yet |
| logo crest | UI | 🏰 emoji | gpt_image_2_5 1k transparent: "Game logo emblem … heraldic shield-shaped crest showing a chunky cream stone castle with two round towers with terracotta red cone roofs and a small orange flag, golden rim around the shield, crossed spear behind …, no text" | `assets/ui/logo.png`, `assets/ui/favicon.png` | PNG 256 px (28 KB), 64 px favicon | good | yes (title card, game-over card, top bar, favicon) | – |

Also changed in code, no credits: particles use a soft round sprite (canvas texture) instead of hard squares; the
pause / play button is a small inline SVG; the wave button reads "Start" / "Başlat" before the game instead of "—";
level 2 towers get a pennant and level 3 a gold band on the new models (plus slightly taller and wider bases).

## Failed / rejected

| Asset | Tool / prompt | Why rejected |
|---|---|---|
| tent | tripo_3d: "Low-poly stylized medieval army camp tent game asset, conical cloth tent in plain cream canvas with a wooden centre pole sticking out of the top and an open entrance flap, …" (5 credits) | lumpy, crumpled pear shape; worse than the clean procedural cone. Not integrated, file deleted. |

## Not started

- Trees (280 instances) and rocks (70): kept procedural on purpose, too many instances for textured models.
- Projectiles (arrows, cannonballs, tar), pads, terrain, water: procedural is fine at this size.
- Audio: no generation model available for standalone sound; the synthesised Web Audio sounds stay.

## Credits

Higgsfield balance 302.78 → 243.53: **59.25 credits** for this pass (11 × tripo_3d at 5, icon sheet 2.75, logo 1.5),
within the 70-credit budget. The raider and fortress pilot (about 10 credits) was spent by the orchestrator before.

## Verification

- Real GPU (Intel UHD, i5-10210U), headless Chrome, 1280×720, `?auto&debug&sim=480`: before 31 draw calls / 52 k tris,
  60 fps; after 37 draw calls / 84-94 k tris, 60 fps. At `sim=900` (wave 13): before 33 / 55 k, after 42 / 105 k, 60 fps.
- Bot run `?auto&debug&sim=2000`: same result as the original build (the bot falls on wave 15 with the same 13 towers in both), 0 JS errors.
- `file://`: runs with the procedural look and no console messages; icons still show.
