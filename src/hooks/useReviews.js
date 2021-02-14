import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (id) => {
    const [repo, setRepo] = useState();
    const { loading, error } = useQuery(GET_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: { id },
        onCompleted: (data) => {
            setRepo(data.repository);
        },
    });
    return { loading, error, repo };
};

export default useReviews;