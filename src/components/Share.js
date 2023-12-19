import { StyleSheet, Text, View, Button, Share } from 'react-native'
import React from 'react'
import * as Sharing from 'expo-sharing';
const ShareScreen = () => {
    const url = "https://www.youtube.com/@BugNinza"

    const onShare = async () => {
        console.log("inside");
        try {
            const result = await Share.share({
                message: ('Bug Ninza:' + '\n' + url),
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('shared with activity type of : ', result.activityType)

                } else {
                    console.log('shared')
                }

            }
            else if(result.action===Share.dismissedAction){
                console.log('dismissed')
            }
        }catch(error){
            console.log(error.message)

        }
}
    return (
        <View>
            <Text>Share</Text>
            <Button title='share' onPress={onShare}/>
        </View>
    
    )
}

export default ShareScreen

const styles = StyleSheet.create({})