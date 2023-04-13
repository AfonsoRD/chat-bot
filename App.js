// import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//Initialize Firebase and Firestore
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork
} from 'firebase/firestore';

//track device internet status
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

//import responsable for storing the images in the db
import { getStorage } from 'firebase/storage';

const App = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBhlzxFSzjZNezXjS7N84oY-kKqwzUucYg',
    authDomain: 'chat-app-7425d.firebaseapp.com',
    projectId: 'chat-app-7425d',
    storageBucket: 'chat-app-7425d.appspot.com',
    messagingSenderId: '549083458232',
    appId: '1:549083458232:web:4f5aed67707d356e97624d'
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  // Initialize the storage
  const storage = getStorage(app);

  //useNetInfo() to define a new state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  //that will display an alert popup if connection is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      Alert.alert('Connection Restablished!');
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen
          name='Start'
          component={Start}
        />

        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
