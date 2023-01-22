# What I learned

## Formik

### Basic form

The Formik library is an easy way of creating forms in React and React Native. It handles all the states stuff for you, and just lets you build out the components on your own.

To use formik, follow the steps below:

1. `npm i formik`
2. `import { Formik } from "formik";`

> `<Formik>`

The `<Formik>` component takes in some important props, and has a special children rendering method you can use:

```js
<Formik
    initialValues={{ field: value, ... }}
    onSubmit={(values) => {}}
>
  {(props) => <MyForm />}
</Formik>
```

- `initialValues` : an object prop. The initial fields that formik will use as the form state. Also sets the `name` attributes on your fields.
- `onSubmit` : a function prop. Is executed when the form is submitted. The `values` parameter in the function is the current values of the form state.
- the rendering method: Instead of just normally rendering the children, you get access to the `props` variable provided by Formik so that you can use formik logic in your forms.

```js
return (
  <SafeAreaView className="flex-1">
    <Formik
      initialValues={{ title: "", body: "", rating: "" }}
      onSubmit={onSubmit}
    >
      {(props) => render(props)}
    </Formik>
  </SafeAreaView>
);
```

> Render

- `props.values` : the values of the formstate. you can access the fields you defined in the initial state.
- `props.handleChange(name)` : Should be passed as the value to the `onChange` prop. Handles the state changing.
- `props.handleBlur(name)` : Should be passed as the value to the `onBlur` prop. Is necessary for learning whether an input value has been modified or not.
- `props.handleSubmit()` : Submits the form when invoked. SHould be passed to the `onPress` prop of some button you make.

```js
function render(props) {
  return (
    <View className="p-4 pt-8 space-y-4">
      <TextInput
        className="p-4 border border-black"
        value={props.values.title}
        onChangeText={props.handleChange("title")}
        onBlur={props.handleBlur("title")}
      />
      <TextInput
        className="p-4 border border-black"
        value={props.values.body}
        onChangeText={props.handleChange("body")}
        onBlur={props.handleBlur("body")}
        multiline
      />
      <TextInput
        className="p-4 border border-black"
        value={props.values.rating}
        onChangeText={props.handleChange("rating")}
        keyboardType="numeric"
        onBlur={props.handleBlur("rating")}
      />
      <Button title="submit" onPress={props.handleSubmit} />
    </View>
  );
}
```

> Full example

1. We define the initial state as a `title`, `body`, and `rating`.
2. We create an `onSubmit` function that takes the `values` parameter.
3.

```js
import { View, Text, SafeAreaView, TextInput, Button } from "react-native";
import React from "react";
import { Formik } from "formik";
export default function DummyScreen() {
  function render(props) {
    return (
      <View className="p-4 pt-8 space-y-4">
        <TextInput
          className="p-4 border border-black"
          value={props.values.title}
          onChangeText={props.handleChange("title")}
        />
        <TextInput
          className="p-4 border border-black"
          value={props.values.body}
          onChangeText={props.handleChange("body")}
          multiline
        />
        <TextInput
          className="p-4 border border-black"
          value={props.values.rating}
          onChangeText={props.handleChange("rating")}
          keyboardType="numeric"
        />
        <Button title="submit" onPress={props.handleSubmit} />
      </View>
    );
  }

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <SafeAreaView className="flex-1">
      <Formik
        initialValues={{ title: "", body: "", rating: "" }}
        onSubmit={onSubmit}
      >
        {(props) => render(props)}
      </Formik>
    </SafeAreaView>
  );
}
```

### Formik with yup

Managing formik with yup is super easy. All you have to do is make a schema, and then pass that schema into the `validationSchema` prop on the `<Formik>` component. The form won't be submitted unless all the validation is passed.

1. `npm i yup` and import it into your code

```js
import * as Yup from "yup";
```

2. Create a Yup schema, as usual

```js
const validationSchema = Yup.object().shape({
  title: Yup.string().min(4).required(),
  body: Yup.string().min(4),
  rating: Yup.string().test("is-num-1-5", (val) => {
    return Number(val) < 6 && Number(val) >= 1;
  }),
});
```

3. Now you can pass this validation schema into the `validationSchema` prop on the `<Formik>` component.

```js
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
```

### Errors in Formik

After validating with yup, you can use errors to show off error messages.

- In the rendering function, the errors for each field are stored in the `props.errors` object.
- To check if an input has been touched before, check the `props.touched` object.

```js
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
```

Here is a useful, reusable component for quickly generating Error text. We don't show the text unless the error message is not null, and the input was touched.

```js
function ErrorText({ props, formKey }) {
  if (props.errors[formKey] && props.touched[formKey]) {
    return <Text className="text-rose-500">{props.errors[formKey]}</Text>;
  }

  return null;
}
```

### useFormik

## Cusotm fonts quick example

1. `npm i expo-app-loading`

```js
import React from "react";
import Home from "./screens/home";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default function App() {
  let [fontsLoaded] = useFonts({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Home />;
}
```

## ENV variables

## Expo Location and Geocoding

## React native MapView

## KeyboardAvoidingView

5:51:00

## Destination matrix

```json
{
  "destination_addresses": ["21730 Towncenter Plz, Sterling, VA 20164, USA"],
  "origin_addresses": ["11309 Seneca Cir, Great Falls, VA 22066, USA"],
  "rows": [
    {
      "elements": [
        {
          "distance": {
            "text": "3.1 mi",
            "value": 4960
          },
          "duration": {
            "text": "8 mins",
            "value": 454
          },
          "status": "OK"
        }
      ]
    }
  ],
  "status": "OK"
}
```
