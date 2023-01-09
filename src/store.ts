import { DominosaBlock, SettingType } from "./types";

export const setting = useStorage<SettingType>('vue-puzzles-dominosa-setting', {orderNum: 0})

// export const state = useStorage<Record<number, DominosaBlock[][]>>('vue-puzzles-dominosa-board', {})
