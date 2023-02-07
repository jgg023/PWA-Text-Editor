import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
  console.log('SAVE/PUT to the database');
  const jateDb = await openDB('jate', 1);
  const txn = jateDb.transaction('jate', 'readwrite');
  const dbStore = txn.objectStore('jate');
  const req = dbStore.put({ id: 1, value: content });
  const res = await req;
  console.log('  data put/saved to the database', res.value);
} 

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('READ?GET from the database');
  const jateDb = await openDB('jate', 1);
  const txn = jateDb.transaction('jate', 'readonly');
  const dbStore = txn.objectStore('jate');
  const req = dbStore.get(1);
  const res = await req;
  res
    ? console.log(' data retrieved from the database', res.value)
    : console.log(' data not found in the database');
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return res?.value;
}

initdb();
