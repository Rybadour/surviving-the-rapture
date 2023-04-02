import { MyCreateSlice } from ".";

export interface StoryEntry {
  id: number;
  text: string;
  isImportant: boolean;
}

export interface StorySlice {
  entries: StoryEntry[],

  addStoryEntry: (text: string, isImportant: boolean) => void,
}

const createStorySlice: MyCreateSlice<StorySlice, []> = (set, get) => {
  return {
    entries: [],

    addStoryEntry: (text: string, isImportant: boolean) => {
      const newEntries = [ ...get().entries ];
      const newEntry = { text, isImportant, id: newEntries.length };
      newEntries.push(newEntry);
      set({ entries: newEntries });
    },
  };
};
export default createStorySlice;