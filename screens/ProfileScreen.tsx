import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { update, updatePicture } from "../api/User";
import { BaseView } from "../components/BaseView";
import { Ionicons } from "@expo/vector-icons";
import { ControlledTextInput } from "../components/forms/ControlledTextInput";
import { useForm } from "react-hook-form";
import { Form } from "../components/forms/Form";
import {
  getMediaLibraryPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  getCameraPermissionsAsync,
  requestCameraPermissionsAsync,
  launchCameraAsync,
} from "expo-image-picker";
import { useUserInfo } from "../tools/customHooks/useUserInfo";
import { UserInfo, UserUpdateForm } from "../api/UserSchema";

export const ProfileScreen = () => {
  const { userInfo, setUserInfo, logout } = useUserInfo()!;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const doUpdate = async (formData: UserUpdateForm) => {
    const { email, username, description, token, photo } = userInfo!;
    console.log({ email, username, description, token, photo });

    let newUserInfo: UserInfo = { ...userInfo! };

    if (
      email !== formData.email ||
      username !== formData.username ||
      description !== formData.description
    ) {
      newUserInfo = await update(token!, formData);
    }

    if (photo && !Array.isArray(photo) && photo.picture_id === "newPicture") {
      const response = await updatePicture(token!, photo.url).catch(
        console.error
      );
      if (response && response.photo)
        newUserInfo = { ...newUserInfo, photo: response.photo };
    }

    if (newUserInfo) {
      setUserInfo({ ...newUserInfo, token });
    }
  };

  const { photo } = userInfo || {};
  const photoUrl = Array.isArray(photo)
    ? photo[0].url
    : (photo as { url: string | undefined }).url;

  const pickImage = async () => {
    const granted =
      (await getMediaLibraryPermissionsAsync().then(
        ({ granted }) => granted
      )) ||
      (await requestMediaLibraryPermissionsAsync().then(
        ({ granted }) => granted
      ));

    if (granted) {
      const imageSelection = await launchImageLibraryAsync();
      if (imageSelection.cancelled === false) {
        setUserInfo({
          ...userInfo!,
          photo: { picture_id: "newPicture", url: imageSelection.uri },
        });
      }
    } else {
      Alert.alert(
        "Error",
        "Désolé, mais la permission d'accès aux médias est nécessaire pour fonctionner."
      );
    }
  };
  const takeImage = async () => {
    console.log("TakeImage");
    const granted =
      (await getCameraPermissionsAsync().then(({ granted }) => granted)) ||
      (await requestCameraPermissionsAsync().then(({ granted }) => granted));

    if (granted) {
      const imageSelection = await launchCameraAsync();
      if (imageSelection.cancelled === false) {
        setUserInfo({
          ...userInfo!,
          photo: { picture_id: "newPicture", url: imageSelection.uri },
        });
      }
    } else {
      Alert.alert(
        "Error",
        "Désolé, mais la permission d'accès aux médias est nécessaire pour fonctionner."
      );
    }
  };

  return (
    <BaseView>
      <Form
        validationButtonName="Update"
        validationButtonDisabled={isSubmitting}
        onValidationButtonPress={handleSubmit(doUpdate)}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 50,
          }}
        >
          <View
            style={{
              height: 100,
              width: 100,
              borderWidth: 1,
              borderColor: "red",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 90,
                width: 90,
                borderRadius: 45,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {photoUrl ? (
                <Image
                  style={{
                    height: 90,
                    width: 90,
                  }}
                  source={{ uri: photoUrl }}
                />
              ) : (
                <Ionicons name="md-person" size={64} color="#E7E7E7" />
              )}
            </View>
          </View>
          <View style={{ margin: 10, justifyContent: "space-around" }}>
            <Ionicons
              name="images-sharp"
              size={24}
              color="gray"
              onPress={pickImage}
            />
            <Ionicons
              name="camera-sharp"
              size={24}
              color="gray"
              onPress={takeImage}
            />
          </View>
        </View>

        <ControlledTextInput
          control={control}
          name="email"
          defaultValue={userInfo?.email}
        />
        <ControlledTextInput
          control={control}
          name="username"
          defaultValue={userInfo?.username}
        />
        <ControlledTextInput
          control={control}
          defaultValue={userInfo?.description}
          name="description"
          placeholder="describe yourself in a few words..."
          multiline={true}
          numberOfLines={4}
          containerStyle={{
            borderWidth: 1,
            borderColor: "red",
            paddingHorizontal: 10,
            paddingVertical: 5,
            height: 110,
            alignItems: "flex-start",
          }}
          textStyle={{
            height: 100,
          }}
        />
        <TouchableOpacity
          style={{
            width: 200,
            height: 60,
            borderWidth: 1,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderColor: "red",
            position: "absolute",
            bottom: 100,
            zIndex: 10,
          }}
          onPress={logout}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#000",
            }}
            onPress={logout}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </Form>
    </BaseView>
  );
};
