import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { auth } from "../../firebaseConfig";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";

const settings = () => {
  getAuth().onAuthStateChanged((user) => {
    if (!user) {
      router.replace("/resetToRoot");
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "#fff",
  },
});
