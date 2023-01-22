import { View, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "@env";
import { useDispatch } from "react-redux";
import {
  setDestination,
  selectDestination,
} from "../features/navigation/navSlice";
import { useNavigation } from "@react-navigation/native";
export default function NavigateCard() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View className="flex-1 p-4">
      <Text className="text-lg text-center mb-4">
        Good Morning, person who should hire Aadil Mallick
      </Text>
      <GooglePlacesAutocomplete
        placeholder="Enter an area to search"
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 16,
            backgroundColor: "#DDDDDD",
          },
        }}
        debounce={400}
        nearbyPlacesAPI="GooglePlacesSearch"
        minLength={2}
        query={{
          key: API_KEY,
          language: "en",
        }}
        enablePoweredByContainer={false}
        onPress={(data, details) => {
          dispatch(
            setDestination({
              location: details.geometry.location,
              description: data.description,
            })
          );

          navigation.navigate("RideOptions");
        }}
        fetchDetails={true}
      />
    </View>
  );
}
