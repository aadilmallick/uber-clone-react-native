import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React from "react";
import { API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestination,
  setTravelTimeInformation,
  selectOrigin,
  setOrigin,
  selectDestination,
} from "../features/navigation/navSlice";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import NavFavorites from "../components/NavFavorites";
import { useQuery } from "@tanstack/react-query";
import { useGeocoding } from "../hooks/useGeocoding";

// TODO: Get the user's current location, geocode it to an address if possible. May have to play around with state and description.
// TODO: Create a favorite options list, of destinations to choose. Clicking on it sets the destination.
// TODO: set the origin to current latitude and longitude. Set destination to clicked on nav option.
export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  const originIsSelected = Boolean(origin);

  const onNavigateToMap = () => {
    if (origin) {
      navigation.navigate("Map");
    } else {
      console.log("here!");
      // Toast.show({
      //   type: "error",
      //   text1: "Unable to do that",
      //   text2: "You haven't selected a destination yet!",
      // });
      ToastAndroid.show("Must select a destination first", ToastAndroid.SHORT);
    }
  };
  return (
    <>
      <StatusBar />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-white">
          <View className="p-4">
            <Image
              source={{ uri: "https://links.papareact.com/gzs" }}
              className="h-28 w-28"
              style={{ resizeMode: "contain" }}
            />
            <GooglePlacesAutocomplete
              placeholder={"Enter current location"}
              styles={{
                container: {
                  flex: 0,
                },
                textInput: {
                  fontSize: 18,
                },
                textInputContainer: {
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
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
                  setOrigin({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );

                dispatch(setDestination(null));
              }}
              fetchDetails={true}
            />
            <View className="flex flex-row p-8 space-x-4">
              <TouchableOpacity
                className={`bg-zinc-200 p-2 rounded ${
                  originIsSelected ? "" : "opacity-20"
                }`}
                style={styles.shadow}
                onPress={onNavigateToMap}
              >
                <Image
                  className="h-24 w-24"
                  source={{ uri: "https://links.papareact.com/3pn" }}
                  style={{ resizeMode: "contain" }}
                />
                <Text className="text-lg font-semibold">Hitch a ride</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`bg-zinc-200 p-2 rounded ${
                  originIsSelected ? "" : "opacity-20"
                }`}
                style={styles.shadow}
              >
                <Image
                  className="h-24 w-24"
                  source={{ uri: "https://links.papareact.com/28w" }}
                  style={{ resizeMode: "contain" }}
                />
                <Text className="text-lg font-semibold">Get a meal</Text>
              </TouchableOpacity>
            </View>
          </View>
          <NavFavorites />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  shadowSm: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  shadowMd: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  shadowLg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  shadowXl: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  shadow2Xl: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
