import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Alert,
  Image
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MoviesCards } from "../Context";
import {getFirestore,collection,getDoc,addDoc,onSnapshot,doc,deleteDoc,updateDoc,query,where} from 'firebase/firestore'
import { ActivityIndicator } from "react-native";
// import fabric from './fabric';

const TheatreScreen = () => {
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
  const navigation = useNavigation();
  const { seats, setSeats, occupied } = useContext(MoviesCards);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const onSeatSelect = (item) => {
    const seatSelected = seats.find((seat) => seat === item);

    if (seatSelected) {
      setSeats(seats.filter((seat) => seat !== item));
    } else {
      setSeats([...seats, item]);
    }
  };

  const displaySeats = [...seats];
  const fee = 87;
  const noOfSeats = seats.length;
  const priceValue = noOfSeats * 240;
  const total = seats.length > 0 ? fee + noOfSeats * 240 : 0;

  const showSeats = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {seats.map((seat, index) => (
          <Text key={index} style={{ marginTop: 4, fontSize: 17, paddingHorizontal: 4 }}>
            {seat}
          </Text>
        ))}
      </View>
    );
  };

  const handlePaymentOption = (option) => {
    Alert.alert("Payment successfully done via " + option);
    occupied.push(...seats);
    navigation.navigate("Ticket", {
      name: route.params.name,
      mall: route.params.mall,
      timeSelected: route.params.timeSelected,
      total: 87 + seats.length * 240,
      image: route.params.image,
      date: route.params.date,
      selectedSeats: seats,
      priceValue: seats.length * 240,
    });

    setSeats([]);
  };

  return (
    <SafeAreaView style={{ marginTop: 30 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 5 }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View style={{ marginLeft: 6 }}>
            <Text style={{ fontSize: 25, fontWeight: "900" }}>{route.params.name}</Text>
            <Text style={{ marginTop: 2, color: "gray", fontSize: 15, fontWeight: "500" }}>
              {route.params.mall}
            </Text>
          </View>
        </View>
        <AntDesign style={{ marginRight: 12 }} name="sharealt" size={24} color="black" />
      </View>
      <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
        {route.params.timeSelected}
      </Text>
      <Text style={{ textAlign: "center", fontSize: 13, marginTop: 10, color: "gray" }}>
        CLASSIC (240)
      </Text>
      <View style={{ marginTop: 20 }} />
      <FlatList
        numColumns={7}
        data={route.params.tableSeats}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onSeatSelect(item)}
            style={{
              margin: 10,
              borderColor: "gray",
              borderWidth: 0.5,
              borderRadius: 5,
            }}
          >
            {seats.includes(item) ? (
              <Text style={{ backgroundColor: "#ffc40c", padding: 8 }}>{item}</Text>
            ) : occupied.includes(item) ? (
              <Text style={{ backgroundColor: "#989898", padding: 8 }}>{item}</Text>
            ) : (
              <Text style={{ padding: 8 }}>{item}</Text>
            )}
          </Pressable>
        )}
      />
      <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 100, marginTop: 20, backgroundColor: "#D8D8D8", padding: 10 }}>
  <View>
    <Image source={require('../assets/yellow.jpg')} style={{ width: 24, height: 24, marginBottom: 4 }} />
    <Text>Selected</Text>
  </View>
  <View style={{ marginHorizontal: 20 }}>
    <Image source={require('../assets/white.jpg')} style={{ width: 24, height: 24, marginBottom: 4 }} />
    <Text>Vacant</Text>
  </View>
  <View>
    <Image source={require('../assets/grey.jpg')} style={{ width: 24, height: 24, marginBottom: 4 }} />
    <Text>Occupied</Text>
  </View>
</View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 4, fontSize: 15, fontWeight: "500" }}>
            show end time approx 6:51Pm
          </Text>
          {seats.length > 0 ? (
            showSeats()
          ) : (
            <Text style={{ fontSize: 18 }}>No seats selected</Text>
          )}
        </View>
        <View style={{ backgroundColor: "#E0E0E0", padding: 10, borderTopLeftRadius: 6, borderBottomLeftRadius: 6, marginTop: 10 }}>
          <Text style={{ width: 100 }}>Now with ticket cancellation</Text>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: "#ffc40c",
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        {seats.length > 0 ? (
          <Text style={{ fontSize: 17, fontWeight: "500" }}>{seats.length} seat's selected</Text>
        ) : (
          <Text></Text>
        )}
        <Pressable onPress={() => setShowPaymentOptions(true)}>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>PAY {total}</Text>
        </Pressable>
      </Pressable>

      {showPaymentOptions && (
        <View style={styles.paymentOptionsContainer}>
          <Pressable style={styles.paymentOption} onPress={() => handlePaymentOption("Bank")}>
            <Image source={require('../assets/yellow.jpg')} style={styles.paymentOptionImage} />
            <Text style={styles.paymentOptionText}>Pay via Meezan Bank</Text>
          </Pressable>
          <Pressable style={styles.paymentOption} onPress={() => handlePaymentOption("JazzCash")}>
            <Image source={require('../assets/yellow.jpg')} style={styles.paymentOptionImage} />
            <Text style={styles.paymentOptionText}>Pay via JazzCash</Text>
          </Pressable>
          <Pressable style={styles.paymentOption} onPress={() => handlePaymentOption("Easypaisa")}>
            <Image source={require('../assets/yellow.jpg')} style={styles.paymentOptionImage} />
            <Text style={styles.paymentOptionText}>Pay via Easypaisa</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TheatreScreen;

const styles = StyleSheet.create({
  paymentOptionsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  paymentOptionImage: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});