import React from 'react';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';

import { useHistory } from 'react-router-native';
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
    signInButton: {
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        padding: 15,
        margin: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,

    },
    signInButtonText: {
        fontSize: theme.fontSizes.subheading,
        color: 'white',
        fontWeight: theme.fontWeights.bold,
    },
});


const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password"  secureTextEntry />
            <TouchableOpacity onPress={onSubmit} style={styles.signInButton}>
                <Text style={styles.signInButtonText}>Sign in</Text>
            </TouchableOpacity>
        </View>
    );
};

const validationSchema = yup.object().shape({
    username: yup.string()
        .required('Username is required'),
    password: yup.string()
        .required('Password is required'),
});

const initialValues = {
    username: '',
    password: '',
};

const SignIn = () => {
    const [signIn] = useSignIn();
    const history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signIn({ username, password });
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;