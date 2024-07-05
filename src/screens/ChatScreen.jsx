import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';
import {sendMessage, getMessages} from '../services/InAppChatService';

const ChatScreen = ({route}) => {
  const {chatId} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = getMessages(chatId, snapshot => {
      const fetchedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async () => {
    try {
      await sendMessage(chatId, message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = ({item}) => (
    <View>
      <Text>{item.text}</Text>
      <Text>{item.createdAt?.toDate().toLocaleString()}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
      />
      <TextInput
        placeholder="Type your message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default ChatScreen;
