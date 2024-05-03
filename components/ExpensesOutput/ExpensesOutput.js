import { View } from "react-native";
import TitleText from "../UI/TitleText";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, leftTxt, rightTxt, navigation }) {
  return (
    <View>
      <TitleText leftTxt={leftTxt} rightTxt={rightTxt} />
      <ExpensesList items={expenses} navigation={navigation} />
    </View>
  );
}
export default ExpensesOutput;
