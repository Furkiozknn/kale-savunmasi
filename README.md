<p align="center">
  <a href="https://furkiozknn.github.io/kale-savunmasi/"><img src="docs/banner.svg" width="100%" alt="Hisar: hold a seaside fortress against an army marching along two roads. Click to play in your browser."></a>
</p>

<p align="center">
  <a href="https://furkiozknn.github.io/kale-savunmasi/"><img src="https://img.shields.io/badge/%E2%96%B6_Play_now-in_your_browser-F59E0B?style=for-the-badge&labelColor=2B2118" alt="Play now in your browser"></a>
  <img src="https://img.shields.io/badge/Three.js-r170-FBBF24?style=for-the-badge&logo=threedotjs&logoColor=white&labelColor=2B2118" alt="Three.js r170">
  <img src="https://img.shields.io/badge/built_by-Claude_Opus_5.5-DC2626?style=for-the-badge&logo=claude&logoColor=white&labelColor=2B2118" alt="Built by Claude Opus 5.5">
  <a href="LICENSE"><img src="https://img.shields.io/badge/licence-MIT-16A34A?style=for-the-badge&labelColor=2B2118" alt="MIT licence"></a>
  <img src="https://img.shields.io/badge/no_install-desktop_%C2%B7_phone-FFF8EB?style=for-the-badge&labelColor=2B2118" alt="No install, desktop and phone">
</p>

<p align="center"><b>A low-poly 3D tower defense game in a seaside valley: an army marches on the fortress along two roads; build archers, cannons and tar cauldrons on the stone pads, upgrade them and hold the walls for 15 waves.</b></p>

<p align="center">
  <img src="docs/gameplay.gif" width="640" alt="Hisar gameplay: mid-battle at wave 6, enemies march along the roads while the towers fire">
</p>

<p align="center"><b>Play online: <a href="https://furkiozknn.github.io/kale-savunmasi/">https://furkiozknn.github.io/kale-savunmasi/</a></b> (desktop and phone, no install)</p>

<!-- portals:start -->
<p align="center">Also on: <a href="https://furkiozknn.itch.io/kale-savunmasi">itch.io</a></p>
<!-- portals:end -->

## Highlights

- **Three towers, three levels each.** The Archer Tower fires fast single-target arrows, the Cannon Bastion lobs
  ballistic shots at a predicted landing point with splash damage, and the Tar Cauldron slows, burns over time and
  leaves sticky tar on the road.
- **Four enemy types.** Raiders, fast Riders, armoured Shieldbearers that shrug off arrows, and a Battering Ram boss
  every 5th wave that costs 6 lives if it reaches the gate.
- **Tactics in every wave.** Three target modes per tower (First, Strongest, Nearest), sell for a 70 % refund, call
  the next wave early for bonus gold, and play at 1x, 2x or 3x speed.
- **15 waves, then endless.** The run is saved after every cleared wave, so **Continue** picks it up after a reload;
  after the victory the waves keep getting stronger in endless mode.
- **Tested by a bot.** The `?auto` bot builds, upgrades and calls waves on its own; in the measured run it held out
  until wave 15 and fell there, so a full win asks for better play than the bot's.
