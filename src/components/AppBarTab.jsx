import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20,
        paddingRight: 20,
    }
});


const AppBarTab = ({ text, to }) => {
    return (
        <View>
            <Link to={to}>
                <Text style={styles.text}>{text}</Text>
            </Link>
        </View>

    );
  };
  
  export default AppBarTab

;