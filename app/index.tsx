import { Text, View } from "react-native";
import "./globals.css";        
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">  
      <Text className="text-primary text-center text-5xl font-quicksand-bold">  
        Welcome to My React Native App
      </Text>
    </View>
  );
}
