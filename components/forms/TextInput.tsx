import React from "react";
import {
  View,
  TextInput as RNTextInput,
  ViewStyle,
  TextStyle,
} from "react-native";

interface TextInputProp {
  onChangeText?: ((text: string) => void) | undefined;
  value?: string | undefined;
  placeholder?: string | undefined;
  secureTextEntry?: boolean | undefined;
  withViewStyle?: ViewStyle;
  withTextStyle?: TextStyle;
}

export const TextInput = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  withViewStyle,
  withTextStyle,
}: TextInputProp) => (
  <View
    style={{
      marginBottom: 40,
      paddingBottom: 8,
      borderBottomColor: "red",
      borderBottomWidth: 1,
      ...withViewStyle,
    }}
  >
    <RNTextInput
      autoCapitalize="none"
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={{ fontSize: 18, ...withTextStyle }}
      onChangeText={onChangeText}
      value={value}
    />
  </View>
);
