import React from 'react';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flexDirection: 'column',
        flexGrow: 1,
        borderWidth: 1,
        backgroundColor: 'white',
        borderBottomWidth: 20,
    },
    buttonContainer: {
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        padding: 15,
        margin: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,  
    },
    buttonText: {
        fontSize: theme.fontSizes.subheading,
        color: 'white',
        fontWeight: theme.fontWeights.bold,
    },
});

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
            <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry/>
            <TouchableOpacity onPress={onSubmit} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const validationSchema = yup.object().shape({
    username: yup.string()
        .min(1, 'Length of username must be between 1 and 30')
        .max(30, 'Length of username must be between 1 and 30')
        .required('Username is required'),
    password: yup.string()
        .min(5, 'Password length must be between 5 and 30')
        .max(30, 'Password length must be between 5 and 30')
        .required('Password is required'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords do not match')
        .required('Password confirmation is required')
});

const initialValues= {
    username: '',
    password: '',
    passwordConfirm: '',
};

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    const history = useHistory();
    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signUp({ username, password });
            await signIn({ username, password });
            history.push('/');
        } catch(e) {
            console.log(e);
        }
    }
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignUp;