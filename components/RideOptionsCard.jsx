import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../features/navigation/navSlice";

export default function RideOptionsCard({ navigation }) {
  const car = [
    {
      title: "Normal Uber",
      image: "https://links.papareact.com/7pf",
      id: 123,
    },
  ];

  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <View className="bg-white flex-1">
      <View className="relative p-4">
        <Text className="text-lg text-center font-light">
          Select A Ride - {travelTimeInformation?.distance.text}
        </Text>
        <TouchableOpacity
          className="bg-gray-200 p-2 rounded-full absolute top-3 left-4"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="flex-row justify-between p-4 px-8 items-center border-gray-100 border">
        <Image
          source={{ uri: car[0].image }}
          className="h-16 w-16"
          style={{
            resizeMode: "contain",
          }}
        />
        <View>
          <Text className="font-bold text-xl">{car[0].title}</Text>
          <Text>
            {travelTimeInformation
              ? travelTimeInformation?.duration?.text
              : "Travel time..."}
          </Text>
        </View>
        <Text className="text-lg font-semibold">
          {travelTimeInformation
            ? `$${(2 * (travelTimeInformation.duration.value / 60)).toFixed(2)}`
            : "$99"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
