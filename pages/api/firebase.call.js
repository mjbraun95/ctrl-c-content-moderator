import { db } from "./firebase.config";
import { collection, getDocs } from "firebase/firestore";

export const fetchDataFromFirestore = async () => {
  const querySnapshot = await getDocs(collection(db, "messages"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
