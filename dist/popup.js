/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/firebase.js":
/*!****************************!*\
  !*** ./config/firebase.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/esm/index.esm.js");



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP6nHGO0EAaYlux0xZ8FnFkvYu3YVkyoI", //process.env.FIREBASE_API,
  authDomain: "glota-2c318.firebaseapp.com",
  projectId: "glota-2c318",
  storageBucket: "glota-2c318.appspot.com",
  messagingSenderId: "1036735424780",
  appId: "1:1036735424780:web:1a0bea95a495eb68638129"
};

// Initialize Firebase
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);

/***/ }),

/***/ "./src/logic.tsx":
/*!***********************!*\
  !*** ./src/logic.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/esm/index.esm.js");
/* harmony import */ var _config_firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/firebase */ "./config/firebase.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getFirestore)(_config_firebase__WEBPACK_IMPORTED_MODULE_1__["default"]);
const searchTerms = ["mean", "defin", "synonym"];
const duration = Date.now() - 365 * 24 * 60 * 60 * 100; // One year ago
searchTerms.forEach(searchTerm => {
    chrome.history.search({
        text: searchTerm,
        startTime: duration,
        maxResults: 10,
    }, function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.forEach(function (item) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Check if the URL is defined and contains "mean" or "defin"
                    if (item && item.url && /mean|defin/i.test(item.url)) {
                        // Extract the query string
                        const queryMatch = item.url.match(/q=([^&]+)/);
                        if (queryMatch) {
                            const words = decodeURIComponent(queryMatch[1]).split('+');
                            words.forEach((word, i) => __awaiter(this, void 0, void 0, function* () {
                                if (/mean|defin/i.test(word)) {
                                    // If there's a word before and it's not "the"
                                    if (i > 0 && words[i - 1].toLowerCase() !== "the") {
                                        yield addToDatabase(words[i - 1]);
                                    }
                                    // If there's a word after and it's not "of"
                                    if (i < words.length - 1 && words[i + 1].toLowerCase() !== "of") {
                                        yield addToDatabase(words[i + 1]);
                                    }
                                    // If the next word is "of", add the word after "of"
                                    else if (i < words.length - 2 && words[i + 1].toLowerCase() === "of") {
                                        yield addToDatabase(words[i + 2]);
                                    }
                                }
                            }));
                        }
                    }
                });
            });
        });
    });
});
function addToDatabase(word) {
    return __awaiter(this, void 0, void 0, function* () {
        const colRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(db, 'words');
        const lowercaseWord = word.trim().toLowerCase();
        if (lowercaseWord.length > 0) {
            // Check if the word already exists
            const queryRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.query)(colRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.where)('word', '==', lowercaseWord));
            const querySnapshot = yield (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getDocs)(queryRef);
            console.log(querySnapshot.size);
            if (querySnapshot.size < 1) {
                // Word doesn't exist, add it to the database
                yield (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)(colRef, {
                    word: lowercaseWord,
                    createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)(),
                });
            }
            else {
            }
        }
    });
}


/***/ }),

/***/ "./src/popup.tsx":
/*!***********************!*\
  !*** ./src/popup.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _input_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input.css */ "./src/input.css");
/* harmony import */ var _fortawesome_fontawesome_free_css_all_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/all.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.css");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/esm/index.esm.js");
/* harmony import */ var _config_firebase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config/firebase */ "./config/firebase.js");
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logic */ "./src/logic.tsx");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



 // Import the Font Awesome CSS