- **A hisar on the Bosphorus.** Textured limestone walls and towers, slate cones, timber hoardings, choppy water with
  surf, a far shore with a mosque, and a war-table interface of parchment, wax seals and stencil numerals
  ([redesign](#redesign-2026-11)).
- **Light on a laptop GPU.** 60 fps on an Intel UHD GPU at 1280x720 with 46-60 draw calls in battle, and a `?low` tier
  for weak GPUs.
- **One file plus a few assets.** One `index.html` with Three.js r170 from a CDN, eight generated low-poly models
  (enemies, turrets, boats), a painted icon set and one stencil font; every model keeps a procedural version as the
  fallback, and every texture is drawn in code.

## How to play

> [!TIP]
> **Goal:** hold the fortress for 15 waves. It has 20 lives; every enemy that reaches the gate costs some of them, and
> at zero the fortress falls. After a victory you can continue in endless mode.

You start with 180 gold. Click a stone pad by the road to open the build panel and pick a tower, then press the wave
button (or `Space`) to send the first wave. The box in the corner shows which enemies the next wave brings. Click a
tower to upgrade it, sell it or change its target mode.

<details>
<summary><b>More rules</b></summary>

- Building costs 60 gold for an Archer Tower, 110 for a Cannon Bastion and 80 for a Tar Cauldron; each tower can be
  upgraded twice. Selling refunds 70 % of everything spent on that tower.
- Kills pay gold, and every cleared wave pays a bonus. Calling the next wave while enemies are still on the road adds
  an early-call bonus.
- Raiders and Riders cost 1 life at the gate, Shieldbearers 2 and the Battering Ram 6. Enemy health grows with every
  wave.
- Armour cuts arrow damage in full and cannonball damage by half; burning tar ignores it. Tar slows its targets, and
  the puddles it leaves slow whoever walks through them.
- Riders appear from wave 3, Shieldbearers from wave 5, and a Battering Ram comes on waves 5, 10 and 15.
- Your best wave is kept, and a new best is highlighted on the end screen.

</details>

### Controls

| Action | Mouse / touch | Keyboard |
|---|---|---|
| Select a pad or a tower | click / tap | |
| Build on the selected pad | build panel | `1` `2` `3` |
| Upgrade / sell / target mode | tower panel | `U` / `S` / `T` |
| Start or call the next wave | wave button | `Space` |
| Pan | drag / one finger | |
| Rotate | right-drag / two fingers | |
| Zoom | wheel / pinch | |
| Speed 1x / 2x / 3x | speed button | `F` |
| Pause menu | pause button | `P` / `Esc` (Esc first closes the panel) |
| Music / effects / language | settings | `M` / `X` / `L` |
| Fullscreen | settings | |

Settings (master, music and effects volume, TR / EN, Low / High quality, fullscreen) are saved in `localStorage` under
`arena.hisar.settings`; the run under `arena.hisar.save`, the best wave under `arena.hisar.best`. The first visit follows
the browser language; touch devices start on Low quality.

<details>
<summary><b>URL flags for testing</b></summary>

| Flag | Effect |
|---|---|
| `?auto` | the game plays itself at 3x speed (builds, upgrades, calls waves) and writes nothing to `localStorage` |
| `?debug` | draw calls, triangles, fps and the error count on screen; `window.hisarSim(seconds)` fast-forwards, `window.hisarSelect(padIndex)` selects a pad |
| `?sim=N` | with `?auto`: fast-forward N seconds before the first frame |
| `?low` | no shadows, pixel ratio 1, fewer trees and rocks, half the particles |
| `?lang=en` / `?lang=tr` | language |
| `?cam=x,y,z,tx,tz` | camera position and target (stops the title orbit; used for screenshots) |
| `?noassets` | skip the generated models and use the procedural ones |

The live state is on `window.hisar` (gold, lives, wave, towers, enemies, errors).

</details>

## Screenshots

<p align="center"><img src="docs/redesign-before-after.png" width="100%" alt="The same camera before and after the 2026-11 redesign"><br><sub>Same camera, before and after the redesign</sub></p>

<table>
  <tr>
    <td width="33%"><img src="docs/remaster-title.png" alt="Title screen on a parchment card"><br><sub>Title screen</sub></td>
    <td width="33%"><img src="docs/remaster-battle.png" alt="Wave 10 on both roads"><br><sub>Wave 10 on both roads</sub></td>
    <td width="33%"><img src="docs/remaster-closeup.png" alt="Towers and enemies up close"><br><sub>Towers and enemies up close</sub></td>
  </tr>
  <tr>
    <td><img src="docs/overnight-boss.png" alt="A battering ram with its health bar"><br><sub>Battering ram and its boss bar</sub></td>
    <td><img src="docs/overnight-pause.png" alt="Pause menu"><br><sub>Pause menu</sub></td>
    <td><img src="docs/overnight-end.png" alt="End screen with a new best"><br><sub>End screen with a new best</sub></td>
  </tr>
</table>

<details>
<summary><b>Phone layout, settings and more views</b></summary>

<table>
  <tr>
    <td width="50%"><img src="docs/overnight-settings.png" alt="Settings"><br><sub>Settings</sub></td>
    <td width="50%"><img src="docs/closeup.png" alt="The gatehouse, torches and the keep"><br><sub>The gate: hoardings, torches and the keep</sub></td>
  </tr>
  <tr>
    <td><img src="docs/gameplay.png" alt="Battle overview"><br><sub>Battle overview</sub></td>
    <td><img src="docs/overnight-boss.png" alt="Two battering rams on wave 15"><br><sub>Wave 15: two rams and the boss bar</sub></td>
  </tr>
</table>

<p align="center"><img src="docs/remaster-phone.png" width="300" alt="Hisar on a phone in portrait"><br><sub>On a phone: the portrait camera looks along the roads to the gate</sub></p>

</details>

## Redesign (2026-11)

**Art direction:** a stylized 3D strategy defense on the Bosphorus in late-afternoon light. Palette: limestone `#CFC3A6`,
slate `#4B5563`, Bosphorus blue `#1F5F8B`, banner red `#B91C1C`, torch `#F59E0B`.

- **Light and world:** a low warm sun with long shadows and a cool rim light from the sea; the terrain now runs past
  the play area to wooded hills and across the strait to the Asian shore (waterfront houses, a mosque with two
  minarets), with haze for depth. Meadow detail texture, worn verges, packed-earth roads with kerb stones, flagstone
  pads, stone pines, cypresses, maquis shrubs and poppies; palisaded camps with banners.
- **Fortress and towers:** rebuilt in code in one style from a drawn limestone-ashlar texture (the same texture reads as
  planks and shingles through its UV scale): battered curtain walls with merlons, round towers with slate cones and
  timber hoardings, a gatehouse with plank doors and a banner, a keep, barracks and a small minaret. Archer towers,
  cannon bastions and machicolated tar towers gain hoardings, banners, a brass band and a pennant by level.
- **Animation and FX:** marching step, lean and sway for foot soldiers, a rocking gallop for riders; arrow trails;
  muzzle flashes and drifting cannon smoke; dust and fire where shots land; burning tar; flickering torches with embers;
  rippling banners; whitecaps and surf on the water.
- **UI:** a war table: parchment panels with ruled ink borders, red wax-seal buttons, stencil numerals (Stardos Stencil,
  OFL, self-hosted), Palatino small caps, a compass-rose watermark. No Google Fonts request any more.
- **Kept:** the 15 waves, towers, enemies, balance, the `?auto` bot, saves (`arena.hisar.*`), every flag and the audio.
  The generated fortress and tower-base models are no longer loaded; enemy, turret and boat models stay.
- **Measured** (Intel UHD 620, headless Chrome, 1280x720, `?auto&debug&sim=600`, same camera): before 43 draw calls,
  90-101 k triangles, 60 fps; after 46-52 draw calls, 195-214 k triangles, 60 fps; 60 draw calls at the end of wave 15.
  `?low`: 52 draw calls, 162 k triangles, 60 fps. The bot still falls on wave 15 with 0 JS errors, with and without
  `?noassets`.

## Balance

Towers and enemies are two data tables at the top of the script (`TOWERS`, `ENEMIES`), and each wave is built by
`makeWave()` with enemy health scaled by `hpMul()`. The self-test bot was used to tune them: the first version was too
easy (the bot lost only 2 lives), so enemy health growth and the ram were made tougher. In the measured
`?auto&debug&sim=2000` run the bot falls on wave 15 with 13 towers, the same result before and after the asset remaster,
with 0 JS errors.

## Running locally

Serve the folder over HTTP (opened from `file://`, the browser blocks the model files and the game uses its procedural
models):

```
python -m http.server 8000
```

then open <http://localhost:8000/>.

## How it was made

Built by **Claude Opus 5.5** with Claude Code from one prompt: [prompts/hisar.md](prompts/hisar.md). The first version
was fully procedural: the valley, the fortress, the camps, the towers and the enemies are merged or instanced low-poly
primitives with vertex colours, and every sound effect is synthesised with the Web Audio API. The music, a 9/8 loop in
the Hicaz mode whose drums come in during waves, was added later in Web Audio as well.

The assets were remastered by the orchestrator, **Claude Opus 5.5**, with generated models: Tripo text-to-3D (through
Higgsfield) for the fortress, the four enemies, the three tower bases, their turrets and the boats, and GPT Image for a
16-icon sheet and the logo crest. The models were processed with glTF-Transform (about 900-1,500 triangles each, 5,540
for the fortress, about 1.1 MB in `assets/`), and every procedural model stays as the fallback. The 2026-11 redesign
(also Claude Opus 5.5) replaced the fortress and tower-base models with textured procedural ones, see
[Redesign](#redesign-2026-11). Prompts, sizes, the
rejected asset and fps before and after: [docs/assets.md](docs/assets.md). A Godot 4 remake was made in round 2.

Hisar is part of the **Claude Game Arena** series, where each game is built by a Claude model from one prompt. The other
games: [Çay Ocağı](https://furkiozknn.github.io/cay-ocagi/) · [Çini Ustası](https://furkiozknn.github.io/cini-ustasi/) ·
[Martı](https://furkiozknn.github.io/marti/) · [Kervan](https://furkiozknn.github.io/kervan/) ·
[Dolmuş](https://furkiozknn.github.io/dolmus/) · [Peri Golf](https://furkiozknn.github.io/peri-golf/) ·
[Mehter](https://furkiozknn.github.io/mehter/) · [Boğaz Vapuru](https://furkiozknn.github.io/bogaz-vapuru/) ·
[Simit Fırını](https://furkiozknn.github.io/simit-firini/) · [Karagöz](https://furkiozknn.github.io/karagoz/) ·
[Lale Bahçesi](https://furkiozknn.github.io/lale-bahcesi/)

**Round 5:** [Kapadokya Balonu](https://furkiozknn.github.io/kapadokya-balonu/) ·
[Ebru](https://furkiozknn.github.io/ebru/) · [Kırkpınar](https://furkiozknn.github.io/kirkpinar/) ·
[Çarşı Kaçışı](https://furkiozknn.github.io/carsi-kacisi/)

**Round 6:** [Topkapı Gecesi](https://furkiozknn.github.io/topkapi-gecesi/) ·
[Hamsi](https://furkiozknn.github.io/hamsi/) · [Pamukkale](https://furkiozknn.github.io/pamukkale/) ·
[Mimar Sinan](https://furkiozknn.github.io/mimar-sinan/)

## Türkçe

**Hisar**, sahildeki bir kaleyi iki yoldan yürüyen bir orduya karşı savunduğun alçak poligon 3D kule savunma oyunu. Yol
kenarındaki taş kaidelere okçu kulesi, top tabyası ve katran kazanı kur, kuleleri geliştir ve 15 dalga boyunca hisarı
ayakta tut; her beşinci dalgada bir koçbaşı gelir. Zaferden sonra sonsuz modda ne kadar dayanacağını gör. Kurulum yok;
masaüstünde ve telefonda tarayıcıda oynanır. Claude Opus 5.5 tarafından Claude Code ile tek bir prompt'tan yapıldı.

**Oyna:** https://furkiozknn.github.io/kale-savunmasi/

## License

MIT, see [LICENSE](LICENSE).

Like the game? You can support new rounds on [Buy Me a Coffee](https://buymeacoffee.com/furkiozkann). The game stays free.
