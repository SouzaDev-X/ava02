import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../../theme/colors";

import ChamadosScreen from "../../screens/ChamadosScreen";
import ChamadoDetalheScreen from "../../screens/ChamadoDetalheScreen";

const Stack = createNativeStackNavigator();

export default function ChamadosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChamadosList"
        component={ChamadosScreen}
        options={{
          title: "Chamados",
          headerStyle: { backgroundColor: colors.secondary },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen
        name="ChamadoDetalhe"
        component={ChamadoDetalheScreen}
        options={{
          title: "Detalhe do Chamado",
          headerStyle: { backgroundColor: colors.secondary },
          headerTintColor: colors.text,
        }}
      />
    </Stack.Navigator>
  );
}
