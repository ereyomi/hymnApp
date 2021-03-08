export const bluePrint = [
  {
    objectStore: 'favorite',
    fileindex: [
      { fileindex: 'hymnId', unique: true },
      { fileindex: 'hymn', unique: false },
      { fileindex: 'created_at', unique: false },
      { fileindex: 'editted_at', unique: false },
    ],
  },
  {
    objectStore: 'hymnsnote',
    fileindex: [
      { fileindex: 'title', unique: false },
      { fileindex: 'note', unique: false },
      { fileindex: 'created_at', unique: false },
      { fileindex: 'editted_at', unique: false }
    ],
  },
  {
    objectStore: 'bibleStudyOnline',
    fileindex: [
      { fileindex: 'data', unique: false },
    ],
  },
];
