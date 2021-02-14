import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE_USER } from '../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
    const authStorage  = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHORIZE_USER);
  
    const signIn = async ({ username, password }) => {
      const { data } = await mutate({ variables: { username, password }});
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
      return data;
    };
    return [signIn, result];
  };

  export default useSignIn;