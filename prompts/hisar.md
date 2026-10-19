# Game 01: Hisar (fortress tower defense)

Adapted from the six-block living-world template in `canli-dunyalar/prompts/template.md`.
The DASHBOARD block became a game HUD, and two blocks were added from our notes on
one-prompt games (`_notlar/opus-5-5-oyun-repolari.md`): GAME RULES and SELF-TEST.

```text
Build a single-file browser game (one index.html with inline CSS and JS) using Three.js r170 loaded
as an ES module from https://cdn.jsdelivr.net/npm/three@0.170.0/ (import map, OrbitControls and
BufferGeometryUtils from examples/jsm). A 3D tower defense game called "Hisar" (Turkish for
fortress). Do not ask questions, build it end to end.

WORLD: a low-poly isometric coastal valley built entirely in code, no external models, textures or
fonts beyond one Google Font. A stone fortress on the eastern shore (curtain walls with merlons,
four round corner towers and two gate towers with red cone roofs, a central keep, flags), the sea
behind it with two small sailing boats, two enemy war camps with tents on the western edge, rolling
hills, mountains on the north and south edges, pine trees and rocks (instanced), two dirt roads that
start at the camps, wind through the valley and merge before the fortress gate. Round stone build
pads along the roads. Clean toy-like clay look, flat shading, soft shadows, golden-hour light, one
accent colour (#F59E0B gold, used for UI highlights, the range ring and level-3 trims).

LIFE: enemies march from both camps along the roads (lane offsets so they never stack on one line)
and try to reach the gate. Four enemy types, each its own low-poly model: Raider (basic), Rider
(fast horseman), Shieldbearer (slow, armoured, arrows do less damage), Battering Ram (boss wagon
every 5th wave, very high HP, costs 6 lives). Smoke rises from the camps, the boats drift, the
water ripples.

GAME RULES: 180 gold and 20 fortress lives at the start. Three towers with three levels each:
Archer Tower (fast single-target arrows), Cannon Bastion (slow ballistic cannonballs with splash
damage, predicted landing point), Tar Cauldron (lobbed tar that slows enemies, burns them over time
and leaves a slowing puddle). Gold from kills and a wave-clear bonus; calling the next wave early
gives a bonus. Upgrade and sell (70% refund), target modes First / Strongest / Nearest. 15 waves
with rising HP and new enemy types, then a victory screen with an optional endless mode. Game speed
1x/2x/3x, pause, best wave saved in localStorage.

INTERACTION: drag to pan, right-drag to rotate, scroll or pinch to zoom (OrbitControls, clamped so
the camera never goes under the ground or leaves the map). Click a pad to open the build menu, click
a tower to open its panel; hovering a build option previews its range ring. Keyboard: Space next
wave, 1 2 3 build, U upgrade, S sell, F speed, P pause, Esc close.

HUD: frosted glass panels over the 3D view: top bar (logo, gold, lives, wave counter, speed, pause,
sound, language), a next-wave box with an icon preview of the wave and a start button, a build /
tower panel, floating "+gold" numbers, health bars over damaged enemies, toasts, a red flash when
the gate is hit, title, victory and defeat screens. Turkish by default with an English toggle.

EXTRAS: all sound effects synthesised with Web Audio (bow, cannon boom, tar splash, coins, war
horn, build, victory, defeat), mute toggle; title screen with a slow cinematic orbit; works on
mobile (tap to select, bottom-sheet panel).

PERFORMANCE (must run at 60 fps on an Intel UHD 620 laptop iGPU): renderer pixel ratio capped at
1.5, antialias on, one directional light with a 1024 shadow map that only covers the play area,
InstancedMesh for every repeated object (trees, rocks, tents, pads, enemies, health bars,
projectiles, puddles), merged static geometry with vertex colours, MeshLambert materials only, no
post-processing passes, at most ~150 draw calls (log renderer.info.render.calls every 5 s with
?debug), particles as one Points object. Pause the simulation when the tab is hidden. Add a "?low"
URL flag that turns shadows off and halves particles.

SELF-TEST: add a "?auto" URL flag that plays the game by itself (builds and upgrades towers, starts
waves, runs at 3x) and expose the live game state on window.hisar, so the game can be verified in a
real browser without a human.

Deliver only the finished index.html. No build step, no server needed: it must open by
double-clicking the file.
```
