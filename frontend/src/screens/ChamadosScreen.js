import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import colors from "../theme/colors";
import api from "../services/api";

export default function ChamadosScreen() {
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    api.get("/chamados")
      .then(response => setChamados(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chamados</Text>
      <FlatList
        data={chamados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardStatus}>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: colors.primary, marginBottom: 15, textAlign: "center" },
  card: { backgroundColor: colors.secondary, padding: 15, borderRadius: 8, marginBottom: 10 },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: "600" },
  cardStatus: { color: colors.muted, fontSize: 14, marginTop: 4 },
});
