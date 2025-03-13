import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email.trim()) return "Email is required";
    if (!password.trim()) return "Password is required";
    if (!confirmPassword.trim()) return "Confirm password is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleSignUp = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    Keyboard.dismiss();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      let errorMessage = "Sign up failed. Please try again.";

      // Handle specific Firebase error codes
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email format";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak";
      } else if (err.code === "auth/network-request-failed") {
        errorMessage = "Network error. Check your connection";
      }

      setError(errorMessage);
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.logo}>FinChart</Text>

            <View style={styles.mainContentContainer}>
              <Text style={styles.headerText}>Create New Account</Text>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={"#60617D"}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError("");
                  }}
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCorrect={false}
                  accessibilityLabel="Email input field"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={"#60617D"}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError("");
                  }}
                  secureTextEntry
                  style={styles.input}
                  textContentType="newPassword"
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Password input field"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={"#60617D"}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setError("");
                  }}
                  secureTextEntry
                  style={styles.input}
                  textContentType="newPassword"
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Confirm password input field"
                />
              </View>

              <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, loading && styles.buttonDisabled]}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Sign Up button"
              >
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/(auth)/signIn")}
              accessibilityRole="button"
              accessibilityLabel="Sign In button"
            >
              <Text style={styles.signInText}>
                Have an account?{" "}
                <Text style={styles.signInHighlight}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 40,
    fontWeight: "900",
    color: "#227CD7",
    marginTop: 20,
  },
  mainContentContainer: {
    width: "100%",
    paddingBottom: 35,
  },
  headerText: {
    color: "#60617D",
    fontWeight: "500",
    fontSize: 20,
    marginBottom: 20,
    paddingLeft: 5,
  },
  errorText: {
    color: "#E53935",
    marginBottom: 15,
    paddingLeft: 5,
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 13,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    backgroundColor: "#E3E3E3",
    height: 60,
    borderRadius: 13,
    paddingLeft: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#227CD7",
    borderRadius: 13,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
    shadowColor: "#227CD7",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: "#83b3e3",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  signInText: {
    color: "#60617D",
    fontSize: 16,
  },
  signInHighlight: {
    color: "#227CD7",
    fontWeight: "500",
  },
});
