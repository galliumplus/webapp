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
  'usb-stick': '\uE02D'
}

export type IconName = keyof typeof icons

interface Props {
  of: IconName
  size?: 'small' | 'medium' | 'large' | 'huge'
}

const props = withDefaults(defineProps<Props>(), { size: 'small' })
</script>

<template>
  <span :class="'icon-' + size">{{ icons[of] }}</span>
</template>

<style scoped lang="scss">
$sizes: (
  'small': 29px,
  'medium': 58px,
  'large': 87px,
  'huge': 116px
);

@each $name, $size in $sizes {
  .icon-#{$name} {
    display: inline-block;
    width: $size;
    height: $size;
    font-family: 'Zincons', emoji;
    font-size: $size;
  }
}
</style>
