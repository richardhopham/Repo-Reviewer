import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReviews = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const createReview = async ({ repoName, repoOwnerName, rating, review }) => {
        const result = await mutate({ variables: { repositoryName: repoName, ownerName: repoOwnerName, rating: rating, text: review }});
        return result
    };
    return [createReview, result];
};

export default useCreateReviews;