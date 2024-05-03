import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ButtonItem from "./components/UI/ButtonItem";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import ManageExpenses from "./screens/ManageExpenses";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentExpenses from "./screens/RecentExpenses";
import TitleText from "./components/UI/TitleText";
import ExpenseItem from "./components/ExpensesOutput/ExpenseItem";
import ExpensesList from "./components/ExpensesOutput/ExpensesList";
// import
import DUMMY_EXPENSES from "./store/expenses-context";
import AllExpenses from "./screens/AllExpenses";
import IconButton from "./components/UI/IconButton";
import { GlobalStyles } from "./constants/styles";
import ExpensesContextProvider from "./store/expenses-context";
const Stack = createNativeStackNavigator();
const BottomTabsNav = createBottomTabNavigator();

function ExpensesOverView({ navigation }) {
  function addNewExpenseHandler() {
    navigation.navigate("ManageExpense", {
      type: "add",
    });
  }
  return (
    <BottomTabsNav.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.headerColor },
        headerTintColor: "black",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.headerColor,
          padding: 8,
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerRight: ({ tintColor }) => (
          <IconButton
            name={"add"}
            size={24}
            color="black"
            onPress={addNewExpenseHandler}
          />
        ),
        headerRightContainerStyle: { padding: 8 },
      })}
    >
      <BottomTabsNav.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <IconButton name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabsNav.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <IconButton name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabsNav.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.headerColor,
              },
              contentStyle: {
                backgroundColor: GlobalStyles.colors.backgroundColor,
              },
            }}
          >
            <Stack.Screen
              component={ExpensesOverView}
              name="ExpensesOverview"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpenses}
              options={{
                presentation: "modal",
                backgroundColor: GlobalStyles.colors.backgroundColor,
                // headerBackground: GlobalStyles.colors.headerColor,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
