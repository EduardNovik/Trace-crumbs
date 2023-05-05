import { db } from "../../../firebase";
import { addDoc, getDocs, collection, query, deleteDoc, doc } from "firebase/firestore";
 


export const removeFromFirestoreHandler = async (country, profileId) => {
    const countriesQuery = query(collection(db, "users", profileId, "countries"));
    const querySnapshot = await getDocs(countriesQuery);
    querySnapshot.forEach((item) =>
      item.data().cca2 === country.cca2
        ? deleteDoc(doc(db, "users", profileId, "countries", item.id))
        : null
    );
  };

  export const addToFavoritesHandler = async (country, profileId) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "users", profileId, "countries")));
      const isCountryAdded =  querySnapshot.docs.find((item) => item.data().cca2 === country.cca2)
      if(!isCountryAdded){
        await addDoc(collection(db, "users", profileId, "countries"), country);
      }
    } catch (error) {
      console.log(`Firebase error: ${error.message}`);
    }
  };