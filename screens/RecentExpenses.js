import { View, StyleSheet, Text } from "react-native";
import TitleText from "../components/UI/TitleText";
import { GlobalStyles } from "../constants/styles";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses({
  // items = DUMMY_EXPENSES,
  navigation,
}) {
  const expensesCtx = useContext(ExpensesContext);
  const items = expensesCtx.expenses;

  const [isFetching, setIsFetching] = useState(true);

  const [error, setError] = useState();

  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  // console.log(fetchedExpenses);
  // const [hello, setHello] = useState("ahmed");
  // console.log(hello);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }

      // const expenses = await fetchExpenses();
      setIsFetching(false);
      // setFetchedExpenses(expenses);
      // expensesCtx.setExpenses(expenses);
      // console.log(expenses);
    }

    getExpenses();
  }, []);

  // console.log(fetchedExpenses);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }
  const recentExpenses = items.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  let expensesSum = items
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
