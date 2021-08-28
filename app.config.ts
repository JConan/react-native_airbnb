// WARNING THIS ISN'T VERSIONED
import { ExpoConfig, ConfigContext } from "@expo/config";
import "dotenv/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "airbnb",
  slug: "airbnb",
  githubUrl: "https://github.com/JConan/react-native_airbnb",
  extra: {
    backendBasePath: process.env.BACKEND_BASEPATH,
  },
});
