import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import EmojiSelector from 'react-native-emoji-selector'
import { colors, fontsizes } from '../../utils/theme'

const AddWishlist = () => {

  const [name, setName] = useState();
  const [emoji, setEmoji] = useState();
  const [selectEmoji, setSelectEmoji] = useState(false);

  const changeEmoji = (emoji) => {
    setEmoji(emoji);
    setSelectEmoji(false);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
          <Image style={styles.backIcon} source={require('../../assets/images/backIcon.png')}/>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Opret Ønskeliste</Text>
        </View>

        <View style={styles.createContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTitle}>Navn</Text>
            <TextInput style={styles.nameInput} placeholder='Min nye ønskeliste...' placeholderTextColor="gray" />
          </View>

          <View style={styles.iconContainer}>
            <Text style={styles.nameTitle}>Vælg Emoji</Text>
            <TouchableOpacity style={styles.iconButton} onPress={() => setSelectEmoji(true)}>
              <Text style={styles.emojiText}>{emoji}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.createButtonContainer}>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createTitle}>Opret</Text>
            </TouchableOpacity>
          </View>

        </View>
        {selectEmoji ?
          <EmojiSelector onEmojiSelected={emoji => changeEmoji(emoji)} />
          : null}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default AddWishlist

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  backIcon: {
    height: 20,
    width: 20,
  },
  titleContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: fontsizes.title,
  },
  createContainer: {
    flex: 1,
    paddingHorizontal: 30,
    gap: 50,
  },
  nameContainer: {
    gap: 5,
  },
  nameTitle: {
    fontSize: 16,
  },
  nameInput: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    fontsizes: 16,
  },
  iconContainer: {
    gap: 5,
  },
  iconButton: {
    height: 120,
    width: 120,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  emojiText: {
    fontSize: 40,
  },
  createButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  createButton: {
    backgroundColor: colors.buttonPrimary,
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
})