import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-url-polyfill/auto";
import { server } from "./api";

server.listen({ onUnhandledRequest: "bypass" });

export default function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://localhost:3000/london")
      .then((response) => response.json())
      .then(setData)
      .catch((error) => {
        return console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
