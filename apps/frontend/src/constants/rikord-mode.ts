import type { RikordModeInfo, RikordModeName } from '~/types/rikord-mode';

// Rikordモード値の定義
export const RIKORD_MODE_VALUES = {
  View: 1,
  Solo: 2,
  Multi: 3,
} as const;

// 実際に使用するRikordモード定数
export const RIKORD_MODES: Record<RikordModeName, RikordModeInfo> = {
  View: { id: RIKORD_MODE_VALUES.View, modeName: 'View' },
  Solo: { id: RIKORD_MODE_VALUES.Solo, modeName: 'Solo' },
  Multi: { id: RIKORD_MODE_VALUES.Multi, modeName: 'Multi' },
} as const;
