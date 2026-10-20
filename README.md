# 🏰 Hisar · Fortress Defense

**[▶ Play in your browser](https://furkiozknn.github.io/kale-savunmasi/)** · English & Türkçe · desktop & mobile · free, no install

🏟️ Part of **[Claude Game Arena](https://github.com/Furkiozknn/claude-game-arena)**: four games, each built by a different Claude model. This is game #1, built by **Claude Opus 5.5**; assets remastered by **Claude Opus 5.5 (orchestrator)**. [See all games and the scorecard →](https://furkiozknn.github.io/claude-game-arena/)

🎮 **Godot 4 remake (round 2):** [play](https://furkiozknn.github.io/hisar-godot/) · [code](https://github.com/Furkiozknn/hisar-godot), rebuilt by the same model in a real game engine.

![Gameplay clip](docs/gameplay.gif)

A low-poly 3D tower defense game in a **single `index.html`** (Three.js, no build step) plus a small folder of generated models and icons.
An army marches on a seaside fortress along two roads. Build towers on the stone pads, upgrade them,
and hold the walls for 15 waves. Then see how long you last in endless mode.

![Battle at the road junction](docs/closeup.png)

## Features

- **3 towers × 3 levels:** 🏹 Archer Tower (fast single-target arrows), 💣 Cannon Bastion (ballistic shots with a predicted
  landing point and splash damage), 🔥 Tar Cauldron (slows, burns over time, leaves sticky tar on the road).
- **4 enemy types:** Raiders, fast Riders, armoured Shieldbearers (arrows do less damage) and a Battering Ram boss every
  5th wave that costs 6 lives if it reaches the gate.
- **Tactics:** three target modes per tower (First, Strongest, Nearest), sell for a 70% refund, call the next wave early
  for bonus gold, 1× / 2× / 3× speed.
- **15 waves + endless mode**, best wave saved in your browser, and **Continue**: the run is saved after every cleared wave.
- **Menus like the other arena games:** pause menu (Resume / Settings / Restart / Main menu), settings (master, music and
  effects volume, language, Low / High quality, fullscreen, all saved), end screen with four stats and a "New best!" moment,
  restart in place without a page reload.
- **Music:** a 9/8 (aksak) loop in the Hicaz mode, synthesised in Web Audio (drone, plucked saz-like melody, bass); the
  drums (düm / tek / zil) fade in while a wave is running. Ported from the Godot version.
- **Wave banner and boss bar:** a big "Wave 7" banner with that wave's enemies (red for a battering-ram wave) and a health
  bar under the top bar while a ram is on the road. Toasts are green (good), red (bad) or neutral.
- **Generated models and icons, with a code fallback:** the fortress, enemies, towers, turrets and boats are low-poly
  models, the interface uses one painted icon set. Terrain, trees, particles, the music and every sound effect (Web Audio) are made in code,
  and every model also has a procedural version that is used when the files cannot load.
- **Runs on a laptop iGPU:** instanced meshes, merged geometry, one 1024 shadow map, about 40 draw calls in a full battle. Use `?low` if it stutters.
- **Turkish or English** (first run follows the browser language), switch with one click or `L`. Touch controls on
  phones and tablets, 44 px touch targets, and a portrait camera that looks along the roads down to the fortress.

| | |
|---|---|
| ![Overview](docs/gameplay.png) | ![Phone layout](docs/mobile.png) |
| ![Title screen](docs/title-en.png) | |

After the asset remaster:

| | |
|---|---|
| ![Title screen with the new crest](docs/remaster-title.png) | ![Battle with the new models](docs/remaster-battle.png) |
| ![Close-up of towers and enemies](docs/remaster-closeup.png) | ![Phone layout](docs/remaster-phone.png) |

After the overnight pass (pause menu, settings, end screen, boss bar, portrait camera on phones):

| | |
|---|---|
| ![Pause menu](docs/overnight-pause.png) | ![Settings](docs/overnight-settings.png) |
| ![End screen with the new-best highlight](docs/overnight-end.png) | ![Battering ram with the boss bar](docs/overnight-boss.png) |

## Controls

| Action | Mouse / keyboard | Touch |
|---|---|---|
| Build / select | Click a pad or a tower | Tap |
| Pan | Drag | One finger |
| Rotate | Right-drag | Two fingers |
| Zoom | Mouse wheel | Pinch |
| Next wave | `Space` | Wave button |
| Build tower 1 / 2 / 3 | `1` `2` `3` (with a pad selected) | Panel |
| Upgrade / sell / target mode | `U` / `S` / `T` | Panel |
| Speed | `F` | Top bar |
| Pause menu | `P` (always) or `Esc` (closes the panel first, then pauses) | Top bar |
| Music / sound effects / language | `M` / `X` / `L` | Settings |
| Confirm a focused button | `Enter` / `Space` | Tap |

### Settings

Master, music and effects volume, language (TR / EN), graphics quality (Low: no shadows, fewer trees and rocks, half the
particles, pixel ratio 1; High is the default on desktop, Low on touch devices) and fullscreen. They are saved in
`localStorage` under `arena.hisar.settings`; the best wave is `arena.hisar.best` and the saved run `arena.hisar.save`
(the old `hisar.lang` / `hisar.best` keys are read once and migrated). The sound button in the top bar mutes everything
and brings back the old volume. Under `?auto` nothing is written.

## Run it locally

Serve the folder: `python -m http.server 8766`, then open http://127.0.0.1:8766/. It needs internet to load Three.js and the font from a CDN.
You can also double-click `index.html`: the browser blocks loading the models from `file://`, so the game then runs with its
original procedural models (icons still work).

### URL flags

| Flag | Effect |
|---|---|
| `?low` | Low quality for this visit (no shadows, fewer trees and particles), for weak GPUs |
| `?lang=en` / `?lang=tr` | Interface language |
| `?auto` | The game plays itself at 3× speed (self-test bot) |
| `?auto&sim=600` | Fast-forwards 600 seconds of play before the first frame |
| `?cam=x,y,z,tx,tz` | Sets the camera position and target (for screenshots; also stops the title orbit) |
| `?noassets` | Skips the generated models and uses the procedural ones |
| `?debug` | Shows draw calls, triangles, fps and the error count on screen, logs them every 5 s, and exposes `hisarSim(seconds)` (fast-forward) and `hisarSelect(padIndex)` |

## How it was made

Built with [Claude Code](https://claude.com/claude-code) by **Claude Opus 5.5** from one prompt: [`prompts/hisar.md`](prompts/hisar.md).
The prompt follows a six-block template (World, Life, Interaction, Dashboard, Extras, Performance) and adds two
blocks of its own: **Game rules** and **Self-test**. The self-test bot played the full 15 waves in a real browser to
check for errors and to tune the difficulty: the first version was too easy (the bot lost only 2 lives),
so enemy HP growth and the ram were made tougher.

This is game #1 of a series in which **every game is built by a different AI model**, to compare which one makes the
better game. Later, the best of them will be rebuilt in Godot 4.

| # | Game | Genre | Model |
|---|---|---|---|
| 1 | **Hisar** | Tower defense, 3D | Claude Opus 5.5 |
| 2 | [Çay Ocağı](https://github.com/Furkiozknn/cay-ocagi) | Time management, 3D | Claude Sonnet 5.5 |
| 3 | [Çini Ustası](https://github.com/Furkiozknn/cini-ustasi) | Puzzle, 3D | Claude Fable 5.1 |
| 4 | [Martı](https://github.com/Furkiozknn/marti) | Arcade flyer, 3D | Claude Haiku 5.5 |

## Assets

The models and icons were generated with [Higgsfield](https://higgsfield.ai): Tripo text-to-3D for the fortress,
the four enemies, the three tower bases, their turrets and the boats, and GPT Image for the icon sheet and the logo crest.
The models were processed with [glTF-Transform](https://gltf-transform.dev) (pivot at the base, 256-1024 px WebP textures,
about 900-1,500 triangles each, 5,500 for the fortress) and are normalised in code. About 1.1 MB in `assets/`.
If a model cannot load, for example when the page is opened from `file://`, the procedural version is used.
Prompts, sizes and checks per asset: [`docs/assets.md`](docs/assets.md).

## Tech

Three.js r170 (ES module from jsDelivr), OrbitControls, BufferGeometryUtils, GLTFLoader, Web Audio API, one Google Font (Rubik).
About 2,050 lines of plain JavaScript, HTML and CSS in one file.

## Changelog

### 2026-10-21 overnight pass

Fixes (from the code review):
- Space could start wave 16, 17, ... in normal mode: `startWave()` now checks the 15-wave cap itself (`canCallWave()`).
- Tower panel clicks were lost mid-wave because every kill rebuilt the panel: it is now built once per tower / level /
  target mode / language, and gold or kills only update the live values in place.
- The build / tower panel covered the wave box between 761 and 1080 px wide; title and end cards did not fit landscape
  phones (they now scroll and shrink below 500 px height).
- Phones in portrait had the fortress off-screen: a portrait camera now looks along the roads down to the gate (62°
  horizontal field of view), and it is re-applied when the phone is turned.
- Touch targets are at least 44 px on touch screens; Space no longer hijacks focused buttons; Esc / P open a real pause
  menu; "Play again" restarts in place instead of reloading the page, and there is a Main menu button.
- While paused you could still build, upgrade, sell and call waves; the pause menu now blocks all of it.
- Smaller fixes: projectile pools never write past their buffer, "+gold" text starts above the (scaled) model, a
  two-finger gesture no longer selects a pad when the fingers lift, `?cam` stops the title orbit, models that arrive after
  the 15 s loading timeout are still swapped in, toasts sit under the top bar even when it wraps on phones, the wave
  preview is cached, the HUD buttons have labels for screen readers, browser zoom is allowed again, promise rejections are
  counted as errors, the first-run language follows the browser, `T` cycles the target mode, the sound icon shows the
  muted state under `?auto`.
- Not changed on purpose: "First" targeting still compares the fraction of each road walked. Ranking by remaining distance
  (the review's suggestion) made the self-test bot fall on wave 10 instead of 15, so it is a balance change, not a fix.

New systems: settings card (master / music / effects volume, TR / EN, Low / High quality switched live, fullscreen),
saved under `arena.hisar.settings` with a one-time migration of the old keys; pause menu; Continue (the run is saved after
every cleared wave); end screen with four stats, a "New best!" highlight and Main menu; `M` / `X` / `L` keys; visible
focus ring; footer credit linking to the arena page; `?debug` shows fps and the error count.

Redesign: the Godot version's 9/8 Hicaz music loop ported to Web Audio (drums only during waves); "Wave 7" banner with the
wave's enemies; battering-ram health bar; green / red / neutral toasts and toasts for upgrades; new `upgrade` and `boss`
sounds; the defeat card uses the painted fortress icon.

Removed: the unused `level` string, the `.kbd` selector, the `--danger` variable, the redundant language line, the `icon`
field on every tower and enemy (it always equalled the key), the "Paused" tag (replaced by the menu), the reflow-based HUD
bump. The procedural fortress mesh and the replaced procedural geometries are now disposed once the models are in.
Particles skip their GPU upload when none are alive.

## License

Code: [MIT](LICENSE).
