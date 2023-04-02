import { MyCreateSlice } from ".";
import { Room } from "../shared/types";
import roomConfig from "../config/exploration";
import { InventorySlice } from "./inventory";
import { StorySlice } from "./story";

export interface ExplorationSlice {
  isExploring: boolean;
  progress: number;
  rooms: Record<string, Room>;
  selectedRoom: string;

  startExploring: (room: Room) => void;
  updateProgress: (room: Room, progress: number) => void;
  stopExploring: (room: Room) => void;
  completeExploring: (room: Room) => void;
  setSelectedRoom: (roomId: string) => void;
}

const startingRoom = "garage";
const defaultRooms: Record<string, Room> = {};
Object.keys(roomConfig).forEach((roomId) => {
  defaultRooms[roomId] = {
    ...roomConfig[roomId],
    isDiscovered: roomId == startingRoom,
    isKnown: false,
    isExplored: false,
    currentProgress: 0,
    currentChunks: 0,
  };
});

const createExplorationSlice: MyCreateSlice<ExplorationSlice, [() => InventorySlice, () => StorySlice]> =
(set, get, inventory, story) => {
  return {
    isExploring: false,
    progress: 0,
    rooms: defaultRooms,
    selectedRoom: "",

    startExploring: (room: Room) => {
      set({
        progress: 0,
        isExploring: true,
      });
    },

    stopExploring: (room: Room) => {
      set({ isExploring: false });
    },

    updateProgress: (room: Room, progress: number) => {
      const newRooms = { ...get().rooms };
      newRooms[room.id] = {
        ...room,
        currentProgress: progress,
      };
      set({
        progress,
        rooms: newRooms,
      });
    },

    completeExploring: (room: Room) => {
      const newRooms = { ...get().rooms };
      const newRoom = {
        ...room,
        currentChunks: room.currentChunks + 1,
      };
      newRooms[room.id] = newRoom;

      const exploration = newRoom.explorations[room.currentChunks];
      exploration.doorReveals.forEach((roomId) => {
        newRooms[roomId] = {
          ...newRooms[roomId],
          isDiscovered: true,
        };
      });

      inventory().addItems(exploration.items);

      if (exploration.anecdote) {
        story().addStoryEntry(exploration.anecdote, exploration.isImportant);
      }

      if (newRoom.currentChunks >= newRoom.explorations.length) {
        newRoom.isExplored = true;
      }

      set({
        rooms: newRooms,
        isExploring: false,
      });
    },

    setSelectedRoom: (roomId: string) => {
      set({ selectedRoom: roomId });
    },
  };
};

export default createExplorationSlice;
