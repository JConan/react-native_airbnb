import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { update, updatePicture } from "../api/User";
import { BaseView } from "../components/BaseView";
import { useUserSession } from "../tools/CustomHooks";
import { Ionicons } from "@expo/vector-icons";
import { ControlledTextInput } from "../components/forms/ControlledTextInput";
import { useForm } from "react-hook-form";
import { Form } from "../components/forms/Form";
import {
  getMediaLibraryPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
} from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

export const ProfileScreen = () => {
  const { userInfo, store, logout } = useUserSession();

  console.log(userInfo);

  useEffect(() => {
    getMediaLibraryPermissionsAsync()
      .then(async (permission) => {
        if (!permission.granted) await requestMediaLibraryPermissionsAsync();
        const result = await launchImageLibraryAsync();
        if (!result.cancelled) {
          return result as ImageInfo;
        }
      })
      .then((imageInfo) => {
        return imageInfo && updatePicture(userInfo!.token!, imageInfo.uri);
      })
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: zodResolver(UserSignInFormSchema),
  });

  const doUpdate = () => {
    const { email, username, token } = userInfo!;
    update(token!, {
      email,
      username,
      description: "Possédé par la soif d’apprendre",
    })
      .then((updated) => {
        store({ ...userInfo, ...updated });
        console.log(updated);
      })
      .catch(console.error);
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
              {userInfo?.photo?.url ? (
                <Image
                  style={{
                    height: 90,
                    width: 90,
                  }}
                  source={{ uri: userInfo.photo.url }}
                />
              ) : (
                <Ionicons name="md-person" size={64} color="#E7E7E7" />
              )}
            </View>
          </View>
          <View style={{ margin: 10, justifyContent: "space-around" }}>
            <Ionicons name="images-sharp" size={24} color="gray" />
            <Ionicons name="camera-sharp" size={24} color="gray" />
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
