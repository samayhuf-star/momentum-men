// Sleek, minimalist light theme: warm off-white, white cards, one coral accent.
export const colors = {
  bg: '#F7F5F2',
  card: '#FFFFFF',
  raised: '#F1EEEA', // tracks, inactive chips
  line: '#ECE8E3',
  text: '#18181B',
  muted: '#52525B',
  faint: '#9CA3AF',
  accent: '#EE6A4B', // coral
  accentSoft: '#FDEAE4',
  onAccent: '#FFFFFF',
  beginner: '#22A06B',
  intermediate: '#3B82F6',
  advanced: '#8B5CF6',
  beginnerSoft: '#E4F5EC',
  intermediateSoft: '#E6EFFD',
  advancedSoft: '#EFE9FC',
};

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const type = {
  display: 34,
  title: 22,
  body: 17,
  label: 15,
  caption: 13,
  micro: 11,
};

export const radius = { card: 24, tile: 20, pill: 999, button: 18 };

// Soft, barely-there elevation
export const shadow = {
  shadowColor: '#1B1B1F',
  shadowOpacity: 0.06,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
};

// Small uppercase label used across every screen
export const eyebrow = {
  fontSize: type.micro,
  fontWeight: '700',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: colors.faint,
};

export const hit = 44;

export const levelColor = {
  beginner: colors.beginner,
  intermediate: colors.intermediate,
  advanced: colors.advanced,
};
export const levelSoft = {
  beginner: colors.beginnerSoft,
  intermediate: colors.intermediateSoft,
  advanced: colors.advancedSoft,
};
