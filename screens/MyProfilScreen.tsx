import React from "react";
import { Button, ScrollView, Text } from "react-native";
import { UserInfo } from "../api/UserSchema";
import { AirbnbBaseView } from "../components/AirbnbBaseView";
import { BaseView } from "../components/BaseView";

interface MyProfilScreenProp {
  user: { userInfo: UserInfo; logout: () => Promise<void> };
}

export const MyProfilScreen = ({
  user: { userInfo, logout },
}: MyProfilScreenProp) => {
  return (
    <BaseView showLogo={true}>
      <ScrollView>
        <Text>{JSON.stringify(userInfo)}</Text>
        <Button title="logout" onPress={logout} />
      </ScrollView>
    </BaseView>
  );
};
