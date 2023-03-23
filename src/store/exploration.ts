import { MyCreateSlice } from ".";
import { Room } from "../shared/types";
import roomConfig from "../config/exploration";

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
    remainingItems: [],
  };
});

const createExplorationSlice: MyCreateSlice<ExplorationSlice, []> = (set, get) => {
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
      newRooms[room.id] = {
        ...room,
        isExplored: true,
      };
      room.connectedRooms.forEach((roomId) => {
        newRooms[roomId] = {
          ...newRooms[roomId],
          isDiscovered: true,
        };
      });
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
