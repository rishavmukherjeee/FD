import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback, Easing } from 'react-native'
import React, { useState } from 'react';

const AnimatedButton = () => {
    const [scaleValue] = useState(new Animated.Value(1));
    const [rotateValue] = useState(new Animated.Value(0));
    const [fadeValue] = useState(new Animated.Value(1));

    const animateButton = () => {
        Animated.timing(scaleValue, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(scaleValue, {
                toValue: 1.1,
                duration: 200,
                useNativeDriver: true
            }).start();
        })
    }

    const animateButton3 = () => {
        Animated.sequence([
            Animated.timing(fadeValue, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            }),
            Animated.timing(fadeValue, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true
            })
        ]).start();
    }
    const animateButton2 = () => {
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(rotateValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start();
        })
    }

    const rotateInterpolate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '60deg']
    });



    return (
        <View style={styles.container}>
            <Text>Animated Button</Text>
            <TouchableWithoutFeedback onPress={animateButton}>
                <Animated.View style={[styles.button, { transform: [{ scale: scaleValue }] }]}>
                    <Text style={styles.buttonText} >Press me</Text>
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={animateButton2}>
                <Animated.View style={[styles.button, { transform: [{ rotate: rotateInterpolate }] }]}>
                    <Text style={styles.buttonText} >Press me 2</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={animateButton3}>
                <Animated.View style={[styles.button, { opacity: fadeValue }]}>
                    <Text style={styles.buttonText} >Press me 3</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default AnimatedButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 5,
        margin: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    }
});