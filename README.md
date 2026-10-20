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
- **15 waves + endless mode**, best wave saved in your browser.
- **Generated models and icons, with a code fallback:** the fortress, enemies, towers, turrets and boats are low-poly
  models, the interface uses one painted icon set. Terrain, trees, particles and every sound effect (Web Audio) are made in code,
  and every model also has a procedural version that is used when the files cannot load.
- **Runs on a laptop iGPU:** instanced meshes, merged geometry, one 1024 shadow map, about 40 draw calls in a full battle. Use `?low` if it stutters.
- **Turkish by default, English with one click.** Touch controls on phones and tablets.

| | |
|---|---|
| ![Overview](docs/gameplay.png) | ![Phone layout](docs/mobile.png) |
| ![Title screen](docs/title-en.png) | |

After the asset remaster:

| | |
|---|---|
| ![Title screen with the new crest](docs/remaster-title.png) | ![Battle with the new models](docs/remaster-battle.png) |
| ![Close-up of towers and enemies](docs/remaster-closeup.png) | ![Phone layout](docs/remaster-phone.png) |

## Controls

| Action | Mouse / keyboard | Touch |
|---|---|---|
| Build / select | Click a pad or a tower | Tap |
| Pan | Drag | One finger |
| Rotate | Right-drag | Two fingers |
| Zoom | Mouse wheel | Pinch |
| Next wave | `Space` | Wave button |
| Build tower 1 / 2 / 3 | `1` `2` `3` (with a pad selected) | Panel |
| Upgrade / sell | `U` / `S` | Panel |
| Speed / pause / close | `F` / `P` / `Esc` | Top bar |

## Run it locally

Serve the folder: `python -m http.server 8766`, then open http://127.0.0.1:8766/. It needs internet to load Three.js and the font from a CDN.
You can also double-click `index.html`: the browser blocks loading the models from `file://`, so the game then runs with its
original procedural models (icons still work).

### URL flags

| Flag | Effect |
|---|---|
| `?low` | No shadows, half the particles and trees, for weak GPUs |
| `?lang=en` / `?lang=tr` | Interface language |
| `?auto` | The game plays itself at 3× speed (self-test bot) |
| `?auto&sim=600` | Fast-forwards 600 seconds of play before the first frame |
| `?cam=x,y,z,tx,tz` | Sets the camera position and target (for screenshots) |
| `?noassets` | Skips the generated models and uses the procedural ones |
| `?debug` | Shows draw calls on screen, logs them every 5 s and exposes `hisarSim(seconds)` to fast-forward the simulation |

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
About 1,500 lines of plain JavaScript, HTML and CSS in one file.

## License

Code: [MIT](LICENSE).
