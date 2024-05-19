import {StyleSheet} from 'react-native';
import Colors from './src/theme/Colors';

export const styles = StyleSheet.create({
  tabBarIconContainer: {
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text,
  },
  plusIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 2,
    backgroundColor: Colors.white,
  },
  plusIconWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderWidth: 3,
    borderTopColor: Colors.green,
    borderRightColor: Colors.yellow,
    borderBottomColor: Colors.orange,
    borderLeftColor: Colors.red,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  starIconContainer: {
    alignItems: 'center',
  },
  tabBarLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text,
  },
});
