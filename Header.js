import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';

class Header extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          style={{ aspectRatio: 5 / 2, height: 170 }}
          source={{
            uri: 'https://webneel.com/wnet/file/images/11-16/8-xmen-movie-poster-design.jpg',
          }}>
          <Pressable
            style={{
              position: 'absolute',
              height: 130,
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 6,
              top: 140,
              left: 20,
              width: '82%',
            }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: 'gray' }}>Releasing in 1 days</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>X-MEN</Text>
                <Text style={{ fontSize: 16, fontWeight: '400', color: 'gray', marginTop: 4 }}>U/A • ENGLISH</Text>
              </View>

              <Pressable style={{ backgroundColor: '#ff590c', padding: 10, borderRadius: 6, marginRight: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', textAlign: 'center' }}>SOON</Text>
              </Pressable>
            </View>
            <Text style={{ marginTop: 8, fontSize: 15, fontWeight: '500' }}>Fantasy, Thriller, Action</Text>
          </Pressable>
        </ImageBackground>

        <View style={{ marginTop: 110 }} />
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({});
