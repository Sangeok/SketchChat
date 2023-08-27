import { atom } from "recoil";

export const allMessageAtom = atom<messageType[]>({
    key : 'AllMessageDataAtom',
    default : [],
})