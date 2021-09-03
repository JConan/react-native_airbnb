import {
  getCurrentPositionAsync,
  getLastKnownPositionAsync,
  LocationAccuracy,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { Platform } from "react-native";

export const checkLocationPermission = () =>
  requestForegroundPermissionsAsync().then(({ granted }) => granted);

export const getCoords = () =>
  getCurrentPositionAsync({ accuracy: LocationAccuracy.Balanced })
    .catch(() =>
      getCurrentPositionAsync({
        accuracy: Platform.select({
          android: LocationAccuracy.Lowest,
        }),
      }).catch(() => getLastKnownPositionAsync())
    )
    .then((coords) => (coords ? coords : undefined));
