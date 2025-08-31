import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";
import Button from "../components/Button";

export default function ChamadosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chamados</Text>
      <Text style={styles.subtitle}>
        Aqui você pode registrar problemas ou sugestões da cidade.
      </Text>
      <Button label="Criar Chamado" onPress={() => alert("Novo chamado!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: colors.primary, marginBottom: 10 },
  subtitle: { fontSize: 16, color: colors.muted, textAlign: "center" },
});
