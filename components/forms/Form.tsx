import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FormProp {
  title: string;
  validationButtonName: string;
  linkButtonName: string;
  children?: React.ReactNode;
  errorMessage?: string;
  onValidationButtonPress?:
    | ((event: GestureResponderEvent) => void)
    | undefined;
  onLinkButtonPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export const Form = ({
  title,
  validationButtonName,
  linkButtonName,
  children,
  errorMessage,
  onValidationButtonPress,
  onLinkButtonPress,
}: FormProp) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{title}</Text>

      {children}

      <View style={{ marginTop: 50 }}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableOpacity
          style={styles.validationButton}
          onPress={onValidationButtonPress}
        >
          <Text style={{ fontSize: 18 }}>{validationButtonName}</Text>
        </TouchableOpacity>
        <Text style={styles.linkButton} onPress={onLinkButtonPress}>
          {linkButtonName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 32,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 50,
  },
  validationButton: {
    marginTop: 15,
    width: 200,
    height: 60,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  errorMessage: {
    textAlign: "center",
    color: "red",
  },
  linkButton: {
    marginTop: 8,
    textAlign: "center",
    color: "grey",
    marginBottom: 50,
  },
});
