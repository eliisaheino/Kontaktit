import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect (() =>{
    getContacts();
  }, []);

  //Kysytään lupa yhteystietojen käyttämiseen sovelluksessa
  //Haetaan yhteystiedot
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if(status==='granted'){
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      }) 

      console.log(data);
      setContacts(data);

    }
  }

  //const sendSms = async () => {
   // const isSMSAvailable = await SMS.isAvailableAsync();

  //  if (isSMSAvailable && currentContact && currentContact.phoneNumbers && currentContact.phoneNumbers[0].number) {
   //   const { result } = await SMS.sendSMSAsync(
  //      [currentContact.phoneNumbers[0].number],
  //      `Hello ${currentContact.name}`
  //    );
 //   }
 // }

  return (

    <View style={styles.container} >
      <StatusBar style='auto' />
      {
        hasPermission ? (
          <View>
            <FlatList
                 data={contacts}
                 keyExtractor={item => item.id}
                 renderItem={({item }) => {
                  const {name, phoneNumbers} = item;
                  return(<Text>{`${name} ${phoneNumbers ? phoneNumbers[0].number : 
                    '(no phone number)'}`} </Text>);
                 }
                }
                ListEmptyComponent={<Text>Add contacts!</Text>} />
          </View>
        ) : (
          <Text>Sorry, no permission to use contacts</Text>
        )
      }
      </View>
  );
      
      //<Text>Contacts: {currentContact.name} {currentContact.phoneNumbers[0].number}</Text>
      //<Button title="Get contact" onPress={getContacts} />
      //<Button title="Send SMS" onPress={sendSms} />
    //</View>
 // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
