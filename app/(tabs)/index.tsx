import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Alexander</Text>
          </View>
          <Image
            source={{ uri: "https://placehold.co/100" }}
            style={styles.profileImage}
          />
        </View>

        {/* Account Card */}
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={["#3B82F6", "#2563EB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.accountTypeText}>Checking Account</Text>
                <TouchableOpacity style={styles.cycleButton}>
                  <Ionicons name="refresh" size={20} color="white" />
                </TouchableOpacity>
              </View>

              <Text style={styles.balanceText}>$1 325</Text>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Income</Text>
                  <Text style={styles.incomeValue}>+ $500</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Expenses</Text>
                  <Text style={styles.expenseValue}>- $1 500</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Month Selector */}
        <View style={styles.monthSelector}>
          <TouchableOpacity style={styles.monthItem}>
            <Text style={styles.monthText}>December</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.monthItem, styles.selectedMonth]}>
            <Text style={styles.selectedMonthText}>January</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.monthItem}>
            <Text style={styles.monthText}>February</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Transaction Items */}
          <View style={styles.transactionItem}>
            <View
              style={[styles.transactionIcon, { backgroundColor: "#FFEBEE" }]}
            >
              <FontAwesome name="plane" size={20} color="#FF5252" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>Pakistan Flights</Text>
              <Text style={styles.transactionDate}>11 Jan 2025</Text>
            </View>
            <Text style={styles.transactionAmountNegative}>- $1 500.2</Text>
          </View>

          <View style={styles.transactionItem}>
            <View
              style={[styles.transactionIcon, { backgroundColor: "#E8F5E9" }]}
            >
              <FontAwesome name="dollar" size={20} color="#4CAF50" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>Bonus from Work</Text>
              <Text style={styles.transactionDate}>11 Jan 2025</Text>
            </View>
            <Text style={styles.transactionAmountPositive}>+ $500.3</Text>
          </View>

          <View style={styles.transactionItem}>
            <View
              style={[styles.transactionIcon, { backgroundColor: "#FFEBEE" }]}
            >
              <FontAwesome name="play" size={20} color="#FF5252" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>Netflix Subscription</Text>
              <Text style={styles.transactionDate}>10 Jan 2025</Text>
            </View>
            <Text style={styles.transactionAmountNegative}>- $17.2</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  // Account Card Styles
  cardContainer: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#2D7FEB",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 25,
  },
  gradientBackground: {
    borderRadius: 20,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  accountTypeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  cycleButton: {
    padding: 5,
  },
  balanceText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    marginBottom: 5,
  },
  incomeValue: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  expenseValue: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  // Month Selector Styles
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ebebeb",
    borderRadius: 12,
    padding: 5,
    marginBottom: 25,
  },
  monthItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  selectedMonth: {
    backgroundColor: "white",
  },
  monthText: {
    color: "#919191",
    fontWeight: "500",
  },
  selectedMonthText: {
    color: "#1a1a1a",
    fontWeight: "600",
  },
  // Transactions Section Styles
  transactionsSection: {
    marginBottom: 30,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  viewAllText: {
    color: "#808080",
    fontSize: 14,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: "#919191",
  },
  transactionAmountNegative: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF5252",
  },
  transactionAmountPositive: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
  },
});