const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getFirestore)(_config_firebase__WEBPACK_IMPORTED_MODULE_5__["default"]);
const Popup = () => {
    const [inputText, setInputText] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [words, setWords] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        chrome.runtime.sendMessage({ action: 'processHistory' });
        const colRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.collection)(db, 'words');
        const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.query)(colRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.orderBy)('createdAt'));
        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.onSnapshot)(q, snapshot => {
            const newWords = snapshot.docs.map((doc) => ({
                id: doc.id,
                word: doc.data().word,
            }));
            setWords(newWords);
        });
    }, []);
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };
    const handleAddWord = () => __awaiter(void 0, void 0, void 0, function* () {
        if (inputText.trim() !== '') {
            const colRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.collection)(db, 'words');
            const lowercaseWord = inputText.trim().toLowerCase(); // Convert word to lowercase
            const queryRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.query)(colRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.where)('word', '==', lowercaseWord)); // Check if the word already exists
            const querySnapshot = yield (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getDocs)(queryRef);
            if (querySnapshot.size > 0) {
                // Word already exists, handle it (e.g., show an error message)
                alert('This word already exists in the database.');
            }
            else {
                // Otherwise, add a new word
                const docRef = yield (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.addDoc)(colRef, {
                    word: lowercaseWord,
                    createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.serverTimestamp)(),
                });
                yield (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.addDoc)(colRef, {
                    id: docRef.id,
                    word: lowercaseWord,
                    createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.serverTimestamp)(),
                });
            }
            //setWords((prevWords) => [...prevWords, inputText]);
            setInputText('');
        }
    });
    const handleEditWord = (index) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedWord = prompt('Edit the word:', words[index].word);
        if (updatedWord !== null) {
            const lowercaseUpdatedWord = updatedWord.trim().toLowerCase();
            const colRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.collection)(db, 'words');
            // Get the document reference by document ID (assuming you have a unique ID for each word)
            const wordDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.doc)(colRef, words[index].id);
            console.log(index);
            try {
                yield (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.updateDoc)(wordDocRef, {
                    word: lowercaseUpdatedWord, // Store in lowercase
                });
                // Then, update the state with the edited word
                const updatedWords = [...words];
                updatedWords[index].word = lowercaseUpdatedWord;
                setWords(updatedWords);
            }
            catch (error) {
                console.error('Error updating word in Firestore:', error);
            }
        }
    });
    const handleDeleteWord = (index) => __awaiter(void 0, void 0, void 0, function* () {
        const wordToDelete = words[index].word;
        // First, find the document to delete in Firestore
        const colRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.collection)(db, 'words');
        const queryRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.query)(colRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.where)('word', '==', wordToDelete));
        const querySnapshot = yield (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getDocs)(queryRef);
        if (querySnapshot.size > 0) {
            const docToDelete = querySnapshot.docs[0]; // Assuming there's only one matching document
            yield (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.deleteDoc)(docToDelete.ref);
        }
        // Then, update the state to remove the deleted word
        const updatedWords = words.filter((_, i) => i !== index);
        setWords(updatedWords);
    });
    //   const handleDeleteWord = (index: number) => {
    //     const updatedWords = words.filter((_, i) => i !== index);
    //     setWords(updatedWords);
    //   };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "w-[250px] h-[500px] rounded-lg p-4 flex flex-col space-y-4 bg-white" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex items-center justify-between" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "text", value: inputText, onChange: handleInputChange, placeholder: "Enter a word", className: "w-full h-6 border border-gray-300 p-2 rounded-l" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { onClick: handleAddWord, className: "bg-blue-500 text-white py-1 px-2 rounded-r flex justify-center items-center" }, "Add")),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex-grow overflow-y-auto" }, words.map((wordObj, index) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { key: index, className: "flex items-center justify-between border-t py-2" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, wordObj.word),
            " ",
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "space-x-2" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { onClick: () => handleEditWord(index), className: "cursor-pointer" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", { className: "fas fa-pen text-blue-500" })),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { onClick: () => handleDeleteWord(index), className: "cursor-pointer" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", { className: "fas fa-times text-red-500" }))))))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex items-center justify-between space-x-6px" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex items-center justify-items-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { src: "icon128.png" // Replace with your logo URL
                    , alt: "Logo", className: "w-6 h-6" })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "space-x-4" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", { className: "fas fa-download text-green-500" })),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", { className: "fas fa-search text-blue-500" }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);
const container = document.createElement('div');
container.className = 'w-[250px] h-[500px] bg-gray-200'; // Adjust the radius as needed
document.body.appendChild(container);
const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
root.render(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Popup, null));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"popup": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkglotsnext"] = self["webpackChunkglotsnext"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_firebase_app_dist_esm_index_esm_js-node_modules_firebase_firestore_dist_-2b1f60","vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-b53f7e","vendors-node_modules_fortawesome_fontawesome-free_css_all_css","src_input_css"], () => (__webpack_require__("./src/popup.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=popup.js.map