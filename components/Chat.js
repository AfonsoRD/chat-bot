import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

//import libary to handle the chat
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;
  //console.log('backgroundColor', color);

  //A chat app needs to send, receive, and display messages, so add messages to state initialization
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name });

    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      }
    ]);
  }, []);

  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    //set the background color imported from Start.js as a object
    <View style={[styles.container, color]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1
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
