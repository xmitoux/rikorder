<script setup lang="ts">
import { RIKORD_MODE_ICONS, RIKORD_MODES } from '~/constants/rikord-mode';

import type { QFabActionProps } from 'quasar';

type MenuName = 'Rikorder' | '梨子ちゃんライブラリ' | 'Rikord一覧' | 'ランキング' | '集計' | '設定';
type Menu = { name: MenuName; icon: string; selectedIcon: string; path: string; selected: boolean };

const menus = ref<Menu[]>([
  { name: 'Rikorder', icon: 'mdi-home-outline', selectedIcon: 'mdi-home-heart', path: '/', selected: false },
  { name: '梨子ちゃんライブラリ', icon: 'mdi-image-multiple-outline', selectedIcon: 'mdi-image-multiple', path: '/riko-library', selected: false },
  { name: 'Rikord一覧', icon: 'mdi-clipboard-text-outline', selectedIcon: 'mdi-clipboard-text', path: '/rikords', selected: false },
  { name: 'ランキング', icon: 'mdi-crown-outline', selectedIcon: 'mdi-crown', path: '/ranking', selected: false },
  { name: '集計', icon: 'mdi-chart-box-outline', selectedIcon: 'mdi-chart-box', path: '/chart', selected: false },
  { name: '設定', icon: 'mdi-cog-outline', selectedIcon: 'mdi-cog', path: '/config', selected: false },
]);

const headerTitle = ref<MenuName | ''>('');

const moveMenu = (selectedMenu: Menu) => {
  headerTitle.value = selectedMenu.name;

  updateSelectedMenu(selectedMenu.path);

  navigateTo(selectedMenu.path);
};

// メニュー選択時にヘッダータイトルとメニューアイコンの外観を変更する
const router = useRouter();
const updateSelectedMenu = (path: string) => {
  if (!menus.value.map(menu => menu.path).includes(path)) {
    // 子画面から戻ったとき用
    // (引数のpathには子画面のパスが入るので、戻ってきたページのpathを設定する)
    path = router.currentRoute.value.path;
  }

  for (const menu of menus.value) {
    menu.selected = menu.path === path;

    if (menu.selected) {
      headerTitle.value = menu.name;
    }
  }
};

// 画面読み込み時に現在のパスに一致するメニューを選択する
const route = useRoute();
updateSelectedMenu(route.path);

const store = useRikordModeStore();

const fab = ref(false);
const fabIcon = computed(() => RIKORD_MODE_ICONS[store.currentRikordMode.modeName]());
const fabPropsList = computed<QFabActionProps[]>(() => {
  return [
    {
      icon: RIKORD_MODE_ICONS.View(store.currentRikordMode.modeName !== 'View'),
      label: RIKORD_MODES.View.modeName,
      onClick: () => store.setCurrentRikordMode('View'),
    },
    {
      icon: RIKORD_MODE_ICONS.Solo(store.currentRikordMode.modeName !== 'Solo'),
      label: RIKORD_MODES.Solo.modeName,
      onClick: () => store.setCurrentRikordMode('Solo'),
    },
    {
      icon: RIKORD_MODE_ICONS.Multi(store.currentRikordMode.modeName !== 'Multi'),
      label: RIKORD_MODES.Multi.modeName,
      onClick: () => store.setCurrentRikordMode('Multi'),
    },
  ];
});

const isFabHideen = computed(() => headerTitle.value === '梨子ちゃんライブラリ');
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-pink-2 text-dark header">
      <q-toolbar>
        <q-toolbar-title class="text-center q-pr-none" :class="{ 'q-ml-xl': !isFabHideen }">
          {{ headerTitle }}
        </q-toolbar-title>

        <q-fab v-model="fab" :class="{ hidden: isFabHideen }" color="white" direction="down" external-label flat :icon="fabIcon" padding="0 10px" vertical-actions-align="left">
          <q-fab-action v-for="fabProps in fabPropsList" v-bind="fabProps" :key="fabProps.label" color="pink-2" external-label label-position="left" unelevated />
        </q-fab>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-lg">
        <slot />
      </q-page>
    </q-page-container>

    <q-footer class="bg-pink-2 text-white footer">
      <q-toolbar>
        <template v-for="(menu, index) in menus" :key="menu.name">
          <q-icon
            :name="menu.selected ? menu.selectedIcon : menu.icon"
            size="md"
            @click="moveMenu(menu)"
          />

          <!-- 最後のメニュー横にはスペースを置かない -->
          <q-space v-if="index !== menus.length - 1" />
        </template>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/_variables.scss" as var;

.header {
  height: var.$app-header-height;
}

.footer {
  height: var.$app-footer-height;
}
</style>
