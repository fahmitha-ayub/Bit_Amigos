

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { db } from '/home/grigary/hackathon/SignUpNumber/firebase.js'; // Adjust path as needed
// import { getDocs, collection } from 'firebase/firestore';

// const Authorities = () => {
//   const [msg, setMsg] = useState([]);
//   const msgCollection = collection(db, "Incidents");

//   const getMsg = async () => {
//     try {
//       const data = await getDocs(msgCollection);
//       console.log(data);
//       const filteredData = data.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       console.log(filteredData);
//       setMsg(filteredData);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   useEffect(() => {
//     getMsg();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {msg.map((item) => (
//         <View key={item.id} style={styles.itemContainer}>
//           {/* <Text>{item.id}</Text> */}
//           <Text>{item.location}</Text>
//           <Text>{item.issue}</Text>
//           <Text>{item.date}</Text>
//           {/* Display other properties from `item` as needed */}
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 100,
//     backgroundColor: '#fff',
//   },
//   itemContainer: {
//     marginBottom: 10,
//     padding: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//   },
// });

// export default Authorities;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '/home/grigary/hackathon/SignUpNumber/firebase.js'; // Adjust path as needed
import { collection, onSnapshot } from 'firebase/firestore';

const Authorities = () => {
  const [msg, setMsg] = useState([]);
  const msgCollection = collection(db, "Incidents");

  useEffect(() => {
    // Set up the real-time listener
    const unsubscribe = onSnapshot(msgCollection, (snapshot) => {
      const filteredData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMsg(filteredData);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {msg.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text>{item.location}</Text>
          <Text>{item.issue}</Text>
          <Text>{item.date}</Text>
          {/* Display other properties from `item` as needed */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Authorities;
    