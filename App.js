// import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//Initialize Firebase and Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
