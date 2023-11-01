import { StackScreenProps } from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props extends StackScreenProps<any, any> { };

export const LoginScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    console.log(`Usuario: ${username}, Contraseña: ${password}`);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen')
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../img/gaspasa_logo.png')}
        style={styles.imagen}
      />

      <Text style={styles.titulo}>Sign In</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.subTitulo}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Your Username"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.subTitulo}>Password</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder=" Your Password"
            secureTextEntry
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="gray"
              style={{ top: 5 , left:10}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.botton}>
        <Text style={styles.bottonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={{color: 'gray', bottom: 10, top: 1, fontWeight: 'bold'}}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpTexto}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagen: {
    width: 130,
    height: 130,
    top: -120,
    resizeMode: 'stretch',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'QuickSand',
    marginBottom: 16,
    top: -90,
    alignSelf: 'flex-start',
    left: 60,
    color: '#3d8af7',
  },
  inputContainer: {
    alignSelf: 'flex-start',
    left: 60,
    top: -50,
    marginBottom: 20,
    width: '85%',
  },
  subTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Asap',
    color: '#ff6624',
  },
  botton: {
    width: '65%',
    height: 40,
    borderRadius: 8,
    top: -25,
    backgroundColor: '#3d8af7',
  },
  bottonText: {
    fontSize: 17,
    top: 7,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    width: '78%',
    borderBottomColor: 'black',
    borderColor: 'gray',
  },
  signUpTexto: {
    fontSize: 15,
    fontFamily: 'Asap',
    alignSelf: 'flex-end',
    top: 70,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#ff6624',
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
