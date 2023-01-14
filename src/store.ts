import { SettingType } from "./types";

export const setting = useStorage<SettingType>('vue-puzzles-dominosa-setting', {orderNum: undefined})

// export const state = useStorage<Record<number, DominosaBlock[][]>>('vue-puzzles-dominosa-board', {})
