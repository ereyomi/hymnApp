const defaultObjectStoreOption = {
  keyPath: 'id',
  autoIncrement: true
}
export const bluePrint = [
  {
    objectStore: 'favorite',
    objectStoreOption: defaultObjectStoreOption,
    fileindex: [
      { fileindex: 'hymnId', unique: true },
      { fileindex: 'hymn', unique: false },
      { fileindex: 'created_at', unique: false },
      { fileindex: 'editted_at', unique: false },
    ],
  },
  {
    objectStore: 'note',
    objectStoreOption: defaultObjectStoreOption,
    fileindex: [
      { fileindex: 'title', unique: false },
      { fileindex: 'note', unique: false },
      { fileindex: 'created_at', unique: false },
      { fileindex: 'editted_at', unique: false }
    ],
  },
  {
    objectStore: 'bibleStudyOnline',
    objectStoreOption: defaultObjectStoreOption,
    fileindex: [
      { fileindex: 'data', unique: false },
    ],
  },
  {
    objectStore: 'savedBibleStudy',
    objectStoreOption: {
      keyPath: 'id',
    },
    fileindex: [
      { fileindex: 'data', unique: false },
      { fileindex: 'created_at', unique: false },
      { fileindex: 'editted_at', unique: false }
    ],
  },
];
