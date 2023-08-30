<template>
  <div>
    <span>{{ music.title }}</span>
    <!-- 添加删除和喜爱按钮 -->
    <button @click="removeFromPlaylist">删除</button>
    <button @click="toggleFavorite">喜爱</button>
  </div>
</template>

<script>
export default {
  props: ['music'],
  methods: {
    // 从歌单中删除歌曲的方法
    removeFromPlaylist() {
      this.$emit('remove-from-playlist', this.music.id);
    },
    // 标记或取消标记喜爱歌曲的方法
    toggleFavorite() {
      this.$emit('toggle-favorite', this.music.id);
    },
  },
};
</script>