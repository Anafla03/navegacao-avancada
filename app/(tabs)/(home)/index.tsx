import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setData(["Item 1", "Item 2", "Item 3"]);
      setLoading(false);
    }, 2000);
  }, []);

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.message}>Carregando...</Text>
      </View>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.message}>Nenhum dado disponível</Text>
      </View>
    );
  }

  // Data state
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Home</Text>
      
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
        style={styles.list}
      />

      <Button
        title="Ir para Details"
        onPress={() => router.push("/details/123")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    color: "#666",
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
