import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, Alert} from 'react-native';

export default function App() {
  const [inputText, onChangeText] = React.useState('');

  //L'url donnée est juste un pixel vide, donc il n'y a pas d'avertissement pour avoir une source vide pour l'image.
  const [posts, setPosts] = useState([{text:"", imgURL:"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="}]);

  const getImage = async () => {
    try {
      const response = await fetch(
        'https://coffee.alexflipnote.dev/random.json'
      );
      const json = await response.json();
      return json.file;
    } catch (error) {
      console.error(error);
    }
  };

  const handleBtnPress = async () => {
    let img = await getImage();
    setPosts([{text: inputText, imgURL : img}, ...posts]);

    //Effacer TextInput pour plus de commodité pour l'utilisateur
    onChangeText(""); 
  }

  // // Comme bonne pratique, je vérifierais qu'il ne s'agit pas d'une chaîne vide.
  // const handleBtnPress = async () => {
  //   if(inputText.trim() != "")
  //   {
  //     let img = await getImage();
  //     setPosts([{text: inputText, imgURL : img}, ...posts]);
  //     onChangeText(""); 
  //   }else{
  //     Alert.alert("Erreur !" , "Entrez du texte dans la boîte avant de publier");
  //   }
  // }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputTxt}
        placeholder="Quoi de neuf ?"
        placeholderTextColor="grey"
        onChangeText={inputText => onChangeText(inputText)}
        value={inputText}
      />

      <View style={styles.btn}>
        <Button title="Publier" color="#FFED4E" onPress={handleBtnPress} />
      </View>

      <FlatList
        style={styles.element}
        keyExtractor={(item, index) => index.toString()}
        data={posts}
        renderItem={({item}) => (
          <View style={styles.itemList}>
            <Text style={styles.textList}>{item.text}</Text>
            <Image 
              style={styles.imageList}
              source={{
              uri: item.imgURL,
              }}/>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({  
  imageList: {
    width: '100%',
    minHeight: 200,
    maxHeight: 350,
    //Personnellement, je préfère "contain" dans ce cas, mais on pourrait tout à fait utiliser "cover". 
    resizeMode:'contain',
  },
  
  textList:{
    fontSize: 15,
    paddingVertical: 7,
  },
  
  itemList:{
    paddingBottom: 20,
  },
  
  element:{
    width:'100%',
    marginRight: 'auto',
  },
  
  btn:{
    borderRadius: 4,
    marginLeft: 'auto',
    width: '30%',
    marginVertical: 5,
  },
  
  inputTxt:{
    borderRadius: 4,
    backgroundColor:'#F0F0F0',
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
    margin: 5,
  },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: '10%',
    marginVertical: '10%',
  },
});
