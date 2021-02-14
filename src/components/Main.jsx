import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, useParams } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import Review from './Review';
import SignUp from './SignUp';

import useSingleRepo from '../hooks/useSingleRepo';
import SingleRepository from './SingleRepository';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const RepoItem = () => {
  let { id } = useParams();
  const { repo } = useSingleRepo(id);
  if(!repo) {
    return null;
  }
  return <SingleRepository repository={repo} />;
}

const Main = () => {

  return (
      <View style={styles.container}>
        <AppBar />
        <Switch>
          <Route path="/" exact>
            <RepositoryList />
          </Route>
          <Route path="/create_review" exact>
            <Review />
          </Route>
          <Route path="/sign_in" exact>
            <SignIn />
          </Route>
          <Route path="/sign_up" exact>
            <SignUp />
          </Route>
          <Route path="/:id" exact>
            <RepoItem />
          </Route>
        </Switch>
      </View>
  );
};

export default Main;