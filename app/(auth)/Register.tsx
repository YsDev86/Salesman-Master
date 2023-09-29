import React, { useRef, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image } from "react-native";
// import { Link, useNavigation } from "expo-router";

import EditScreenInfo from "../../components/EditScreenInfo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { View } from "../../components/Themed";
import { hp, wp } from "../../utils";
import Text from "../../components/Text";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { tintColorDark } from "../../constants/Colors";
export default function Register(props: any) {
  const navigation: any = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const _formik = useRef();
  const validationSchema = yup.object().shape({
    name: yup.string("Required").required("Name is required"),

    email: yup
      .string("Required")
      .required("Required")
      .email("Please enter a valid email address"),
    password: yup.string("Required").required("Required"),
  });

  return (
    <View style={styles.container}>
      <View style={{ flexGrow: 1 }}>
        <View style={styles.imageView}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo1.png")}
            resizeMode="contain"
          />
        </View>

        <View style={styles.innerContainer}>
          <Text style={styles.loginFont}>Register</Text>
          <Text style={styles.detailFont}>
            Enter the details below to register your account
          </Text>

          <View>
            <Formik
              innerRef={_formik}
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              validateOnBlur={false}
              onSubmit={(values) => onLogin(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <Text style={styles.credsFont}>Name</Text>
                  <Input
                    onChangeText={(text) =>
                      handleChange("name")(text.replace(/\s/g, ""))
                    }
                    onBlur={handleBlur("name")}
                    value={values.name}
                    style={styles.inputField}
                    icon
                    iconName="account"
                    inputViewStyle={styles.inputViewStyle}
                    iconColor={"#ccc"}
                    autoCapitalize={"none"}
                    placeholder={"Enter your name"}
                  />
                  {errors.name && touched.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                  <Text style={styles.credsFont}>Email</Text>
                  <Input
                    onChangeText={(text) =>
                      handleChange("email")(text.replace(/\s/g, ""))
                    }
                    onBlur={handleBlur("email")}
                    value={values.email}
                    style={styles.inputField}
                    icon
                    iconName="email"
                    inputViewStyle={styles.inputViewStyle}
                    iconColor={"#ccc"}
                    autoCapitalize={"none"}
                    placeholder={"Enter your email address"}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <Text style={{ ...styles.credsFont, marginTop: 10 }}>
                    Password
                  </Text>
                  <Input
                    onChangeText={(text) =>
                      handleChange("password")(text.replace(/\s/g, ""))
                    }
                    onBlur={handleBlur("pasword")}
                    value={values.password}
                    style={styles.inputField}
                    secureTextEntry
                    icon
                    iconName="lock"
                    inputViewStyle={styles.inputViewStyle}
                    iconColor={"#ccc"}
                    autoCapitalize={"none"}
                    placeholder={"Enter password"}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
              )}
            </Formik>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                onPress={() => {
                  _formik.current.handleSubmit();
                }}
                isLoading={isLoading}
                disabled={isLoading}
                loaderColor={styles.loaderColor}
              >
                <Text style={styles.buttonText}>Register</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.signupView}>
        <Text>Already have an account?</Text>

        <Text style={styles.signupText} onPress={() => navigation.goBack()}>
          Sign in
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // alignItems: "center",
  //   // justifyContent: "center",
  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: "80%",
  // },

  container: {
    // backgroundColor: "white",
    flex: 1,
    backgroundColor: "white",
  },
  imageView: {
    alignSelf: "center",
  },
  logo: {
    height: hp(9),
    width: wp(50),
    marginVertical: hp(6),
  },
  innerContainer: {
    marginHorizontal: hp(2.5),
  },
  loginFont: {
    fontWeight: "700",
    fontSize: hp(3),
    color: "black",
    marginBottom: hp(2),
  },
  detailFont: {
    // fontWeight: "500",
    fontSize: hp(2),
    marginBottom: hp(3),
  },
  credsFont: {
    fontWeight: "700",
    fontSize: hp(2),
    color: "black",
    marginBottom: hp(1),
  },
  inputField: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    height: hp(6),

    width: "90%",
    color: "black",
  },
  inputViewStyle: {
    flexDirection: "row",
    width: "100%",

    height: hp(6),
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: hp(1),
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: hp(1),
  },
  button: {
    backgroundColor: tintColorDark,
    borderRadius: hp(5),
    height: hp(7),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(3),
  },
  buttonText: {
    color: "white",
    fontSize: hp(2),
    fontWeight: "700",
  },
  buttonContainer: {
    alignItems: "center",
  },
  loaderColor: {
    color: "white",
  },
  forgotText: {
    color: tintColorDark,
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    fontWeight: "700",
    marginTop: hp(2),
  },
  signupText: {
    color: tintColorDark,
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    fontWeight: "700",
  },
  signupView: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: hp(3),
  },
});
