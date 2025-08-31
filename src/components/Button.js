import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function Button({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
