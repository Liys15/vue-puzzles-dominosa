import { SettingType } from "./types";

// const initSetting:SettingType =

export const setting = useStorage<SettingType>('vue-puzzles-setting', {orderNum: 0})
