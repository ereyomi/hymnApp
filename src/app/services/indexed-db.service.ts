import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { bluePrint } from './dbBluePrint';

@Injectable({
    providedIn: 'root'
})

export class IndexedDbService {
    version = 1;
    nameOfDataBase = 'rcfFupreHymnApp';
    indexedDB: any;
    uniqueId: any;
    DB: any;
    appDBsetUp = bluePrint;

    notes: BehaviorSubject<Array<any>> = new BehaviorSubject(null);

    constructor() { }
    getNotes(): Observable<any> {
        return this.notes.asObservable();
    }

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
    }

    openIndexedDB() {
        /* ObjectStore is same as table in mysql and fileIndex is a column*/

        /* myfileindex is and array of object --
        k = [{fileindex: 'me', unique: true}, {fileindex: 'hmmm', unique: false}];
        */
        this.indexedDB = window.indexedDB;
        if (!this.indexedDB) {
            alert('Your App doesnt support indexedDB');
            return;
        }
        const openDB = indexedDB.open(this.nameOfDataBase, this.version);
        // continue process
        openDB.onupgradeneeded = () => {
            const db = openDB.result;

            this.appDBsetUp.forEach((data) => {
                const store = db.createObjectStore(
                    data.objectStore,
                    data.objectStoreOption
                );
                [...data.fileindex].forEach((findex: any) => {
                    store.createIndex(`${ findex.fileindex }`, `${ findex.fileindex }`, { unique: findex.unique });
                });
            });
            // store.createIndex(myfileindex, myfileindex, {unique: false});
        };
        this.DB = openDB;
        return openDB;
    }
    getStoreIndexedDb(passedInDatabase: any = '', objectStoreName: string) {
        // table is same as objectStore
        const database: any = {};
        /* if (this.DB) {
          passedInDatabase = this.DB;
        } */
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

        const { objectStoreName, fileindex, id, ...otherData } = data;
        // generate unique ID
        this.createUUID();

        const toSaveData = {
            // id: this.uniqueId,
            ...otherData
        };
        /* const getdb = await this.getStoreIndexedDb(this.DB, objectStoreName);
        getdb.store.add(toSaveData);
        console.log('inserted sucessfully... '); */
        return new Promise((resolve: any, reject: any) => {
            const openmydb = this.openIndexedDB();
            openmydb.onsuccess = async () => {
                const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
                const inserting = getdb.store.add(toSaveData);
                inserting.onsuccess = () => resolve(inserting.result);
                inserting.onerror = (e: any) => reject(e);
            };
            openmydb.onerror = () => {
                return { error: `an error occur while trying to getAll data from ${ objectStoreName }` };
            };
        });
    }
    updateData(data: any) {
        console.log(data);
        const { objectStoreName, fileindex, ...otherData } = data;
        return new Promise((resolve: any, reject: any) => {
            const openmydb = this.openIndexedDB();
            openmydb.onsuccess = async () => {
                const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
                const getIt = await getdb.store.get(otherData.id);
                getIt.onsuccess = async () => {
                    const update = await getdb.store.put(otherData);
                    update.onsuccess = () => {
                        resolve(update.result);
                    },
                        update.onerror = (e: any) => reject(e);
                };
                getIt.onerror = (e: any) => reject(e);
            };
            openmydb.onerror = () => {
                return { error: `an error occur while trying to getAll data from ${ objectStoreName }` };
            };
        });
    }
    getAll(data: any): Promise<any[]> {
        const { objectStoreName, fileindex } = data;
        return new Promise((resolve: any, reject: any) => {
            const openmydb = this.openIndexedDB();
            openmydb.onsuccess = async () => {
                const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
                const getItAll = await getdb.store.getAll();
                getItAll.onsuccess = () => resolve(getItAll.result);
                getItAll.onerror = (e: any) => reject(e);
            };
            openmydb.onerror = () => {
                return { error: `an error occur while trying to getAll data from ${ objectStoreName }` };
            };
        });
    }
    getAllDataInDescOrder(data: any) {
        const notes: any[] = [];
        const { objectStoreName } = data;
        return new Promise((resolve: any, reject: any) => {
            const openmydb = this.openIndexedDB();
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
                        this.notes.next(notes);
                        // console.log('thats all the data', notes);
                    }
                };
                getItAll.onerror = (e: any) => reject(e);
                // return getAll;
            };
            openmydb.onerror = () => {
                return { error: `an error occur while trying to getAll data from ${ objectStoreName }` };
            };
        });
    }
    getData(data: any) {
        const { objectStoreName, ...otherData } = data;
        return new Promise((resolve: any, reject: any) => {
            const openmydb = this.openIndexedDB();
            openmydb.onsuccess = async () => {
                const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
                const getItAll = await getdb.store.get(otherData.id);
                getItAll.onsuccess = () => resolve(getItAll.result);
                getItAll.onerror = (e: any) => reject(e);
            };
            openmydb.onerror = () => {
                return { error: `an error occur while trying to getAll data from ${ objectStoreName }` };
            };
        });
    }
    deleteData(data: any) {
        const { objectStoreName, ...otherData } = data;
        return new Promise((resolve: any, reject: any) => {
            const openmydb = this.openIndexedDB();
            openmydb.onsuccess = async () => {
                const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
                const getIt = await getdb.store.delete(otherData.id);
                getIt.onsuccess = async () => {
                    const getAll = await this.getAllDataInDescOrder({ objectStoreName });
                    resolve(getAll);
                };
                getIt.onerror = (e: any) => reject(e);
            };
            openmydb.onerror = () => {
                return { error: `an error occur while trying to getAll data from ${ objectStoreName }` };
            };
        });
    }

    getByIndex(data: any) {
        const { objectStoreName, ...otherData } = data;
        return new Promise((resolve: any, reject: any) => {
            const openmydb = this.openIndexedDB();
            openmydb.onsuccess = async () => {
                const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
                const index = await getdb.store.index(otherData.index);
                const indexData = index.get(otherData.indexData);
                indexData.onsuccess = () => resolve(indexData.result);
                indexData.onerror = (e: any) => {
                    reject(e);
                };
            };
            openmydb.onerror = () => {
                return { error: `an error occur while trying to getAll data from ${ objectStoreName }` };
            };
        });
    }
    addDataWithId(data: any) {
        const { objectStoreName, fileindex, ...otherData } = data;
        return new Promise((resolve: any, reject: any) => {
            const openmydb = this.openIndexedDB();
            openmydb.onsuccess = async () => {
                const getdb = await this.getStoreIndexedDb(openmydb, objectStoreName);
                const getIt = await getdb.store.get(otherData.id);
                getIt.onsuccess = async () => {
                    const update = await getdb.store.put(otherData);
                    update.onsuccess = () => {
                        resolve(update.result);
                    };
                    update.onerror = async (e: any) => {
                        return await this.insert(data);
                    };
                };
                getIt.onerror = (e: any) => reject(e);
            };
            openmydb.onerror = () => {
                return { error: `an error occur while trying to getAll data from ${ objectStoreName }` };
            };
        });
    }

}
