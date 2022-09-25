import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView, Image, Alert, ActivityIndicator } from 'react-native';
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
      <SafeAreaView style={{ flex: 1 }}>
        {!loading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : status ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16 }}>Country not available</Text>
          </View> 
        ) : (
          <View style={{ flex: 1 }}> 
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{marginVertical: 15, color: '#000', fontSize: 24}}>Country Details</Text>
              {countryFlag && (
                <Image
                  source={{uri: countryFlag }}
                  style={{
                    width: Dimensions.get('window').width/2 + 70, 
                    height: Dimensions.get('window').height/4 + 20,
                    marginVertical: 15,
                  }}
                />
              )}
            </View>
            <View style={{ paddingHorizontal: 20, marginHorizontal: 20, marginTop: 70 }}>
              <Text style={{marginVertical: 10, color: '#000', fontSize: 16}}>Capital  :   {capital}</Text>
              <Text style={{marginVertical: 10, color: '#000', fontSize: 16}}>Country's Population  :   {population}</Text>
              <Text style={{marginVertical: 10, color: '#000', fontSize: 16}}>Latitude  :   {latitude} deg</Text>
              <Text style={{marginVertical: 10, color: '#000', fontSize: 16}}>Longitude  :   {longitude} deg</Text>
            </View>
            <View style={{ alignItems: 'center', marginVertical: 50 }}>
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  paddingHorizontal: 80,
                  paddingVertical: 10,
                  backgroundColor: '#6200ee',
                }}
                onPress={()=>{
                  navigation.navigate('WeatherScreen', {capital})
                }}
              >
                <Text style={{ fontSize: 18, color: "#FFF" }}>Capital Weather</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
      </SafeAreaView>
    );
  }

  export default CountryScreen;