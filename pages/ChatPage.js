import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { colors, fontsizes } from "../utils/theme";
import { KeyboardAvoidingView, Platform } from 'react-native';
import ChatMessage from "../components/chatpage/ChatMessage";
import { connection, joinLobby, sendMessageToLobby } from "../services/WebSocketService";
import {getAllChatMessageFromOneWishlist, saveSentMessage} from '../services/ChatService';

const ChatPage = ({ user }) => {
  const route = useRoute();
  const { wishlistId } = route?.params;

  const [messages, setMessages] = useState(null);
  const [inputMessage, setInputMessage] = useState(null);

  const nav = useNavigation();
  

  const testlist = [
    {
      id: 0,
      senderId: 3,
      senderName: "Piet",
      message:
        "Jeg vil gerne splitte den drone som mads har på listen nogen der er intra?",
      time: Date.now(Date.now() - 60000),
      lobbyId: 1,
    },
    {
      id: 1,
      senderId: 2,
      senderName: "Mads",
      message: "Say less buddy",
      time: Date.now(),
      lobbyId: 1,
    },
  ];


  useEffect(() => {
    getPreviousChat();
    
    // Function to set up listeners and join the lobby
    const setupConnection = async () => {
      try {
          await joinLobby(wishlistId);
          console.log('Du er inde!');
          connection.on('ReciveMessage', reciveMessage);
      } catch (error) {
          console.log('Virker ik!', error);
      }
  };

    // Call the setup function
    setupConnection();

    // Return a cleanup function that will be called when the component unmounts
    return () => {
        connection.off('ReciveMessage', reciveMessage); // Remove the event listener
        connection.stop().then(() => console.log('Connection stopped')).catch(err => console.error('Failed to stop connection', err));
    };
  },[])

  const reciveMessage = (data) => {
    setMessages(prevMessages => [
        ...prevMessages,
        {
          id: 0,
          lobby: null,
          message: data.message,
          messageTime: data.messageTime, // Directly use the provided time
          sender: {
            id: data.senderId,
            name: data.senderName,
            connectionId: null,
            email: null,
            password: null,
            token: null,
            tokenExpires: null,
            wishListHistory: [],  // Assuming default empty array
            wishLists: []         // Assuming default empty array
          }
        }
      ]);
  }

  const getPreviousChat = async () => {
    await getAllChatMessageFromOneWishlist(user.token, wishlistId).then(res => {
        if(res.status == 200) {
            setMessages(res.data.messages);
        }
    })
  }

  const sendMessage = async () => {

    if(!inputMessage || !wishlistId || !user) {
        console.log('lol jeg er ramt?')
        return;
    }
    // Nødvendig formattering for at c# kan forstå datoen
    const now = new Date();
    const formattedDate = now.toISOString(); 
    const backendFormattedDate = formattedDate.replace('Z', '');
    
    // Det er ikke særlig forsvareligt at appen skal diktere hvornår beskeden er sendt?
    // Dette burde backend håndtere
    const messageObj = {
        id: 0, 
        senderId: user.id, 
        senderName: user.name, 
        message: inputMessage,
        messageTime: backendFormattedDate,
        lobbyId: wishlistId,
    }

    await sendMessageToLobby(messageObj);
    await saveSentMessage(user.token, messageObj);
    setInputMessage(""); // Reset the input message to an empty string
    Keyboard.dismiss();
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableOpacity onPress={() => nav.pop()}>
        <Image
          style={styles.backIcon}
          source={require("../assets/images/backIcon.png")}
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Chat</Text>
        <Text style={styles.breadText}>
          Denne chat er skjult for forfatteren
        </Text>
      </View>

      <View style={{height: '70%'}}>

      <FlatList
        data={messages}
        renderItem={({ item }) => {
          return (
            <ChatMessage chat={item} ownMessage={item.sender.id == user.id} />
          );
        }}
        keyExtractor={(item) => item.messageTime.toString()}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        inverted contentContainerStyle={{ flexDirection: 'column-reverse'}}
      />
      </View>


      <View style={styles.sendMessageContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Indtast besked..."
          onChangeText={(text) => setInputMessage(text)}
          value={inputMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const ItemSeparator = () => {
  return <View style={{ height: 20 }} />;
};

export default ChatPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 30,
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
  breadText: {
    color: colors.textGray,
  },
  sendMessageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 40,
    gap: 10,
  },
  messageInput: {
    flex: 0.7,
    backgroundColor: colors.wishItemBackground,
    height: 50,
    padding: 10,
    borderRadius: 5,
  },
  sendBtn: {
    flex: 0.3,
    backgroundColor: colors.buttonPrimary,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
