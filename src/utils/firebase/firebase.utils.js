// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    // signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfzyYIHbA9n7MAtdz2G5j04JzDIHcsQ-A",
    authDomain: "crwn-clothing-db-75ff7.firebaseapp.com",
    projectId: "crwn-clothing-db-75ff7",
    storageBucket: "crwn-clothing-db-75ff7.appspot.com",
    messagingSenderId: "1090304436945",
    appId: "1:1090304436945:web:06152823170b25e30ff3f0"
};

// Initialize Firebase

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {

        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    })

    await batch.commit();
    console.log('done')
}

export const getCategoriesAndDocs = async () => {

    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {

        const {
            title,
            items
        } = docSnapshot.data();

        acc[title.toLowerCase()] = items

        return acc
    }, {})

    return categoryMap

}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {

    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)

    if (!userSnapshot.exists()) {
        const {
            displayName,
            email
        } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log("error creating the user", error.message)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailandPassword = async (email, password) => {

    if (!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailandPassword = async (email, password) => {

    if (!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangeListener = callback => onAuthStateChanged(auth, callback)