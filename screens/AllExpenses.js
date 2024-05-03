import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses({
  navigation,
  // , items = DUMMY_EXPENSES
}) {
  // const items = expensesCtx.expenses;

  const expensesCtx = useContext(ExpensesContext);
  const items = expensesCtx.expenses;
  console.log(items);

  const expensesSum = items
    .reduce((sum, expense) => {
      return (sum += expense.amount);
    }, 0)
    .toFixed(2);
  console.log(expensesSum);
  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={items}
        leftTxt={"Total"}
        rightTxt={"$" + expensesSum}
        navigation={navigation}
      />
    </View>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: GlobalStyles.colors.backgroundColor,
  },
});
