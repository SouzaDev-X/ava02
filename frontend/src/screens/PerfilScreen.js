import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../theme/colors";

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      {/* Avatar de exemplo */}
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
        style={styles.avatar}
      />

      {/* Nome do usuário */}
      <Text style={styles.name}>Usuário Teste</Text>

      {/* Informações básicas */}
      <Text style={styles.info}>Email: usuario@teste.com</Text>
      <Text style={styles.info}>Telefone: (94) 99999-9999</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: colors.text,
    marginTop: 5,
  },
});
