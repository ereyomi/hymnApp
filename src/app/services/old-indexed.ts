
import { Injectable } from '@angular/core';
import { bluePrint } from './dbBluePrint';

@Injectable({
  providedIn: 'root'
})

export class IndexedDbService {
  version = 1;
  nameOfDataBase = 'rcffupre';
  indexedDB: any;
  uniqueId: any;
  DB: any;
  appDBsetUp = bluePrint;

  constructor() { }

  createUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      dt = Math.floor(dt / 16);
      // tslint:disable-next-line:no-bitwise
      const r = (dt + Math.random() * 16) % 16 | 0;
      // tslint:disable-next-line:no-bitwise
      return (char === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    this.uniqueId = uuid;
    console.log('uniqueid: ', this.uniqueId);
  }

  openIndexedDB(myObjectStore: string = '' , myfileindex: any = '') {
    /* ObjectStore is same as table in mysql and fileIndex is a column*/

    /* myfileindex is and array of object --
    k = [{fileindex: 'me', unique: true}, {fileindex: 'hmmm', unique: false}];
    */
    this.indexedDB = window.indexedDB;
    if (!this.indexedDB) {
      console.log('Your App doesnt support indexedDB');
      alert('Your App doesnt support indexedDB');
      return;
    }
    const openDB = indexedDB.open(this.nameOfDataBase, this.version);
    console.log('database created');
    // continue process
    openDB.onupgradeneeded = () => {
        const db = openDB.result;

        this.appDBsetUp.forEach((data, index) => {
          const store = db.createObjectStore(
            data.objectStore,
            {
                keyPath: 'id',
                autoIncrement: true
            }
          );
          [...data.fileindex].forEach((findex: any) => {
            store.createIndex(`${findex.fileindex}`, `${findex.fileindex}`, {unique: findex.unique});
          });
        });
        // store.createIndex(myfileindex, myfileindex, {unique: false})
        console.log('database is ok');
    };
    this.DB = openDB;
    return openDB;
  }
  getStoreIndexedDb(passedInDatabase: any = '', objectStoreName: string) {
    // table is same as objectStore
    const database: any = {};
    if (this.DB) {
      passedInDatabase = this.DB;
    }
    database.getDb = passedInDatabase.result;
    database.tx = database.getDb.transaction(objectStoreName, 'readwrite');
    database.store = database.tx.objectStore(objectStoreName);
    /* this is not need as there might be multiple fileindex (column -mysql) */
    // database.index = database.store.index(fileindex);
    return database;
  }
  async insert(data: any) {
    /* myfileindex is and array of object --
      k = [{fileindex: 'me', unique: true}, {fileindex: 'hmmm', unique: false}];
    */

    const {objectStoreName, fileindex, id, ...otherData} = data;
    // generate unique ID
    await this.createUUID();

    const toSaveData = {
      // id: this.uniqueId,
      ...otherData
    };

    const openmydb = this.openIndexedDB(objectStoreName, fileindex);
    openmydb.onsuccess = async () => {
       const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
       getdb.store.add(toSaveData);
       console.log('inserted sucessfully... ');
    };
    openmydb.onerror = () => {
      console.log('an error occur while trying to indexedBD');
    };
  }
  updateData(data: any) {
    console.log(data);
    const {objectStoreName, fileindex, ...otherData} = data;
    return new Promise((resolve: any, reject: any) => {
      const openmydb = this.openIndexedDB(objectStoreName, fileindex);
      openmydb.onsuccess = async () => {
        const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
        const getIt = await getdb.store.get(otherData.id);
        getIt.onsuccess = async () => {
          console.log('this is the result i got: ', getIt.result);
          const update = await getdb.store.put(otherData);
          update.onsuccess = () => {
            console.log('updated sucessfull');
            resolve(update.result);
          },
          update.onerror = (e: any) => reject(e);
        };
        getIt.onerror = (e: any) => reject(e);
      };
      openmydb.onerror = () => {
        console.log('an error occur while trying to connect to indexedBD');
        return {error: `an error occur while trying to getAll data from ${objectStoreName}`};
      };
    });
  }
  getAll(data: any) {
    console.log(data);
    const {objectStoreName, fileindex} = data;
    return new Promise((resolve: any, reject: any) => {
      const openmydb = this.openIndexedDB(objectStoreName, fileindex);
      openmydb.onsuccess = async () => {
        const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
        const getItAll = await getdb.store.getAll();
        getItAll.onsuccess = () => resolve(getItAll.result);
        getItAll.onerror = (e: any) => reject(e);
        // return getAll;
      };
      openmydb.onerror = () => {
        console.log('an error occur while trying to connect to indexedBD');
        return {error: `an error occur while trying to getAll data from ${objectStoreName}`};
      };
    });
  }
  getAllDataInDescOrder(data: any) {
    const notes: any[] = [];
    const {objectStoreName, fileindex} = data;
    return new Promise((resolve: any, reject: any) => {
      const openmydb = this.openIndexedDB(objectStoreName, fileindex);
      openmydb.onsuccess = async () => {
        const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
        const getItAll = await getdb.store.openCursor(null, 'prev');
        getItAll.onsuccess = () => {
          if (getItAll.result) {
            // console.log(getItAll.result);
            notes.push(getItAll.result.value);
            getItAll.result.continue();
          } else {
            resolve(notes);
            // console.log('thats all the data', notes);
          }
        };
        getItAll.onerror = (e: any) => reject(e);
        // return getAll;
      };
      openmydb.onerror = () => {
        console.log('an error occur while trying to connect to indexedBD');
        return {error: `an error occur while trying to getAll data from ${objectStoreName}`};
      };
    });
  }
  getData(data: any) {
    console.log(data);
    const {objectStoreName, fileindex, ...otherData} = data;
    return new Promise((resolve: any, reject: any) => {
      const openmydb = this.openIndexedDB(objectStoreName, fileindex);
      openmydb.onsuccess = async () => {
        const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
        const getItAll = await getdb.store.get(otherData.id);
        getItAll.onsuccess = () => resolve(getItAll.result);
        getItAll.onerror = (e: any) => reject(e);
      };
      openmydb.onerror = () => {
        console.log('an error occur while trying to connect to indexedBD');
        return {error: `an error occur while trying to getAll data from ${objectStoreName}`};
      };
    });
  }
  deleteData(data: any) {
    console.log(data);
    const {objectStoreName, fileindex, ...otherData} = data;
    return new Promise((resolve: any, reject: any) => {
      const openmydb = this.openIndexedDB(objectStoreName, fileindex);
      openmydb.onsuccess = async () => {
        const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
        const getIt = await getdb.store.delete(otherData.id);
        getIt.onsuccess = async () => {
          console.log('deleted: ', getIt.result);
          resolve(getIt.result);
        };
        getIt.onerror = (e: any) => reject(e);
      };
      openmydb.onerror = () => {
        console.log('an error occur while trying to connect to indexedBD');
        return {error: `an error occur while trying to getAll data from ${objectStoreName}`};
      };
    });
  }

  getByIndex(data: any) {
    console.log(data);
    const {objectStoreName, fileindex, ...otherData} = data;
    return new Promise((resolve: any, reject: any) => {
      const openmydb = this.openIndexedDB(objectStoreName, fileindex);
      openmydb.onsuccess = async () => {
        const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
        const index = await getdb.store.index(otherData.index);
        const indexData = index.get(otherData.indexData);
        indexData.onsuccess = () => resolve(indexData.result);
        indexData.onerror = (e: any) => {
          console.log('I couldnt get it Ereyomi');
          reject(e);
        };
      };
      openmydb.onerror = () => {
        console.log('an error occur while trying to connect to indexedBD');
        return {error: `an error occur while trying to getAll data from ${objectStoreName}`};
      };
    });
  }

}
