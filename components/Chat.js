import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';

//import libary to handle the chat
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ db, route, navigation }) => {
  const { userID, name, color } = route.params;
  //console.log('backgroundColor', color);

  //A chat app needs to send, receive, and display messages, so add messages to state initialization
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name });

    const q = query(collection(db, 'messages'), where('uid', '==', userID));
    const unsubMessage = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(newMessages);
    });

    // Clean up code
    return () => {
      // code to execute when the component will be unmounted
      if (unsubMessage) unsubMessage();
    };
  }, []);

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          },
          left: {
            backgroundColor: '#FFF'
          }
        }}
      />
    );
  };

  return (
    //set the background color imported from Start.js as a object
    <View style={[styles.container, color]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          uid: userID,
          name: name
        }}
      />
      {/* fix keyboard bug android */}
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior='height' />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});

export default Chat;
