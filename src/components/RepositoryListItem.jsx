import React from 'react';
import { Image, View, StyleSheet, TouchableHighlight } from 'react-native';

import Text from './Text';
import theme from '../theme';

import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 2,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        borderColor: 'white',
        padding: 15,
        margin: 20,
    },
    buttonText: {
        fontSize: theme.fontSizes.subheading,
        color: 'white',
        fontWeight: theme.fontWeights.bold,

    }
});

const headerStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
        paddingTop: 10,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 5,
        
    },
    avatarContainer: {
        flexGrow: 0,
        paddingRight: 15,
        paddingLeft: 10,
    },
    infoContainer: {
        flexGrow: 1,
    },
    languageContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        marginTop: 2,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        borderColor: 'white',
        padding: 4,
    },
    languageText: {
        color: 'white',
    }
});

const Header = ({ item }) => {
    return (
        <View style={headerStyles.container}>
            <View style={headerStyles.avatarContainer}>
                <Image style={headerStyles.avatar} source={{ uri: item.ownerAvatarUrl }} />
            </View>
            <View style={headerStyles.infoContainer}>
                <Text fontWeight="bold">{item.fullName}</Text>
                <Text color="textSecondary">{item.description}</Text>
                <View style={headerStyles.languageContainer}>
                    <Text style={headerStyles.languageText}>{item.language}</Text>
                </View>
            </View>
        </View>
    );
};

const bodyStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
        padding: 20,
    },
    catContainer: {
        flexDirection: 'column',
        flexGrow: 1,
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
    }
});

const shortenNumber = number => {
    if(number >= 1000) {
        return (number/1000).toFixed(1) + 'k';
    } else {
        return number;
    }
};

const Body = ({ item }) => {
    return (
        <View style={bodyStyles.container}>
            <View style={bodyStyles.catContainer}>
                <Text style={bodyStyles.text} fontWeight="bold">{shortenNumber(item.stargazersCount)}</Text>
                <Text style={bodyStyles.text} color="textSecondary">Stars</Text>
            </View>
            <View style={bodyStyles.catContainer}>
                <Text style={bodyStyles.text} fontWeight="bold">{shortenNumber(item.forksCount)}</Text>
                <Text style={bodyStyles.text} color="textSecondary">Forks</Text>
            </View>
            <View style={bodyStyles.catContainer}>
                <Text style={bodyStyles.text} fontWeight="bold">{shortenNumber(item.reviewCount)}</Text>
                <Text style={bodyStyles.text} color="textSecondary">Reviews</Text>
            </View>
            <View style={bodyStyles.catContainer}>
                <Text style={bodyStyles.text} fontWeight="bold">{shortenNumber(item.ratingAverage)}</Text>
                <Text style={bodyStyles.text} color="textSecondary">Ratings</Text>
            </View>
        </View>
    );
};

const GitHubButton = ({ url }) => {
    return (
        <TouchableHighlight style={styles.buttonContainer} onPress={() => WebBrowser.openBrowserAsync(url)}>
            <Text style={styles.buttonText}>Open in GitHub</Text> 
        </TouchableHighlight>
    )
}

const RepositoryListItem = ({ item, singlePage, id }) => {
    return (
        <View style={styles.flexContainer} key={id}>
            <Header item={item} />
            <Body item={item} />
            {singlePage ? <GitHubButton url={item.url}/> : <></>}
        </View>
    );
};


export default RepositoryListItem;