import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/theme'
import { Image } from 'expo-image'

const SharedWishItem = ({data, clickEvent}) => {

  // Her forkorter jeg strengen hvis den har en længe på over 9
    const truncateTitleString = (str) => {
        if (str.length >= 10) {
          return str.substring(0, 7) + '...';
        } else {
          return str;
        }
      };

    // Her forkorter jeg strengen hvis den har en længe på over 16
      const truncateAuthorString = (str) => {
        if (str.length >= 16) {
          return str.substring(0, 13) + '...';
        } else {
          return str;
        }
      };

    return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.emojiContainer} onPress={clickEvent}>
        <Text style={styles.emoji}>{data.emoji}</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>{truncateTitleString(data.name)}</Text>
        {/*<Text style={styles.author}>{truncateAuthorString(data.author)}</Text>*/}
        <Text style={styles.author}>{data.owner.name}</Text>
        </View>
      <View style={styles.closeContainer}>
        <TouchableOpacity>
            <Image style={styles.closeIcon} source={require('../../assets/images/closeIcon.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SharedWishItem

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        gap: 5,
        padding: 15,
    },
    emojiContainer: {
        backgroundColor: colors.wishItemBackground,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        borderRadius: 5,
    },
    emoji: {
        fontSize: 30,
    },
    title: {},
    author: {
        fontSize: 10,
        color: colors.textGray,
    },
    closeContainer: {
        alignItems: 'center',
    },
    closeIcon: {
        opacity: 0.6,
        height: 25,
        width: 25,
    },
})