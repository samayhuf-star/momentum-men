// Static Metro requires for licence-safe exercise stills (OEI CC0 and Everkinetic CC BY-SA 4.0).
const MEDIA = {
  'bb-bench': {
    start: require('../../assets/exercise-media/bench-press-start.webp'),
    end: require('../../assets/exercise-media/bench-press-end.webp')
  },
  'bb-incline': {
    start: require('../../assets/exercise-media/incline-bench-press-start.webp'),
    end: require('../../assets/exercise-media/incline-bench-press-end.webp')
  },
  'bb-decline': {
    start: require('../../assets/exercise-media/decline-bench-press-start.webp'),
    end: require('../../assets/exercise-media/decline-bench-press-end.webp')
  },
  'db-bench': {
    start: require('../../assets/exercise-media/dumbbell-chest-press-start.webp'),
    end: require('../../assets/exercise-media/dumbbell-chest-press-end.webp')
  },
  'db-incline': {
    start: require('../../assets/exercise-media/incline-dumbbell-press-start.webp'),
    end: require('../../assets/exercise-media/incline-dumbbell-press-end.webp')
  },
  'cable-cross': {
    start: require('../../assets/exercise-media/cable-crossover-start.webp'),
    end: require('../../assets/exercise-media/cable-crossover-end.webp')
  },
  'archer-push': {
    start: require('../../assets/exercise-media/archer-push-up-start.webp'),
    end: require('../../assets/exercise-media/archer-push-up-end.webp')
  },
  'bb-wide': {
    start: require('../../assets/exercise-media/wide-grip-bench-press-start.webp'),
    end: require('../../assets/exercise-media/wide-grip-bench-press-end.webp')
  },
  'pull-up': {
    start: require('../../assets/exercise-media/pull-up-start.webp'),
    end: require('../../assets/exercise-media/pull-up-end.webp')
  },
  'close-pulldown': {
    start: require('../../assets/exercise-media/close-grip-lat-pulldown-start.webp'),
    end: require('../../assets/exercise-media/close-grip-lat-pulldown-end.webp')
  },
  'lat-pulldown': {
    start: require('../../assets/exercise-media/lat-pulldown-start.webp'),
    end: require('../../assets/exercise-media/lat-pulldown-end.webp')
  },
  'bb-pullover': {
    start: require('../../assets/exercise-media/barbell-pullover-start.webp'),
    end: require('../../assets/exercise-media/barbell-pullover-end.webp')
  },
  'ohp': {
    start: require('../../assets/exercise-media/overhead-press-start.webp'),
    end: require('../../assets/exercise-media/overhead-press-end.webp')
  },
  'wide-military': {
    start: require('../../assets/exercise-media/overhead-press-start.webp'),
    end: require('../../assets/exercise-media/overhead-press-end.webp')
  },
  'lateral-raise': {
    start: require('../../assets/exercise-media/lateral-raises-start.webp'),
    end: require('../../assets/exercise-media/lateral-raises-end.webp')
  },
  'front-raise': {
    start: require('../../assets/exercise-media/front-raises-start.webp'),
    end: require('../../assets/exercise-media/front-raises-end.webp')
  },
  'band-ohp': {
    start: require('../../assets/exercise-media/band-overhead-press-start.webp'),
    end: require('../../assets/exercise-media/band-overhead-press-end.webp')
  },
  'reverse-fly': {
    start: require('../../assets/exercise-media/rear-delt-fly-start.webp'),
    end: require('../../assets/exercise-media/rear-delt-fly-end.webp')
  },
  'thruster': {
    start: require('../../assets/exercise-media/thruster-start.webp'),
    end: require('../../assets/exercise-media/thruster-end.webp')
  },
  'bicycle': {
    start: require('../../assets/exercise-media/bicycle-crunch-start.webp'),
    end: require('../../assets/exercise-media/bicycle-crunch-end.webp')
  },
  'band-bicycle': {
    start: require('../../assets/exercise-media/bicycle-crunch-start.webp'),
    end: require('../../assets/exercise-media/bicycle-crunch-end.webp')
  },
  'hanging-knee': {
    start: require('../../assets/exercise-media/hanging-knee-raise-start.webp'),
    end: require('../../assets/exercise-media/hanging-knee-raise-end.webp')
  },
  'v-up': {
    start: require('../../assets/exercise-media/v-up-start.webp'),
    end: require('../../assets/exercise-media/v-up-end.webp')
  },
  'jackknife': {
    start: require('../../assets/exercise-media/v-up-start.webp'),
    end: require('../../assets/exercise-media/v-up-end.webp')
  },
  'ab-wheel': {
    start: require('../../assets/exercise-media/ab-wheel-rollout-start.webp'),
    end: require('../../assets/exercise-media/ab-wheel-rollout-end.webp')
  },
  'side-plank': {
    hold: require('../../assets/exercise-media/side-plank-hold.webp')
  },
  'russian': {
    start: require('../../assets/exercise-media/russian-twists-start.webp'),
    end: require('../../assets/exercise-media/russian-twists-end.webp')
  },
  'leg-raise': {
    start: require('../../assets/exercise-media/leg-raises-start.webp'),
    end: require('../../assets/exercise-media/leg-raises-end.webp')
  },
  'sit-up': {
    start: require('../../assets/exercise-media/sit-up-start.webp'),
    end: require('../../assets/exercise-media/sit-up-end.webp')
  },
  'side-bend': {
    hold: require('../../assets/exercise-media/dumbbell-side-bend-hold.webp')
  },
  'pallof': {
    start: require('../../assets/exercise-media/band-pallof-press-start.webp'),
    end: require('../../assets/exercise-media/band-pallof-press-end.webp')
  },
  'guillotine': {
    start: require('../../assets/exercise-media/barbell-neck-press-1.png'),
    end: require('../../assets/exercise-media/barbell-neck-press-2.png')
  },
  'decline-wide': {
    start: require('../../assets/exercise-media/wide-grip-decline-bench-press-1.png'),
    end: require('../../assets/exercise-media/wide-grip-decline-bench-press-2.png')
  },
  'underhand-pd': {
    start: require('../../assets/exercise-media/reverse-grip-lat-pulldown-start.webp'),
    end: require('../../assets/exercise-media/reverse-grip-lat-pulldown-end.webp')
  },
  'bent-pullover': {
    start: require('../../assets/exercise-media/bent-arm-pullover-1.png'),
    end: require('../../assets/exercise-media/bent-arm-pullover-2.png')
  },
  'decline-pullover': {
    start: require('../../assets/exercise-media/wide-grip-decline-barbell-pullover-1.png'),
    end: require('../../assets/exercise-media/wide-grip-decline-barbell-pullover-2.png')
  },
  'close-pull': {
    start: require('../../assets/exercise-media/narrow-parallel-grip-chin-ups-1.png'),
    end: require('../../assets/exercise-media/narrow-parallel-grip-chin-ups-2.png')
  },
  'bench-pull': {
    start: require('../../assets/exercise-media/inverted-row-start.webp'),
    end: require('../../assets/exercise-media/inverted-row-end.webp')
  },
  'rear-delt': {
    start: require('../../assets/exercise-media/rear-deltoid-row-barbell-1.png'),
    end: require('../../assets/exercise-media/rear-deltoid-row-barbell-2.png')
  },
  'y-raise': {
    start: require('../../assets/exercise-media/cable-y-raise-start.webp'),
    end: require('../../assets/exercise-media/cable-y-raise-end.webp')
  },
  'one-arm-snatch': {
    start: require('../../assets/exercise-media/one-arm-snatch-with-barbell-1.png'),
    end: require('../../assets/exercise-media/one-arm-snatch-with-barbell-2.png')
  },
  // Added Nov 2026: Open Exercise Illustrations (CC0), cropped to a shared 4:3 window
  'bw-squat': {
    start: require('../../assets/exercise-media/bodyweight-squat-start.webp'),
    end: require('../../assets/exercise-media/bodyweight-squat-end.webp')
  },
  'goblet-squat': {
    start: require('../../assets/exercise-media/goblet-squat-start.webp'),
    end: require('../../assets/exercise-media/goblet-squat-end.webp')
  },
  'glute-bridge': {
    start: require('../../assets/exercise-media/glute-bridge-start.webp'),
    end: require('../../assets/exercise-media/glute-bridge-end.webp')
  },
  'walking-lunge': {
    start: require('../../assets/exercise-media/reverse-lunge-start.webp'),
    end: require('../../assets/exercise-media/reverse-lunge-end.webp')
  },
  'back-squat': {
    start: require('../../assets/exercise-media/squat-start.webp'),
    end: require('../../assets/exercise-media/squat-end.webp')
  },
  'rdl': {
    start: require('../../assets/exercise-media/romanian-deadlift-start.webp'),
    end: require('../../assets/exercise-media/romanian-deadlift-end.webp')
  },
  'hip-thrust': {
    start: require('../../assets/exercise-media/hip-thrusts-start.webp'),
    end: require('../../assets/exercise-media/hip-thrusts-end.webp')
  },
  'jump-squat': {
    start: require('../../assets/exercise-media/jump-squat-start.webp'),
    end: require('../../assets/exercise-media/jump-squat-end.webp')
  },
  'step-up': {
    start: require('../../assets/exercise-media/dumbbell-step-up-start.webp'),
    end: require('../../assets/exercise-media/dumbbell-step-up-end.webp')
  },
  'front-squat': {
    start: require('../../assets/exercise-media/front-squat-start.webp'),
    end: require('../../assets/exercise-media/front-squat-end.webp')
  },
  'deadlift': {
    start: require('../../assets/exercise-media/deadlift-start.webp'),
    end: require('../../assets/exercise-media/deadlift-end.webp')
  },
  'bulgarian': {
    start: require('../../assets/exercise-media/bulgarian-split-squat-start.webp'),
    end: require('../../assets/exercise-media/bulgarian-split-squat-end.webp')
  },
  'pistol-squat': {
    start: require('../../assets/exercise-media/pistol-squat-start.webp'),
    end: require('../../assets/exercise-media/pistol-squat-end.webp')
  },
  'nordic-curl': {
    start: require('../../assets/exercise-media/nordic-hamstring-curl-start.webp'),
    end: require('../../assets/exercise-media/nordic-hamstring-curl-end.webp')
  },
  'box-jump': {
    start: require('../../assets/exercise-media/box-jump-start.webp'),
    end: require('../../assets/exercise-media/box-jump-end.webp')
  },
  'hammer-curl': {
    start: require('../../assets/exercise-media/hammer-curls-start.webp'),
    end: require('../../assets/exercise-media/hammer-curls-end.webp')
  },
  'tricep-ext': {
    start: require('../../assets/exercise-media/overhead-triceps-extension-start.webp'),
    end: require('../../assets/exercise-media/overhead-triceps-extension-end.webp')
  },
  'bench-dip': {
    start: require('../../assets/exercise-media/bench-dip-start.webp'),
    end: require('../../assets/exercise-media/bench-dip-end.webp')
  },
  'bb-curl': {
    start: require('../../assets/exercise-media/barbell-curl-start.webp'),
    end: require('../../assets/exercise-media/barbell-curl-end.webp')
  },
  'skull-crusher': {
    start: require('../../assets/exercise-media/skull-crushers-start.webp'),
    end: require('../../assets/exercise-media/skull-crushers-end.webp')
  },
  'diamond-push': {
    start: require('../../assets/exercise-media/diamond-push-up-start.webp'),
    end: require('../../assets/exercise-media/diamond-push-up-end.webp')
  },
  'chin-up': {
    start: require('../../assets/exercise-media/chin-up-start.webp'),
    end: require('../../assets/exercise-media/chin-up-end.webp')
  },
  'parallel-dip': {
    start: require('../../assets/exercise-media/dips-start.webp'),
    end: require('../../assets/exercise-media/dips-end.webp')
  },
  'close-grip-bench': {
    start: require('../../assets/exercise-media/close-grip-bench-press-start.webp'),
    end: require('../../assets/exercise-media/close-grip-bench-press-end.webp')
  },
  'push-up': {
    start: require('../../assets/exercise-media/push-up-start.webp'),
    end: require('../../assets/exercise-media/push-up-end.webp')
  },
  'clap-push': {
    start: require('../../assets/exercise-media/clap-push-up-start.webp'),
    end: require('../../assets/exercise-media/clap-push-up-end.webp')
  },
  'superman': {
    start: require('../../assets/exercise-media/superman-start.webp'),
    end: require('../../assets/exercise-media/superman-end.webp')
  },
  'db-row': {
    start: require('../../assets/exercise-media/dumbbell-row-start.webp'),
    end: require('../../assets/exercise-media/dumbbell-row-end.webp')
  },
  'bb-row': {
    start: require('../../assets/exercise-media/bent-over-row-start.webp'),
    end: require('../../assets/exercise-media/bent-over-row-end.webp')
  },
  'weighted-pullup': {
    start: require('../../assets/exercise-media/wide-grip-pull-up-start.webp'),
    end: require('../../assets/exercise-media/wide-grip-pull-up-end.webp')
  },
  'muscle-up': {
    start: require('../../assets/exercise-media/muscle-up-start.webp'),
    end: require('../../assets/exercise-media/muscle-up-end.webp')
  },
  'shoulder-tap': {
    start: require('../../assets/exercise-media/plank-shoulder-tap-start.webp'),
    end: require('../../assets/exercise-media/plank-shoulder-tap-end.webp')
  },
  'pike-push': {
    start: require('../../assets/exercise-media/pike-push-up-start.webp'),
    end: require('../../assets/exercise-media/pike-push-up-end.webp')
  },
  'hspu': {
    start: require('../../assets/exercise-media/handstand-push-up-start.webp'),
    end: require('../../assets/exercise-media/handstand-push-up-end.webp')
  },
  'push-press': {
    start: require('../../assets/exercise-media/push-press-start.webp'),
    end: require('../../assets/exercise-media/push-press-end.webp')
  },
  'plank': {
    hold: require('../../assets/exercise-media/plank-hold.webp')
  },
  'dead-bug': {
    start: require('../../assets/exercise-media/dead-bug-start.webp'),
    end: require('../../assets/exercise-media/dead-bug-end.webp')
  },
  'hanging-leg-raise': {
    start: require('../../assets/exercise-media/hanging-leg-raise-start.webp'),
    end: require('../../assets/exercise-media/hanging-leg-raise-end.webp')
  },
  'dragon-flag': {
    start: require('../../assets/exercise-media/dragon-flag-start.webp'),
    end: require('../../assets/exercise-media/dragon-flag-end.webp')
  },
  'l-sit': {
    hold: require('../../assets/exercise-media/l-sit-hold.webp')
  },
  'mountain-climber': {
    start: require('../../assets/exercise-media/mountain-climbers-start.webp'),
    end: require('../../assets/exercise-media/mountain-climbers-end.webp')
  },
  'burpee': {
    start: require('../../assets/exercise-media/burpees-start.webp'),
    end: require('../../assets/exercise-media/burpees-end.webp')
  },
  'bear-crawl': {
    start: require('../../assets/exercise-media/bear-crawl-start.webp'),
    end: require('../../assets/exercise-media/bear-crawl-end.webp')
  },
  'kb-swing': {
    start: require('../../assets/exercise-media/kettlebell-swing-start.webp'),
    end: require('../../assets/exercise-media/kettlebell-swing-end.webp')
  },
  'clean-press': {
    start: require('../../assets/exercise-media/power-clean-start.webp'),
    end: require('../../assets/exercise-media/power-clean-end.webp')
  },
  'turkish-getup': {
    start: require('../../assets/exercise-media/turkish-get-up-start.webp'),
    end: require('../../assets/exercise-media/turkish-get-up-end.webp')
  },
  'donkey-kick': {
    start: require('../../assets/exercise-media/donkey-kicks-start.webp'),
    end: require('../../assets/exercise-media/donkey-kicks-end.webp')
  },
  'band-lateral-walk': {
    start: require('../../assets/exercise-media/band-lateral-walk-start.webp'),
    end: require('../../assets/exercise-media/band-lateral-walk-end.webp')
  },
  'single-leg-bridge': {
    start: require('../../assets/exercise-media/single-leg-glute-bridge-start.webp'),
    end: require('../../assets/exercise-media/single-leg-glute-bridge-end.webp')
  },
  'cable-pullthrough': {
    start: require('../../assets/exercise-media/cable-pull-through-start.webp'),
    end: require('../../assets/exercise-media/cable-pull-through-end.webp')
  },
  'cable-kickback': {
    start: require('../../assets/exercise-media/cable-kickback-start.webp'),
    end: require('../../assets/exercise-media/cable-kickback-end.webp')
  },
  'sl-rdl': {
    start: require('../../assets/exercise-media/single-leg-romanian-deadlift-start.webp'),
    end: require('../../assets/exercise-media/single-leg-romanian-deadlift-end.webp')
  },
  'sumo-deadlift': {
    start: require('../../assets/exercise-media/sumo-deadlift-start.webp'),
    end: require('../../assets/exercise-media/sumo-deadlift-end.webp')
  },
  'sl-hip-thrust': {
    start: require('../../assets/exercise-media/bodyweight-hip-thrust-start.webp'),
    end: require('../../assets/exercise-media/bodyweight-hip-thrust-end.webp')
  },
  'deficit-lunge': {
    start: require('../../assets/exercise-media/dumbbell-reverse-lunge-start.webp'),
    end: require('../../assets/exercise-media/dumbbell-reverse-lunge-end.webp')
  },
  'band-squat': {
    start: require('../../assets/exercise-media/band-squat-start.webp'),
    end: require('../../assets/exercise-media/band-squat-end.webp')
  },
  'kb-goblet': {
    start: require('../../assets/exercise-media/kettlebell-goblet-squat-start.webp'),
    end: require('../../assets/exercise-media/kettlebell-goblet-squat-end.webp')
  },
  'good-morning': {
    start: require('../../assets/exercise-media/good-morning-start.webp'),
    end: require('../../assets/exercise-media/good-morning-end.webp')
  },
  'cossack-squat': {
    start: require('../../assets/exercise-media/cossack-squat-start.webp'),
    end: require('../../assets/exercise-media/cossack-squat-end.webp')
  },
  'zercher-squat': {
    start: require('../../assets/exercise-media/zercher-squat-start.webp'),
    end: require('../../assets/exercise-media/zercher-squat-end.webp')
  },
  'overhead-squat': {
    start: require('../../assets/exercise-media/overhead-squat-start.webp'),
    end: require('../../assets/exercise-media/overhead-squat-end.webp')
  },
  'sissy-squat': {
    start: require('../../assets/exercise-media/sissy-squat-start.webp'),
    end: require('../../assets/exercise-media/sissy-squat-end.webp')
  },
  'calf-raise': {
    start: require('../../assets/exercise-media/calf-raises-start.webp'),
    end: require('../../assets/exercise-media/calf-raises-end.webp')
  },
  'seated-calf': {
    start: require('../../assets/exercise-media/seated-calf-raise-start.webp'),
    end: require('../../assets/exercise-media/seated-calf-raise-end.webp')
  },
  'sl-calf-raise': {
    start: require('../../assets/exercise-media/single-leg-calf-raise-start.webp'),
    end: require('../../assets/exercise-media/single-leg-calf-raise-end.webp')
  },
  'db-calf': {
    start: require('../../assets/exercise-media/dumbbell-calf-raise-start.webp'),
    end: require('../../assets/exercise-media/dumbbell-calf-raise-end.webp')
  },
  'jump-rope': {
    start: require('../../assets/exercise-media/jump-rope-start.webp'),
    end: require('../../assets/exercise-media/jump-rope-end.webp')
  },
  'db-shrug': {
    start: require('../../assets/exercise-media/dumbbell-shrug-start.webp'),
    end: require('../../assets/exercise-media/dumbbell-shrug-end.webp')
  },
  'bb-shrug': {
    start: require('../../assets/exercise-media/shrugs-start.webp'),
    end: require('../../assets/exercise-media/shrugs-end.webp')
  },
  'upright-row': {
    start: require('../../assets/exercise-media/upright-row-start.webp'),
    end: require('../../assets/exercise-media/upright-row-end.webp')
  },
  'rack-pull': {
    start: require('../../assets/exercise-media/rack-pull-start.webp'),
    end: require('../../assets/exercise-media/rack-pull-end.webp')
  },
  'wrist-curl': {
    start: require('../../assets/exercise-media/dumbbell-wrist-curl-start.webp'),
    end: require('../../assets/exercise-media/dumbbell-wrist-curl-end.webp')
  },
  'reverse-wrist-curl': {
    start: require('../../assets/exercise-media/dumbbell-reverse-wrist-curl-start.webp'),
    end: require('../../assets/exercise-media/dumbbell-reverse-wrist-curl-end.webp')
  },
  'dead-hang': {
    hold: require('../../assets/exercise-media/dead-hang-hold.webp')
  },
  'farmer-carry': {
    start: require('../../assets/exercise-media/farmers-walk-start.webp'),
    end: require('../../assets/exercise-media/farmers-walk-end.webp')
  },
  'reverse-curl': {
    start: require('../../assets/exercise-media/reverse-curl-start.webp'),
    end: require('../../assets/exercise-media/reverse-curl-end.webp')
  },
  'band-pull-apart': {
    start: require('../../assets/exercise-media/band-pull-apart-start.webp'),
    end: require('../../assets/exercise-media/band-pull-apart-end.webp')
  },
  'band-row': {
    start: require('../../assets/exercise-media/band-row-start.webp'),
    end: require('../../assets/exercise-media/band-row-end.webp')
  },
  'back-extension': {
    start: require('../../assets/exercise-media/back-extensions-start.webp'),
    end: require('../../assets/exercise-media/back-extensions-end.webp')
  },
  'inverted-row': {
    start: require('../../assets/exercise-media/inverted-row-start.webp'),
    end: require('../../assets/exercise-media/inverted-row-end.webp')
  },
  'cable-row': {
    start: require('../../assets/exercise-media/seated-cable-row-start.webp'),
    end: require('../../assets/exercise-media/seated-cable-row-end.webp')
  },
  'pendlay-row': {
    start: require('../../assets/exercise-media/pendlay-row-start.webp'),
    end: require('../../assets/exercise-media/pendlay-row-end.webp')
  },
  'reverse-snow-angel': {
    start: require('../../assets/exercise-media/reverse-snow-angels-start.webp'),
    end: require('../../assets/exercise-media/reverse-snow-angels-end.webp')
  },
  'prone-ytw': {
    start: require('../../assets/exercise-media/prone-y-raise-start.webp'),
    end: require('../../assets/exercise-media/prone-y-raise-end.webp')
  },
  'table-row': {
    start: require('../../assets/exercise-media/table-inverted-row-start.webp'),
    end: require('../../assets/exercise-media/table-inverted-row-end.webp')
  },
  'band-curl': {
    start: require('../../assets/exercise-media/band-bicep-curl-start.webp'),
    end: require('../../assets/exercise-media/band-bicep-curl-end.webp')
  },
  'concentration-curl': {
    start: require('../../assets/exercise-media/concentration-curl-start.webp'),
    end: require('../../assets/exercise-media/concentration-curl-end.webp')
  },
  'cable-curl': {
    start: require('../../assets/exercise-media/cable-curl-start.webp'),
    end: require('../../assets/exercise-media/cable-curl-end.webp')
  },
  'rope-pushdown': {
    start: require('../../assets/exercise-media/tricep-pushdowns-start.webp'),
    end: require('../../assets/exercise-media/tricep-pushdowns-end.webp')
  },
  'incline-curl': {
    start: require('../../assets/exercise-media/incline-dumbbell-curl-start.webp'),
    end: require('../../assets/exercise-media/incline-dumbbell-curl-end.webp')
  },
  'zottman-curl': {
    start: require('../../assets/exercise-media/zottman-curl-start.webp'),
    end: require('../../assets/exercise-media/zottman-curl-end.webp')
  },
  'floor-press': {
    start: require('../../assets/exercise-media/dumbbell-floor-press-start.webp'),
    end: require('../../assets/exercise-media/dumbbell-floor-press-end.webp')
  },
  'band-chest-press': {
    start: require('../../assets/exercise-media/band-chest-press-start.webp'),
    end: require('../../assets/exercise-media/band-chest-press-end.webp')
  },
  'db-fly': {
    start: require('../../assets/exercise-media/dumbbell-fly-start.webp'),
    end: require('../../assets/exercise-media/dumbbell-fly-end.webp')
  },
  'cable-fly': {
    start: require('../../assets/exercise-media/cable-fly-low-to-high-start.webp'),
    end: require('../../assets/exercise-media/cable-fly-low-to-high-end.webp')
  },
  'db-press': {
    start: require('../../assets/exercise-media/dumbbell-shoulder-press-start.webp'),
    end: require('../../assets/exercise-media/dumbbell-shoulder-press-end.webp')
  },
  'band-lateral': {
    start: require('../../assets/exercise-media/band-lateral-raise-start.webp'),
    end: require('../../assets/exercise-media/band-lateral-raise-end.webp')
  },
  'arnold-press': {
    start: require('../../assets/exercise-media/arnold-press-start.webp'),
    end: require('../../assets/exercise-media/arnold-press-end.webp')
  },
  'cable-lateral': {
    start: require('../../assets/exercise-media/cable-lateral-raise-start.webp'),
    end: require('../../assets/exercise-media/cable-lateral-raise-end.webp')
  },
  'face-pull': {
    start: require('../../assets/exercise-media/face-pulls-start.webp'),
    end: require('../../assets/exercise-media/face-pulls-end.webp')
  },
  'wall-handstand': {
    hold: require('../../assets/exercise-media/wall-handstand-hold-hold.webp')
  },
  'scap-pushup': {
    start: require('../../assets/exercise-media/scap-push-ups-start.webp'),
    end: require('../../assets/exercise-media/scap-push-ups-end.webp')
  },
  'wall-angel': {
    start: require('../../assets/exercise-media/wall-slides-start.webp'),
    end: require('../../assets/exercise-media/wall-slides-end.webp')
  },
  'bird-dog': {
    start: require('../../assets/exercise-media/bird-dog-start.webp'),
    end: require('../../assets/exercise-media/bird-dog-end.webp')
  },
  'hollow-hold': {
    hold: require('../../assets/exercise-media/hollow-body-hold-hold.webp')
  },
  'cable-crunch': {
    start: require('../../assets/exercise-media/cable-crunch-start.webp'),
    end: require('../../assets/exercise-media/cable-crunch-end.webp')
  },
  'woodchop': {
    start: require('../../assets/exercise-media/cable-woodchopper-start.webp'),
    end: require('../../assets/exercise-media/cable-woodchopper-end.webp')
  },
  'suitcase-carry': {
    start: require('../../assets/exercise-media/suitcase-carry-start.webp'),
    end: require('../../assets/exercise-media/suitcase-carry-end.webp')
  },
  'toes-to-bar': {
    start: require('../../assets/exercise-media/toes-to-bar-start.webp'),
    end: require('../../assets/exercise-media/toes-to-bar-end.webp')
  },
  'windshield-wiper': {
    start: require('../../assets/exercise-media/windshield-wipers-start.webp'),
    end: require('../../assets/exercise-media/windshield-wipers-end.webp')
  },
  'jumping-jack': {
    start: require('../../assets/exercise-media/jumping-jacks-start.webp'),
    end: require('../../assets/exercise-media/jumping-jacks-end.webp')
  },
  'high-knees': {
    start: require('../../assets/exercise-media/high-knees-start.webp'),
    end: require('../../assets/exercise-media/high-knees-end.webp')
  },
  'kb-clean': {
    start: require('../../assets/exercise-media/kettlebell-clean-start.webp'),
    end: require('../../assets/exercise-media/kettlebell-clean-end.webp')
  },
  'skater-hop': {
    start: require('../../assets/exercise-media/skater-jump-start.webp'),
    end: require('../../assets/exercise-media/skater-jump-end.webp')
  },
  'kb-snatch': {
    start: require('../../assets/exercise-media/kettlebell-snatch-start.webp'),
    end: require('../../assets/exercise-media/kettlebell-snatch-end.webp')
  },
  'tuck-jump': {
    start: require('../../assets/exercise-media/tuck-jump-start.webp'),
    end: require('../../assets/exercise-media/tuck-jump-end.webp')
  },
  'meadows-row': {
    start: require('../../assets/exercise-media/meadows-row-start.webp'),
    end: require('../../assets/exercise-media/meadows-row-end.webp')
  },
  'rev-grip-row': {
    start: require('../../assets/exercise-media/reverse-grip-barbell-row-start.webp'),
    end: require('../../assets/exercise-media/reverse-grip-barbell-row-end.webp')
  },
  'neutral-pullup': {
    start: require('../../assets/exercise-media/neutral-grip-pull-up-start.webp'),
    end: require('../../assets/exercise-media/neutral-grip-pull-up-end.webp')
  },
  'negative-pullup': {
    start: require('../../assets/exercise-media/negative-pull-up-start.webp'),
    end: require('../../assets/exercise-media/negative-pull-up-end.webp')
  },
  'renegade-row': {
    start: require('../../assets/exercise-media/renegade-row-start.webp'),
    end: require('../../assets/exercise-media/renegade-row-end.webp')
  },
  't-bar-row': {
    start: require('../../assets/exercise-media/t-bar-row-start.webp'),
    end: require('../../assets/exercise-media/t-bar-row-end.webp')
  },
  'plate-pinch': {
    hold: require('../../assets/exercise-media/plate-pinch-hold-hold.webp')
  },
  'hang-clean': {
    start: require('../../assets/exercise-media/hang-clean-start.webp'),
    end: require('../../assets/exercise-media/hang-clean-end.webp')
  },
  'spider-curl': {
    start: require('../../assets/exercise-media/spider-curl-start.webp'),
    end: require('../../assets/exercise-media/spider-curl-end.webp')
  },
  'deficit-pushup': {
    start: require('../../assets/exercise-media/deficit-push-up-start.webp'),
    end: require('../../assets/exercise-media/deficit-push-up-end.webp')
  },
  'hindu-pushup': {
    start: require('../../assets/exercise-media/hindu-push-up-start.webp'),
    end: require('../../assets/exercise-media/hindu-push-up-end.webp')
  },
  'landmine-press': {
    start: require('../../assets/exercise-media/landmine-press-start.webp'),
    end: require('../../assets/exercise-media/landmine-press-end.webp')
  },
  'push-jerk': {
    start: require('../../assets/exercise-media/push-jerk-start.webp'),
    end: require('../../assets/exercise-media/push-jerk-end.webp')
  },
  'kb-press': {
    start: require('../../assets/exercise-media/kettlebell-press-start.webp'),
    end: require('../../assets/exercise-media/kettlebell-press-end.webp')
  },
  'trap-bar-dl': {
    start: require('../../assets/exercise-media/trap-bar-deadlift-start.webp'),
    end: require('../../assets/exercise-media/trap-bar-deadlift-end.webp')
  },
  'glute-ham-raise': {
    start: require('../../assets/exercise-media/glute-ham-raise-start.webp'),
    end: require('../../assets/exercise-media/glute-ham-raise-end.webp')
  },
  'reverse-nordic': {
    start: require('../../assets/exercise-media/reverse-nordic-start.webp'),
    end: require('../../assets/exercise-media/reverse-nordic-end.webp')
  },
  'jump-lunge': {
    start: require('../../assets/exercise-media/jump-lunge-start.webp'),
    end: require('../../assets/exercise-media/jump-lunge-end.webp')
  },
  'copenhagen': {
    hold: require('../../assets/exercise-media/copenhagen-plank-hold.webp')
  },
  'hollow-rock': {
    start: require('../../assets/exercise-media/hollow-body-rock-start.webp'),
    end: require('../../assets/exercise-media/hollow-body-rock-end.webp')
  },
  'snatch': {
    start: require('../../assets/exercise-media/snatch-start.webp'),
    end: require('../../assets/exercise-media/snatch-end.webp')
  },
  'squat-thrust': {
    start: require('../../assets/exercise-media/squat-thrust-start.webp'),
    end: require('../../assets/exercise-media/squat-thrust-end.webp')
  },
  'med-ball-slam': {
    start: require('../../assets/exercise-media/medicine-ball-slam-start.webp'),
    end: require('../../assets/exercise-media/medicine-ball-slam-end.webp')
  },
  'weighted-sl-calf': {
    start: require('../../assets/exercise-media/single-leg-calf-raise-start.webp'),
    end: require('../../assets/exercise-media/single-leg-calf-raise-end.webp')
  },
};

export function mediaFor(id) {
  return MEDIA[id] || null;
}


// Everkinetic line drawings (PNG) have a white background; the OEI renders are on black.
const WHITE_STAGE = new Set(['guillotine', 'decline-wide', 'bent-pullover', 'decline-pullover', 'close-pull', 'rear-delt', 'one-arm-snatch']);

export function stageColorFor(id) {
  return WHITE_STAGE.has(id) ? '#FFFFFF' : '#0B0B0C';
}
