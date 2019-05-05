<template>
  <aside>
    <div v-for="(item, index) in routes" :key="index">
      <template v-if="item.children">
        <h3>{{item.title}}</h3>
        <router-link
          v-for="(childItem, childIndex) in item.children"
          class="nav-link"
          :to="childItem.path"
          :key="childIndex">
          {{childItem.title}}
        </router-link>
      </template>
      <router-link style="font-weight:bold;" v-else class="nav-link" :to="item.path">
        {{item.title}}
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
  import navConfig from '../../nav.config'
  
  @Component({})
  export default class Sidebar extends Vue {
    public routes: any = navConfig
  }
</script>

<style lang="scss">
@import '../../styles/variables';
aside {
  line-height: 1;
  h3 {
    margin: 10px 0;
    color: #666;
  }
  a {
    display: block;
    color: #666;
    padding: 10px 0;
    &:hover {
      color: $default-color;
    }
    &.router-link-exact-active {
      color: $default-color;
    }
  }
}
</style>
