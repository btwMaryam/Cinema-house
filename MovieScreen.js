import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
//import malls from "../data/malls";
import {getFirestore,collection,getDoc,addDoc,onSnapshot,doc,deleteDoc,updateDoc,query,where} from 'firebase/firestore'

const MovieScreen = () => {
  const [malls,setMalls] = useState([])

  useEffect(() => {
    const db = getFirestore();
    const snapShot = collection(db, 'Malls');
    const q = query(snapShot);
    onSnapshot(q, snapShot => {
      console.log('running snapshot ...');
      console.log('Snapshot:', snapShot); // Log the snapshot
      if (!snapShot.empty) {
          const malls = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMalls(malls);
          console.log('\n\n\n Items data inSide HOOK ==>\n', malls);
      } else {
          console.log('Snapshot is empty.');
      }
  }, error => {
      console.error('Error fetching snapshot:', error);
  });
  
}, []);
if(!malls){
  return(
   <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    <ActivityIndicator color={'#3bcf27'} size={'large'}/>
   </View> 
  )
}

  const route = useRoute();
  //   console.log(route.params);
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState("");
  const [mall, setMall] = useState([]);
  const [seatsData,setSeatsData] = useState([]);
  const mallsData = malls;
  console.log(mall, "selected");
  return (
    <SafeAreaView style={{marginTop:40}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 5 }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 25, fontWeight: "900", marginLeft: 5, }}>
            {route.params.name}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Ionicons name="search" size={24} color="black" />
          
          <Ionicons
            style={{ marginHorizontal: 10 }}
            name="search-circle"
            size={24}
            color="black"
          />
          <Ionicons name="share-outline" size={24} color="black" />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          marginLeft: 5,
        }}
      >
        <AntDesign name="Safety" size={24} color="orange" />

      </View>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date("2024-04-05")}
        endDate={new Date("2024-04-30")}
        initialSelectedDate={new Date("2024-04-05")}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />
      {mallsData.map((item, index) => (
        <Pressable
          onPress={() => {
            setMall(item.name);
            setSeatsData(item.tableData);
          }}
          style={{ margin: 10 }}
          key={index}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" ,marginLeft:10, padding:8}}>{item.name}</Text>
          {mall.includes(item.name) ? (
            <FlatList
              numColumns={3}
              data={item.showtimes}
              renderItem={({ item }) => (
                <Pressable
                onPress={() => navigation.navigate("Theatre",{
                  mall:mall,
                  name:route.params.name,
                  timeSelected:item,
                  tableSeats:seatsData,
                  date:selectedDate,
                  image:route.params.image
                })}
                  style={{
                    borderColor: "green",
                    borderWidth: 0.5,
                    width: 80,
                    borderRadius: 3,
                    margin: 10,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "green",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          ) : null}
        </Pressable>
      ))}
    </SafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({});