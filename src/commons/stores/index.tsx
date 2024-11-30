import { create } from "zustand";

interface IBoards {
  id: number;
  title: string;
  content: string;
}

interface IBoardsState {
  data: IBoards[];
  count: number | null;
  setData: (newData: IBoards[], newCount: number | null) => void;
}

export const useBoardsStore = create<IBoardsState>((set) => ({
  data: [], // 기본값
  count: null,
  setData: (newData, newCount) =>
    set({
      count: newCount,
      data: newData,
    }),
}));
