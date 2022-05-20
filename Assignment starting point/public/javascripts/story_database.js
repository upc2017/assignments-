/*
 *  Copyright (C) The University of Sheffield - All Rights Reserved
 *  Written by Fabio Ciravegna (f.ciravegna@shef.ac.uk)
 *
 */
import * as idb from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

////////////////// DATABASE //////////////////
// the database receives from the server the following structure
// Inside the database is where the fields are created and what is indexed by is created. The exact logic still needs to be written inside the js

let db;

const STORY_DB_NAME= 'db_story';
const STORY_STORE_NAME= 'store_story';

/**
 * it inits the database and creates index for the name,time,storyDetails,storyTitle field
 */
async function initStoryDatabase(){
    if (!db) {
        db = await idb.openDB(STORY_DB_NAME, 1, {
            upgrade(upgradeDb, oldVersion, newVersion) {
                if (!upgradeDb.objectStoreNames.contains(STORY_STORE_NAME)) {
                    let sumsDB = upgradeDb.createObjectStore(STORY_STORE_NAME, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    sumsDB.createIndex('name', 'creat_name', {unique: false, multiEntry: true});
                    sumsDB.createIndex('time', 'time', {unique: false, multiEntry: true});
                    sumsDB.createIndex('storyDetails', 'creat_Details', {unique: false, multiEntry: true});
                    sumsDB.createIndex('storyTitle', 'creat_title', {unique: false, multiEntry: true});
                }
            }
        });
        console.log('db created');
    }
}

window.initStoryDatabase= initStoryDatabase;
/**
 * it saves the story into the database
 * if the database is not supported, it will use localstorage
 * @param sumObject: creat_name,creat_title,time,creat_Details,creat_image_url
 */

async function storeStoryData(sumObject) {
    console.log('inserting: '+JSON.stringify(sumObject));
    if (!db)
        await initStoryDatabase();
    if (db) {
        try{
            let tx = await db.transaction(STORY_STORE_NAME, 'readwrite');
            let store = await tx.objectStore(STORY_STORE_NAME);
            await store.put(sumObject);
            await  tx.complete;
            console.log('added item to the store! !'+ JSON.stringify(sumObject));
        } catch(error) {
            console.log('error: I could not store the element. Reason: '+error);
        }
    }

}
window.storeStoryData= storeStoryData;

/**
 * it retrieves all the story from the database
 * if the database is not supported, it will use localstorage
 * @returns objects like {creat_name,creat_title,time,creat_Details,creat_image_url}
 */
async function getStoryData() {
    if (!db)
        await initStoryDatabase();
    if (db) {
        let tx = await db.transaction(STORY_STORE_NAME, 'readonly');
        let store = await tx.objectStore(STORY_STORE_NAME);
        let index = await store.index('name');
        let readingsList = await index.getAll();
        console.log(readingsList)
        await tx.complete;
        if (readingsList && readingsList.length > 0) {
            for (let elem of readingsList)
                addToStory(elem);
        } else {
            // if the database is not supported, we use localstorage
            const value = localStorage.getItem(sumValue);
            if (value == null)
                addToStory();
            else addToStory(value);
        }
    } else {
        const value = localStorage.getItem(sumValue);
        if (value == null)
            addToStory();
        else addToStory(value);
    }

}
window.getStoryData= getStoryData;
