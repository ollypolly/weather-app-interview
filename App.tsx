import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import "react-native-url-polyfill/auto";
import { server, WeatherData } from "./api";

// don't worry about this, it's just setting up the mock api server
server.listen({ onUnhandledRequest: "bypass" });

export default function App() {
  const [data, setData] = useState<WeatherData>();

  const [city, setCity] = useState<string>("london");

  useEffect(() => {
    setData(undefined);
    fetch(`https://localhost:3000/${city}`)
      .then((response) => response.json())
      .then(setData)
      .catch(console.error);
  }, [city]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Button title="London" onPress={() => setCity("london")} />
        <Button title="Sydney" onPress={() => setCity("sydney")} />
        {data ? <CountryCard {...data} /> : <ActivityIndicator />}
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const CountryCard = (data: WeatherData) => {
  return (
    <View style={styles.countryCard}>
      <Text>City</Text>
      <Text>{data.city}</Text>
      <Text>Summary</Text>
      <Text>{data.summary}</Text>
      <Text>Max Temperature</Text>
      <Text>{data.maxTemperature}</Text>
      <Text>Min Temperature</Text>
      <Text>{data.minTemperature}</Text>
      <Text>Wind Speed</Text>
      <Text>{data.windSpeed}</Text>
      <Text>Wind Direction</Text>
      <Text>{data.windDirection}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  countryCard: {
    margin: 20,
  },
});
