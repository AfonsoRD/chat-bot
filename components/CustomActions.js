import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userID
}) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel'
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    //console.log('uniqueRefString is ', uniqueRefString); || WORKING
    //console.log('newUploadRef is ', newUploadRef); || WORKING
    //console.log('response is ', response); || WORKING
    //console.log('blob is ', blob); || WORKING
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      console.log('imageURL is ', snapshot.ref);
      const imageURL = await getDownloadURL(snapshot.ref);

      onSend({ image: imageURL });
    });
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
          }
        });
      } else Alert.alert('Error occurred while fetching location');
    } else Alert.alert("Permissions haven't been granted.");
  };

  const generateReference = (uri) => {
    // this will get the file name from the uri
    const imageName = uri.split('/')[uri.split('/').length - 1];
    const timeStamp = new Date().getTime();
    // console.log('namme choosen ', timeStamp, imageName, userID); WORKING
    return `${userID}-${timeStamp}-${imageName}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomActions;

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 30,
    marginLeft: 12,
    marginBottom: 10
  },
  wrapper: {
    backgroundColor: '#0096FF',
    borderRadius: 13,
    borderColor: '#0096FF',
    borderWidth: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 30
  },
  iconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
});
