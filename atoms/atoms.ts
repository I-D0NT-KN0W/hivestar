import { atom } from "recoil";

export const dataAtom = atom<string>({
    key: "user",
    default: "",
})