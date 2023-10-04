import React, { useState, useEffect } from 'react';
import {createRoot} from 'react-dom/client'
import './input.css'
import '@fortawesome/fontawesome-free/css/all.css'; // Import the Font Awesome CSS

import { getFirestore, collection, query, addDoc, doc, deleteDoc, onSnapshot, orderBy, serverTimestamp, updateDoc, where, getDocs} from 'firebase/firestore';

import app from '../config/firebase';
import "./logic"

const db = getFirestore(app);

const Popup = () => {
  const [inputText, setInputText] = useState<string>('');
  const [words, setWords] = useState<{ id: string; word: string }[]>([]);


  useEffect(() => {
    chrome.runtime.sendMessage({ action: 'processHistory' });
    const colRef = collection(db, 'words');
    const q = query(colRef, orderBy('createdAt'));
    onSnapshot(q, snapshot => {
        const newWords = snapshot.docs.map((doc) => ({
            id: doc.id,
            word: doc.data().word,
          }));
          setWords(newWords);
          
          
    });
  }, []);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddWord = async () => {
    if (inputText.trim() !== '') {
      const colRef = collection(db, 'words');
      const lowercaseWord = inputText.trim().toLowerCase(); // Convert word to lowercase
      const queryRef = query(colRef, where('word', '==', lowercaseWord)); // Check if the word already exists
      const querySnapshot = await getDocs(queryRef);
      if (querySnapshot.size > 0) {
        // Word already exists, handle it (e.g., show an error message)
        alert('This word already exists in the database.');
      } 
      else {
        // Otherwise, add a new word
        const docRef = await addDoc(colRef, {
            word: lowercaseWord,
            createdAt: serverTimestamp(),
          });
          
          await addDoc(colRef, {
            id: docRef.id,
            word: lowercaseWord,
            createdAt: serverTimestamp(),
          });
          
      }
      //setWords((prevWords) => [...prevWords, inputText]);
      setInputText('');
    }
  };

  const handleEditWord = async (index: number) => {
    const updatedWord = prompt('Edit the word:', words[index].word);
      
    if (updatedWord !== null) {
      const lowercaseUpdatedWord = updatedWord.trim().toLowerCase();
      const colRef = collection(db, 'words');
      
      // Get the document reference by document ID (assuming you have a unique ID for each word)
      const wordDocRef = doc(colRef, words[index].id);
      console.log(index )
    
      try {
        await updateDoc(wordDocRef, {
          word: lowercaseUpdatedWord, // Store in lowercase
        });
  
        // Then, update the state with the edited word
        const updatedWords = [...words];
        updatedWords[index].word = lowercaseUpdatedWord;
        setWords(updatedWords);
      } catch (error) {
        console.error('Error updating word in Firestore:', error);
      }
    }
  };
  

  const handleDeleteWord = async (index: number) => {
    const wordToDelete = words[index].word;
  
    // First, find the document to delete in Firestore
    const colRef = collection(db, 'words');
    const queryRef = query(colRef, where('word', '==', wordToDelete));
    const querySnapshot = await getDocs(queryRef);
  
    if (querySnapshot.size > 0) {
      const docToDelete = querySnapshot.docs[0]; // Assuming there's only one matching document
      await deleteDoc(docToDelete.ref);
    }
  
    // Then, update the state to remove the deleted word
    const updatedWords = words.filter((_, i) => i !== index);
    setWords(updatedWords);
  };
  
//   const handleDeleteWord = (index: number) => {
//     const updatedWords = words.filter((_, i) => i !== index);
//     setWords(updatedWords);
//   };

  return (
    <div className="w-[250px] h-[500px] rounded-lg p-4 flex flex-col space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter a word"
          className="w-full h-6 border border-gray-300 p-2 rounded-l"
        />
       <button
  onClick={handleAddWord}
  className="bg-blue-500 text-white py-1 px-2 rounded-r flex justify-center items-center"
>
  Add
</button>

      </div>

      <div className="flex-grow overflow-y-auto">
      {words.map((wordObj, index) => (
  <div key={index} className="flex items-center justify-between border-t py-2">
    <div>{wordObj.word}</div> {/* Access the 'word' property */}
    <div className="space-x-2">
      <span onClick={() => handleEditWord(index)} className="cursor-pointer">
        <i className="fas fa-pen text-blue-500"></i>
      </span>
      <span onClick={() => handleDeleteWord(index)} className="cursor-pointer">
        <i className="fas fa-times text-red-500"></i>
      </span>
    </div>
  </div>
))}

      </div>
      <div className="flex items-center justify-between space-x-6px">
  <div className="flex items-center justify-items-center">

      <img 
        src="icon128.png" // Replace with your logo URL
        alt="Logo"
        className="w-6 h-6"
      />  
    
  </div>
  <div className="space-x-4">
    <span>
      <i className="fas fa-download text-green-500"></i>
    </span>
    <span>
      <i className="fas fa-search text-blue-500"></i>
    </span>
  </div>
</div>

    </div>
  );
};

export default Popup;

const container = document.createElement('div')
container.className = 'w-[250px] h-[500px] bg-gray-200'; // Adjust the radius as needed
document.body.appendChild(container)
const root = createRoot(container)
root.render(<Popup />)