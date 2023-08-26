import { StyleSheet } from "react-native"
import { white } from "react-native-paper/lib/typescript/styles/colors";
import {  theme } from "../../../App.style";

export const loginStyle = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
        paddingTop: 60,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: theme.colors.primary
    },
    view: {
        width: '75%'
    },
    appTitle1: {
        fontWeight: "400",
        fontSize: 32,
        paddingTop: 20,
        fontFamily: 'Roberto',
        lineHeight: 26,
        textAlign: 'center',
        color: theme.colors.secondary
    },
    appTitle2: {
        color: '#01522B'
    },
    loginTitle: {
        fontWeight: "400",
        fontSize: 22,
        marginTop: 21,
        fontFamily: 'Roboto',
        lineHeight: 26,
        letterSpacing: 0,
        textAlign: 'center',
        color: theme.colors.secondary
    },
    tcsLogo: {
        height: 40,
        padding: 2,
        width: 150,
        alignSelf: 'center',
        marginTop: 40,
    },
    appLogo: {
        alignSelf: 'center',
        marginTop: 15,
    },
    emailLabel: {
        marginTop: 22,
        textAlign: 'left',
        fontSize: 16,
        color: theme.colors.secondary

    },
    passwordLabel: {
        marginTop: 50,
        textAlign: 'left',
        fontSize: 16,
        color: theme.colors.secondary

    },
    errors: {
        color: '#FF1C1C',
        backgroundColor: theme.colors.secondary,
        marginTop: 7,
        width: 300,
        padding: 5
    },
    inputBox: {
        marginTop: 5,
        height: 40,
        width: 300
    },
    forgotBtn: {
        marginTop: 12,
        fontWeight: "400",
        fontSize: 16,
        textDecorationLine: "underline",
        color: theme.colors.secondary
    },
    loginBtn: {
        marginTop: 32,
        maxHeight: 53,
        maxWidth: 300,
        width: 300,
        backgroundColor: theme.colors.tertiary,
    },
    loginBtnText: {
        marginTop: 32,
        fontSize: 20,
        color: theme.colors.secondary
    },
    registerBtn: {
        marginTop: 32,
        fontWeight: "700",
        fontSize: 16,
        alignItems: 'center',
        alignSelf: 'center',
        color: theme.colors.secondary
    },
    vector3: {
        height: 227,
        width: 617,
        left: -179,
        top: 644,
        borderRadius: 0
    },
    vector2: {   
        height: 227,
        width: 617,
        left: -40,
        top: 647,
        borderRadius: 0
    },    
    vector1: {
        height: 162,
        width: 439,
        left: -25,
        top: 697,
        borderRadius: 0
    },
    icon: {
        color: theme.colors.primary,
    }
})