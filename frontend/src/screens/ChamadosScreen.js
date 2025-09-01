// src/screens/ChamadosScreen.js
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

export default function ChamadosScreen() {
  const navigation = useNavigation();
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Modal (novo chamado)
  const [modalVisivel, setModalVisivel] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("média");

  const fetchChamados = useCallback(async () => {
    try {
      const { data } = await api.get("/chamados?_sort=createdAt&_order=desc");
      setLista(data);
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível carregar os chamados.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchChamados();
  }, [fetchChamados]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchChamados();
  };

  const criarChamado = async () => {
    if (!titulo.trim() || !descricao.trim()) {
      return Alert.alert("Atenção", "Preencha título e descrição.");
    }
    try {
      const payload = { titulo, descricao, prioridade, status: "aberto" };
      const { data } = await api.post("/chamados", payload);
      setLista((prev) => [data, ...prev]);
      setModalVisivel(false);
      setTitulo("");
      setDescricao("");
      setPrioridade("média");
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Falha ao criar chamado.");
    }
  };

  const mudarStatus = async (id, status) => {
    try {
      // rota customizada (mais simples de usar)
      const { data } = await api.patch(`/chamados/${id}/status`, { status });
      setLista((prev) => prev.map((c) => (c.id === id ? { ...c, status: data.status } : c)));
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    }
  };

  const excluirChamado = (id) => {
    Alert.alert("Excluir", "Deseja excluir este chamado?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/chamados/${id}`);
            setLista((prev) => prev.filter((c) => c.id !== id));
          } catch (e) {
            console.error(e);
            Alert.alert("Erro", "Falha ao excluir.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const corStatus =
      item.status === "resolvido"
        ? "#2ecc71"
        : item.status === "andamento"
        ? "#f1c40f"
        : "#e74c3c";

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("ChamadoDetalhe", { chamado: item })}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.titulo}</Text>
          <View style={[styles.badge, { backgroundColor: corStatus }]}>
            <Text style={styles.badgeText}>{item.status}</Text>
          </View>
        </View>
        <Text style={styles.cardDesc}>{item.descricao}</Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.btn} onPress={() => mudarStatus(item.id, "aberto")}>
            <Text style={styles.btnText}>Abrir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => mudarStatus(item.id, "andamento")}>
            <Text style={styles.btnText}>Em andamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => mudarStatus(item.id, "resolvido")}>
            <Text style={styles.btnText}>Resolvido</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={() => excluirChamado(item.id)}>
            <Text style={styles.btnText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.muted, marginTop: 10 }}>Carregando chamados...</Text>
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
        ListEmptyComponent={<Text style={styles.empty}>Nenhum chamado encontrado.</Text>}
      />

      {/* FAB Novo */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisivel(true)} activeOpacity={0.9}>
        <Text style={styles.fabPlus}>＋</Text>
      </TouchableOpacity>

      {/* Modal Novo Chamado */}
      <Modal visible={modalVisivel} animationType="slide" transparent onRequestClose={() => setModalVisivel(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Novo Chamado</Text>

            <TextInput
              placeholder="Título"
              placeholderTextColor="#999"
              value={titulo}
              onChangeText={setTitulo}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição"
              placeholderTextColor="#999"
              value={descricao}
              onChangeText={setDescricao}
              style={[styles.input, { height: 90 }]}
              multiline
            />
            <TextInput
              placeholder="Prioridade (baixa/média/alta)"
              placeholderTextColor="#999"
              value={prioridade}
              onChangeText={setPrioridade}
              style={styles.input}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={() => setModalVisivel(false)}>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={criarChamado}>
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
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { color: colors.text, fontWeight: "700", fontSize: 16 },
  cardDesc: { color: colors.muted, marginTop: 6 },

  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { color: "#111", fontWeight: "700", fontSize: 12 },

  actionsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
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
