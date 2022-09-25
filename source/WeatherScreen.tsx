import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, SafeAreaView, Image, ActivityIndicator, StyleSheet } from 'react-native';

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
    <SafeAreaView style={styles.flex}>
      {!loading ? (
        <View style={[styles.flex, styles.container]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.flex}>
          <View style={[styles.flex, styles.imageContainer]}>
            <Text style={styles.title}>Weather Details</Text>
            {image && (
              <Image
                source={{uri: image }}
                style={styles.image}
              />
            )}
          </View>
          <View style={[styles.flex, styles.detailContainer]}>
            <Text style={styles.detailText}>Temperature  :  {temperature} C</Text>
            <Text style={styles.detailText}>Precipitation  :  {precipitation} %</Text>
            <Text style={styles.detailText}>Wind Speed   :  {windSpeed} kmph</Text>
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
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
  },
  imageContainer: { 
    alignItems: 'center',
  },
  title: {
    marginVertical: 15, 
    color: '#000', 
    fontSize: 24,
  },
  image: {
    width: Dimensions.get('window').width/3, 
    height: Dimensions.get('window').height/6,
    marginVertical: 30,
  },
  detailContainer: {
    paddingHorizontal: 20,
    marginHorizontal: 20
  },
  detailText: {
    marginVertical: 12, 
    color: '#000', 
    fontSize: 18,
  },
});

export default WeatherScreen;