// src/screens/ChamadoDetalheScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function ChamadoDetalheScreen({ route }) {
  const { chamado } = route.params || {};

  if (!chamado) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Nenhum chamado encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chamado.titulo}</Text>
      <Text style={styles.text}>Status: {chamado.status}</Text>
      <Text style={styles.text}>Descrição: {chamado.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: "bold", color: colors.primary, marginBottom: 10 },
  text: { fontSize: 16, color: colors.text, marginTop: 5 },
  error: { color: "red", textAlign: "center", marginTop: 20 },
});
