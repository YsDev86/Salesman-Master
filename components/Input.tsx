import React from "react";
import { View, Text, TextInput } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
export default function Input({
  value,
  style,
  onChangeText,
  onBlur,
  secureTextEntry,
  icon,
  iconName,
  inputViewStyle,
  placeholder,
  onKeyPress,
  returnKeyType,
  onSubmitEditing,
  editable,
  placeholderTextColor,
  iconColor,
  autoCapitalize,
  autoFocus,
  keyboardType,
  multiline,
  onPressIn,
  rightText
}) {
  return (
    <View style={(icon || rightText) && inputViewStyle}>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        style={style}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        editable={editable}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        multiline={multiline}
        onPressIn={onPressIn}
      />
      {icon && <Icon name={iconName} color={iconColor} size={20} />}
      {rightText && <Text style={{ color: "#777" }}>{rightText}</Text>}
    </View>
  );
}
