import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_SECRET_TOKEN,
} = process.env;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

const storage = getStorage();

const uploadImage = async (req) => {
  try {
    const storageRef = ref(
      storage,
      `recipe_image/${Date.now()}${req.file.originalname}`
    );

    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );

    const imageUrl = await getDownloadURL(snapshot.ref);

    return imageUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeImage = async (imageUrl) => {
  try {
    const storageRef = ref(storage, `${imageUrl}`);
    await deleteObject(storageRef);
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { uploadImage, removeImage };
