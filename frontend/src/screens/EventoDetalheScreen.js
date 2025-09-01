// src/screens/EventoDetalheScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function EventoDetalheScreen({ route }) {
  const { evento } = route.params || {};

  if (!evento) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Evento não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{evento.nome}</Text>
      <Text style={styles.text}>Descrição: {evento.descricao}</Text>
      <Text style={styles.text}>Data: {evento.data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: "bold", color: colors.primary, marginBottom: 10 },
  text: { fontSize: 16, color: colors.text, marginTop: 5 },
  error: { color: "red", textAlign: "center", marginTop: 20 },
});
