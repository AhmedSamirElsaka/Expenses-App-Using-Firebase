import { Pressable, View, Text, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { GlobalStyles } from "../../constants/styles";

function ExpenseItem({ name, date, price, onPress }) {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
        style={({ pressed }) => pressed && styles.itemPressed}
      >
        <View style={styles.golbalInnerContainer}>
          <View style={styles.leftInnerContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <View style={styles.rightInnerContainer}>
            <Text style={styles.amountText}>${price}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  outerContainer: {
    margin: 8,
    marginHorizontal: 24,
    backgroundColor: GlobalStyles.colors.ExpenseItemColor,
  },
  golbalInnerContainer: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.secondryColor,
    borderRadius: 4,
    justifyContent: "space-between",
    flexDirection: "row",
    height: 70,
  },
  itemPressed: {
    opacity: 0.75,
  },
  rightInnerContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 4,
  },
  leftInnerContainer: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "space-around",
    // padding: 4,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  dateText: {},
  amountText: {
    fontWeight: "bold",
  },
});
