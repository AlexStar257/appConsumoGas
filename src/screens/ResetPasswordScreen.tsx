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

export const ResetPasswordScreen = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const handleResetPassword = () => {
    if (password.length < 8 || passwordConfirmation.length < 8) {
      Alert.alert("La contraseña debe tener al menos 8 caracteres");
    } else {
      console.log(`Usuario: ${username}, Contraseña: ${password}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Reset Password</Text>

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
        <Text style={styles.subTitulo}>New Password</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder=" Your New Password"
            secureTextEntry={!isPasswordVisible}
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
          <Text style={styles.subTitulo}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPasswordConfirmation}
            value={passwordConfirmation}
            placeholder="Repeat New Password"
            secureTextEntry={!isPasswordVisible}
          />
        </View>

      <TouchableOpacity onPress={handleResetPassword} style={styles.botton}>
        <Text style={styles.bottonText}>Reset Password</Text>
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
   input:{
     height :40 ,
     borderBottomWidth :1 ,
     width:'78%',
     borderBottomColor:'black', 
     borderColor:'gray'
   },
   row:{
    flexDirection:'row', 
    // alignItems:'center', 
    // justifyContent:'center', 
  },
});
