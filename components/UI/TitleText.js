import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function TitleText({ leftTxt, rightTxt }) {
  return (
    <View style={styles.container}>
      <Text style={styles.leftTxt}>{leftTxt}</Text>
      <Text style={styles.rightTxt}>{rightTxt}</Text>
    </View>
  );
}

export default TitleText;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.titleColor,
    flexDirection: "row",
    padding: 14,
    borderRadius: 6,
    marginHorizontal: 24,
    // alignItems: "center",
  },
  leftTxt: { fontSize: 12, color: "black", flex: 1 },
  rightTxt: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    textAlign: "right",
  },
});
