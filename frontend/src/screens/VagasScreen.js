import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function VagasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vagas</Text>
      <Text style={styles.subtitle}>
        Veja oportunidades de emprego e serviços comunitários.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: colors.primary, marginBottom: 10 },
  subtitle: { fontSize: 16, color: colors.muted, textAlign: "center" },
});
