
// import React, { useState, useCallback, useEffect } from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { View, StyleSheet } from 'react-native';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Initial message for testing purposes
//     setMessages([
//       {
//         _id: 1,
//         text: 'Welcome to the chat!',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
//   }, []);

//   return (
//     <View style={styles.container}>
//       <GiftedChat
//         messages={messages}
//         onSend={messages => onSend(messages)}
//         user={{
//           _id: 1,
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default Chat;


// ALMOST WORKING

// import React, { useState, useCallback, useEffect } from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { View, StyleSheet } from 'react-native';
// import { db, collection, addDoc, onSnapshot } from '/home/grigary/hackathon/SignUpNumber/firebase.js'; // Adjust path as needed

// const Chat = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Subscribe to Firestore updates
//     const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
//       const loadedMessages = snapshot.docs.map(doc => {
//         const data = doc.data();
//         return {
//           _id: doc.id,
//           text: data.text,
//           createdAt: data.createdAt.toDate(),
//           user: data.user,
//         };
//       });
//       setMessages(loadedMessages);
//     });

//     // Clean up subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const onSend = useCallback(async (messages = []) => {
//     // Add new messages to Firestore
//     const message = messages[0];
//     await addDoc(collection(db, 'messages'), {
//       text: message.text,
//       createdAt: new Date(),
//       user: message.user,
//     });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <GiftedChat
//         messages={messages}
//         onSend={messages => onSend(messages)}
//         user={{
//           _id: 1, // Replace with dynamic user ID
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default Chat;

import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, StyleSheet } from 'react-native';
import { db, collection, addDoc, onSnapshot } from '/home/grigary/hackathon/SignUpNumber/firebase.js'; // Adjust path as needed
import { getAuth } from 'firebase/auth';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : 'default_id'; // Replace with a default or handle case when user is not authenticated

  useEffect(() => {
    // Subscribe to Firestore updates
    const messagesCollection = collection(db, 'messages');
    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user,
        };
      });
      setMessages(loadedMessages);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    // Add new messages to Firestore
    const message = messages[0];
    await addDoc(collection(db, 'messages'), {
      text: message.text,
      createdAt: new Date(),
      user: {
        _id: userId,
        name: user.displayName, // Optional: Add more user info if needed
      },
    });
  }, [userId]);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId, // Use the dynamic user ID
          name: user.displayName, // Optional: Add more user info if needed
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Chat;
