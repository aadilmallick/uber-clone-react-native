import { View, Text, StatusBar, SafeAreaView } from "react-native";
import React, { useRef, useEffect, useLayoutEffect } from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-maps";
import {
  selectOrigin,
  selectDestination,
  setTravelTimeInformation,
} from "../features/navigation/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import MapViewDirections from "react-native-maps-directions";
import { API_KEY } from "@env";

const Stack = createNativeStackNavigator();

export default function MapScreen({ route, navigation }) {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const alreadySet = Boolean(origin) === true && Boolean(destination) === true;
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  // console.log("origin", origin);
  // console.log("destination", destination);

  const shortcut = route.params?.shortcut;

  useEffect(() => {
    if (shortcut || alreadySet) {
      console.log("hey");
      setTimeout(() => {
        zoomMap();
        calculateTravelTime();
        navigation.navigate("RideOptions");
      }, 50);
    }
  }, [shortcut]);

  useEffect(() => {
    zoomMap();
    calculateTravelTime();
  }, [destination, origin]);

  function zoomMap() {
    if (!mapRef || !destination || !origin) {
      return;
    }

    mapRef.current.fitToCoordinates(
      [
        { latitude: origin.lat, longitude: origin.lng },
        { latitude: destination.lat, longitude: destination.lng },
      ],
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      }
    );
  }

  async function calculateTravelTime() {
    if (!destination || !origin || !API_KEY) {
      return;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&units=imperial&key=${API_KEY}`
    );
    const data = await response.json();
    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
    console.log(data);
  }

  return (
    <>
      <StatusBar />
      <SafeAreaView className="flex-1">
        <View className="h-1/2 border-b-2 border-gray-400">
          <MapView
            style={{ width: "100%", height: "100%" }}
            mapType="mutedStandard"
            ref={mapRef}
            initialRegion={{
              latitude: origin.lat || 30,
              longitude: origin.lng || 30,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            {origin && destination && (
              <MapViewDirections
                apikey={API_KEY}
                origin={origin.description}
                destination={destination.description}
                strokeWidth={3}
                strokeColor="black"
              />
            )}
            <Marker
              coordinate={{ latitude: origin.lat, longitude: origin.lng }}
              title="Origin"
              description={origin.description}
              identifier="origin"
            />
            {destination && (
              <Marker
                coordinate={{
                  latitude: destination.lat,
                  longitude: destination.lng,
                }}
                title="Destination"
                description={destination.description}
                identifier="destination"
              />
            )}
          </MapView>
        </View>
        <View className="h-1/2">
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "white" },
            }}
          >
            <Stack.Screen
              name="NavigateCard"
              component={NavigateCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RideOptions"
              component={RideOptionsCard}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </View>
      </SafeAreaView>
    </>
  );
}
