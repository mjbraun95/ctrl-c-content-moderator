import { db } from "./firebase.config";
import { collection, getDocs } from "firebase/firestore";

// import { db } from './firebase.config';

// Function to update a document in a collection
export const updateStatus = async (collectionName, documentId, updateData) => {
  try {
    const documentRef = collection(collectionName).doc(documentId);
    await documentRef.update(updateData);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// Example usage:
