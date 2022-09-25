import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackPrams';

type countryScreenProp = StackNavigationProp<RootStackParamList, 'CountryScreen'>;

const CountryScreen = ({route}: any) => {
    const { params } = route;
    const navigation = useNavigation<countryScreenProp>();
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(false)
    const [countryFlag, setCountryFlag] = useState(null);
    const [capital, setCapital] = useState('');
    const [population, setPopulation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
      fetch(`https://restcountries.com/v3.1/name/${params.text}`)
        .then(results => results.json())
        .then(data => {
          if(data && data[0]) {
            const {flags, capital, population, capitalInfo } = data[0]
            setCountryFlag(flags.png)
            setCapital(capital)
            setPopulation(population)
            setLatitude(capitalInfo.latlng[0])
            setLongitude(capitalInfo.latlng[1])
          } else {
            setStatus(true)
          }
          setLoading(true)
        });
    }, []);

    return (
      <SafeAreaView style={styles.flex}>
        {!loading ? (
          <View style={[styles.flex, styles.justifyContent, styles.alignItems]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : status ? (
          <View style={[styles.alignItems, styles.justifyContent]}>
            <Text style={{ fontSize: 16 }}>Country not available</Text>
          </View> 
        ) : (
          <View style={styles.flex}> 
            <View style={[styles.flex, styles.alignItems]}>
              <Text style={styles.title}>Country Details</Text>
              {countryFlag && (
                <Image
                  source={{uri: countryFlag }}
                  style={styles.image}
                />
              )}
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailText}>Capital  :   {capital}</Text>
              <Text style={styles.detailText}>Country's Population  :   {population}</Text>
              <Text style={styles.detailText}>Latitude  :   {latitude} deg</Text>
              <Text style={styles.detailText}>Longitude  :   {longitude} deg</Text>
            </View>
            <View style={[styles.alignItems, styles.bottomContainer]}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={()=>{
                  navigation.navigate('WeatherScreen', {capital})
                }}
              >
                <Text style={styles.buttonText}>Capital Weather</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    justifyContent: {
      justifyContent: 'center',
    },
    alignItems: { 
      alignItems: 'center' 
    },
    title: {
      marginVertical: 15,
      color: '#000', 
      fontSize: 24,
    },
    image: {
      width: Dimensions.get('window').width/2 + 70, 
      height: Dimensions.get('window').height/4 + 20,
      marginVertical: 15,
    },
    detailContainer: {
      paddingHorizontal: 20, 
      marginHorizontal: 20, 
      marginTop: 70,
    },
    detailText: {
      marginVertical: 10,
      color: '#000', 
      fontSize: 16,
    },
    bottomContainer:{
      marginVertical: 50, 
    },
    buttonContainer: {
      borderRadius: 5,
      paddingHorizontal: 80,
      paddingVertical: 10,
      backgroundColor: '#6200ee',
    },
    buttonText: {
      fontSize: 18, 
      color: "#FFF",
    },
  });

  export default CountryScreen;