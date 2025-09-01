// src/screens/EventosScreen.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";
import colors from "../theme/colors";

export default function EventosScreen() {
  const navigation = useNavigation();
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Modal
  const [modalVisivel, setModalVisivel] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");

  const fetchEventos = useCallback(async () => {
    try {
      const { data } = await api.get("/eventos?_sort=createdAt&_order=desc");
      setLista(data);
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível carregar os eventos.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEventos();
  };

  const criarEvento = async () => {
    if (!nome.trim() || !data.trim()) {
      return Alert.alert("Atenção", "Preencha nome e data.");
    }
    try {
      const payload = { nome, descricao, data };
      const { data: novo } = await api.post("/eventos", payload);
      setLista((prev) => [novo, ...prev]);
      setModalVisivel(false);
      setNome("");
      setDescricao("");
      setData("");
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Falha ao criar evento.");
    }
  };

  const excluirEvento = (id) => {
    Alert.alert("Excluir", "Deseja excluir este evento?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/eventos/${id}`);
            setLista((prev) => prev.filter((c) => c.id !== id));
          } catch (e) {
            console.error(e);
            Alert.alert("Erro", "Falha ao excluir.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("EventoDetalhe", { evento: item })}
      activeOpacity={0.8}
    >
      <Text style={styles.cardTitle}>{item.nome}</Text>
      {!!item.descricao && <Text style={styles.cardDesc}>{item.descricao}</Text>}
      {!!item.data && <Text style={styles.cardMeta}>Data: {item.data}</Text>}
      <View style={{ marginTop: 10, flexDirection: "row", gap: 8 }}>
        <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={() => excluirEvento(item.id)}>
          <Text style={styles.btnText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.muted, marginTop: 10 }}>Carregando eventos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum evento encontrado.</Text>}
      />

      {/* FAB Novo */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisivel(true)} activeOpacity={0.9}>
        <Text style={styles.fabPlus}>＋</Text>
      </TouchableOpacity>

      {/* Modal Novo Evento */}
      <Modal visible={modalVisivel} animationType="slide" transparent onRequestClose={() => setModalVisivel(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Novo Evento</Text>

            <TextInput
              placeholder="Nome"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição (opcional)"
              placeholderTextColor="#999"
              value={descricao}
              onChangeText={setDescricao}
              style={[styles.input, { height: 90 }]}
              multiline
            />
            <TextInput
              placeholder="Data (YYYY-MM-DD)"
              placeholderTextColor="#999"
              value={data}
              onChangeText={setData}
              style={styles.input}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={() => setModalVisivel(false)}>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={criarEvento}>
                <Text style={styles.btnText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const baseCard = {
  backgroundColor: colors.secondary,
  borderRadius: 12,
  padding: 14,
  marginBottom: 10,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  center: { justifyContent: "center", alignItems: "center" },
  empty: { color: colors.muted, textAlign: "center", marginTop: 16 },

  card: { ...baseCard },
  cardTitle: { color: colors.text, fontWeight: "700", fontSize: 16 },
  cardDesc: { color: colors.muted, marginTop: 6 },
  cardMeta: { color: colors.muted, marginTop: 6, fontStyle: "italic" },

  btn: {
    backgroundColor: "#3b3b3b",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnPrimary: { backgroundColor: colors.primary },
  btnDanger: { backgroundColor: "#c0392b" },
  btnText: { color: "#fff", fontWeight: "600" },

  fab: {
    position: "absolute",
    right: 18,
    bottom: 18,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  fabPlus: { color: "#000", fontWeight: "900", fontSize: 28, lineHeight: 28 },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: colors.secondary,
    padding: 16,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  modalTitle: { color: colors.text, fontWeight: "700", fontSize: 18, marginBottom: 12 },
  input: {
    backgroundColor: "#2b2b2b",
    color: colors.text,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 4 },
});
