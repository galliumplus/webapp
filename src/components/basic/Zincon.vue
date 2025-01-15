<script setup lang="ts">
const icons = {
  zn: '\uE000',
  cart: '\uE001',
  entrance: '\uE002',
  exit: '\uE003',
  mail: '\uE004',
  'mail-fast': '\uE005',
  user: '\uE006',
  'user-group': '\uE007',
  home: '\uE008',
  'arrow-box-in': '\uE009',
  'arrow-box-out': '\uE00A',
  'arrow-parent': '\uE00B',
  book: '\uE00C',
  'chevron-down': '\uE00D',
  'chevron-left': '\uE00E',
  'chevron-right': '\uE00F',
  'chevron-up': '\uE010',
  cloud: '\uE011',
  cobweb: '\uE012',
  comics: '\uE013',
  cross: '\uE014',
  desktop: '\uE015',
  'desktop-play': '\uE016',
  download: '\uE017',
  upload: '\uE018',
  file: '\uE019',
  'file-stack': '\uE01A',
  'file-text': '\uE01B',
  'floppy-disk': '\uE01C',
  folder: '\uE01D',
  'folder-search': '\uE01E',
  'google-drive': '\uE01F',
  history: '\uE020',
  image: '\uE021',
  'list-unordered': '\uE022',
  'list-ordered': '\uE023',
  'list-check': '\uE024',
  menu: '\uE025',
  plus: '\uE026',
  minus: '\uE027',
  'music-notes': '\uE028',
  'question-mark': '\uE029',
  search: '\uE02A',
  sort: '\uE02B',
  video: '\uE02C',
  'usb-stick': '\uE02D',
  ban: '\uE02E',
  cut: '\uE02F',
  copy: '\uE030',
  paste: '\uE031',
  clipboard: '\uE032',
  check: '\uE033',
  slash: '\uE034',
  'arrow-child': '\uE035',
  'arrow-down': '\uE036',
  'arrow-left': '\uE037',
  'arrow-right': '\uE038',
  'arrow-up': '\uE039',
  box: '\uE03A',
  'check-box': '\uE03B',
  'cross-box': '\uE03C',
  'exclamation-box': '\uE03D',
  'minus-box': '\uE03E',
  'plus-box': '\uE03F',
  delete: '\uE040',
  warning: '\uE041',
  'exclamation-point': '\uE042',
  play: '\uE043',
  pause: '\uE044',
  'play-pause': '\uE045',
  'skip-next': '\uE046',
  'skip-previous': '\uE047',
  'fast-forward': '\uE048',
  'fast-rewind': '\uE049',
  fullscreen: '\uE04A',
  'exit-fullscreen': '\uE04B',
  settings: '\uE04C',
  'log-in': '\uE04D',
  'log-out': '\uE04E'
}

export type IconName = keyof typeof icons

interface Props {
  of: IconName
}

defineProps<Props>()
</script>

<template>
  <span>{{ icons[of] }}</span>
</template>

<style scoped lang="scss">
span {
  font-family: Zincons, system-ui;
  line-height: 1;
}
</style>
