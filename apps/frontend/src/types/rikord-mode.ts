import type { RIKORD_MODE_VALUES } from '~/constants/rikord-mode';

// Rikordモード値をtype化
export type RikordModeValue = typeof RIKORD_MODE_VALUES[keyof typeof RIKORD_MODE_VALUES];

// Rikordモード名をtype化
export type RikordModeName = keyof typeof RIKORD_MODE_VALUES;

// Rikordモードの各情報のtype
export type RikordModeInfo = {
  id: RikordModeValue;
  modeName: RikordModeName;
};
