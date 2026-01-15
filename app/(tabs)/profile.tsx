import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Simula carregamento de dados do perfil
    setTimeout(() => {
      setProfile({
        name: "Usuário Exemplo",
        email: "usuario@exemplo.com",
        bio: "Desenvolvedor React Native",
      });
      setLoading(false);
    }, 1500);
  }, []);

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.message}>Carregando perfil...</Text>
      </View>
    );
  }

  // Empty state
  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.message}>
          Nenhum perfil disponível
        </Text>
      </View>
    );
  }

  // Data state
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{profile.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{profile.email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.value}>{profile.bio}</Text>
      </View>
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
    marginBottom: 30,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    color: "#666",
  },
});
