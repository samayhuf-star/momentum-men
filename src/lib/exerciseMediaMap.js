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
};

export function mediaFor(id) {
  return MEDIA[id] || null;
}

