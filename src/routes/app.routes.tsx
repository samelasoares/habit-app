import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from "../screens/Home";
import { NewHabit } from "../screens/NewHabit";
import { Habit } from "../screens/Habit";
import { AllHabitsListed } from "../screens/AllHabitsListed";

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name="Home" 
        component={Home} 
      />

      <Screen 
        name="NewHabit" 
        component={NewHabit} 
      />

      <Screen 
        name="Habit" 
        component={Habit} 
      />

      <Screen 
        name="AllHabitsListed" 
        component={AllHabitsListed} 
      />
     
    </Navigator>
  );
}
