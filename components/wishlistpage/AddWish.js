import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { colors, fontsizes } from "../../utils/theme";

const AddWish = ({addWish, closeModal}) => {

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [itemUrl, setItemUrl] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [manualIsSelected, setManualIsSelected] = useState(true);

    const addNewWish = () => {
        const wishObject = {
            id: 0,
            name: name,
            description: description,
            price: price,
            link: itemUrl,
            pictureURL: imageUrl,
        };
        addWish(wishObject);
        closeModal();
    }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal}>
          <Image
            style={styles.backIcon}
            source={require("../../assets/images/backIcon.png")}
          />
        </TouchableOpacity>


        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tilføj Ønske</Text>
        </View>

        <View style={styles.optionContainer}>
            <View style={styles.optionWrapper}>
                <TouchableOpacity style={[styles.typeOption, {backgroundColor: manualIsSelected ? colors.buttonPrimary : null}]} onPress={() => setManualIsSelected(true)}>
                    <Text style={{color: manualIsSelected ? 'white' : null}}>Manuelt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.typeOption, {backgroundColor: !manualIsSelected ? colors.buttonPrimary : null}]} onPress={() => setManualIsSelected(false)}>
                    <Text style={{color: !manualIsSelected ? 'white' : null}}>Automatisk</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.createContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTitle}>Navn</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Mit nye ønske..."
              placeholderTextColor="gray"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTitle}>Beskrivelse</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Mit nye ønske..."
              placeholderTextColor="gray"
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTitle}>Pris</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Mit nye ønske..."
              placeholderTextColor="gray"
              onChangeText={(text) => setPrice(text)}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTitle}>Link til varen</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Mit nye ønske..."
              placeholderTextColor="gray"
              onChangeText={(text) => setItemUrl(text)}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTitle}>Billede af varen</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Mit nye ønske..."
              placeholderTextColor="gray"
              onChangeText={(text) => setImageUrl(text)}
            />
          </View>

          <View style={styles.createButtonContainer}>
            <TouchableOpacity style={styles.createButton} onPress={addNewWish}>
              <Text style={styles.createTitle}>Tilføj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};



export default AddWish;

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  backIcon: {
    height: 20,
    width: 20,
  },
  titleContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: fontsizes.title,
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  optionWrapper: {
    backgroundColor: colors.wishItemBackground,
    flexDirection: 'row',
    width: '50%',
    height: 35,
    borderRadius: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  typeOption: {
    flex: 1,
    alignItems: 'center',
    borderRadius: '100%',
    height: 25,
    justifyContent: 'center',
  },
  createContainer: {
    flex: 1,
    paddingHorizontal: 30,
    gap: 20,
  },
  nameContainer: {
    gap: 5,
  },
  nameTitle: {
    fontSize: 16,
  },
  nameInput: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    fontsizes: 16,
  },
  createButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  createButton: {
    backgroundColor: colors.buttonPrimary,
    height: 60,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  createTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
