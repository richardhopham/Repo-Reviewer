import React from 'react';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import useCreateReviews from '../hooks/useCreateReviews';

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


const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="repoOwnerName" placeholder="Repository owner name" />
            <FormikTextInput name="repoName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput name="review" placeholder="Review" multiline />
            <TouchableOpacity onPress={onSubmit} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Create a review</Text>
            </TouchableOpacity>
        </View>
    );
};

const validationSchema = yup.object().shape({
    repoOwnerName: yup.string()
        .required('Repository owner name is required'),
    repoName: yup.string()
        .required('Repository name is required'),
    rating: yup.number()
        .min(0, 'Rating must be between 0 and 100')
        .max(100, 'Rating must be between 0 and 100')
        .required('Rating is required'),
    review: yup.string()
});

const initialValues = {
    repoOwnerName: '',
    repoName: '',
    rating: '',
    review: '',
};

const Review = () => {
    const [createReview] = useCreateReviews();
    const history = useHistory();
    const onSubmit = async (values) => {
        const { repoName, repoOwnerName, rating, review } = values;
        try {
            const res = await createReview({ repoName, repoOwnerName, rating: Number(rating), review });
            if(res.data) {
                history.push(res.data.createReview.repositoryId);
            }
        } catch(e) {
            console.log(e);
        }
    };
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default Review;