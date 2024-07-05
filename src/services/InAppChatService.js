import firestore from '@react-native-firebase/firestore';

const sendMessage = async (chatId, message) => {
  try {
    await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        text: message,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getMessages = (chatId, callback) => {
  return firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .orderBy('createdAt', 'desc')
    .onSnapshot(callback);
};

export {sendMessage, getMessages};
