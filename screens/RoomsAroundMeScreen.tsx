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

interface Props extends AroundMeNavigationProps<"RoomsAroundMeScreen"> {}

interface coords {
  latitude: number;
  longitude: number;
}

const fakePosition: coords = {
  latitude: 48.8564449,
  longitude: 2.4002913,
};

const testCoords: coords[] = [
  {
    latitude: 48.8564449,
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
  const [coords, setCoords] = useState<coords>({ ...testCoords[0] });
  const [testId, setTestId] = useState<number | undefined>(1);

  useEffect(() => {
    testId && setCoords(testCoords[testId - 1]);
  }, [testId]);

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
    isLocationGranted && (await getCoords());
    !isLocationGranted &&
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
      ) &&
      setTestId(1);
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
                <Text
                  style={{
                    color: isLocationGranted ? "red" : "grey",
                    textDecorationLine: !isLocationGranted
                      ? "line-through"
                      : undefined,
                    textDecorationColor: "grey",
                    paddingHorizontal: 10,
                    alignSelf: "center",
                  }}
                >
                  Ma Position
                </Text>
              )}
            </TouchableOpacity>
            <Text
              style={{
                color: "red",
                paddingHorizontal: 10,
                alignSelf: "center",
              }}
            >
              donnée de test :
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
