import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { mediaFor, stageColorFor } from '../lib/exerciseMediaMap';

const ICONS = {
  chest: { letter: 'CH', bg: '#3B4C6B', fg: '#FFFFFF' },
  back: { letter: 'BK', bg: '#2F5D50', fg: '#FFFFFF' },
  shoulders: { letter: 'SH', bg: '#6B4A2F', fg: '#FFFFFF' },
  core: { letter: 'CO', bg: '#5A3B6B', fg: '#FFFFFF' },
  'lower body': { letter: 'LB', bg: '#3D5A80', fg: '#FFFFFF' },
  'upper body': { letter: 'UB', bg: '#4A6741', fg: '#FFFFFF' },
  'full body': { letter: 'FB', bg: '#6B3B4C', fg: '#FFFFFF' },
  legs: { letter: 'LG', bg: '#3D5A80', fg: '#FFFFFF' },
  arms: { letter: 'AR', bg: '#4A6741', fg: '#FFFFFF' },
  glutes: { letter: 'GL', bg: '#7A4B3A', fg: '#FFFFFF' },
  calves: { letter: 'CV', bg: '#3F6B63', fg: '#FFFFFF' },
  traps: { letter: 'TR', bg: '#5B4A7A', fg: '#FFFFFF' },
  forearms: { letter: 'FA', bg: '#6B6B3B', fg: '#FFFFFF' },
  pilates: { letter: 'PI', bg: '#6B5A3B', fg: '#FFFFFF' },
  mobility: { letter: 'MO', bg: '#3B5A6B', fg: '#FFFFFF' },
};

export default function ExerciseMedia({
  id,
  name,
  muscle,
  testID = 'exercise-detail',
  dark = false,
}) {
  const media = id ? mediaFor(id) : null;
  const start = media?.start || media?.hold || null;
  const end = media?.end || null;
  const fade = useRef(new Animated.Value(0)).current;
  const styles = dark ? darkStyles : lightStyles;
  const key = (muscle || '').toLowerCase();
  const icon = ICONS[key] || { letter: (muscle || 'EX').slice(0, 2).toUpperCase(), bg: '#4A5568', fg: '#FFFFFF' };

  useEffect(() => {
    fade.setValue(0);
    if (!start || !end) return undefined;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(900),
        Animated.timing(fade, { toValue: 1, duration: 120, useNativeDriver: true }),
        Animated.delay(900),
        Animated.timing(fade, { toValue: 0, duration: 120, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [id, start, end, fade]);

  return (
    <View style={styles.wrap} testID={testID} accessible accessibilityRole="image" accessibilityLabel={`${name}${muscle ? `, ${muscle}` : ''}`}>
      {start ? (
        <View style={[styles.frame, { backgroundColor: stageColorFor(id) }]}>
          <Image source={start} style={styles.image} resizeMode="contain" />
          {end ? (
            <Animated.Image source={end} style={[styles.image, styles.overlay, { opacity: fade }]} resizeMode="contain" />
          ) : null}
          {!dark ? (
            <View style={styles.caption} pointerEvents="none">
              <Text style={styles.captionName} numberOfLines={1}>{name}</Text>
              {muscle ? <Text style={styles.captionMuscle}>{muscle}</Text> : null}
            </View>
          ) : null}
        </View>
      ) : (
        <View style={[styles.badge, { backgroundColor: icon.bg }]}>
          <Text style={[styles.letter, { color: icon.fg }]}>{icon.letter}</Text>
        </View>
      )}
      {dark || !start ? <Text style={styles.name}>{name}</Text> : null}
      {dark || !start ? (muscle ? <Text style={styles.muscle}>{muscle}</Text> : null) : null}
    </View>
  );
}

const wrapBase = {
  width: '100%',
  minHeight: 200,
  marginTop: 16,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
};

const darkStyles = StyleSheet.create({
  wrap: { ...wrapBase, backgroundColor: '#18181b' },
  frame: { width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 200 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  badge: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  letter: { fontSize: 22, fontWeight: '700' },
  name: { marginTop: 16, fontSize: 18, fontWeight: '700', color: '#fff', textAlign: 'center' },
  muscle: { marginTop: 4, fontSize: 14, color: '#a1a1aa', textTransform: 'capitalize' },
});

const lightStyles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginTop: 16,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#1B1B1F',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  // big 4:3 stage; frames are pre-cropped to the same window so the figure never jumps
  frame: { width: '100%', aspectRatio: 4 / 3, maxHeight: 300, backgroundColor: '#0B0B0C', alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  caption: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(11,11,12,0.62)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  captionName: { flex: 1, color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  captionMuscle: {
    color: '#EE6A4B',
    backgroundColor: '#FDEAE4',
    overflow: 'hidden',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  badge: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  letter: { fontSize: 22, fontWeight: '700' },
  name: { marginTop: 8, marginBottom: 4, fontSize: 22, fontWeight: '800', color: '#18181B', textAlign: 'center' },
  muscle: {
    marginBottom: 16,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#EE6A4B',
    backgroundColor: '#FDEAE4',
    overflow: 'hidden',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    textTransform: 'uppercase',
  },
});
