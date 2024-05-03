import { FlatList, View } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { getFormattedDate } from "../../utils/date";

function ExpensesList({ items, navigation }) {
  function renderItems(itemsData) {
    // console.log(itemsData);

    // console.log(itemsData.item.id);

    function editExpenseHandler() {
      navigation.navigate("ManageExpense", {
        type: "edit",
        expenseItemId: itemsData.item.id.toString(),
      });
    }

    return (
      <ExpenseItem
        name={itemsData.item.description}
        price={itemsData.item.amount}
        date={getFormattedDate(itemsData.item.date)}
        onPress={editExpenseHandler}
      />
    );
    // itemsData.map((item) => (
    //   <ExpenseItem
    //     name={item.description}
    //     price={item.amount}
    //     date={item.date}
    //   />
    // ));
  }
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={items.id}
        renderItem={renderItems}
        // style={{ flex: 1 }}
      />
    </View>
  );
}

export default ExpensesList;
