import { MyCreateSlice } from ".";
import { Level, LevelId, Room } from "../shared/types";
import { rooms, levels } from "../config/exploration";
import { InventorySlice } from "./inventory";
import { StorySlice } from "./story";
import globals from "../config/global";

export interface ExplorationSlice {
  isExploring: boolean;
  progress: number;
  levels: Record<LevelId, Level>;
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
Object.keys(rooms).forEach((roomId) => {
  defaultRooms[roomId] = {
    ...rooms[roomId],
    isDiscovered: roomId == startingRoom,
    isKnown: false,
    isExplored: false,
    currentProgress: 0,
    currentChunks: 0,
  };
});

const startingLevel = "Basement";
const defaultLevels: Record<LevelId, Level> = {};
Object.keys(levels).forEach((levelId) => {
  defaultLevels[levelId] = {
    ...levels[levelId],
    isDiscovered: levelId == startingLevel,
  };

  if (globals.FLOORS_TO_REVEAL.includes(levelId)) {
    for (let roomId of levels[levelId].rooms) {
      defaultRooms[roomId].isDiscovered = true;
    }
  }
});

const createExplorationSlice: MyCreateSlice<ExplorationSlice, [() => InventorySlice, () => StorySlice]> =
(set, get, inventory, story) => {
  return {
    isExploring: false,
    progress: 0,
    levels: defaultLevels,
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
