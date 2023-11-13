import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation-locker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
    //Hacer que la pantalle no se pueda utilizar en horizontal
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
    Orientation.unlockAllOrientations();
    };
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handleLogin = () => {
    console.log(`Email: ${email}, Contraseña: ${password}`);

    if (email === '' || password === '') {
      Alert.alert('Por favor, introduzca su correo electrónico y contraseña');
      return;
    }

    navigation.navigate('Readings');
  };

  // const handleForgot = () => {
  //   navigation.navigate('ResetPasswordScreen')
  // };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../img/sersi_logo.png')}
        style={styles.imagen}
      />

      <Text style={styles.titulo}>Iniciar Sesión</Text>

      {/* Inputs correo y contraseña */}
      <View style={styles.inputContainer}>
        <Text style={styles.subTitulo}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Introduzca su correo electrónico"
          placeholderTextColor={'gray'}
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
            placeholderTextColor={'gray'}
            secureTextEntry={isPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-slash'}
              size={30}
              color="gray"
              style={{top: 5, left: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Boton de entrar */}
      <TouchableOpacity style={styles.botton} onPress={handleLogin}>
        <Text style={styles.bottonText}>Entrar</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={handleForgot}>
        <Text style={{color: 'gray', bottom: 10, top: 1, fontWeight: 'bold'}}>
          Forgot Password?
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    top: hp('5%'),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagen: {
    width: wp('60%'),
    height: hp('10%'),
    top: hp('-15%'),
    resizeMode: 'stretch',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'QuickSand',
    marginBottom: 16,
    top: hp('-8%'),
    alignSelf: 'flex-start',
    left: 40,
    color: 'black',
  },
  inputContainer: {
    alignSelf: 'flex-start',
    left: wp('10%'),
    top: hp('-5%'),
    marginBottom: 45,
    width: '95%',
  },
  subTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Asap',
    color: '#DF2828',
  },
  botton: {
    width: '65%',
    height: 55,
    borderRadius: 8,
    top: hp('-5%'),
    backgroundColor: '#DF2828',
  },
  bottonText: {
    fontSize: 20,
    top: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
  input: {
    fontSize: 17,
    height: 50,
    borderBottomWidth: 1,
    width: '78%',
    borderBottomColor: 'black',
    borderColor: 'gray',
    top: 5,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
  },
});
