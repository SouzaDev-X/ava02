import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../../theme/colors";

import VagasScreen from "../../screens/VagasScreen";
import VagaDetalheScreen from "../../screens/VagaDetalheScreen";

const Stack = createNativeStackNavigator();

export default function VagasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VagasList"
        component={VagasScreen}
        options={{
          title: "Vagas",
          headerStyle: { backgroundColor: colors.secondary },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen
        name="VagaDetalhe"
        component={VagaDetalheScreen}
        options={{
          title: "Detalhe da Vaga",
          headerStyle: { backgroundColor: colors.secondary },
          headerTintColor: colors.text,
        }}
      />
    </Stack.Navigator>
  );
}
