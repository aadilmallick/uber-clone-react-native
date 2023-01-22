import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
import uuid from "react-native-uuid";
import {
  fetchAddress,
  fetchLatLngFromAddress,
  getLocation,
  useGeocoding,
  useGeocodingAddressToLatitude,
} from "../hooks/useGeocoding";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../features/navigation/navSlice";
import { useNavigation } from "@react-navigation/native";

export default function NavFavorites() {
  // const { data: geoData, error, isLoading } = useGeocoding(39.01083, -77.33696);
  // if (isLoading) {
  //   return <Text>Loading</Text>;
  // }
  const data = [
    {
      id: uuid.v4(),
      location: "Home",
      destination: "11308 Seneca Circle",
      icon: "home",
    },
    {
      id: uuid.v4(),
      location: "Work",
      destination: "21730 Towncenter Plz, Sterling, VA 20164",
      icon: "briefcase",
    },
    {
      id: uuid.v4(),
      location: "Neighbor",
      destination: "11307 Seneca Circle",
      icon: "home",
    },
  ];

  return (
    <View className="flex-1">
      <Text className="text-center text-lg font-light border-b border-b-gray-100">
        Recently Visited
      </Text>
      <FlatList
        className="flex-1 mb-8"
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DestinationCard {...item} />}
      />
    </View>
  );
}

function DestinationCard({ icon, destination, location }) {
  // const {
  //   data: destinationAddress,
  //   error,
  //   isLoading,
  // } = useGeocodingAddressToLatitude(destination);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPress = async () => {
    // 1. get location
    // 2. Set location as origin in redux, get address if you can
    // 3. Get coords of destination, set destination to the destination in redux
    setLoading(true);
    const { granted, lat, lng, prompt } = await getLocation();

    if (prompt) {
      ToastAndroid.show(
        "Go to your settings and grant the location permission.",
        ToastAndroid.SHORT
      );
      setLoading(false);
      return;
    }
    if (!granted) {
      ToastAndroid.show(
        "Must grant location permissions to use this feature.",
        ToastAndroid.SHORT
      );
      setLoading(false);
      return;
    }

    console.log("current location", lat, lng);
    const data = await fetchAddress(lat, lng);
    console.log("data", data);
    dispatch(
      setOrigin({
        location: { lat, lng },
        description: data === "NO ADDRESS" ? "unknown" : data,
      })
    );
    const { lat: destinationLat, lng: destinationLng } =
      await fetchLatLngFromAddress(destination);
    dispatch(
      setDestination({
        location: { lat: destinationLat, lng: destinationLng },
        description: destination,
      })
    );
    setLoading(false);
    navigation.navigate("Map", { shortcut: true });
  };

  if (loading) {
    return (
      <View className="justify-center items-center p-2 py-4">
        <ActivityIndicator size={40} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      className="flex flex-row items-center space-x-4 border-b border-b-gray-100 p-2 py-4"
      onPress={onPress}
    >
      <View className="p-3 bg-gray-200 rounded-full">
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <View>
        <Text className="text-lg font-bold">{location}</Text>
        <Text className="text-sm text-gray-400">{destination}</Text>
      </View>
    </TouchableOpacity>
  );
}
