import React, { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Octicons } from "@expo/vector-icons";

interface ControlledTextInputProps {
  control: Control<FieldValues, object>;
  name: string;
  placeholder?: string | undefined;
  secureTextEntry?: boolean | undefined;
  withViewStyle?: ViewStyle;
  withTextStyle?: TextStyle;
  multiline?: boolean | undefined;
  numberOfLines?: number | undefined;
}

export const ControlledTextInput = (props: ControlledTextInputProps) => {
  const [hidden, setHidden] = useState(props.secureTextEntry);

  return (
    <Controller
      control={props.control}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.container}>
          <TextInput
            textAlignVertical="top"
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            autoCapitalize="none"
            placeholder={props.placeholder || props.name}
            secureTextEntry={hidden}
            style={{ ...styles.textInput, ...props.withTextStyle }}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
          {props.secureTextEntry !== undefined && (
            <Octicons
              name={hidden ? "eye-closed" : "eye"}
              style={styles.eyeIcon}
              size={24}
              color="black"
              onPress={() => setHidden(!hidden)}
            />
          )}
        </View>
      )}
      name={props.name}
      defaultValue=""
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    paddingBottom: 8,
    borderBottomColor: "red",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: { flex: 1, fontSize: 18 },
  eyeIcon: { flex: 0.1 },
});
