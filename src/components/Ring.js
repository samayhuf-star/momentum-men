import React from 'react';
import { View } from 'react-native';

// Dependency-free circular progress ring (two clipped half-circles).
export default function Ring({ size = 220, thickness = 10, progress = 0, color = '#EE6A4B', track = '#F1EEEA', children }) {
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  const deg = p * 360;
  const rightRot = -135 + Math.min(deg, 180);
  const leftRot = -135 + Math.max(deg - 180, 0);
  const half = size / 2;
  const circle = {
    position: 'absolute',
    top: 0,
    width: size,
    height: size,
    borderRadius: half,
    borderWidth: thickness,
    borderColor: 'transparent',
  };

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: half,
          borderWidth: thickness,
          borderColor: track,
        }}
      />
      {p > 0 ? (
      <View style={{ position: 'absolute', top: 0, left: half, width: half, height: size, overflow: 'hidden' }}>
        <View
          style={[
            circle,
            { left: -half, borderTopColor: color, borderRightColor: color, transform: [{ rotate: `${rightRot}deg` }] },
          ]}
        />
      </View>
      ) : null}
      {p > 0.5 ? (
      <View style={{ position: 'absolute', top: 0, left: 0, width: half, height: size, overflow: 'hidden' }}>
        <View
          style={[
            circle,
            { left: 0, borderBottomColor: color, borderLeftColor: color, transform: [{ rotate: `${leftRot}deg` }] },
          ]}
        />
      </View>
      ) : null}
      {children}
    </View>
  );
}
