import { StyleSheet } from "react-native";

const FormScreensStyle = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
    },
    title: {
      fontSize: 30,
      color: '#F21D1D',
      textAlign: 'center',
    },
    smallButtonText: {
        fontSize: 20,
        color: "#FFF",
    },
});

export default FormScreensStyle;