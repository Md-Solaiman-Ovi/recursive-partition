import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Partition {
  id: string;
  color: string;
  direction?: 'v' | 'h';
  size: number; // Size in percentage
  children: Partition[];
}

const randomColor = (): string => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const initialState: Partition[] = [
  {
    id: uuidv4(),
    color: randomColor(),
    size: 100,
    children: [],
  },
];

const partitionsSlice = createSlice({
  name: 'partitions',
  initialState,
  reducers: {
    splitPartition: (state, action: PayloadAction<{ id: string; direction: 'v' | 'h' }>) => {
      const { id, direction } = action.payload;
      const findPartition = (partitions: Partition[]): Partition | undefined => {
        for (const partition of partitions) {
          if (partition.id === id) return partition;
          if (partition.children.length > 0) {
            const found = findPartition(partition.children);
            if (found) return found;
          }
        }
        return undefined;
      };

      const partition = findPartition(state);
      if (partition && partition.children.length === 0) {
        partition.direction = direction;
        partition.children = [
          { id: uuidv4(), color: partition.color, size: 50, children: [] },
          { id: uuidv4(), color: randomColor(), size: 50, children: [] },
        ];
      }
    },
    removePartition: (state, action: PayloadAction<string>) => {
      const removeHelper = (partitions: Partition[], id: string): void => {
        for (let i = partitions.length - 1; i >= 0; i--) {
          const partition = partitions[i];

          if (partition.id === id) {
            // Remove the partition
            partitions.splice(i, 1);
            return;
          }

          if (partition.children.length > 0) {
            removeHelper(partition.children, id);

            // Merge child into the parent if only one child remains
            if (partition.children.length === 1) {
              const [remainingChild] = partition.children;
              partition.color = remainingChild.color;
              partition.size = remainingChild.size;
              partition.children = [];
              partition.direction = undefined;
            }
          }
        }
      };

      // Call the helper function to update the partitions in place
      removeHelper(state, action.payload);
    },
   
  },
});

export const { splitPartition, removePartition, } = partitionsSlice.actions;
export default partitionsSlice.reducer;
