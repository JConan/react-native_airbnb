import React from "react";
import { Button, ScrollView, Text } from "react-native";
import { UserInfo } from "../../../api/UserSchema";
import { BaseView } from "../../../components/BaseView";

export interface ProfileScreenProp {
  user: { userInfo: UserInfo; logout: () => Promise<void> };
}

export const ProfileScreen = ({
  user: { userInfo, logout },
}: ProfileScreenProp) => {
  return (
    <BaseView>
      <ScrollView>
        <Text>{JSON.stringify(userInfo)}</Text>
        <Button title="logout" onPress={logout} />
      </ScrollView>
    </BaseView>
  );
};
