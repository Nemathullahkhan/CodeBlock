import { create } from "zustand";

export const progresStore = create((set,get)=>({
    contentProgress:{},


    set((state)=>({
        contentProgress:{
            ...state.contentProgress,
            [contentId]
        }
    }))
})) 