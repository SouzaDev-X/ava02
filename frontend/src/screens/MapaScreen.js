// src/screens/MapaScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa da Comunidade</Text>
      <Text style={styles.info}>🚧 Em construção... 🚧</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: colors.text,
  },
});
