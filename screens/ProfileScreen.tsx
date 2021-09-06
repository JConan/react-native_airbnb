import React, { useEffect } from "react";
import { Button, ScrollView, Text } from "react-native";
import { update } from "../api/User";
import { BaseView } from "../components/BaseView";
import { useUserSession } from "../tools/CustomHooks";

export const ProfileScreen = () => {
  const { userInfo, store, logout } = useUserSession();

  useEffect(() => {
    console.log("hello");
    console.log(userInfo);
  }, []);

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
      <ScrollView>
        <Text>{JSON.stringify(userInfo)}</Text>

        <Button title="update" onPress={doUpdate} />
        <Button title="logout" onPress={logout} />
      </ScrollView>
    </BaseView>
  );
};
