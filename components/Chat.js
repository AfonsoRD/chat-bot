import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;
  //console.log('backgroundColor', color);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    //set the background color imported from Start.js as a object
    <View style={[styles.container, color]}>
      <Text>Hello!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default Chat;
