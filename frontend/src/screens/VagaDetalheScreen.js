// src/screens/VagaDetalheScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function VagaDetalheScreen({ route }) {
  const { vaga } = route.params || {};

  if (!vaga) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Vaga não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{vaga.titulo}</Text>
      <Text style={styles.text}>Descrição: {vaga.descricao}</Text>
      <Text style={styles.text}>Empresa: {vaga.empresa}</Text>
      <Text style={styles.text}>Local: {vaga.local}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: "bold", color: colors.primary, marginBottom: 10 },
  text: { fontSize: 16, color: colors.text, marginTop: 5 },
  error: { color: "red", textAlign: "center", marginTop: 20 },
});
