import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface FormProp {
  title?: string;
  validationButtonName: string;
  validationButtonDisabled?: boolean | null | undefined;
  linkButtonName?: string;
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
  validationButtonDisabled,
  linkButtonName,
  children,
  errorMessage,
  onValidationButtonPress,
  onLinkButtonPress,
}: FormProp) => {
  return (
    <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
      {title !== undefined && (
        <>
          <Image
            style={{
              marginTop: 60,
              width: 130,
              height: 100,
              alignSelf: "center",
            }}
            resizeMode="contain"
            source={require("../../assets/icon.png")}
          />
          <Text style={styles.title}>{title}</Text>
        </>
      )}

      {children}

      <View style={{ marginTop: 25, position: "relative" }}>
        {validationButtonDisabled && (
          <ActivityIndicator
            style={{
              position: "absolute",
              // right: 25,
              top: -25,
              alignSelf: "center",
            }}
            size="large"
            color="red"
          />
        )}
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableOpacity
          style={{
            ...styles.validationButton,
            backgroundColor: validationButtonDisabled ? "#ededed" : "#fff",
            borderColor: validationButtonDisabled ? "#808080" : "red",
          }}
          onPress={onValidationButtonPress}
          disabled={validationButtonDisabled}
        >
          <Text
            style={{
              fontSize: 18,
              color: validationButtonDisabled ? "#808080" : "#000",
            }}
          >
            {validationButtonName}
          </Text>
        </TouchableOpacity>
        <Text style={styles.linkButton} onPress={onLinkButtonPress}>
          {linkButtonName}
        </Text>
      </View>
    </KeyboardAwareScrollView>
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
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  errorMessage: {
    textAlign: "center",
    color: "red",
    height: 18,
  },
  linkButton: {
    marginTop: 8,
    textAlign: "center",
    color: "grey",
    marginBottom: 150,
  },
});
