import React from "react";
import { Button, ScrollView, Text } from "react-native";
import { BaseView } from "../components/BaseView";
import { useUserSession } from "../tools/customHooks";

export const ProfileScreen = () => {
  const { userInfo, logout } = useUserSession();
  return (
    <BaseView>
      <ScrollView>
        <Text>{JSON.stringify(userInfo)}</Text>
        <Button title="logout" onPress={logout} />
      </ScrollView>
    </BaseView>
  );
};
