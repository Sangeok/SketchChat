import { atom } from "recoil";

export const createRoomAtom = atom<Boolean>({
    key : 'CreateRoomModalAtom',
    default : false,
})