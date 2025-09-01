import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa</Text>
      <Text style={styles.subtitle}>
        Veja pontos de interesse e locais relevantes em Curionópolis.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: colors.primary, marginBottom: 10 },
  subtitle: { fontSize: 16, color: colors.muted, textAlign: "center" },
});
