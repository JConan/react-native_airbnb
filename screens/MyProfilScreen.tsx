import React from "react";
import { Button, ScrollView, Text } from "react-native";
import { UserInfo } from "../api/UserSchema";
import { BaseView } from "../components/BaseView";

interface MyProfilScreenProp {
  user: { userInfo: UserInfo; logout: () => Promise<void> };
}

export const MyProfilScreen = ({
  user: { userInfo, logout },
}: MyProfilScreenProp) => {
  return (
    <BaseView>
      <ScrollView>
        <Text>{JSON.stringify(userInfo)}</Text>
        <Button title="logout" onPress={logout} />
      </ScrollView>
    </BaseView>
  );
};
