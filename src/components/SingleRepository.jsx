import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useReviews from '../hooks/useReviews';
import RepositoryListItem from './RepositoryListItem';
import theme from '../theme';
import Text from './Text';

import { format } from 'date-fns';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    reviewContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        paddingTop: 10,
        padding: 10,
        backgroundColor: 'white',
    },
    ratingContainer: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
        width: 40,
        maxWidth: 40,
        maxHeight: 40,
        height: 40,
        borderRadius: 40/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingText: {
        color: theme.colors.primary,
        fontWeight: theme.fontWeights.bold,
    },
    reviewInfoContainer: {
        paddingLeft: 10,
        paddingRight: 50,
    },
    reviewInfoHeaderContainer: {
        paddingBottom: 5,
    }
});

const RepositoryInfo = ({ repository }) => {
    // Repository's information implemented in the previous exercise
    return (
      <View styles={styles.repoInfoContainer}>
        <RepositoryListItem item={repository} singlePage={true}/>
        <ItemSeparator />
      </View>
    )
  };
  
  const ReviewItem = ({ review }) => {
    // Single review item
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.reviewInfoContainer}>
                <View style={styles.reviewInfoHeaderContainer}>
                    <Text fontWeight='bold'>{review.user.username}</Text>
                    <Text color='textSecondary'>{formatDate(review.createdAt)}</Text>
                </View>
                <Text>{review.text}</Text>
            </View>
        </View>
    )
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  const formatDate = (createdAt) => {
      const year = createdAt.substring(0,4);
      const month = createdAt.substring(5,7);
      const day = createdAt.substring(8, 10);
      return format(new Date(year, Number(month)-1, day), 'MM.dd.yyyy');
  }
  
  const SingleRepository = ({ repository }) => {
    const { repo } = useReviews(repository.id);
    const reviews = repo ? repo.reviews.edges.map(edge => edge.node) : [];
    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ListFooterComponent={ItemSeparator}
      />
    );
  };
  
  export default SingleRepository;