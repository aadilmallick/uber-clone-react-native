import React from "react";
import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "@env";
import * as Location from "expo-location";

export const fetchAddress = async (lat, lng) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
  );
  const data = await response.json();
  if (data.status === "OK") {
    const { formatted_address } = data.results[0];
    return formatted_address;
  } else {
    return "NO ADDRESS";
  }
};

/**
 *
 * @param {string} address
 * @returns
 */
export const fetchLatLngFromAddress = async (address) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
  );
  const data = await response.json();
  if (data.status === "OK") {
    const foundCoords = data.results[0].geometry?.location;
    return foundCoords;
  }
  console.log("data failed", data);
  return data;
};

/**
 *
 * @param {number} lat
 * @param {number} lng
 * @returns
 */
export const useGeocoding = (lat, lng) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["geocoding"],
    queryFn: async () => {
      const f = await fetchAddress(lat, lng);
      return f;
    },
  });
  return { data, isLoading, error };
};

/**
 *
 * @param {string} address
 * @returns
 */
export const useGeocodingAddressToLatitude = (address) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["geocodingAddress", `${address}`],
    queryFn: async () => {
      return await fetchLatLngFromAddress(address);
    },
  });
  return { data, isLoading, error };
};

/**
 *
 * @returns {{granted: boolean, prompt?: boolean, lat?: number, lng?: number}}
 */
export const getLocation = async () => {
  let { status, canAskAgain } =
    await Location.requestForegroundPermissionsAsync();
  if (!canAskAgain) {
    return { granted: false, prompt: true };
  }
  if (status !== "granted") {
    return { granted: false };
  }
  let location = await Location.getCurrentPositionAsync({});
  return {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
    granted: true,
  };
  // accuracy: Accuracy.High
};
