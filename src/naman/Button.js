import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../const/color';
import FONTS from '../const/fonts';
const Button = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.btnContainer}>
            <Text style={ styles.btnText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        width: '100%',
        paddingVertical:13,
        backgroundColor: COLORS.theme,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:6,
    },
    btnText: {
        color: COLORS.white, fontSize: 14,
        fontFamily:FONTS.semiBold
    }
});


export default Button;