import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function IconButton({ name, color, size, onPress }) {
  return <Ionicons name={name} color={color} size={size} onPress={onPress} />;
}

export default IconButton;
