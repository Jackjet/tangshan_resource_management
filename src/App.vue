<template>
  <div id="app" style="min-width: 1366px;height: 100%;">
    <router-view class="content" />
  </div>
</template>

<script>
import API from "@/common/api";
export default {
  name: 'app',
  data() {
    return {
      gap_time: 0,
      beforeUpdate_time: 0
    }
  },
  mounted() {
    // 关闭浏览器事件
    window.addEventListener("beforeunload", () => this.beforeunloadHandler);
    window.addEventListener("unload", () => this.unloadHandler);

    function checkIE() {
      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
    }
    if (checkIE()) {
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
    }
  },
  methods: {
    beforeunloadHandler() {
      this.beforeUpdate_time = new Date().getTime();
    },
    unloadHandler() {
      this.gap_time = new Date().getTime() - this.beforeUpdate_time;
      // 判断是关闭还是刷新
      if (this.gap_time <= 10) {
        API.Common.outLoginByCurrentUser(res => { })
        API.Common.logout().then((res) => {
          window.location.href = location.protocol + '//' + location.host + '/#/login?t=' + new Date().getTime()
        })
      }
    },
    destroyed() {
      window.removeEventListener("beforeunload", () => this.beforeunloadHandler);
      window.removeEventListener("unload", () => this.unloadHandler);
    },
  }
}
</script>

<style src="./assets/css/base.css"></style>
<style>
#app {
  width: 100%;
  height: 100%;
}
.ivu-icon:before,
.ivu-icon:after {
  font-family: Ionicons !important;
}
.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: rgba(0, 170, 113, 1) !important;
  border-color: rgba(0, 170, 113, 1) !important;
}
.pagination > li > a,
.pagination > li > span {
  color: rgba(0, 170, 113, 1);
}
</style>

