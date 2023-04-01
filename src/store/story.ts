import { MyCreateSlice } from ".";

export interface StorySlice {
  entries: string[],

  addStoryEntry: (text: string) => void,
}

const createStorySlice: MyCreateSlice<StorySlice, []> = (set, get) => {
  return {
    entries: [],

    addStoryEntry: (text: string) => {
      set({ entries: [...get().entries, text] });
    },
  };
};
export default createStorySlice;