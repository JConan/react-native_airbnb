import React, { useEffect, useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AroundMeNavigationProps } from "../navigations/AroundMeNavigatorStacks";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationAccuracy,
  getLastKnownPositionAsync,
} from "expo-location";
import { LottieAnimation } from "../components/LottieAnimation";
import { Coords, getRoomsAround } from "../api/Room";
import { Rooms } from "../api/RoomsSchema";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

interface Props extends AroundMeNavigationProps<"RoomsAroundMeScreen"> {}

const testCoords: Coords[] = [
  {
    latitude: 48.8684449,
    longitude: 2.4002913,
  },
  {
    latitude: 48.846781,
    longitude: 2.308027,
  },
  {
    latitude: 48.893613,
    longitude: 2.34802,
  },
];

export const RoomsAroundMeScreen = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationGranted, setLocationGranted] = useState(false);
  const [coords, setCoords] = useState<Coords>({ ...testCoords[0] });
  const [testId, setTestId] = useState<number | undefined>(1);
  const [rooms, setRooms] = useState<Rooms>();

  useEffect(() => {
    testId && setCoords(testCoords[testId - 1]);
  }, [testId]);

  useEffect(() => {
    getRoomsAround(coords)
      .then((rooms) => setRooms(rooms))
      .catch((error) => console.error(error));
  }, [coords]);

  const checkLocationPermission = () =>
    requestForegroundPermissionsAsync().then(({ granted }) => {
      setLocationGranted(granted);
      return granted;
    });

  const getCoords = () =>
    getCurrentPositionAsync({ accuracy: LocationAccuracy.Balanced })
      .catch(() =>
        getCurrentPositionAsync({
          accuracy: Platform.select({
            android: LocationAccuracy.Lowest,
          }),
        }).catch(() => getLastKnownPositionAsync())
      )
      .then((coords) => coords && setCoords({ ...coords.coords }));

  const getPosition = async () => {
    setTestId(undefined);
    setIsLoading(true);

    const isLocationGranted = await checkLocationPermission();
    setLocationGranted(isLocationGranted);
    if (isLocationGranted) {
      await getCoords();
    } else {
      Alert.alert(
        "Erreur",
        "La récupération de coordonnées GPS n'a pas pu aboutir.",
        [
          {
            text: "reessayer",
            onPress: () => setTimeout(() => getPosition(), 200),
          },
          { text: "annuler" },
        ]
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getPosition();
  }, []);

  return (
    <View style={{ flex: 1, position: "relative", backgroundColor: "white" }}>
      {
        <>
          <MapView
            style={{ flex: 1 }}
            provider="google"
            region={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
          >
            {coords && (
              <>
                {rooms?.map((room) => (
                  <Marker
                    key={room._id}
                    coordinate={{
                      longitude: room.location[0],
                      latitude: room.location[1],
                    }}
                  >
                    <Ionicons name="home" size={16} color="red" />
                  </Marker>
                ))}
                <Marker
                  coordinate={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      width: 50,
                    }}
                  >
                    <LottieAnimation animation="position" />
                  </View>
                </Marker>
              </>
            )}
          </MapView>
          <View style={{ height: 50, flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                borderColor: "#efefef",
                borderRightWidth: 2,
                width: 110,
              }}
              onPress={() => !isLoading && getPosition()}
              disabled={isLoading}
            >
              {(isLoading && (
                <View style={{ flex: 1 }}>
                  <LottieAnimation animation="dot" />
                </View>
              )) || (
                <View style={{ alignItems: "center" }}>
                  <Feather
                    name="target"
                    size={24}
                    color={!isLocationGranted || testId ? "grey" : "red"}
                  />
                </View>
              )}
            </TouchableOpacity>
            <Text
              style={{
                color: "grey",
                paddingHorizontal: 10,
                alignSelf: "center",
              }}
            >
              Coord. de test :
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {[1, 2, 3].map((id) => (
                <TouchableOpacity
                  style={{
                    width: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => setTestId(id)}
                  key={id}
                >
                  <Text style={{ color: testId === id ? "red" : "grey" }}>
                    {id}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      }
    </View>
  );
};
