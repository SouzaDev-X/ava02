import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import colors from "./src/theme/colors";

// --- Telas ---
import ChamadosScreen from "./src/screens/ChamadosScreen";
import EventosScreen from "./src/screens/EventosScreen";
import VagasScreen from "./src/screens/VagasScreen";
import MapaScreen from "./src/screens/MapaScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
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
      <Tab.Screen name="Chamados" component={ChamadosScreen} />
      <Tab.Screen name="Eventos" component={EventosScreen} />
      <Tab.Screen name="Vagas" component={VagasScreen} />
      <Tab.Screen name="Mapa" component={MapaScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
      <Stack.Navigator>
        <Stack.Screen
          name="MenuInicial"
          component={Tabs}
          options={{
            title: "Menu Inicial",
            headerStyle: { backgroundColor: colors.secondary },
            headerTintColor: colors.text,
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
