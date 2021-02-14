import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_SINGLE_REPO } from '../graphql/queries';

const useSingleRepo = (id) => {
    const [repo, setRepo] = useState();
    const { loading, error } = useQuery(GET_SINGLE_REPO, {
        fetchPolicy: 'cache-and-network',
        variables: { id },
        onCompleted: (data) => {
            setRepo(data.repository);
        },
    });
    return { loading, error, repo };
};

export default useSingleRepo;