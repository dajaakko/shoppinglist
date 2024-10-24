import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { firestore, addDoc, collection, MESSAGES,serverTimestamp, query, onSnapshot,orderBy,doc,deleteDoc} from "./firebase/Config"
import {convertFirebaseTimeStampToJS} from "./firebase/Functions"
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
export default function App() {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES),orderBy('created', "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => { 
      const tempMessages = []
      
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        tempMessages.push({...doc.data(), id: doc.id, created: convertFirebaseTimeStampToJS(doc.data().created)})

        })
        setMessages(tempMessages)
      })
      return () => unsubscribe()
  },[])

  const save = async () => {
    try {
      const docRef = await addDoc(collection(firestore, MESSAGES), { //firestore on viite instanssiin, Messages on kokoelman nimi
        text: newMessage,
        created: serverTimestamp()  
      })
      setNewMessage('')

    } catch (error) {
      console.log('Error adding document:', error)
      
    }
    
  }
  const deleteMessage = async (id) => {
    try {
      const docDelete = doc(firestore, MESSAGES, id)
      await deleteDoc(docDelete)
      console.log(`Document ${id} deleted`)
    } catch (error) {
      console.log('Error deleting document:', error)
    }
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <TextInput
            placeholder='Add to shopping list'
            value={newMessage}
            onChangeText={text => setNewMessage(text)}
          />
          <Button title="Save" onPress={save} />
        </View>
        {messages.map((message) => (
          <View key={message.id} style={styles.message}>
            <View style={styles.messageContent}>
              <Text>{message.text}</Text>
            </View>
            <Button title="Delete" onPress={() => deleteMessage(message.id)} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'flex-start',
    margin: 8
  }, form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16
  }, message: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    margin: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth:1,
    
  }, messageInfo:{
    fontSize:12
  }

});
