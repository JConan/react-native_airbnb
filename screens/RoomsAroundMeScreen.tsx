import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AroundMeNavigationProps } from "../navigations/AroundMeNavigatorStacks";
import {
  LocationObject,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationAccuracy,
  LocationPermissionResponse,
} from "expo-location";
import { LottieAnimation } from "../components/LottieAnimation";

interface Props extends AroundMeNavigationProps<"RoomsAroundMeScreen"> {}

const fakePosition = {
  latitude: 48.8564449,
  longitude: 2.4002913,
};

export const RoomsAroundMeScreen = ({}: Props) => {
  const [location, setLocation] = useState<LocationObject | undefined>();

  useEffect(() => {
    (async () => {
      requestForegroundPermissionsAsync()
        .then(
          async ({ granted, ...otherProps }: LocationPermissionResponse) => {
            console.log({ response: otherProps });

            if (!granted) {
              alert("Permission to access location was denied");
            } else {
              // alert("Permission to access location allowed");
              // const provider = await getProviderStatusAsync();
              // console.log({ provider });

              return getCurrentPositionAsync({
                accuracy: LocationAccuracy.Lowest,
              }).then((location) => setLocation(location));
            }
          }
        )
        .catch((err) => console.error(JSON.stringify(err)));
    })();
  }, []);

  const test = false;

  return test ? (
    <LottieAnimation animation="position" />
  ) : (
    <View style={{ flex: 1, position: "relative" }}>
      {(location && (
        <>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
            provider="google"
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
          >
            {location && (
              <>
                {/* <Marker
                  coordinate={{
                    ...location.coords,
                  }}
                /> */}
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      //   backgroundColor: "red",
                    }}
                  >
                    <LottieAnimation animation="position" />
                  </View>
                </Marker>
              </>
            )}
          </MapView>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              backgroundColor: "blue",
            }}
            onPress={() =>
              setLocation({
                ...location!,
                coords: { ...location.coords, ...fakePosition },
              })
            }
          >
            <Text style={{ color: "white", padding: 10 }}>Position</Text>
          </TouchableOpacity>
        </>
      )) || <LottieAnimation animation="compass" />}
    </View>
  );
};
