/*
 *  Copyright (C) The University of Sheffield - All Rights Reserved
 *  Written by Fabio Ciravegna (f.ciravegna@shef.ac.uk)
 *
 */
//在数据库里面是创建字段，创建以什么为索引的地方。具体的逻辑还需要在js里面书写
// Inside the database is where the fields are created and what is indexed by is created. The exact logic still needs to be written inside the js
import * as idb from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';


////////////////// DATABASE //////////////////
// the database receives from the server the following structure

/** class WeatherForecast{
 *  constructor (location, date, forecast, temperature, wind, precipitations) {
 *    this.location= location;
 *    this.date= date,
 *    this.forecast=forecast;
 *    this.temperature= temperature;
 *    this.wind= wind;
 *    this.precipitations= precipitations;
 *  }
 *}
 */
let db;

const STORY_DB_NAME= 'db_story';
const STORY_STORE_NAME= 'store_story';

/**
 * it inits the database and creates an index for the sum field
 */
async function initStoryDatabase(){
    if (!db) {
        //判断有没有数据库Determine if there is a database
        db = await idb.openDB(STORY_DB_NAME, 1, {
            upgrade(upgradeDb, oldVersion, newVersion) {
                if (!upgradeDb.objectStoreNames.contains(STORY_STORE_NAME)) {
                    let sumsDB = upgradeDb.createObjectStore(STORY_STORE_NAME, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    sumsDB.createIndex('name', 'creat_name', {unique: false, multiEntry: true});
                    sumsDB.createIndex('time', 'time', {unique: false, multiEntry: true});
                }
            }
        });
        console.log('db created');
    }
}
window.initStoryDatabase= initStoryDatabase;
/**
 * it saves the sum into the database sum保存到数据库
 * if the database is not supported, it will use localstorage
 * @param sumObject: name,roomNo,image_url,chat_input
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
            console.log('added item to the store! 仓库里增加了一个项目!'+ JSON.stringify(sumObject));
        } catch(error) {
            console.log('error: I could not store the element. Reason: '+error);
        }
    }

}
window.storeStoryData= storeStoryData;

/**
 * it retrieves all the numbers that have summed to sumValue from the database它从数据库中检索出所有与sumValue相加的数字。
 * if the database is not supported, it will use localstorage如果数据库不被支持，它将使用本地存储。
 * @param sumValue: a name
 * @returns objects like {name,roomNo,image_url,chat_input}
 */
async function getSumData(sumValue) {
    console.log("666"+sumValue)
    if (!db)
        await initDatabase();
    if (db) {
        console.log('fetching: ' + sumValue);
        let tx = await db.transaction(STORY_STORE_NAME, 'readonly');
        let store = await tx.objectStore(STORY_STORE_NAME);
        let index = await store.index('name');
        let readingsList = await index.getAll(IDBKeyRange.only(sumValue));
        await tx.complete;
        if (readingsList && readingsList.length > 0) {
            for (let elem of readingsList)
                addToResults(elem);//展示聊天记录 Show chat transcript
        } else {
            // if the database is not supported, we use localstorage
            const value = localStorage.getItem(sumValue);
            if (value == null)
                addToResults();
            else addToResults(value);
        }
    } else {
        const value = localStorage.getItem(sumValue);
        if (value == null)
            addToResults();
        else addToResults(value);
    }

}
window.getSumData= getSumData;
