import { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { api } from "../lib/axios";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 6;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

interface SummayProps {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

export function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummayProps[]>([]);

  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/summary");

      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possivel carregar o sumário de hábitos.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDays, i) => (
          <Text
            key={`${weekDays}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDays}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {datesFromYearStart.map((item, index) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(item).isSame(day.date, "day");
          });
          return (
            <HabitDay
              key={item.toISOString()}
              onPress={() =>
                navigate("SummaryDay", { date: item.toISOString() })
              }
              date={item}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
