import { atom } from "recoil";

export const chatCheckAtom = atom<boolean>({
    key : 'chatStartAtom',
    default : false,
})