import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreditsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} testID="credits">
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity accessibilityRole="button" onPress={() => navigation.goBack()} testID="credits-back">
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>About and Credits</Text>
        <Text style={styles.body}>
          Momentum – Men's Workout is published by Samay Vashsht, 2026.
        </Text>
        <Text style={styles.heading}>Exercise illustrations</Text>
        <Text style={styles.body}>
          Exercise illustrations are from the Open Exercise Illustrations project
          (https://github.com/hitmanrepo/open-exercise-illustrations), dedicated to the
          public domain under CC0 1.0. Attribution is not required. This credit is included
          as a courtesy. Illustrations may not show every variation of an exercise.
        </Text>
        <Text style={styles.heading}>Everkinetic illustrations</Text>
        <Text style={styles.body}>
          Bent arm pullover, one arm snatch, rear deltoid row, wide-grip decline bench
          press, wide-grip decline barbell pullover, narrow parallel-grip chin-up, and
          barbell neck press illustrations are by Everkinetic, licensed under CC BY-SA 4.0
          (https://creativecommons.org/licenses/by-sa/4.0/). Source:
          https://github.com/everkinetic/data. Used unmodified.
        </Text>
        <Text style={styles.heading}>Privacy and terms</Text>
        <Text style={styles.body}>
          Privacy policy: https://samayhuf-star.github.io/app-legal/momentum-men/privacy.html
        </Text>
        <Text style={styles.body}>
          Terms of use: https://samayhuf-star.github.io/app-legal/momentum-men/terms.html
        </Text>
        <Text style={styles.body}>
          Support: https://samayhuf-star.github.io/app-legal/momentum-men/support.html
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  content: { padding: 20, paddingBottom: 40 },
  back: { color: '#a3e635', fontSize: 16, fontWeight: '600', marginBottom: 16 },
  title: { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 16 },
  heading: { color: '#fff', fontSize: 18, fontWeight: '700', marginTop: 20, marginBottom: 8 },
  body: { color: '#a1a1aa', fontSize: 15, lineHeight: 22, marginBottom: 8 },
});
