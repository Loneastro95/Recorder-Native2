import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

const Signup = () => {
  return (
    <View  style={{backgroundColor: "#D9D9D9", flex: 1}}>
      <View
        style={{ backgroundColor: "#73beed", height: 198, marginBottom: 100 }}
      >
        <View style={{alignSelf: 'center', alignItems: 'center', marginTop: 70}}>
            <MaterialIcons name="mic-none" size={45} color="black" />
        </View>
        <Text style={styles.text}>Sign Up</Text>
      </View>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Email" />

        <TextInput style={styles.input} placeholder="Password" />

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>Create Account</TouchableOpacity>
      </View>
      <View style={styles.mini}>
        {/* <View style={{width: 100, height: 33, borderRadius:15 , borderWidth: 1, borderColor: 'black', marginRight: 20, display: 1, flexDirection: 'row',justifyContent: 'center',}}>
                  <Image
            style={styles.Image}
            source={require('../assets/facebook.png')}
          />
              <Text style={styles.text}>Sign in </Text>
            </View> */}
        {/* <View style={{width: 100, height: 33, borderRadius:15 , borderWidth: 1, borderColor: 'black', display: 1, flexDirection: 'row',justifyContent: 'center',}}>
                  <Image
            style={styles.Image}
            source={require('../assets/google.png')}
          />
              <Text style={styles.text}>Sign in </Text>
            </View> */}
      </View>
      <Text style={{ marginTop: 20, textAlign: "center" }}>
        {" "}
        Don't have account?{" "}
        <Text style={{ color: "#243670", fontWeight: 600 }}>SignUp</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 289,
    height: 42,
    borderRadius: 20,
    backgroundColor: "#243670",
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: 600,
    justifyContent: "center",
    marginBottom: 20,
    marginLeft: 34,
  },
  container: {
    borderRadius: 30,
  },
  input: {
    backgroundColor: "#eef0f7",
    color: "#bbbdc4",
    width: 289,
    height: 42,
    borderRadius: 20,
    fontSize: 14,

    justifyContent: "center",
    marginBottom: 20,
    marginLeft: 34,
    paddingLeft: 15,
  },
  words: {
    textAlign: "center",
    fontSize: 16,

    color: "#243670",
    marginBottom: 20,
    marginLeft: 34,
  },
  Image: {
    marginTop: 5,
    marginRight: 5,
  },

    text: {
      marginTop:5,
      textAlign: 'center',
      alignSelf: "center",
      color: "white",
      fontSize: 26,
      fontWeight: 600,
    },

  mini: {
    display: 1,
    flexDirection: "row",
    marginLeft: 76,
    marginTop: 30,
  },
});

export default Signup;
