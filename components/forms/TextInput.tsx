import React from "react";
import {
  View,
  TextInput as RNTextInput,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useState } from "react";

interface TextInputProp {
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  value?: string | undefined;
  placeholder?: string | undefined;
  secureTextEntry?: boolean | undefined;
  withViewStyle?: ViewStyle;
  withTextStyle?: TextStyle;
}

export const TextInput = ({
  onBlur,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  withViewStyle,
  withTextStyle,
}: TextInputProp) => {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View
      style={{
        marginBottom: 40,
        paddingBottom: 8,
        borderBottomColor: "red",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        ...withViewStyle,
      }}
    >
      <RNTextInput
        autoCapitalize="none"
        placeholder={placeholder}
        secureTextEntry={hidden}
        style={{ flex: 1, fontSize: 18, ...withTextStyle }}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
      {secureTextEntry !== undefined && (
        <Octicons
          name={hidden ? "eye-closed" : "eye"}
          style={{ flex: 0.1 }}
          size={24}
          color="black"
          onPress={() => {
            console.log({ hidden });
            setHidden(!hidden);
          }}
        />
      )}
    </View>
  );
};
