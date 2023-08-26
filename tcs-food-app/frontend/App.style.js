
import { DefaultTheme, DarkTheme } from "react-native-paper"

export const theme = {
    ...DarkTheme,
    roundness: 2,
    version: 3,
    colors: {
        ...DefaultTheme.colors,
        primary: '#00B65E',
        secondary: '#FFFFFF',
        tertiary: '#01974F'
    },
    buttons: {
        primary: {
            color: '#000000',
            backgroundColor: '#01974F'
        },
        secondary: {
            backgroundColor: '#01974F',
            color: '#000000'
        },
        tertiary: {
            backgroundColor: '#bebab3',
        }
    }
}