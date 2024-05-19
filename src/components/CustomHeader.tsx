import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '.././theme/Colors';
import ProfileIcon from '../assets/svg/profile.svg';
const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/header.png')} style={styles.logo} />
      <View style={styles.headerRightSection}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
      <ProfileIcon width={40} height={40} fill={Colors.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginTop: 20,
    height: 40,
  },
  headerRightSection: {flexDirection: 'row'},
  logo: {
    width: 81,
    height: 40,
  },
  button: {
    width: 90,
    height: 40,
    marginLeft: 90,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    alignSelf: 'center',
    color: Colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
});

export default CustomHeader;
