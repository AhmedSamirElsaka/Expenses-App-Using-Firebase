import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useRoute } from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";
import { useContext, useLayoutEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManagaeExpense/ExpenseForm";
import {
  deleteExpense,
  storeExpense,
  updateExpense,
  updateExpenses,
} from "../utils/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";
function ManageExpenses({ navigation }) {
  const routed = useRoute();
  const type = routed.params.type;
  const managedItemId = routed.params.expenseItemId;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === managedItemId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: type === "edit" ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, type]);

  function cancelHandler() {
    navigation.goBack();
  }

  // function confirmHandler() {
  //   type === "edit"
  //     ? expensesCtx.updateExpense(editedExpenseId, {
  //         description: "Test!!!!",
  //         amount: 29.99,
  //         date: new Date("2022-05-20"),
  //       })
  //     : expensesCtx.addExpense({
  //         description: "Test",
  //         amount: 19.99,
  //         date: new Date("2022-05-19"),
  //       });
  //   navigation.goBack();
  // }
  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.outerContainer}>
      <ExpenseForm
        submitButtonLabel={type === "edit" ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {type === "edit" ? (
        <View style={styles.deleteIcon}>
          <IconButton
            name={"trash"}
            size={36}
            color={"red"}
            onPress={deleteExpenseHandler}
          />
        </View>
      ) : null}
    </View>
  );
  // return type === "edit" ? (
  //   <View style={styles.outerContainer}>
  //     <ExpenseForm submitButtonLabel={"Update"} onSubmit={confirmHandler} />
  //     <View style={styles.deleteIcon}>
  //       <IconButton
  //         name={"trash"}
  //         size={36}
  //         color={"red"}
  //         onPress={deleteExpenseHandler}
  //       />
  //     </View>
  //   </View>
  // ) : (
  //   <View style={styles.outerContainer}>
  //     <ExpenseForm
  //       onCancel={cancelHandler}
  //       submitButtonLabel={"Add"}
  //       onSubmit={confirmHandler}
  //     />
  //   </View>
  // );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 24,
    justifyContent: "center",
    paddingBottom: 16,
    // marginHorizontal: 50,
    // backgroundColor: GlobalStyles.colors.backgroundColor,
  },
  deleteIcon: {
    width: "75%",
    alignItems: "center",
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.ExpenseItemColor,
    borderTopWidth: 2,
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
    // alignItems: "center",
  },
});
