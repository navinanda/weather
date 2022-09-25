import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, SafeAreaView, Image, ActivityIndicator } from 'react-native';

const WeatherScreen = ({route}: any) => {
  const { params } = route;
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null);
  const [temperature, setTemperature] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  const [windSpeed, setWindSpeed] = useState('');

  useEffect(() => {
    const API_key = '537ba86661617549e4734c20b0287150'
    fetch(`http://api.weatherstack.com/current?access_key=${API_key}&query=${params.capital}`)
      .then(results => results.json())
      .then(data => {
          const { current } = data
          setImage(current.weather_icons[0])
          setTemperature(current.temperature)
          setPrecipitation(current.precip)
          setWindSpeed(current.wind_speed)
          setLoading(true)
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{marginVertical: 15, color: '#000', fontSize: 24}}>Weather Details</Text>
            {image && (
              <Image
                source={{uri: image }}
                style={{
                  width: Dimensions.get('window').width/3, 
                  height: Dimensions.get('window').height/6,
                  marginVertical: 30,
                }}
              />
            )}
          </View>
          <View style={{ flex: 1, paddingHorizontal: 20, marginHorizontal: 20 }}>
            <Text style={{marginVertical: 12, color: '#000', fontSize: 18}}>Temperature  :  {temperature} C</Text>
            <Text style={{marginVertical: 12, color: '#000', fontSize: 18}}>Precipitation  :  {precipitation} %</Text>
            <Text style={{marginVertical: 12, color: '#000', fontSize: 18}}>Wind Speed   :  {windSpeed} kmph</Text>
          </View>
        </View>
      )}
  </SafeAreaView>
  );
}

  export default WeatherScreen;