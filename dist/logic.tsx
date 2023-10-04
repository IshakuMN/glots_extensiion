import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import app from '../config/firebase';
import { PassThrough } from 'stream';

const db = getFirestore(app);

const searchTerms = ["mean", "defin", "synonym"];
const duration = Date.now() - 365 * 24 * 60 * 60 * 100; // One year ago

searchTerms.forEach(searchTerm => {
  chrome.history.search(
    {
      text: searchTerm,
      startTime: duration,
      maxResults: 10,
    },
    async function (data) {
      data.forEach(async function (item) {
        // Check if the URL is defined and contains "mean" or "defin"
        if (item && item.url && /mean|defin/i.test(item.url)) {
          // Extract the query string
          const queryMatch = item.url.match(/q=([^&]+)/);
          if (queryMatch) {
            const words = decodeURIComponent(queryMatch[1]).split('+');
            words.forEach(async (word, i) => {
              if (/mean|defin/i.test(word)){
                // If there's a word before and it's not "the"
                if (i > 0 && words[i-1].toLowerCase() !== "the") {
                  await addToDatabase(words[i-1]);
                }
                // If there's a word after and it's not "of"
                if (i < words.length - 1 && words[i+1].toLowerCase() !== "of") {
                  await addToDatabase(words[i+1]);
                }
                // If the next word is "of", add the word after "of"
                else if (i < words.length - 2 && words[i+1].toLowerCase() === "of") {
                  await addToDatabase(words[i+2]);
                }
              }
            });
          }
        }
      });
    }
  );
});

async function addToDatabase(word) {
  const colRef = collection(db, 'words');
  const lowercaseWord = word.trim().toLowerCase();
  

if(lowercaseWord.length > 0){
  // Check if the word already exists
  const queryRef = query(colRef, where('word', '==', lowercaseWord));
  const querySnapshot = await getDocs(queryRef);
console.log(querySnapshot.size)
  if (querySnapshot.size < 1) {
    // Word doesn't exist, add it to the database
    await addDoc(colRef, {
      word: lowercaseWord,
      createdAt: serverTimestamp(),
    });
  }
  else {
      }
}

}
