import { StyleSheet } from "react-native";

export const loadingStyle = StyleSheet.create({
    backdrop: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    spinner: {
        color: 'white'
    }
})