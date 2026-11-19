export const exercises = [
  // CHEST (15)
  { id: 'bb-bench', name: 'Barbell Bench Press', cue: 'Lower to mid-chest, drive through heels.', duration: 40, reps: 10, level: 'intermediate', muscle: 'chest' },
  { id: 'bb-incline', name: 'Incline Barbell Press', cue: 'Upper chest focus, controlled descent.', duration: 40, reps: 10, level: 'intermediate', muscle: 'chest' },
  { id: 'bb-decline', name: 'Decline Barbell Press', cue: 'Lower chest emphasis.', duration: 40, reps: 10, level: 'intermediate', muscle: 'chest' },
  { id: 'db-bench', name: 'Dumbbell Bench Press', cue: 'Greater range of motion.', duration: 40, reps: 12, level: 'beginner', muscle: 'chest' },
  { id: 'db-incline', name: 'Incline Dumbbell Press', cue: 'Squeeze at the top.', duration: 40, reps: 12, level: 'beginner', muscle: 'chest' },
  { id: 'cable-cross', name: 'Cable Crossover', cue: 'Cross hands at the bottom.', duration: 40, reps: 15, level: 'intermediate', muscle: 'chest' },
  { id: 'band-bench', name: 'Band Bench Press', cue: 'Constant tension.', duration: 40, reps: 15, level: 'beginner', muscle: 'chest', hidden: true },
  { id: 'archer-push', name: 'Archer Push-Up', cue: 'Shift weight to one arm.', duration: 40, reps: 8, level: 'advanced', muscle: 'chest' },
  { id: 'bb-wide', name: 'Wide Grip Bench', cue: 'Wider stance for outer chest.', duration: 40, reps: 10, level: 'intermediate', muscle: 'chest' },
  { id: 'guillotine', name: 'Guillotine Press', cue: 'Bar to neck, careful form.', duration: 40, reps: 8, level: 'advanced', muscle: 'chest' },
  { id: 'cable-bench', name: 'Cable Bench Press', cue: 'Constant tension throughout.', duration: 40, reps: 12, level: 'intermediate', muscle: 'chest', hidden: true },
  { id: 'rev-incline', name: 'Reverse Grip Incline', cue: 'Upper chest variation.', duration: 40, reps: 10, level: 'intermediate', muscle: 'chest', hidden: true },
  { id: 'band-twist', name: 'Twisting Chest Press', cue: 'Add rotation.', duration: 40, reps: 12, level: 'beginner', muscle: 'chest', hidden: true },
  { id: 'decline-wide', name: 'Decline Wide Press', cue: 'Lower outer chest.', duration: 40, reps: 10, level: 'intermediate', muscle: 'chest' },
  { id: 'chest-stretch', name: 'Behind Head Stretch', cue: 'Open the chest.', duration: 30, reps: null, level: 'beginner', muscle: 'chest', hidden: true },

  // BACK (15)
  { id: 'pull-up', name: 'Pull-Up', cue: 'Full range, controlled.', duration: 40, reps: 8, level: 'intermediate', muscle: 'back' },
  { id: 'band-pull', name: 'Band Assisted Pull-Up', cue: 'Build strength.', duration: 40, reps: 10, level: 'beginner', muscle: 'back', hidden: true },
  { id: 'close-pulldown', name: 'Close Grip Pulldown', cue: 'Focus on lats.', duration: 40, reps: 12, level: 'beginner', muscle: 'back' },
  { id: 'lat-pulldown', name: 'Lat Pulldown', cue: 'Pull to upper chest.', duration: 40, reps: 12, level: 'beginner', muscle: 'back' },
  { id: 'bb-pullover', name: 'Barbell Pullover', cue: 'Stretch lats.', duration: 40, reps: 12, level: 'intermediate', muscle: 'back' },
  { id: 'stand-pull', name: 'Standing Pull-Up', cue: 'Assisted variation.', duration: 40, reps: 10, level: 'beginner', muscle: 'back', hidden: true },
  { id: 'underhand-pd', name: 'Underhand Pulldown', cue: 'Biceps involvement.', duration: 40, reps: 12, level: 'beginner', muscle: 'back' },
  { id: 'bent-pullover', name: 'Bent Arm Pullover', cue: 'Lat focus.', duration: 40, reps: 12, level: 'intermediate', muscle: 'back' },
  { id: 'fixed-pulldown', name: 'Fixed Back Pulldown', cue: 'Strict form.', duration: 40, reps: 12, level: 'intermediate', muscle: 'back', hidden: true },
  { id: 'archer-pull', name: 'Archer Pull-Up', cue: 'One arm emphasis.', duration: 40, reps: 6, level: 'advanced', muscle: 'back', hidden: true },
  { id: 'decline-pullover', name: 'Decline Pullover', cue: 'Greater stretch.', duration: 40, reps: 12, level: 'intermediate', muscle: 'back' },
  { id: 'one-arm-pd', name: 'One Arm Pulldown', cue: 'Unilateral work.', duration: 40, reps: 10, level: 'intermediate', muscle: 'back', hidden: true },
  { id: 'pullover-press', name: 'Pullover to Press', cue: 'Compound move.', duration: 40, reps: 10, level: 'advanced', muscle: 'back', hidden: true },
  { id: 'close-pull', name: 'Close Grip Pull-Up', cue: 'Inner back.', duration: 40, reps: 8, level: 'intermediate', muscle: 'back' },
  { id: 'bench-pull', name: 'Bench Pull-Ups', cue: 'Horizontal pull.', duration: 40, reps: 12, level: 'beginner', muscle: 'back' },

  // SHOULDERS (15)
  { id: 'ohp', name: 'Overhead Press', cue: 'Strict form, full lockout.', duration: 40, reps: 10, level: 'intermediate', muscle: 'shoulders' },
  { id: 'lateral-raise', name: 'Lateral Raise', cue: 'Lead with elbows.', duration: 40, reps: 15, level: 'beginner', muscle: 'shoulders' },
  { id: 'front-raise', name: 'Front Raise', cue: 'Control the descent.', duration: 40, reps: 12, level: 'beginner', muscle: 'shoulders' },
  { id: 'band-ohp', name: 'Band Shoulder Press', cue: 'Constant tension.', duration: 40, reps: 12, level: 'beginner', muscle: 'shoulders' },
  { id: 'rear-delt', name: 'Rear Delt Row', cue: 'Squeeze shoulder blades.', duration: 40, reps: 12, level: 'intermediate', muscle: 'shoulders' },
  { id: 'reverse-fly', name: 'Reverse Fly', cue: 'Rear delts.', duration: 40, reps: 15, level: 'beginner', muscle: 'shoulders' },
  { id: 'wide-military', name: 'Wide Military Press', cue: 'Broader stance.', duration: 40, reps: 10, level: 'intermediate', muscle: 'shoulders' },
  { id: 'bb-front', name: 'Barbell Front Raise', cue: 'Anterior delts.', duration: 40, reps: 12, level: 'beginner', muscle: 'shoulders', hidden: true },
  { id: 'y-raise', name: 'Y Raise', cue: 'Upper traps + delts.', duration: 40, reps: 12, level: 'beginner', muscle: 'shoulders' },
  { id: 'behind-neck', name: 'Behind Neck Press', cue: 'Careful with mobility.', duration: 40, reps: 8, level: 'advanced', muscle: 'shoulders', hidden: true },
  { id: 'rear-row', name: 'Standing Rear Delt Row', cue: 'Isolate rear delts.', duration: 40, reps: 12, level: 'intermediate', muscle: 'shoulders', hidden: true },
  { id: 'thruster', name: 'Thruster', cue: 'Squat + press.', duration: 40, reps: 10, level: 'advanced', muscle: 'shoulders' },
  { id: 'skier', name: 'Skier', cue: 'Dynamic movement.', duration: 40, reps: 12, level: 'intermediate', muscle: 'shoulders', hidden: true },
  { id: 'twist-ohp', name: 'Twisting Overhead Press', cue: 'Add rotation.', duration: 40, reps: 10, level: 'intermediate', muscle: 'shoulders', hidden: true },
  { id: 'one-arm-snatch', name: 'One Arm Snatch', cue: 'Explosive.', duration: 40, reps: 6, level: 'advanced', muscle: 'shoulders' },

  // CORE (15) - keep existing + add
  { id: 'bicycle', name: 'Bicycle Crunches', cue: 'Elbow to opposite knee.', duration: 40, reps: 20, level: 'beginner', muscle: 'core' },
  { id: 'hanging-knee', name: 'Hanging Knee Raises', cue: 'Control the swing.', duration: 40, reps: 12, level: 'advanced', muscle: 'core' },
  { id: 'v-up', name: 'V-Ups', cue: 'Reach for toes.', duration: 40, reps: 15, level: 'intermediate', muscle: 'core' },
  { id: 'ab-wheel', name: 'Ab Wheel Rollout', cue: 'Slow out, strong back.', duration: 40, reps: 8, level: 'advanced', muscle: 'core' },
  { id: 'side-plank', name: 'Side Plank', cue: 'Hips stacked.', duration: 30, reps: null, level: 'intermediate', muscle: 'core' },
  { id: 'russian', name: 'Russian Twist', cue: 'Full rotation.', duration: 40, reps: 20, level: 'intermediate', muscle: 'core' },
  { id: 'leg-raise', name: 'Leg Raises', cue: 'Lower back pressed down.', duration: 40, reps: 12, level: 'intermediate', muscle: 'core' },
  { id: 'sit-up', name: 'Sit-Up', cue: 'Controlled.', duration: 40, reps: 15, level: 'beginner', muscle: 'core' },
  { id: 'side-bend', name: 'Side Bend', cue: 'Oblique focus.', duration: 40, reps: 15, level: 'beginner', muscle: 'core' },
  { id: 'overhead-sit', name: 'Overhead Sit-Up', cue: 'Arms extended.', duration: 40, reps: 12, level: 'intermediate', muscle: 'core', hidden: true },
  { id: 'band-bicycle', name: 'Band Bicycle Crunch', cue: 'Added resistance.', duration: 40, reps: 15, level: 'intermediate', muscle: 'core' },
  { id: 'jackknife', name: 'Jackknife Sit-Up', cue: 'Explosive.', duration: 40, reps: 12, level: 'advanced', muscle: 'core' },
  { id: 'assisted-sit', name: 'Assisted Sit-Up', cue: 'Support as needed.', duration: 40, reps: 15, level: 'beginner', muscle: 'core', hidden: true },
  { id: 'alt-vup', name: 'Alternating V-Up', cue: 'One side at a time.', duration: 40, reps: 12, level: 'intermediate', muscle: 'core', hidden: true },
  { id: 'pallof', name: 'Pallof Press', cue: 'Anti-rotation.', duration: 40, reps: 12, level: 'intermediate', muscle: 'core' },

  // ---- ADDED (Nov 2026): legs, arms, full body and advanced calisthenics/barbell work ----
  // gear: what the exercise needs; impact: true = jumping/high-impact (down-weighted for some users)
  // LEGS
  { id: 'bw-squat', name: 'Bodyweight Squat', cue: 'Chest tall, knees track over toes.', duration: 40, reps: 15, level: 'beginner', muscle: 'legs', gear: ['bodyweight'] },
  { id: 'goblet-squat', name: 'Goblet Squat', cue: 'Hold the weight at your chest, sit between your hips.', duration: 40, reps: 12, level: 'beginner', muscle: 'legs', gear: ['dumbbell'] },
  { id: 'glute-bridge', name: 'Glute Bridge', cue: 'Drive through heels, squeeze at the top.', duration: 40, reps: 15, level: 'beginner', muscle: 'legs', gear: ['bodyweight'] },
  { id: 'walking-lunge', name: 'Reverse Lunge', cue: 'Step back, back knee kisses the floor.', duration: 40, reps: 16, level: 'beginner', muscle: 'legs', gear: ['bodyweight'] },
  { id: 'back-squat', name: 'Barbell Back Squat', cue: 'Brace hard, break parallel, drive up.', duration: 45, reps: 8, level: 'intermediate', muscle: 'legs', gear: ['barbell'] },
  { id: 'rdl', name: 'Romanian Deadlift', cue: 'Hips back, soft knees, flat back.', duration: 45, reps: 10, level: 'intermediate', muscle: 'legs', gear: ['barbell'] },
  { id: 'hip-thrust', name: 'Barbell Hip Thrust', cue: 'Chin tucked, full lockout at the top.', duration: 45, reps: 10, level: 'intermediate', muscle: 'legs', gear: ['barbell'] },
  { id: 'jump-squat', name: 'Jump Squat', cue: 'Explode up, land soft and reset.', duration: 40, reps: 12, level: 'intermediate', muscle: 'legs', gear: ['bodyweight'], impact: true },
  { id: 'step-up', name: 'Dumbbell Step-Up', cue: 'Drive through the lead heel, no push off the back foot.', duration: 40, reps: 12, level: 'intermediate', muscle: 'legs', gear: ['dumbbell'] },
  { id: 'front-squat', name: 'Front Squat', cue: 'Elbows high, torso upright.', duration: 45, reps: 6, level: 'advanced', muscle: 'legs', gear: ['barbell'] },
  { id: 'deadlift', name: 'Conventional Deadlift', cue: 'Wedge in, push the floor away, lock out tall.', duration: 45, reps: 5, level: 'advanced', muscle: 'legs', gear: ['barbell'] },
  { id: 'bulgarian', name: 'Bulgarian Split Squat', cue: 'Torso slightly forward, front heel planted.', duration: 45, reps: 8, level: 'advanced', muscle: 'legs', gear: ['dumbbell'] },
  { id: 'pistol-squat', name: 'Pistol Squat', cue: 'Reach forward as a counterbalance, control the bottom.', duration: 40, reps: 5, level: 'advanced', muscle: 'legs', gear: ['bodyweight'] },
  { id: 'nordic-curl', name: 'Nordic Hamstring Curl', cue: 'Fall slowly, keep hips extended.', duration: 40, reps: 5, level: 'advanced', muscle: 'legs', gear: ['bodyweight'] },
  { id: 'box-jump', name: 'Box Jump', cue: 'Swing arms, land quietly, step down.', duration: 40, reps: 8, level: 'advanced', muscle: 'legs', gear: ['bodyweight'], impact: true },

  // ARMS
  { id: 'hammer-curl', name: 'Hammer Curl', cue: 'Neutral grip, elbows pinned to your sides.', duration: 40, reps: 12, level: 'beginner', muscle: 'arms', gear: ['dumbbell'] },
  { id: 'tricep-ext', name: 'Overhead Triceps Extension', cue: 'Elbows close to your ears, full stretch.', duration: 40, reps: 12, level: 'beginner', muscle: 'arms', gear: ['dumbbell'] },
  { id: 'bench-dip', name: 'Bench Dip', cue: 'Lower until elbows hit 90 degrees.', duration: 40, reps: 12, level: 'beginner', muscle: 'arms', gear: ['bodyweight'] },
  { id: 'bb-curl', name: 'Barbell Curl', cue: 'No swinging, squeeze at the top.', duration: 40, reps: 10, level: 'intermediate', muscle: 'arms', gear: ['barbell'] },
  { id: 'skull-crusher', name: 'Skull Crusher', cue: 'Upper arms still, lower to the forehead.', duration: 40, reps: 10, level: 'intermediate', muscle: 'arms', gear: ['barbell'] },
  { id: 'diamond-push', name: 'Diamond Push-Up', cue: 'Hands under chest, elbows tight.', duration: 40, reps: 10, level: 'intermediate', muscle: 'arms', gear: ['bodyweight'] },
  { id: 'chin-up', name: 'Chin-Up', cue: 'Palms in, chin over the bar, slow down.', duration: 40, reps: 8, level: 'intermediate', muscle: 'arms', gear: ['bar'] },
  { id: 'parallel-dip', name: 'Parallel Bar Dip', cue: 'Lean slightly forward, shoulders away from ears.', duration: 40, reps: 10, level: 'advanced', muscle: 'arms', gear: ['bar'] },
  { id: 'close-grip-bench', name: 'Close-Grip Bench Press', cue: 'Elbows tucked, bar touches low chest.', duration: 45, reps: 8, level: 'advanced', muscle: 'arms', gear: ['barbell'] },

  // CHEST / BACK / SHOULDERS (bodyweight foundations + advanced)
  { id: 'push-up', name: 'Push-Up', cue: 'Straight line from head to heels.', duration: 40, reps: 12, level: 'beginner', muscle: 'chest', gear: ['bodyweight'] },
  { id: 'pseudo-planche', name: 'Pseudo Planche Push-Up', cue: 'Lean forward, hands by the hips.', duration: 40, reps: 6, level: 'advanced', muscle: 'chest', gear: ['bodyweight'], hidden: true },
  { id: 'clap-push', name: 'Clapping Push-Up', cue: 'Explode up, catch softly.', duration: 40, reps: 6, level: 'advanced', muscle: 'chest', gear: ['bodyweight'], impact: true },
  { id: 'superman', name: 'Superman Hold', cue: 'Lift arms and legs, squeeze your back.', duration: 30, reps: null, level: 'beginner', muscle: 'back', gear: ['bodyweight'] },
  { id: 'db-row', name: 'One-Arm Dumbbell Row', cue: 'Pull to the hip, keep your back flat.', duration: 40, reps: 12, level: 'beginner', muscle: 'back', gear: ['dumbbell'] },
  { id: 'bb-row', name: 'Barbell Bent-Over Row', cue: 'Hinge, pull to the lower ribs.', duration: 45, reps: 8, level: 'intermediate', muscle: 'back', gear: ['barbell'] },
  { id: 'weighted-pullup', name: 'Wide-Grip Pull-Up', cue: 'Wide hands, dead hang start, chest to the bar.', duration: 40, reps: 5, level: 'advanced', muscle: 'back', gear: ['bar'] },
  { id: 'muscle-up', name: 'Muscle-Up', cue: 'Pull explosively, turn over the bar.', duration: 40, reps: 3, level: 'advanced', muscle: 'back', gear: ['bar'] },
  { id: 'shoulder-tap', name: 'Plank Shoulder Taps', cue: 'Hips still, tap slowly.', duration: 40, reps: 20, level: 'beginner', muscle: 'shoulders', gear: ['bodyweight'] },
  { id: 'pike-push', name: 'Pike Push-Up', cue: 'Hips high, head between your hands.', duration: 40, reps: 10, level: 'intermediate', muscle: 'shoulders', gear: ['bodyweight'] },
  { id: 'hspu', name: 'Handstand Push-Up', cue: 'Brace your core, press straight up.', duration: 40, reps: 5, level: 'advanced', muscle: 'shoulders', gear: ['bodyweight'] },
  { id: 'push-press', name: 'Barbell Push Press', cue: 'Dip, drive with legs, finish overhead.', duration: 45, reps: 6, level: 'advanced', muscle: 'shoulders', gear: ['barbell'] },

  // CORE
  { id: 'plank', name: 'Plank', cue: 'Ribs down, squeeze glutes.', duration: 40, reps: null, level: 'beginner', muscle: 'core', gear: ['bodyweight'] },
  { id: 'dead-bug', name: 'Dead Bug', cue: 'Low back pressed to the floor.', duration: 40, reps: 16, level: 'beginner', muscle: 'core', gear: ['bodyweight'] },
  { id: 'hanging-leg-raise', name: 'Hanging Leg Raise', cue: 'Straight legs, no swing.', duration: 40, reps: 10, level: 'advanced', muscle: 'core', gear: ['bar'] },
  { id: 'dragon-flag', name: 'Dragon Flag', cue: 'Body rigid, lower slowly.', duration: 40, reps: 4, level: 'advanced', muscle: 'core', gear: ['bodyweight'] },
  { id: 'l-sit', name: 'L-Sit Hold', cue: 'Push the floor away, legs straight.', duration: 30, reps: null, level: 'advanced', muscle: 'core', gear: ['bodyweight'] },

  // FULL BODY / CONDITIONING
  { id: 'mountain-climber', name: 'Mountain Climbers', cue: 'Fast knees, flat back.', duration: 40, reps: 30, level: 'beginner', muscle: 'full body', gear: ['bodyweight'] },
  { id: 'burpee', name: 'Burpee', cue: 'Chest to floor, jump and clap overhead.', duration: 40, reps: 10, level: 'intermediate', muscle: 'full body', gear: ['bodyweight'], impact: true },
  { id: 'bear-crawl', name: 'Bear Crawl', cue: 'Knees an inch off the floor, move opposite hand and foot.', duration: 40, reps: null, level: 'intermediate', muscle: 'full body', gear: ['bodyweight'] },
  { id: 'kb-swing', name: 'Kettlebell Swing', cue: 'Hinge, snap the hips, arms just guide.', duration: 40, reps: 15, level: 'intermediate', muscle: 'full body', gear: ['kettlebell'], impact: true },
  { id: 'clean-press', name: 'Power Clean', cue: 'Pull close to the body and catch in the rack.', duration: 45, reps: 5, level: 'advanced', muscle: 'full body', gear: ['barbell'] },
  { id: 'turkish-getup', name: 'Turkish Get-Up', cue: 'Eyes on the weight, move one step at a time.', duration: 45, reps: 3, level: 'advanced', muscle: 'full body', gear: ['kettlebell'] },
  { id: 'burpee-pullup', name: 'Burpee Pull-Up', cue: 'Burpee, jump to the bar, pull up.', duration: 40, reps: 6, level: 'advanced', muscle: 'full body', gear: ['bar'], impact: true, hidden: true },

  // GLUTES (new group)
  { id: 'donkey-kick', name: 'Donkey Kick', cue: 'Hips square, press the heel to the ceiling.', duration: 40, reps: 15, level: 'beginner', muscle: 'glutes', gear: ['bodyweight'] },
  { id: 'band-lateral-walk', name: 'Banded Lateral Walk', cue: 'Stay low, keep tension on the band every step.', duration: 40, reps: 16, level: 'beginner', muscle: 'glutes', gear: ['band'] },
  { id: 'single-leg-bridge', name: 'Single-Leg Glute Bridge', cue: 'Hips level, drive through the heel.', duration: 40, reps: 12, level: 'intermediate', muscle: 'glutes', gear: ['bodyweight'] },
  { id: 'cable-pullthrough', name: 'Cable Pull-Through', cue: 'Hinge back, snap the hips forward.', duration: 40, reps: 12, level: 'intermediate', muscle: 'glutes', gear: ['cable'] },
  { id: 'cable-kickback', name: 'Cable Glute Kickback', cue: 'Squeeze at the top, no lower-back arch.', duration: 40, reps: 12, level: 'intermediate', muscle: 'glutes', gear: ['cable'] },
  { id: 'sl-rdl', name: 'Single-Leg Romanian Deadlift', cue: 'Hips square, long line from head to heel.', duration: 40, reps: 10, level: 'intermediate', muscle: 'glutes', gear: ['dumbbell'] },
  { id: 'sumo-deadlift', name: 'Sumo Deadlift', cue: 'Wide stance, spread the floor, lock out tall.', duration: 45, reps: 6, level: 'advanced', muscle: 'glutes', gear: ['barbell'] },
  { id: 'sl-hip-thrust', name: 'Bodyweight Hip Thrust', cue: 'Chin tucked, full lockout at the top.', duration: 40, reps: 10, level: 'intermediate', muscle: 'glutes', gear: ['bodyweight'] },
  { id: 'deficit-lunge', name: 'Dumbbell Reverse Lunge', cue: 'Step back, control the drop, drive through the front heel.', duration: 45, reps: 8, level: 'intermediate', muscle: 'glutes', gear: ['dumbbell'] },

  // LEGS: hamstrings, quads and gear gaps
  { id: 'band-squat', name: 'Banded Squat', cue: 'Push the knees out against the band.', duration: 40, reps: 15, level: 'beginner', muscle: 'legs', gear: ['band'] },
  { id: 'kb-goblet', name: 'Kettlebell Goblet Squat', cue: 'Elbows inside the knees, chest tall.', duration: 40, reps: 12, level: 'beginner', muscle: 'legs', gear: ['kettlebell'] },
  { id: 'good-morning', name: 'Good Morning', cue: 'Soft knees, hinge until hamstrings stretch.', duration: 45, reps: 10, level: 'intermediate', muscle: 'legs', gear: ['barbell'] },
  { id: 'cossack-squat', name: 'Cossack Squat', cue: 'Sit into one side, keep the other leg straight.', duration: 40, reps: 10, level: 'intermediate', muscle: 'legs', gear: ['bodyweight'] },
  { id: 'kb-front-squat', name: 'Kettlebell Front Squat', cue: 'Bells racked, elbows tight to the ribs.', duration: 40, reps: 10, level: 'intermediate', muscle: 'legs', gear: ['kettlebell'], hidden: true },
  { id: 'stiff-leg-dl', name: 'Stiff-Leg Deadlift', cue: 'Bar close, feel the hamstrings load.', duration: 45, reps: 8, level: 'advanced', muscle: 'legs', gear: ['barbell'], hidden: true },
  { id: 'zercher-squat', name: 'Zercher Squat', cue: 'Bar in the elbows, brace and stay upright.', duration: 45, reps: 6, level: 'advanced', muscle: 'legs', gear: ['barbell'] },
  { id: 'overhead-squat', name: 'Overhead Squat', cue: 'Active shoulders, bar over the mid-foot.', duration: 45, reps: 5, level: 'advanced', muscle: 'legs', gear: ['barbell'] },
  { id: 'shrimp-squat', name: 'Shrimp Squat', cue: 'Hold the rear foot, touch the knee down softly.', duration: 40, reps: 5, level: 'advanced', muscle: 'legs', gear: ['bodyweight'], hidden: true },
  { id: 'sissy-squat', name: 'Sissy Squat', cue: 'Knees forward, torso leaning back as one line.', duration: 40, reps: 8, level: 'advanced', muscle: 'legs', gear: ['bodyweight'] },

  // CALVES (new group)
  { id: 'calf-raise', name: 'Standing Calf Raise', cue: 'Full stretch at the bottom, pause at the top.', duration: 40, reps: 20, level: 'beginner', muscle: 'calves', gear: ['bodyweight'] },
  { id: 'seated-calf', name: 'Seated Dumbbell Calf Raise', cue: 'Weight on the knees, slow and full range.', duration: 40, reps: 15, level: 'beginner', muscle: 'calves', gear: ['dumbbell'] },
  { id: 'sl-calf-raise', name: 'Single-Leg Calf Raise', cue: 'Hold a wall for balance only, rise tall.', duration: 40, reps: 12, level: 'intermediate', muscle: 'calves', gear: ['bodyweight'], hidden: true },
  { id: 'db-calf', name: 'Dumbbell Calf Raise', cue: 'Weights at your sides, 2 second lower.', duration: 40, reps: 15, level: 'intermediate', muscle: 'calves', gear: ['dumbbell'] },
  { id: 'jump-rope', name: 'Jump Rope', cue: 'Small hops, wrists do the turning.', duration: 40, reps: null, level: 'intermediate', muscle: 'calves', gear: ['bodyweight'], impact: true },
  { id: 'bb-calf', name: 'Barbell Calf Raise', cue: 'Bar on the back, rise as high as you can.', duration: 40, reps: 12, level: 'advanced', muscle: 'calves', gear: ['barbell'], hidden: true },
  { id: 'weighted-sl-calf', name: 'Weighted Single-Leg Calf Raise', cue: 'Hold a dumbbell, slow lowering.', duration: 40, reps: 10, level: 'advanced', muscle: 'calves', gear: ['dumbbell'] },

  // TRAPS (new group)
  { id: 'db-shrug', name: 'Dumbbell Shrug', cue: 'Straight up to the ears, pause, lower slowly.', duration: 40, reps: 15, level: 'beginner', muscle: 'traps', gear: ['dumbbell'] },
  { id: 'bb-shrug', name: 'Barbell Shrug', cue: 'No rolling, hold the top for a count.', duration: 40, reps: 12, level: 'intermediate', muscle: 'traps', gear: ['barbell'] },
  { id: 'upright-row', name: 'Upright Row', cue: 'Lead with the elbows, bar close to the body.', duration: 40, reps: 10, level: 'intermediate', muscle: 'traps', gear: ['barbell'] },
  { id: 'rack-pull', name: 'Rack Pull', cue: 'Bar from knee height, squeeze the upper back at the top.', duration: 45, reps: 6, level: 'advanced', muscle: 'traps', gear: ['barbell'] },
  { id: 'kb-high-pull', name: 'Kettlebell High Pull', cue: 'Hips drive, elbows flare high.', duration: 40, reps: 10, level: 'advanced', muscle: 'traps', gear: ['kettlebell'], hidden: true },

  // FOREARMS AND GRIP (new group)
  { id: 'wrist-curl', name: 'Dumbbell Wrist Curl', cue: 'Forearms on the thighs, curl through the wrist only.', duration: 40, reps: 15, level: 'beginner', muscle: 'forearms', gear: ['dumbbell'] },
  { id: 'reverse-wrist-curl', name: 'Reverse Wrist Curl', cue: 'Palms down, slow and controlled.', duration: 40, reps: 15, level: 'beginner', muscle: 'forearms', gear: ['dumbbell'] },
  { id: 'dead-hang', name: 'Dead Hang', cue: 'Shoulders active, grip tight.', duration: 30, reps: null, level: 'beginner', muscle: 'forearms', gear: ['bar'] },
  { id: 'farmer-carry', name: 'Farmer Carry', cue: 'Tall posture, short quick steps.', duration: 40, reps: null, level: 'intermediate', muscle: 'forearms', gear: ['dumbbell'] },
  { id: 'reverse-curl', name: 'Reverse Barbell Curl', cue: 'Overhand grip, elbows pinned.', duration: 40, reps: 10, level: 'intermediate', muscle: 'forearms', gear: ['barbell'] },
  { id: 'one-arm-hang', name: 'One-Arm Dead Hang', cue: 'Stay packed in the shoulder, no swinging.', duration: 30, reps: null, level: 'advanced', muscle: 'forearms', gear: ['bar'], hidden: true },

  // BACK: lower back, bodyweight, band and advanced pulling
  { id: 'band-pull-apart', name: 'Band Pull-Apart', cue: 'Arms straight, squeeze the shoulder blades.', duration: 40, reps: 15, level: 'beginner', muscle: 'back', gear: ['band'] },
  { id: 'band-row', name: 'Banded Row', cue: 'Pull to the ribs, pause, return slowly.', duration: 40, reps: 15, level: 'beginner', muscle: 'back', gear: ['band'] },
  { id: 'back-extension', name: 'Back Extension', cue: 'Lift to a straight line, do not hyperextend.', duration: 40, reps: 12, level: 'beginner', muscle: 'back', gear: ['bodyweight'] },
  { id: 'inverted-row', name: 'Inverted Row', cue: 'Body in a plank line, chest to the bar.', duration: 40, reps: 10, level: 'intermediate', muscle: 'back', gear: ['bar'] },
  { id: 'cable-row', name: 'Seated Cable Row', cue: 'Tall chest, pull to the belly button.', duration: 40, reps: 12, level: 'intermediate', muscle: 'back', gear: ['cable'] },
  { id: 'pendlay-row', name: 'Pendlay Row', cue: 'Bar from the floor each rep, flat back.', duration: 45, reps: 6, level: 'advanced', muscle: 'back', gear: ['barbell'] },
  { id: 'tuck-front-lever', name: 'Tuck Front Lever Hold', cue: 'Hips level with shoulders, arms locked.', duration: 30, reps: null, level: 'advanced', muscle: 'back', gear: ['bar'], hidden: true },
  { id: 'ls-pullup', name: 'L-Sit Pull-Up', cue: 'Legs forward the whole rep.', duration: 40, reps: 5, level: 'advanced', muscle: 'back', gear: ['bar'], hidden: true },

  // ARMS: gear gaps and advanced
  { id: 'band-curl', name: 'Banded Curl', cue: 'Stand on the band, elbows still.', duration: 40, reps: 15, level: 'beginner', muscle: 'arms', gear: ['band'] },
  { id: 'concentration-curl', name: 'Concentration Curl', cue: 'Elbow on the inner thigh, full squeeze.', duration: 40, reps: 12, level: 'beginner', muscle: 'arms', gear: ['dumbbell'] },
  { id: 'cable-curl', name: 'Cable Curl', cue: 'Constant tension, no leaning back.', duration: 40, reps: 12, level: 'intermediate', muscle: 'arms', gear: ['cable'] },
  { id: 'rope-pushdown', name: 'Cable Rope Pushdown', cue: 'Elbows pinned, spread the rope at the bottom.', duration: 40, reps: 12, level: 'intermediate', muscle: 'arms', gear: ['cable'] },
  { id: 'incline-curl', name: 'Incline Dumbbell Curl', cue: 'Arms hang behind you for a deep stretch.', duration: 40, reps: 10, level: 'intermediate', muscle: 'arms', gear: ['dumbbell'] },
  { id: 'zottman-curl', name: 'Zottman Curl', cue: 'Curl up palms up, lower palms down.', duration: 40, reps: 8, level: 'advanced', muscle: 'arms', gear: ['dumbbell'] },
  { id: 'weighted-dip', name: 'Weighted Dip', cue: 'Belt or dumbbell between the feet, full depth.', duration: 40, reps: 6, level: 'advanced', muscle: 'arms', gear: ['bar'], hidden: true },
  { id: 'bar-tricep-ext', name: 'Bar Triceps Extension', cue: 'Hands on the bar, lower the head under it.', duration: 40, reps: 8, level: 'advanced', muscle: 'arms', gear: ['bar'], hidden: true },

  // CHEST: gear gaps and advanced
  { id: 'floor-press', name: 'Dumbbell Floor Press', cue: 'Elbows touch the floor, pause, press.', duration: 40, reps: 12, level: 'beginner', muscle: 'chest', gear: ['dumbbell'] },
  { id: 'band-chest-press', name: 'Banded Chest Press', cue: 'Anchor behind you, press and squeeze.', duration: 40, reps: 15, level: 'beginner', muscle: 'chest', gear: ['band'] },
  { id: 'db-fly', name: 'Dumbbell Fly', cue: 'Soft elbows, wide arc, feel the stretch.', duration: 40, reps: 12, level: 'intermediate', muscle: 'chest', gear: ['dumbbell'] },
  { id: 'cable-fly', name: 'Cable Fly', cue: 'Hug a barrel, squeeze at the centre.', duration: 40, reps: 12, level: 'intermediate', muscle: 'chest', gear: ['cable'] },
  { id: 'one-arm-pushup', name: 'One-Arm Push-Up', cue: 'Feet wide, hips square, chest low.', duration: 40, reps: 4, level: 'advanced', muscle: 'chest', gear: ['bodyweight'], hidden: true },

  // SHOULDERS: gear gaps and advanced
  { id: 'db-press', name: 'Dumbbell Shoulder Press', cue: 'Ribs down, press to a full lockout.', duration: 40, reps: 12, level: 'beginner', muscle: 'shoulders', gear: ['dumbbell'] },
  { id: 'band-lateral', name: 'Banded Lateral Raise', cue: 'Lead with the elbows, stop at shoulder height.', duration: 40, reps: 15, level: 'beginner', muscle: 'shoulders', gear: ['band'] },
  { id: 'arnold-press', name: 'Arnold Press', cue: 'Rotate as you press, smooth tempo.', duration: 40, reps: 10, level: 'intermediate', muscle: 'shoulders', gear: ['dumbbell'] },
  { id: 'cable-lateral', name: 'Cable Lateral Raise', cue: 'Constant tension, slight lean away.', duration: 40, reps: 12, level: 'intermediate', muscle: 'shoulders', gear: ['cable'] },
  { id: 'face-pull', name: 'Cable Face Pull', cue: 'Pull to the forehead, elbows high.', duration: 40, reps: 15, level: 'intermediate', muscle: 'shoulders', gear: ['cable'] },
  { id: 'z-press', name: 'Z Press', cue: 'Seated on the floor, no leg drive.', duration: 45, reps: 6, level: 'advanced', muscle: 'shoulders', gear: ['barbell'], hidden: true },
  { id: 'wall-handstand', name: 'Wall Handstand Hold', cue: 'Belly to the wall, push tall through the shoulders.', duration: 30, reps: null, level: 'advanced', muscle: 'shoulders', gear: ['bodyweight'] },

  // CORE: obliques, anti-rotation, advanced hanging work
  { id: 'bird-dog', name: 'Bird Dog', cue: 'Reach long, hips stay square.', duration: 40, reps: 12, level: 'beginner', muscle: 'core', gear: ['bodyweight'] },
  { id: 'hollow-hold', name: 'Hollow Body Hold', cue: 'Low back glued to the floor.', duration: 30, reps: null, level: 'intermediate', muscle: 'core', gear: ['bodyweight'] },
  { id: 'cable-crunch', name: 'Cable Crunch', cue: 'Round the spine, elbows to knees.', duration: 40, reps: 12, level: 'intermediate', muscle: 'core', gear: ['cable'] },
  { id: 'woodchop', name: 'Cable Wood Chop', cue: 'Rotate through the torso, arms stay long.', duration: 40, reps: 12, level: 'intermediate', muscle: 'core', gear: ['cable'] },
  { id: 'suitcase-carry', name: 'Suitcase Carry', cue: 'One heavy dumbbell, do not lean.', duration: 40, reps: null, level: 'advanced', muscle: 'core', gear: ['dumbbell'] },
  { id: 'toes-to-bar', name: 'Toes to Bar', cue: 'Pull the bar down as the toes rise.', duration: 40, reps: 8, level: 'advanced', muscle: 'core', gear: ['bar'] },
  { id: 'windshield-wiper', name: 'Hanging Windshield Wiper', cue: 'Legs together, sweep side to side.', duration: 40, reps: 8, level: 'advanced', muscle: 'core', gear: ['bar'] },

  // FULL BODY AND CONDITIONING
  { id: 'jumping-jack', name: 'Jumping Jacks', cue: 'Light feet, full arm swing.', duration: 40, reps: 30, level: 'beginner', muscle: 'full body', gear: ['bodyweight'], impact: true },
  { id: 'high-knees', name: 'High Knees', cue: 'Drive knees to hip height, pump the arms.', duration: 40, reps: null, level: 'beginner', muscle: 'full body', gear: ['bodyweight'], impact: true },
  { id: 'kb-clean', name: 'Kettlebell Clean', cue: 'Zip the bell close, soft catch in the rack.', duration: 40, reps: 10, level: 'intermediate', muscle: 'full body', gear: ['kettlebell'] },
  { id: 'skater-hop', name: 'Skater Hop', cue: 'Land soft, stick the landing.', duration: 40, reps: 16, level: 'intermediate', muscle: 'full body', gear: ['bodyweight'], impact: true },
  { id: 'kb-snatch', name: 'Kettlebell Snatch', cue: 'Hip snap, punch through at the top.', duration: 40, reps: 8, level: 'advanced', muscle: 'full body', gear: ['kettlebell'], impact: true },
  { id: 'man-maker', name: 'Man Maker', cue: 'Push-up, row each side, clean, press.', duration: 45, reps: 5, level: 'advanced', muscle: 'full body', gear: ['dumbbell'], hidden: true },
  { id: 'devil-press', name: 'Devil Press', cue: 'Burpee over the bells, swing to overhead.', duration: 45, reps: 6, level: 'advanced', muscle: 'full body', gear: ['dumbbell'], impact: true, hidden: true },
  { id: 'tuck-jump', name: 'Tuck Jump', cue: 'Knees to chest, land quietly.', duration: 40, reps: 8, level: 'advanced', muscle: 'full body', gear: ['bodyweight'], impact: true },

  // NO-EQUIPMENT PULLING, TRAPS, GRIP AND CALVES (so bodyweight-only users get full sessions)
  { id: 'reverse-snow-angel', name: 'Reverse Snow Angel', cue: 'Face down, sweep the arms with straight elbows.', duration: 40, reps: 12, level: 'beginner', muscle: 'back', gear: ['bodyweight'] },
  { id: 'prone-ytw', name: 'Prone Y-T-W Raise', cue: 'Lift each letter shape, thumbs up.', duration: 40, reps: 9, level: 'intermediate', muscle: 'back', gear: ['bodyweight'] },
  { id: 'table-row', name: 'Table Row', cue: 'Lie under a sturdy table, pull the chest up to the edge.', duration: 40, reps: 10, level: 'intermediate', muscle: 'back', gear: ['bodyweight'] },
  { id: 'one-arm-table-row', name: 'One-Arm Table Row', cue: 'Pull with one hand, the other assists less each rep.', duration: 40, reps: 6, level: 'advanced', muscle: 'back', gear: ['bodyweight'], hidden: true },
  { id: 'scap-pushup', name: 'Scapular Push-Up', cue: 'Arms locked, only the shoulder blades move.', duration: 40, reps: 15, level: 'beginner', muscle: 'traps', gear: ['bodyweight'] },
  { id: 'wall-angel', name: 'Wall Angel', cue: 'Back flat on the wall, slide the arms up and down.', duration: 40, reps: 12, level: 'intermediate', muscle: 'traps', gear: ['bodyweight'] },
  { id: 'handstand-shrug', name: 'Wall Handstand Shrug', cue: 'In a wall handstand, press tall into the ears.', duration: 40, reps: 8, level: 'advanced', muscle: 'traps', gear: ['bodyweight'], hidden: true },
  { id: 'table-curl', name: 'Underhand Table Curl', cue: 'Lie under the table, curl the chest up with palms facing you.', duration: 40, reps: 10, level: 'intermediate', muscle: 'arms', gear: ['bodyweight'], hidden: true },
  { id: 'tiger-bend', name: 'Tiger Bend Push-Up', cue: 'Elbows tight, forearms slide down for a triceps squeeze.', duration: 40, reps: 6, level: 'advanced', muscle: 'arms', gear: ['bodyweight'], hidden: true },
  { id: 'wrist-circle', name: 'Wrist Circles and Rocks', cue: 'Hands on the floor, rock slowly forward and back.', duration: 30, reps: null, level: 'beginner', muscle: 'forearms', gear: ['bodyweight'], hidden: true },
  { id: 'fingertip-pushup', name: 'Fingertip Push-Up', cue: 'Fingers spread, control the lowering.', duration: 40, reps: 6, level: 'advanced', muscle: 'forearms', gear: ['bodyweight'], hidden: true },
  { id: 'deficit-calf', name: 'Single-Leg Deficit Calf Raise', cue: 'Heel hangs off a step, full stretch each rep.', duration: 40, reps: 10, level: 'advanced', muscle: 'calves', gear: ['bodyweight'], hidden: true },

  // ADVANCED + GAP FILLERS (Nov 2026, each has a matching CC0 animation)
  { id: 'meadows-row', name: 'Meadows Row', cue: 'Staggered stance, pull the bar to the hip.', duration: 45, reps: 8, level: 'advanced', muscle: 'back', gear: ['barbell'] },
  { id: 'rev-grip-row', name: 'Reverse-Grip Barbell Row', cue: 'Underhand grip, pull to the belly.', duration: 45, reps: 8, level: 'intermediate', muscle: 'back', gear: ['barbell'] },
  { id: 'neutral-pullup', name: 'Neutral-Grip Pull-Up', cue: 'Palms facing, drive the elbows down.', duration: 40, reps: 8, level: 'intermediate', muscle: 'back', gear: ['bar'] },
  { id: 'negative-pullup', name: 'Negative Pull-Up', cue: 'Jump up, lower for a slow five count.', duration: 40, reps: 5, level: 'advanced', muscle: 'back', gear: ['bar'] },
  { id: 'renegade-row', name: 'Renegade Row', cue: 'Plank on the bells, row without twisting.', duration: 45, reps: 8, level: 'advanced', muscle: 'back', gear: ['dumbbell'] },
  { id: 't-bar-row', name: 'T-Bar Row', cue: 'Chest up, pull the handle to the lower ribs.', duration: 45, reps: 8, level: 'intermediate', muscle: 'back', gear: ['barbell'] },
  { id: 'plate-pinch', name: 'Plate Pinch Hold', cue: 'Pinch the plates, squeeze and hold.', duration: 30, reps: null, level: 'advanced', muscle: 'forearms', gear: ['barbell'] },
  { id: 'hang-clean', name: 'Hang Clean', cue: 'Jump and shrug, catch the bar on the shoulders.', duration: 45, reps: 5, level: 'advanced', muscle: 'traps', gear: ['barbell'] },
  { id: 'spider-curl', name: 'Spider Curl', cue: 'Chest on the bench, curl with no swing.', duration: 40, reps: 10, level: 'advanced', muscle: 'arms', gear: ['dumbbell'] },
  { id: 'deficit-pushup', name: 'Deficit Push-Up', cue: 'Hands raised, sink deeper for a bigger stretch.', duration: 40, reps: 8, level: 'advanced', muscle: 'chest', gear: ['bodyweight'] },
  { id: 'hindu-pushup', name: 'Hindu Push-Up', cue: 'Flow from pike through the floor to cobra.', duration: 40, reps: 8, level: 'advanced', muscle: 'chest', gear: ['bodyweight'] },
  { id: 'landmine-press', name: 'Landmine Press', cue: 'Press along the arc of the bar, ribs down.', duration: 45, reps: 8, level: 'advanced', muscle: 'shoulders', gear: ['barbell'] },
  { id: 'push-jerk', name: 'Push Jerk', cue: 'Dip, drive, punch under the bar.', duration: 45, reps: 5, level: 'advanced', muscle: 'shoulders', gear: ['barbell'] },
  { id: 'kb-press', name: 'Kettlebell Press', cue: 'Bell racked, press without leaning back.', duration: 40, reps: 8, level: 'intermediate', muscle: 'shoulders', gear: ['kettlebell'] },
  { id: 'trap-bar-dl', name: 'Trap Bar Deadlift', cue: 'Stand tall between the handles, push the floor away.', duration: 45, reps: 6, level: 'intermediate', muscle: 'legs', gear: ['barbell'] },
  { id: 'glute-ham-raise', name: 'Glute-Ham Raise', cue: 'Lower with control, drive back up through the hamstrings.', duration: 40, reps: 6, level: 'advanced', muscle: 'legs', gear: ['bodyweight'] },
  { id: 'reverse-nordic', name: 'Reverse Nordic', cue: 'Kneel tall, lean back and keep the hips open.', duration: 40, reps: 6, level: 'advanced', muscle: 'legs', gear: ['bodyweight'] },
  { id: 'jump-lunge', name: 'Jump Lunge', cue: 'Switch legs in the air, land soft.', duration: 40, reps: 12, level: 'advanced', muscle: 'legs', gear: ['bodyweight'], impact: true },
  { id: 'copenhagen', name: 'Copenhagen Plank', cue: 'Top leg on the bench, hips stacked and lifted.', duration: 30, reps: null, level: 'advanced', muscle: 'core', gear: ['barbell'] },
  { id: 'hollow-rock', name: 'Hollow Body Rock', cue: 'Stay hollow, rock like a bowl.', duration: 40, reps: 15, level: 'intermediate', muscle: 'core', gear: ['bodyweight'] },
  { id: 'snatch', name: 'Barbell Snatch', cue: 'Wide grip, pull high, catch overhead.', duration: 45, reps: 4, level: 'advanced', muscle: 'full body', gear: ['barbell'] },
  { id: 'squat-thrust', name: 'Squat Thrust', cue: 'Hands down, kick back, jump in.', duration: 40, reps: 12, level: 'intermediate', muscle: 'full body', gear: ['bodyweight'], impact: true },
  { id: 'med-ball-slam', name: 'Medicine Ball Slam', cue: 'Reach tall, slam through the floor.', duration: 40, reps: 12, level: 'intermediate', muscle: 'full body', gear: ['bodyweight'], impact: true },
];

