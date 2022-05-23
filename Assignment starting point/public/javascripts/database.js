/**
 * IndexedDB
 * The database receives from the server the following structure
 * Initialize database, store data, fetch data
 * Inside the database is where the fields are created and what is indexed by is created.
 * The exact logic still needs to be written inside the js
 */
import * as idb from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

let db;
const CHAT_DB_NAME = 'db_chat';
const CHAT_STORE_NAME = 'store_chat';
const CANVAS_STORE_NAME = 'store_canvas';
const KNOW_STORE_NAME = 'know_canvas';

/**
 * it inits the database and creates indexes for the fields name,roomNO,name_roomNo
 */
async function initDatabase() {
    if (!db) {
        db = await idb.openDB(CHAT_DB_NAME, 2, {
            upgrade(upgradeDb, oldVersion, newVersion) {
                if (!upgradeDb.objectStoreNames.contains(CHAT_STORE_NAME)) {
                    let sumsDB = upgradeDb.createObjectStore(CHAT_STORE_NAME, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    sumsDB.createIndex('name', 'name', {unique: false, multiEntry: true});
                    sumsDB.createIndex('roomNo', 'roomNo', {unique: false, multiEntry: true});
                    sumsDB.createIndex('name_roomNo', ["name", "roomNo"], {unique: false});
                }
                if (!upgradeDb.objectStoreNames.contains(CANVAS_STORE_NAME)) {
                    let sumsDB = upgradeDb.createObjectStore(CANVAS_STORE_NAME, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    sumsDB.createIndex('name', 'name', {unique: false, multiEntry: true});
                    sumsDB.createIndex('name_roomNo', ["name", "roomNo"], {unique: false});
                }
                if (!upgradeDb.objectStoreNames.contains(KNOW_STORE_NAME)) {
                    let sumsDB = upgradeDb.createObjectStore(KNOW_STORE_NAME, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    sumsDB.createIndex('name_roomNo', ["name", "roomNo"], {unique: false});
                }
            }
        });
        console.log('db created');
    }
}
window.initDatabase = initDatabase;

/**
 * Execute this method to delete the canvas indexedDB database
 */
async function deleteDatabase() {
    if (!db)
        await initDatabase();
    if (db) {

        indexedDB.deleteDatabase(CHAT_DB_NAME);

    }
}
window.deleteDatabase = deleteDatabase;

/**
 * it saves the chat content into the database
 * if the database is not supported, it will use localstorage
 * @param sumObject: name,roomNo,chat_input
 */
async function storeSumData(sumObject) {
    console.log('inserting: ' + JSON.stringify(sumObject));
    if (!db)
        await initDatabase();
    if (db) {
        try {
            let tx = await db.transaction(CHAT_STORE_NAME, 'readwrite');
            let store = await tx.objectStore(CHAT_STORE_NAME);
            await store.put(sumObject);
            await tx.complete;
            console.log('added item to the store! !' + JSON.stringify(sumObject));
        } catch (error) {
            console.log('error: I could not store the element. Reason: ' + error);
        }
    }

}
window.storeSumData = storeSumData;

/**
 * it saves the canvas into the database
 * if the database is not supported, it will use localstorage
 * @param sumObject: roomNo: room,name:userId,canvas_width,canvas_height,prevX,prevY,currX,color,thickness
 */
async function storeCanvasData(sumObject) {
    console.log('inserting: ' + JSON.stringify(sumObject));
    if (!db)
        await initDatabase();
    if (db) {
        try {
            console.log(sumObject)
            let tx = await db.transaction(CANVAS_STORE_NAME, 'readwrite');
            let store = await tx.objectStore(CANVAS_STORE_NAME);
            await store.put(sumObject);
            await tx.complete;
            console.log('added Canvas to the store!!' + JSON.stringify(sumObject));
        } catch (error) {
            console.log('error: I could not store the element. Reason: ' + error);
        }
    }

}
window.storeCanvasData = storeCanvasData;

/**
 * it saves the knowledgeGraph into the database
 * if the database is not supported, it will use localstorage
 * @param sumObject: data
 */
async function storeKnowsData(sumObject) {
    console.log('inserting: ' + JSON.stringify(sumObject));
    if (!db)
        await initDatabase();
    if (db) {
        try {
            console.log("存入成功！！！！！！！！！！know")
            console.log(sumObject)
            let tx = await db.transaction(KNOW_STORE_NAME, 'readwrite');
            let store = await tx.objectStore(KNOW_STORE_NAME);
            await store.put(sumObject);
            await tx.complete;
            console.log('added Canvas to the store!!' + JSON.stringify(sumObject));
        } catch (error) {
            console.log('error: I could not store the element. Reason: ' + error);
        }
    }

}
window.storeKnowsData = storeKnowsData;

/**
 * it retrieves all the Chat transcript from the database
 * if the database is not supported, it will use localstorage
 * @param sumValue: roomNo,name,chat_input
 */
async function getChatData(sumValue) {
    if (!db)
        await initDatabase();
    if (db) {
        console.log('fetching: ' + sumValue);
        let tx = await db.transaction(CHAT_STORE_NAME, 'readonly');
        let store = await tx.objectStore(CHAT_STORE_NAME);
        let index = await store.index('name_roomNo');
        console.log(index)
        let readingsList = await index.getAll(IDBKeyRange.only([name, roomNo]));
        console.log(readingsList)
        await tx.complete;
        if (readingsList && readingsList.length > 0) {
            for (let elem of readingsList)
                addChatView(elem);
        } else {
            // if the database is not supported, we use localstorage
            const value = localStorage.getItem(sumValue);
            if (value == null)
                addChatView();
            else addChatView(value);
        }
    } else {
        const value = localStorage.getItem(sumValue);
        if (value == null)
            addChatView();
        else addChatView(value);
    }

}
window.getChatData = getChatData;

/**
 * it retrieves all the canvas from the database
 * if the database is not supported, it will use localstorage
 * @param sumValue: roomNo: room,name:userId,canvas_width,canvas_height,prevX,prevY,currX,color,thickness
 */
async function getCanvasData(name,roomNo) {
    if (!db)
        await initDatabase();
    if (db) {
        console.log('fetching: ' + name);
        let tx = await db.transaction(CANVAS_STORE_NAME, 'readonly');
        let store = await tx.objectStore(CANVAS_STORE_NAME);
        let index = await store.index('name_roomNo');
        console.log([name,roomNo])
        let readingsList = await index.getAll(IDBKeyRange.only([name,roomNo]));
        await tx.complete;
        if (readingsList && readingsList.length > 0) {
            for (let elem of readingsList)
                addToCanvas(elem);// Show chat transcript
        } else {
            // if the database is not supported, we use localstorage
            const value = localStorage.getItem(sumValue);
            if (value == null)
                addToCanvas();
            else addToCanvas(value);
        }
    } else {
        const value = localStorage.getItem(sumValue);
        if (value == null)
            addToCanvas();
        else addToCanvas(value);
    }

}
window.getCanvasData = getCanvasData;

/**
 * it retrieves all the knowledge from the database
 * if the database is not supported, it will use localstorage
 */
async function getKnowData() {
    if (!db)
        await initDatabase();
    if (db) {
        let tx = await db.transaction(KNOW_STORE_NAME, 'readonly');
        let store = await tx.objectStore(KNOW_STORE_NAME);
        let index = await store.index('name_roomNo');
        let readingsList = await index.getAll(IDBKeyRange.only([name, roomNo]));
        await tx.complete;
        console.log(readingsList)
        if (readingsList && readingsList.length > 0) {
            for (let elem of readingsList)
                addToKnowledge(elem);// Show chat transcript
        } else {
            // if the database is not supported, we use localstorage
            const value = localStorage.getItem(sumValue);
            if (value == null)
                addToKnowledge();
            else addToKnowledge(value);
        }
    } else {
        const value = localStorage.getItem(sumValue);
        if (value == null)
            addToCanvas();
        else addToCanvas(value);
    }

}
window.getKnowData = getKnowData;
