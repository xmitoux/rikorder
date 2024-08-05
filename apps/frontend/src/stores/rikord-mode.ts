import { RIKORD_MODES } from '~/constants/rikord-mode';

import type { RikordModeInfo, RikordModeName } from '~/types/rikord-mode';

export const useRikordModeStore = defineStore('rikord-mode', () => {
  const currentRikordMode = ref<RikordModeInfo>(RIKORD_MODES.View);

  function setCurrentRikordMode(modeName: RikordModeName) {
    currentRikordMode.value = RIKORD_MODES[modeName];
  }

  return { currentRikordMode, setCurrentRikordMode };
});
