import { StyleSheet, Text, View ,SafeAreaView,ActivityIndicator} from 'react-native'
import {React,useEffect,useState} from 'react'
import Header from '../components/Header'
import MovieCards from '../components/MovieCards'
import {getFirestore,collection,getDoc,addDoc,onSnapshot,doc,deleteDoc,updateDoc,query,where} from 'firebase/firestore'

const HomeScreen = () => {
  const [movies,setMovies] = useState(null)

  useEffect(()=>{
      const db = getFirestore()
      const snapShot = collection(db,'Movies')
      const q = query(snapShot)
      onSnapshot(q,snapShot =>{
          console.log('running snapshot ...')
         const movies =snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
         setMovies(movies)

        console.log('\n\n\n Items data inSide HOOK ==>\n',movies)
  })
  

  },[])

  if(!movies){
    return(
     <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <ActivityIndicator color={'#3bcf27'} size={'large'}/>
     </View> 
    )
  }
  
  return (
    <SafeAreaView style={{backgroundColor:"#F0F0F0",flex:1, marginTop: 21}}>
        <MovieCards movies={movies}/>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})