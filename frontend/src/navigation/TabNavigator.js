// src/navigation/TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

// --- Telas (listas principais) ---
import ChamadosStack from "./stacks/ChamadosStack";
import EventosStack from "./stacks/EventosStack";
import VagasStack from "./stacks/VagasStack";
import MapaScreen from "../screens/MapaScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.secondary, borderTopColor: "#333" },
        tabBarLabelStyle: { fontSize: 12 },
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
      <Tab.Screen name="Chamados" component={ChamadosStack} />
      <Tab.Screen name="Eventos" component={EventosStack} />
      <Tab.Screen name="Vagas" component={VagasStack} />
      <Tab.Screen name="Mapa" component={MapaScreen} />
    </Tab.Navigator>
  );
}
