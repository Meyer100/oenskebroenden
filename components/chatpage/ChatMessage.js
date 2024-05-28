import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/theme'

const ChatMessage = ({chat, ownMessage}) => {
  return (
    <View style={[styles.contaniner, {alignItems: ownMessage ? 'flex-end' : null}]}>
      <View style={[styles.chatBox, {backgroundColor: ownMessage ? colors.buttonPrimary : colors.wishItemBackground}]}>
        <Text style={{color: ownMessage ? 'white' : null}}>{chat.message}</Text>
      </View>
      <Text style={styles.name}>{ownMessage ? "dig" : chat.sender.name}</Text>
    </View>
  )
}

export default ChatMessage

const styles = StyleSheet.create({
    contaniner: {
        flex: 1,
        alignItems: 'flex-end',
    },
    chatBox: {
        width: '50%',
        padding: 10,
        borderRadius: 5,
    },
    name: {
        color: colors.textGray,
        fontSize: 12,
    },
})