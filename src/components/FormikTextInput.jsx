import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
  },
  errorText: {
    paddingLeft: 10,
    color: '#d73a4a',
  },
  input: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    paddingLeft: 8,
    paddingVertical: 5,
  },
  normalBorder: {
    borderColor: 'gray',
  },
  errorBorder: {
    borderColor: '#d73a4a',
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        style={[styles.input, showError ? styles.errorBorder : styles.normalBorder]} 
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;