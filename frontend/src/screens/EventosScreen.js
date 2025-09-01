import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../theme/colors";
import api from "../services/api";

export default function EventosScreen() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data } = await api.get("/eventos");
        if (isMounted) setEventos(data);
      } catch (e) {
        console.error(e);
        if (isMounted) setErro("Não foi possível carregar os eventos.");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.muted, marginTop: 10 }}>Carregando eventos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>

      {erro ? <Text style={styles.error}>{erro}</Text> : null}

      <FlatList
        data={eventos}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum evento disponível.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            {!!item.descricao && <Text style={styles.cardDesc}>{item.descricao}</Text>}
            {!!item.data && <Text style={styles.cardMeta}>Data: {item.data}</Text>}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: colors.primary, marginBottom: 12, textAlign: "center" },
  error: { color: "#ff6b6b", textAlign: "center", marginBottom: 8 },
  empty: { color: colors.muted, textAlign: "center", marginTop: 20 },
  card: { backgroundColor: colors.secondary, padding: 14, borderRadius: 10, marginBottom: 10 },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  cardDesc: { color: colors.muted, fontSize: 14, marginTop: 4 },
  cardMeta: { color: colors.muted, fontSize: 12, marginTop: 6, fontStyle: "italic" },
});
