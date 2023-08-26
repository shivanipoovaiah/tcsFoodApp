import { StyleSheet } from "react-native";
import {  theme } from "../../../App.style";

export const boxStyle = StyleSheet.create({
  box: {
    flex: 3,
    padding: 3,
    flexDirection: "row",
    borderColor:"darkgray",
  borderWidth: 1,
  borderRadius: 15,
  },
  itemText: {
    fontFamily: "Cochin",
    fontSize: 15,
  },
})