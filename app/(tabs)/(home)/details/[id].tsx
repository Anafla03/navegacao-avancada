import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Button,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>(null);

  const loadData = () => {
    setLoading(true);
    setError(false);

    // Simula carregamento com erro aleatório
    setTimeout(() => {
      const hasError = Math.random() > 0.5;
      
      if (hasError) {
        setError(true);
        setLoading(false);
      } else {
        setData({
          id,
          title: `Detalhes do item ${id}`,
          description: "Este é um item de exemplo carregado com sucesso",
        });
        setLoading(false);
      }
    }, 1500);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.message}>Carregando detalhes...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Erro ao carregar</Text>
        <Text style={styles.errorMessage}>
          Não foi possível carregar os detalhes. Tente novamente.
        </Text>
        <Button title="Tentar Novamente" onPress={loadData} />
      </View>
    );
  }

  // Data state
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.label}>ID recebido:</Text>
      <Text style={styles.value}>{data.id}</Text>
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.description}>{data.description}</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
    color: "#666",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    color: "#666",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF3B30",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
});
