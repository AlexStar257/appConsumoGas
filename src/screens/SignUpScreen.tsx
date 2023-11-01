import { StackScreenProps } from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props extends StackScreenProps<any, any> { };

export const SignUpScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const handleSignUp = () => {
    if (password.length < 8 || passwordConfirmation.length < 8) {
      Alert.alert("La contraseña debe tener al menos 8 caracteres");
    } else {
      console.log(`Usuario: ${username}, Contraseña: ${password}`);
    }
  };

  const handleSignIn = () => {
    navigation.navigate('LoginScreen')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sign Up</Text>

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
              style={{top: 5, left: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>

        <View style={styles.inputContainer}>
          <Text style={styles.subTitulo}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPasswordConfirmation}
            value={passwordConfirmation}
            placeholder="Repeat password"
            secureTextEntry
          />
        </View>

      <TouchableOpacity onPress={handleSignUp} style={styles.botton}>
        <Text style={styles.bottonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignIn}>
        <View style={styles.rowIcon}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'Asap',
              top: -5,
              fontWeight: 'bold',
              color: 'gray',
            }}>
            Have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignIn}>
        <Text style={styles.signUpTexto}>Sign In</Text>
      </TouchableOpacity>
        </View>
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
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'QuickSand',
    marginBottom: 16,
    top: -110,
    alignSelf: 'flex-start',
    left: 60,
    color: '#3d8af7',
  },
  inputContainer: {
    alignSelf: 'flex-start',
    left: 60,
    top: -70,
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
    top: -45,
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
    width:'78%',
     borderBottomColor:'black', 
     borderColor:'gray'
   },
   signUpTexto:{
     fontSize :15 ,
     fontFamily:'Asap', 
     top:-5, 
     fontWeight:'bold', 
     textDecorationLine:'underline', 
     color:'#ff6624'
   },
   row:{
     flexDirection:'row', 
     alignItems:'center', 
     justifyContent:'center', 
     left:-30
   },
   rowIcon:{
     flexDirection:'row', 
     // alignItems:'center', 
     // justifyContent:'center', 
   },
});
