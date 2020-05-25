import { StyleSheet } from 'react-native';

const HomeScreenStyle = StyleSheet.create({
    backgrondImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
    },
    logo: {
      height: 185,
      width: 185,
      borderRadius: 100,
    },
    title: {
      fontSize: 30,
      color: '#FF0800',
      textAlign: 'center',
    },
  });

  export default HomeScreenStyle;