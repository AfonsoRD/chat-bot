import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

//creat a background color as an object
const backgroundColors = {
  black: { backgroundColor: '#090C08' },
  purple: { backgroundColor: '#474056' },
  green: { backgroundColor: '#8A95A5' },
  grey: { backgroundColor: '#B9C6AE' }
};

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  //set the color in different useState
  const [color, setColor] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={[styles.container, styles.image]}
      >
        <Text style={styles.appTitle}>Chat App</Text>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.nameBox}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
          />

          <View>
            <Text style={styles.colorSelector}>Choose your Background:</Text>
            <View style={styles.colorWrapper}>
              <TouchableOpacity
                style={[styles.color, backgroundColors.black]}
                value={color}
                onPress={() => setColor(backgroundColors.black)}
              />

              <TouchableOpacity
                style={[styles.color, backgroundColors.purple]}
                value={color}
                onPress={() => setColor(backgroundColors.purple)}
              />

              <TouchableOpacity
                style={[styles.color, backgroundColors.grey]}
                value={color}
                onPress={() => setColor(backgroundColors.grey)}
              />

              <TouchableOpacity
                style={[styles.color, backgroundColors.green]}
                value={color}
                onPress={() => setColor(backgroundColors.green)}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.nameBox, styles.chatButton]}
            // title='Go to Chat'
            //method to export name, and color
            onPress={() =>
              navigation.navigate('Chat', {
                name: name,
                color: color
              })
            }
          >
            <Text style={[styles.colorSelector, styles.chatButtonText]}>
              Start Chatting
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  appTitle: {
    color: '#fff',
    fontSize: 45,
    fontWeight: '600',
    marginTop: 60
  },

  inputBox: {
    backgroundColor: '#fff',
    marginBottom: 15,
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20
  },

  nameBox: {
    height: 50,
    width: '88%',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 2,
    color: '#757083',
    opacity: 0.5,
    fontSize: 16,
    fontWeight: '300',
    paddingLeft: 10
  },

  colorSelector: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100
  },

  colorWrapper: {
    flexDirection: 'row'
  },

  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10
  },

  chatButton: {
    backgroundColor: '#757083',
    justifyContent: 'center'
  },

  chatButtonText: {
    color: '#fff',
    fontWeight: '300'
  }
});

export default Start;
