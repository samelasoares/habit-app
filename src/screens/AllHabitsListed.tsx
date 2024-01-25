import { View, Text } from "react-native";
import { ReturnButton } from "../components/ReturnButton";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Response {
  id_habit: number;
  title: string;
}

const mockData = [
  { id_habit: 1, title: "Beber 2L de água" },
  { id_habit: 1, title: "Beber 2L de água" },
];

export function AllHabitsListed() {
  const [data, setData] = useState<Response[]>([]);

  useEffect(() => {
    getHabits();
  }, []);

  async function getHabits() {
    try {
      const response = await api.get("/list-habits");
      console.log(response.data);

      setData(response.data as Response[]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ReturnButton />

      <Text className="pl-2 mt-6 text-white font-extrabold text-4xl">
        Hábitos criados
      </Text>
      <View className="mt-10">
        {data.map((item, index) => {
          return (
            <Text
              key={`${item.id_habit}_${index}`}
              className="pl-2 mt-3 text-white font-semibold text-base"
            >
              {item.title}
            </Text>
          );
        })}
      </View>
    </View>
  );
}
