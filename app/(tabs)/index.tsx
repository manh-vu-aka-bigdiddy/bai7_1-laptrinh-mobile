import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// ================= TYPE NAVIGATION =================

type RootStackParamList = {
  Login: undefined;
  Home: { phone: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();


// ================= LOGIN SCREEN =================

function LoginScreen({ navigation }: any) {

  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const validatePhone = () => {

    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;

    if (!phoneRegex.test(phoneNumber)) {

      Alert.alert(
        "Thông báo",
        "Số điện thoại không đúng định dạng!"
      );

    } else {

      Alert.alert(
        "Thông báo",
        "Số điện thoại hợp lệ!",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("Home", { phone: phoneNumber })
          }
        ]
      );

    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inner}
        >

          <View style={styles.topContent}>

            <View style={styles.header}>
              <Text style={styles.title}>Đăng nhập</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.subtitle}>Nhập số điện thoại</Text>

              <Text style={styles.description}>
                Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nhập số điện thoại của bạn"
                keyboardType="phone-pad"
                returnKeyType="done"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />

            </View>

          </View>

          <View style={styles.bottomContent}>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: phoneNumber.length >= 10 ? '#10b981' : '#F5F5F5' }
              ]}
              disabled={phoneNumber.length < 10}
              onPress={validatePhone}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: phoneNumber.length >= 10 ? '#fff' : '#9E9E9E' }
                ]}
              >
                Tiếp tục
              </Text>
            </TouchableOpacity>

          </View>

        </KeyboardAvoidingView>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}


// ================= HOME SCREEN =================

function HomeScreen({ route }: any) {

  const { phone } = route.params;

  return (
    <SafeAreaView style={styles.homeContainer}>

      <Text style={styles.homeTitle}>
        Trang chủ
      </Text>

      <Text style={styles.homeText}>
        Xin chào!
      </Text>

      <Text style={styles.homeText}>
        Số điện thoại: {phone}
      </Text>

    </SafeAreaView>
  );
}


// ================= MAIN APP =================

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Trang chủ" }}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}


// ================= STYLE =================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inner: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  topContent: {
    flex: 1,
  },

  header: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  content: {
    marginTop: 40,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 15,
  },

  description: {
    fontSize: 15,
    color: '#4A4A4A',
    lineHeight: 22,
    marginBottom: 30,
  },

  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#10b981',
    paddingVertical: 10,
  },

  bottomContent: {
    paddingBottom: 20,
  },

  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  homeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20
  },

  homeText: {
    fontSize: 18,
    marginBottom: 10
  }

});