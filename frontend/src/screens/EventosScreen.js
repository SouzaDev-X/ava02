import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function EventosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>
      <Text style={styles.subtitle}>
        Acompanhe os eventos da comunidade e confirme presença.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: colors.primary, marginBottom: 10 },
  subtitle: { fontSize: 16, color: colors.muted, textAlign: "center" },
});
