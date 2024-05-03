import { View, StyleSheet, Text } from "react-native";
import TitleText from "../components/UI/TitleText";
import { GlobalStyles } from "../constants/styles";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";

function RecentExpenses({
  // items = DUMMY_EXPENSES,
  navigation,
}) {
  const expensesCtx = useContext(ExpensesContext);
  const items = expensesCtx.expenses;

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  let expensesSum = recentExpenses
    .reduce((sum, expense) => {
      return (sum += expense.amount);
    }, 0)
    .toFixed(2);

  return items.length === 0 ? (
    <View style={styles.container}>
      <TitleText leftTxt={"Last 7 Days"} rightTxt={"$" + expensesSum} />
      <View style={styles.noItemsTextContainer}>
        <Text style={styles.noItemsText}>
          No expenses registered for the last 7 days
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        leftTxt={"Last 7 Days"}
        rightTxt={"$" + expensesSum}
        navigation={navigation}
      />
    </View>
  );

  // if (items.length === 0) {
  //   return (
  //     <View style={styles.container}>
  //       <TitleText leftTxt={"Last 7 Days"} rightTxt={"ahmed"} />
  //       <View style={styles.noItemsTextContainer}>
  //         <Text style={styles.noItemsText}>
  //           No expenses registered for the last 7 days
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // } else {
  //
  //   return (
  //     <View style={styles.container}>
  //       <ExpensesOutput
  //         expenses={items}
  //         leftTxt={"Last 7 Days"}
  //         rightTxt={"$" + expensesSum}
  //         navigation={navigation}
  //       />
  //     </View>
  //   );
  // }
}

export default RecentExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: GlobalStyles.colors.backgroundColor,
  },
  noItemsTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 36,
  },
  noItemsText: {
    fontSize: 16,
  },
});
