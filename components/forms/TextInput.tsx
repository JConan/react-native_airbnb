import React from "react";
import {
  View,
  TextInput as RNTextInput,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";

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
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
    />
  </View>
);
