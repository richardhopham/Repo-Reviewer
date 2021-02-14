import React, { useContext, useState } from 'react';
import Constants from 'expo-constants';
import theme from '../theme';
import { TouchableHighlight, ScrollView, View, StyleSheet } from 'react-native';
import AppBarTab from './AppBarTab';

import { useQuery } from '@apollo/react-hooks';
import { GET_LOGGED_IN } from '../graphql/queries';
import Text from './Text';

import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.appBarBackground,
      paddingBottom: Constants.statusBarHeight,
      paddingLeft: 10
    },
    tabContainer: {
      flexDirection: 'row',
      flexGrow: 1,
    },
    tabText: {
      color: 'white',
      fontSize: 20,
      paddingRight: 20,
    }
});
  
const checkLoggedIn = () => {
  const { data } = useQuery(GET_LOGGED_IN);
  return data && data.authorizedUser;
};

const SignedTab = () => {
  const authStorage  = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return (
    <View style={styles.tabContainer}>
      {checkLoggedIn() !== null ? (
        <>
          <AppBarTab text="Create a review" to="/create_review"/>
          <TouchableHighlight onPress={signOut}>
            <Text style={styles.tabText}>Sign out</Text>
          </TouchableHighlight>
        </>
      ) : (
        <>
          <AppBarTab text="Sign in" to="/sign_in"/>
          <AppBarTab text="Sign up" to="/sign_up" />
        </>
      )}
    </View>
  );
};

const AppBar = () => {
  return (
      <View style={styles.container}>
          <ScrollView style={styles.tabContainer} horizontal>
            <AppBarTab text="Repositories" to="/"/>
            <SignedTab />
          </ScrollView>
      </View>
  );
};

export default AppBar;