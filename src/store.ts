import { SettingType } from "./types";

export const setting = useStorage< SettingType | undefined>('vue-puzzles-setting', undefined)
