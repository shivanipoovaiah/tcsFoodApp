import { StyleSheet } from "react-native";
import {  theme } from "../../../App.style";

export const headerStyle = StyleSheet.create({
    content: {
        backgroundColor: theme.colors.primary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        fontSize: 14
    },
    icon: {
        color: theme.colors.primary
    }, 
    menu: {
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 200,
    }
})