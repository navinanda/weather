import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, SafeAreaView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackPrams';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen = () => {
    const navigation = useNavigation<homeScreenProp>();

    const [text, onChangeText] = useState("");
    
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={text=> onChangeText(text)}
            value={text}
            placeholder="Enter Country"
          />
          {(text && text !== '') && (
            <View style={styles.absoluteView}>
              <Text style={styles.inputText}>Enter Country</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: text && text !== '' ? '#6200ee' : '#d5d5d5' }
          ]}
          onPress={()=>{
            text && text !== '' ?
            navigation.navigate('CountryScreen', {text}) :
            Alert.alert('Please enter country')
          }}
        >
          <Text style={[styles.buttonText,{ color: text && text !== '' ? "#FFF" : '#9da2a5' }]}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f2f2f2', 
    },
    input: {
      height: 55,
      width: Dimensions.get('window').width - 100,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 15,
      backgroundColor: '#f6f6f6',
      borderColor: '#c9c9c9',
      fontSize: 18,
    },
    absoluteView: {
      position: 'absolute',
      top: -10,
      backgroundColor: '#f6f6f6',
      left: 10,
      paddingHorizontal: 5,
    },
    inputText: {
      fontSize: 14, 
      color: '#9698a8',
    },
    button: {
      borderRadius: 5,
      marginTop: 50,
      paddingHorizontal: 50,
      paddingVertical: 12,
      backgroundColor: '#d5d5d5',
    },
    buttonText: {
      fontSize: 18,
      color: '#9da2a5',
    },
  });

  export default HomeScreen;
