import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useEffect, useState } from "react";
import ButtonItem from "../UI/ButtonItem";
import { getFormattedDate } from "../../utils/date";

function ExpenseForm({ onCancel, submitButtonLabel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.headerText}>Your Expense</Text>
      <View style={styles.innerContainer}>
        <Input
          label={"Amount"}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={{ marginLeft: 16, marginRight: 4 }}
        />
        <Input
          label={"Date"}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            //   keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
          }}
          style={{ marginRight: 16, marginLeft: 4 }}
        />
      </View>
      <Input
        label={"Description"}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          //   keyboardType: "decimal-pad",
          //   onChangeText: amountChangeHandler,
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.innerButtonsContainer}>
        <ButtonItem
          color={"goldenrod"}
          onPress={onCancel}
          newStyle={styles.buttonStyle}
          mode={"flat"}
        >
          Cancel
        </ButtonItem>
        <ButtonItem
          color={"goldenrod"}
          onPress={submitHandler}
          newStyle={styles.buttonStyle}
        >
          {submitButtonLabel}
        </ButtonItem>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    flex: 1,
    paddingTop: 64,
  },
  headerText: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 100,
  },
  innerButtonsContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 24,
    justifyContent: "center",
    paddingBottom: 16,
    // marginHorizontal: 50,
    // backgroundColor: GlobalStyles.colors.backgroundColor,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    margin: 8,
  },
});
