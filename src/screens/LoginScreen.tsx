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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    console.log(`Email: ${email}, Contraseña: ${password}`);
    navigation.navigate('Readings')
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen')
  };

  const handleForgot = () => {
    navigation.navigate('ResetPasswordScreen')
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../img/sersi_logo.png')}
        style={styles.imagen}
      />

      <Text style={styles.titulo}>Iniciar Sesión</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.subTitulo}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Introduzca su correo electrónico"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.subTitulo}>Contraseña</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Introduzca su contraseña"
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

      <TouchableOpacity style={styles.botton} onPress={handleLogin}>
        <Text style={styles.bottonText}>Entrar</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={handleForgot}>
        <Text style={{color: 'gray', bottom: 10, top: 1, fontWeight: 'bold'}}>
          Forgot Password?
        </Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpTexto}>Sign Up</Text>
      </TouchableOpacity> */}
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
    width: 250,
    height: 75,
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
    color: 'black',
  },
  inputContainer: {
    alignSelf: 'flex-start',
    left: 60,
    top: -60,
    marginBottom: 45,
    width: '85%',
  },
  subTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Asap',
    color: '#DF2828',
  },
  botton: {
    width: '65%',
    height: 50,
    borderRadius: 8,
    top: -50,
    backgroundColor: '#DF2828',
  },
  bottonText: {
    fontSize: 20,
    top: 10,
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
    top: 5,
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
