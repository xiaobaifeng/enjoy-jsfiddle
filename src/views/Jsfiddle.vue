<template>
  <div class="jsfiddle">
    <div class="jsfiddle__slider-nav">
      <div
        v-for="{href, label} in jsfiddleArr"
        class="jsfiddle__slider-nav__level-1"
        :class="{'jsfiddle__slider-nav__level-1--active': activeHref === href}"
        @click="activeHref = href"
        :key="href">{{ label }}</div>
    </div>
    <div class="jsfiddle__content">
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups"
        allow="midi; geolocation; microphone; camera; encrypted-media;"
        :src="activeHref + '/embedded/js,html,result/'"
        id="jsfiddleIframe"></iframe>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Jsfiddle extends Vue {
  get jsfiddleArr(): Array<{
    label: string;
    href: string;
  }> {
    return this.$store.state.jsfiddleArr;
  }
  private activeHref: string = this.jsfiddleArr[0].href;
}
</script>
<style lang="scss" scope>
.jsfiddle{
  display: flex;
  padding: 0 10px;
  background-color: #f5f7f973;
  &__slider-nav{
    width: 200px;
    padding: 20px 20px 0 0 ;
    text-align: left;
    &__level-1{
      padding: 4px 6px;
      border: 2px solid #b3aeae;
      cursor: pointer;
      &--active{
        border-color: #42b983;
      }
    }
  }
  &__content{
    flex-grow: 1;
    background-color: #333;
  }
}
</style>