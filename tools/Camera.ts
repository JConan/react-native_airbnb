import {
  getMediaLibraryPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaLibraryPermissionResponse,
} from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

export const requestImageFromUser = () =>
  Promise.all([
    getMediaLibraryPermissionsAsync(),
    requestMediaLibraryPermissionsAsync(),
  ]);

getMediaLibraryPermissionsAsync().then(async (permission) => {
  if (!permission.granted) await requestMediaLibraryPermissionsAsync();
  const result = await launchImageLibraryAsync();
  if (!result.cancelled) {
    return result as ImageInfo;
  }
});
