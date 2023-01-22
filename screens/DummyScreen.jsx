import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import React from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function DummyScreen() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().min(4).required(),
    body: Yup.string().min(4),
    rating: Yup.string().test("is-num-1-5", (val) => {
      return Number(val) < 6 && Number(val) >= 1;
    }),
  });

  function ErrorText({ props, formKey }) {
    if (props.errors[formKey] && props.touched[formKey]) {
      return <Text className="text-rose-500">{props.errors[formKey]}</Text>;
    }

    return null;
  }

  function render(props) {
    return (
      <View className="p-4 pt-8 space-y-4">
        <TextInput
          className="p-4 border border-black"
          value={props.values.title}
          onChangeText={props.handleChange("title")}
          onBlur={props.handleBlur("title")}
        />
        <ErrorText props={props} formKey="title" />
        <TextInput
          className="p-4 border border-black"
          value={props.values.body}
          onChangeText={props.handleChange("body")}
          onBlur={props.handleBlur("body")}
          multiline
        />
        <ErrorText formKey={"body"} props={props} />
        <TextInput
          className="p-4 border border-black"
          value={props.values.rating}
          onChangeText={props.handleChange("rating")}
          keyboardType="numeric"
          onBlur={props.handleBlur("rating")}
        />
        <ErrorText formKey={"rating"} props={props} />
        <Button title="submit" onPress={props.handleSubmit} />
      </View>
    );
  }

  function onSubmit(values, actions) {
    Keyboard.dismiss();
    console.log(values);
    actions.resetForm();
  }

  return (
    <SafeAreaView className="flex-1">
      <Formik
        initialValues={{ title: "", body: "", rating: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => render(props)}
      </Formik>
    </SafeAreaView>
  );
}
