# Hisar · Fortress Defense

A low-poly 3D tower defense game in a single `index.html` (Three.js, no build step).
An army marches on a seaside fortress along two roads; build towers on the stone pads and hold out for 15 waves.

## Play

Double-click `index.html` (it needs an internet connection the first time, to load Three.js and the font from a CDN).
Or serve the folder: `python -m http.server 8766`, then open http://127.0.0.1:8766/.

**Controls:** click a pad to build, click a tower to upgrade or sell · drag to pan · right-drag to rotate · wheel to zoom ·
`Space` next wave · `1` `2` `3` build · `U` upgrade · `S` sell · `F` speed · `P` pause · `Esc` close.

## Towers and enemies

| Tower | Role |
|---|---|
| 🏹 Archer Tower | Fast single-target arrows, weak against armour |
| 💣 Cannon Bastion | Slow ballistic shots with splash damage |
| 🔥 Tar Cauldron | Slows and burns, leaves sticky tar on the road |

Raiders, fast Riders, armoured Shieldbearers and a Battering Ram boss every 5th wave (costs 6 lives).
Each tower has three levels and three target modes (First, Strongest, Nearest). After wave 15 you can continue in endless mode.

## URL flags

| Flag | Effect |
|---|---|
| `?low` | No shadows, half the particles and trees (for weak GPUs) |
| `?lang=en` | English UI (Turkish is the default; the in-game button also switches) |
| `?auto` | The game plays itself at 3× speed (self-test bot) |
| `?debug` | Logs draw calls every 5 s and exposes `hisarSim(seconds)` to fast-forward the simulation |

## How it was made

Built with Claude Code (Claude Opus 5.5) from one prompt, [`prompts/hisar.md`](prompts/hisar.md), which adapts our six-block
living-world template with two extra blocks: game rules and a self-test hook. Everything (models, terrain, sound) is generated in code.

Code: MIT.
