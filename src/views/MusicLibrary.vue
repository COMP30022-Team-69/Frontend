<template>
  <div>
    <h1>音乐库</h1>
    <div v-for="music in musics" :key="music.id">
      <MusicItem
        :music="music"
        @dragstart="onDragStart($event, music)"
        @remove-from-playlist="handleRemoveFromPlaylist"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>
    <!-- 个人歌单分类区 -->
    <div>
      <!-- 个人歌单分类区的代码 -->
    </div>
  </div>
</template>

<script>
import MusicItem from '@/components/MusicItem.vue';

export default {
  components: {
    MusicItem,
  },
  data() {
    return {
      musics: [/* 音乐数据 */],
    };
  },
  methods: {
    onDragStart(event, music) {
      // 已有的拖放逻辑
    },
    handleRemoveFromPlaylist(id) {
      // 实现从歌单中删除歌曲的逻辑
    },
    handleToggleFavorite(id) {
      // 实现标记或取消标记喜爱歌曲的逻辑
    },
  },
};
</script>