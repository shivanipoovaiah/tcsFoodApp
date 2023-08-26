import { StyleSheet } from "react-native";
import {  theme } from "../../../App.style";

export const registerStyle = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: theme.colors.primary,
        paddingBottom: 30
    },
    view: {
        width: '90%',
        padding: 5,
        margin: 15,
        marginTop: 0,
    },
    scrollView: {
      marginHorizontal: 10,
    },
    form: {
        marginLeft: 0
    },
    errors: {
        color: 'red',
    },
    icon: {
        color: theme.colors.primary,
    }
})