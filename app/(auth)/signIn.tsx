import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email.trim()) return "Email is required";
    if (!password.trim()) return "Password is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email";
    return null;
  };

  const handleSignIn = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    Keyboard.dismiss();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      let errorMessage = "Sign in failed. Please try again.";

      // Handle specific Firebase error codes
      if (err.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later";
      } else if (err.code === "auth/network-request-failed") {
        errorMessage = "Network error. Check your connection";
      }

      setError(errorMessage);
      console.error("Sign in error:", err);
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
              <Text style={styles.headerText}>Sign-In to your account</Text>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email"
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
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError("");
                  }}
                  secureTextEntry
                  style={styles.input}
                  textContentType="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Password input field"
                />
              </View>

              <TouchableOpacity
                onPress={handleSignIn}
                style={[styles.button, loading && styles.buttonDisabled]}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Sign In button"
              >
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.buttonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() => router.push("resetPassword")}
                accessibilityRole="button"
                accessibilityLabel="Forgot password"
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => router.push("signUp")}
              accessibilityRole="button"
              accessibilityLabel="Sign Up button"
            >
              <Text style={styles.signUpText}>
                Don't have an account?{" "}
                <Text style={styles.signUpHighlight}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  logo: {
    fontSize: 40,
    fontWeight: "900",
    color: "#227CD7",
    marginTop: 20,
  },
  mainContentContainer: {
    width: "100%",
    padding: 8,
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
  forgotPasswordButton: {
    alignSelf: "flex-end",
    paddingRight: 5,
  },
  forgotPasswordText: {
    color: "#227CD7",
    fontSize: 14,
  },
  signUpText: {
    color: "#60617D",
    fontSize: 16,
  },
  signUpHighlight: {
    color: "#227CD7",
    fontWeight: "500",
  },
});
