import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Index = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.contentContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.welcomeTitle}>Welcome to</Text>
          <Text style={styles.appName}>FinChart</Text>
          <Text style={styles.subheading}>
            A personal finance manager in your pocket
          </Text>
        </View>

        <View style={styles.illustrationContainer}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={() => router.push("/(auth)/signIn")}
          accessibilityRole="button"
          accessibilityLabel="Sign In"
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signUpButton]}
          onPress={() => router.push("/(auth)/signUp")}
          accessibilityRole="button"
          accessibilityLabel="Sign Up"
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "500",
    color: "#60617D",
  },
  appName: {
    fontSize: 40,
    fontWeight: "900",
    color: "#227CD7",
    marginVertical: 10,
  },
  subheading: {
    fontSize: 16,
    color: "#60617D",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 5,
  },
  illustrationContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: "80%",
    height: 180,
  },
  buttonContainer: {
    marginBottom: 30,
    gap: 15,
  },
  button: {
    borderRadius: 13,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  signInButton: {
    backgroundColor: "#E3E3E3",
    marginBottom: 5,
  },
  signUpButton: {
    backgroundColor: "#227CD7",
    shadowColor: "#227CD7",
    shadowOpacity: 0.2,
  },
  signInText: {
    color: "#60617D",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
