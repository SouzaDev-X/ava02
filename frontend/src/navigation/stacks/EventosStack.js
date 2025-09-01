import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../../theme/colors";

import EventosScreen from "../../screens/EventosScreen";
import EventoDetalheScreen from "../../screens/EventoDetalheScreen";

const Stack = createNativeStackNavigator();

export default function EventosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventosList"
        component={EventosScreen}
        options={{
          title: "Eventos",
          headerStyle: { backgroundColor: colors.secondary },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen
        name="EventoDetalhe"
        component={EventoDetalheScreen}
        options={{
          title: "Detalhe do Evento",
          headerStyle: { backgroundColor: colors.secondary },
          headerTintColor: colors.text,
        }}
      />
    </Stack.Navigator>
  );
}
