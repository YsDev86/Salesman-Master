import React, { useRef, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { View } from "../../../components/Themed";
import { hp, wp } from "../../../utils";
import Text from "../../../components/Text";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { tintColorDark, tintColorLight } from "../../../constants/Colors";
import { useLoginMutation } from "../../../redux/auth/authApiSlice";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setLoginUser,
  setRefreshToken,
} from "../../../redux/auth/authSlice";
import { setApplicationStatus } from "../../../redux/user/userSlice";
import Toast from "react-native-root-toast";

import { useTranslation } from "react-i18next";

export default function Signin(props: any) {
  const { t } = useTranslation();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const _formik = useRef();
  const validationSchema = yup.object().shape({
    email: yup
      .string("Required")
      .required("Required")
      .email("Please enter a valid email address"),
    password: yup.string("Required").required("Required"),
  });
  const onLogin = async (values: object) => {
    try {
      const resp = await login(values);
      console.log("----resp--login---", resp?.data?.user);
      if (resp?.error) {
        Toast.show(resp?.error?.data?.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else if (
        "applicationStatus" in resp?.data?.user == false ||
        resp?.data?.user?.applicationStatus == "pending" ||
        resp?.data?.user?.applicationStatus == "rejected"
      ) {
        dispatch(setAccessToken(resp?.data?.tokens?.access));
        dispatch(setRefreshToken(resp?.data?.tokens?.refresh));
        dispatch(setApplicationStatus(resp?.data?.user?.applicationStatus));

        props.navigation.navigate("IdentityVerification", {
          user: resp?.data?.user,
        });
      } else {
        dispatch(setAccessToken(resp?.data?.tokens?.access));
        dispatch(setRefreshToken(resp?.data?.tokens?.refresh));
        dispatch(setLoginUser(resp?.data?.user));
        dispatch(setApplicationStatus(resp?.data?.user?.applicationStatus));
      }
    } catch (e) {
      console.log("login error--->", e);
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={{ flexGrow: 1 }}>
        <View style={styles.imageView}>
          <Image
            style={styles.logo}
            source={require("../../../assets/images/logo1.png")}
            resizeMode="contain"
          />
        </View>

        <View style={styles.innerContainer}>
          <Text style={styles.loginFont}>{t("Login")}</Text>
          <Text style={styles.detailFont}>
            {t("Enter the details below to sign in to your account")}
          </Text>

          <View>
            <Formik
              innerRef={_formik}
              initialValues={{
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
                  <Text style={styles.credsFont}>{t("Email")}</Text>
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
                    placeholder={t("Enter your email address")}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{t(errors.email)}</Text>
                  )}
                  <Text style={{ ...styles.credsFont, marginTop: 10 }}>
                    {t("Password")}
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
                    placeholder={t("Enter password")}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{t(errors.password)}</Text>
                  )}
                </View>
              )}
            </Formik>

            <Text
              style={styles.forgotText}
              onPress={() => props.navigation.navigate("ForgotPassword")}
            >
              {t("Forgot password")}?
            </Text>

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
                <Text style={styles.buttonText}>{t("Login")}</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.signupView}>
        <Text>{t("Don't have an account?")} </Text>

        <Text
          style={styles.signupText}
          onPress={() => props.navigation.navigate("Register")}
        >
          {t("Sign up")}
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
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

    // marginBottom: hp(3),
    marginTop: 20,
  },
});
