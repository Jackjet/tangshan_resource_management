<template>
    <!--policy-->
    <div class="policyPanel">
      <el-row class="" style="position:unset;background: rgba(250,250,250,1);">
          <iframe frameborder="0" width="100%" id="policyDetailId" style="min-height: 500px;background-color: #fff;margin-top: 28px;margin-bottom: 74px;"></iframe>

      </el-row>
    </div>
</template>

<script>
  import API from '@/common/api'
  import moment from 'moment'
  import axios from 'axios'

  export default {
    data() {
      return {
        url:''
      }
    },
    mounted(){
      var iframeId = document.getElementById('policyDetailId');
      iframeId.src = this.url
    },
    created() {
      var urlParams = this.$route.params.url
      if(urlParams.substring(0,22) == 'http://localhost:8081/'){
        this.url = urlParams.substring(22)
      }else{
        this.url = urlParams
      }


    }
  }
</script>

<style  scoped>
  .main_layout {
    min-height: 20px;
  }
</style>
