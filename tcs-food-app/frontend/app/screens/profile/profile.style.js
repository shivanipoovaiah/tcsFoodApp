import { StyleSheet } from "react-native";
import { black } from "react-native-paper/lib/typescript/styles/colors";
import {  theme } from "../../../App.style";

export const profileStyle = StyleSheet.create({
    view: {
        display: 'flex',
        flex: 1,
        paddingBottom: 30,
        padding:45,
        color: theme.colors.secondary,
        backgroundColor: theme.colors.primary,
        borderTopWidth: 1,
        borderTopColor: theme.colors.secondary,
    },
    profileTitle: {
        fontWeight: "400",
        fontSize: 22,
        marginTop: 21,
        fontFamily: 'Roboto',
        lineHeight: 26,
        letterSpacing: 0,
        textAlign: 'center',
        color: theme.colors.secondary
    },
    label: {
        marginTop: 22,
        textAlign: 'left',
        fontSize: 20,
        color: theme.colors.secondary
    },
    inputBox: {
        marginTop: 5,
        borderRadius: 7,
        height: 40,
        width: 300
    },
    radiolabel: {
        textAlign: 'left',
        fontSize: 20,
        color: theme.colors.secondary
    },
    updateBtn: {
        marginTop: 32,
        maxHeight: 53,
        maxWidth: 300,
        width: 300,
        backgroundColor: theme.colors.tertiary,
    },
    updateBtnText: {
        marginTop: 32,
        fontSize: 20,
        color: theme.colors.secondary
    },
    form: {
    },
    list: {
        backgroundColor: theme.colors.secondary,
        color: 'black',
        fontSize: 16
    },
    errors: {
        color: 'red',
    },
    icon: {
        color: theme.colors.primary,
    },
    dob: {
        fontSize: 18,
        marginTop: 15,
        borderRadius: 7,
        padding: 10,
        backgroundColor: theme.colors.secondary
    },
})