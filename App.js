// App.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ChamadosScreen from './src/screens/ChamadosScreen';
import EventosScreen from './src/screens/EventosScreen';
import VagasScreen from './src/screens/VagasScreen';
import MapaScreen from './src/screens/MapaScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Telas ---
function ChamadosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chamados</Text>
      <Text style={styles.subtitle}>Aqui o usuário pode registrar problemas ou sugestões.</Text>
    </View>
  );
}

function EventosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>
      <Text style={styles.subtitle}>Listagem de eventos da comunidade.</Text>
    </View>
  );
}

function VagasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vagas</Text>
      <Text style={styles.subtitle}>Oportunidades de emprego e serviços comunitários.</Text>
    </View>
  );
}

function MapaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa</Text>
      <Text style={styles.subtitle}>Pontos de interesse de Curionópolis.</Text>
    </View>
  );
}

// --- Tabs com 4 menus ---
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2f95dc",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Chamados") iconName = "alert-circle";
          else if (route.name === "Eventos") iconName = "calendar";
          else if (route.name === "Vagas") iconName = "briefcase";
          else if (route.name === "Mapa") iconName = "map";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Chamados" component={ChamadosScreen} />
      <Tab.Screen name="Eventos" component={EventosScreen} />
      <Tab.Screen name="Vagas" component={VagasScreen} />
      <Tab.Screen name="Mapa" component={MapaScreen} />
    </Tab.Navigator>
  );
}

// --- App Principal ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MenuInicial"
          component={Tabs}
          options={{
            title: "Menu Inicial",
            headerStyle: { backgroundColor: "#1e1e2f" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- Estilos globais ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
  },
});