export const plans = {
  beginner: { name: 'Beginner 30-Day', description: 'Build foundation across all muscle groups.', days: 30, focus: 'Form and consistency' },
  intermediate: { name: 'Intermediate 30-Day', description: 'Increase intensity and volume.', days: 30, focus: 'Strength and endurance' },
  advanced: { name: 'Advanced 30-Day', description: 'High-intensity full body work.', days: 30, focus: 'Power and density' },
};

export const visibleExercises = exercises.filter((e) => !e.hidden);
export const exerciseById = Object.fromEntries(exercises.map((e) => [e.id, e]));

const NEW_MUSCLES = new Set(['legs', 'arms', 'full body', 'glutes', 'calves', 'traps', 'forearms']);

export function exercisesForPlan(plan) {
  const groups = plan === 'advanced' ? ['chest', 'back', 'legs', 'shoulders', 'arms', 'glutes', 'core', 'traps', 'calves', 'full body', 'forearms'] : ['chest', 'back', 'shoulders', 'core'];
  let pool = visibleExercises;
  if (plan === 'beginner') pool = visibleExercises.filter((e) => e.level === 'beginner' && !NEW_MUSCLES.has(e.muscle));
  else if (plan === 'intermediate') pool = visibleExercises.filter((e) => e.level !== 'advanced' && !NEW_MUSCLES.has(e.muscle));
  else if (plan === 'advanced') {
    const rank = { advanced: 0, intermediate: 1, beginner: 2 };
    pool = [...visibleExercises].sort((a, b) => rank[a.level] - rank[b.level]);
  }

  const byMuscle = {};
  for (const muscle of groups) {
    byMuscle[muscle] = pool.filter((e) => e.muscle === muscle);
  }

  const target = plan === 'beginner' ? 6 : plan === 'intermediate' ? 8 : plan === 'advanced' ? 10 : 5;
  const selected = [];
  let i = 0;
  while (selected.length < target && i < 200) {
    const muscle = groups[i % groups.length];
    if (byMuscle[muscle].length) selected.push(byMuscle[muscle].shift());
    i += 1;
  }
  return selected;
}
