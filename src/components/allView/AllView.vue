<template>
  <div id="allView" style="overflow: auto" align="center">
    <div style="position: fixed; width: 20px; height: 60px">
      <img :id="allResBtnId" title="全部资源" @click="allResBtnOnClick" width="20px" height="20px"  :src="btn_allres" style="margin-bottom: 3px; cursor: pointer">
      <img :id="partResBtnId" title="最佳效果" @click="partResBtnOnClick" width="20px" height="20px"  :src="btn_partres" style="margin-top: 3px;margin-bottom: 3px;cursor: pointer">
      <img title="放大" @click="zoomInSvg" width="20px" height="20px"  :src="zoomIn" style="margin-top: 3px;margin-bottom: 3px;cursor: pointer">
      <img title="缩小" @click="zoomOutSvg" width="20px" height="20px"  :src="zoomOut" style="margin-top: 3px;cursor: pointer">
    </div>
    <div style="width:100%;height: 700px">
      <svg :id="topoSvgId"></svg>
    </div>
  </div>
</template>
<script>
  import API from '@/common/api'
  export default {
    name: 'allView',
    props: {
      currentId: {
        type: String,
        required: true
      },
      showType: {
        type: String,
        required: true
      },
      topoSvgId: {
        type: String,
        required: true
      },
      allResBtnId: {
        type: String,
        required: true
      },
      partResBtnId: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        btn_allres: '/static/images/btn_allres_light.png',
        btn_partres: '/static/images/btn_partres_light.png',
        zoomIn: '/static/images/zoomIn.png',
        zoomOut: '/static/images/zoomOut.png',
        current: [],
        allData: [],
        scale: 1,
        initTranslate: '',
        maxZoom: 20,
        minZoom: 0.4,
        centerX: -1,
        centerY: -1,
        svgHeight: -1,
        svgWidht: -1
      }
    },
    mounted () {
      this.refresh()
    },
    watch: {
      'showType': {
        handler: function (val, oldval) {
          this.currentId = ''
          this.refresh()
        }
      },
      'currentId': {
        handler: function (val, oldval) {
          this.refresh()
        }
      }
    },
    methods: {
      refresh () {
        let _this = this
        _this.init()
        if (_this.showType === 'first') {
          API.Topo.list({'serviceProvider': _this.currentId}).then((res) => {
            _this.allData = res
            _this.current = _this.initResShowBtn(_this.allData)
            $('#' + _this.topoSvgId).empty()
            _this.$createResourceAllView(_this.topoSvgId, _this.createViewTree(), _this.scale)
          })
        } else if (_this.showType === 'second') {
          API.Topo.list({'categoryType': _this.currentId}).then((res) => {
            _this.allData = res
            _this.current = _this.initResShowBtn(_this.allData)
            $('#' + _this.topoSvgId).empty()
            _this.$createResourceAllView(_this.topoSvgId, _this.createViewTree(), _this.scale)
          })
        }
      },
      init () {
        this.btn_allres = '/static/images/btn_allres_light.png'
        this.btn_partres = '/static/images/btn_partres_light.png'
        this.zoomIn = '/static/images/zoomIn.png'
        this.zoomOut = '/static/images/zoomOut.png'
        this.current = []
        this.scale = 1
        this.initTranslate = ''
        this.maxZoom = 20
        this.minZoom = 0.4
        this.centerX = -1
        this.centerY = -1
        this.svgHeight = -1
        this.svgWidht = -1
      },
      allResBtnOnClick () {
        let _this = this
        var allResBtn = $('#' + _this.allResBtnId)
        var partResBtn = $('#' + _this.partResBtnId)
        if (allResBtn.attr('src').indexOf('btn_allres_light') > 0) {
          allResBtn.attr('src', '/static/images/btn_allres_unlight.png')
          partResBtn.attr('src', '/static/images/btn_partres_light.png')
          $('#' + _this.topoSvgId).empty()
          _this.current = _this.allData
          _this.$createResourceAllView(_this.topoSvgId, _this.createViewTree(), _this.scale)
        }
      },
      partResBtnOnClick () {
        let _this = this
        var subData = []
        var allResBtn = $('#' + _this.allResBtnId)
        var partResBtn = $('#' + _this.partResBtnId)
        if (partResBtn.attr('src').indexOf('btn_partres_light') > 0) {
          allResBtn.attr('src', '/static/images/btn_allres_light.png')
          partResBtn.attr('src', '/static/images/btn_partres_unlight.png')
          var count = 0
          _this.allData.forEach(function (value) {
            if (count >= _this.getResMaxSize()) {
              return
            }
            count++
            subData.push(value)
          })
          _this.current = subData
          $('#' + _this.topoSvgId).empty()
          _this.$createResourceAllView(_this.topoSvgId, _this.createViewTree(), _this.scale)
        }
      },
      zoomInSvg () {
        if (this.scale >= 10) {
          return
        }
        var split = this.$isIE() ? ' ' : ','
        var g = $('#' + this.topoSvgId).find('g').eq(0)
        if (undefined === this.initTranslate) {
          this.initTranslate = g.attr('transform')

          this.centerX = parseFloat(this.initTranslate.replace('translate', '').replace('(', '').replace(')', '').split(split)[0])
          this.centerY = parseFloat(this.initTranslate.replace('translate', '').replace('(', '').replace(')', '').split(split)[1])
          this.svgWidht = $('#' + this.topoSvgId).width()
          this.svgHeight = $('#' + this.topoSvgId).height()
        }

        this.scale += 0.1
        var transform = 'translate(' + this.centerX * this.scale + split + this.centerY * this.scale + ')'
        g.attr('transform', transform)
        $('#' + this.topoSvgId).attr('width', this.svgWidht * this.scale)
        $('#' + this.topoSvgId).attr('height', this.svgHeight * this.scale)
        $('#' + this.topoSvgId).empty()
        this.$createResourceAllView(this.topoSvgId, this.createViewTree(), this.scale)
      },
      zoomOutSvg () {
        if (this.scale <= 0.8) {
          return
        }
        var split = this.$isIE() ? ' ' : ','
        var g = $('#' + this.topoSvgId).find('g').eq(0)
        if (undefined === this.initTranslate) {
          this.initTranslate = g.attr('transform')
          this.centerX = parseFloat(this.initTranslate.replace('translate', '').replace('(', '').replace(')', '').split(split)[0])
          this.centerY = parseFloat(this.initTranslate.replace('translate', '').replace('(', '').replace(')', '').split(split)[1])
          this.svgWidht = $('#' + this.topoSvgId).width()
          this.svgHeight = $('#' + this.topoSvgId).height()
        }
        this.scale -= 0.1
        var transform = 'translate(' + this.centerX * this.scale + split + this.centerY * this.scale + ')'
        g.attr('transform', transform)
        $('#' + this.topoSvgId).attr('width', this.svgWidht * this.scale)
        $('#' + this.topoSvgId).attr('height', this.svgHeight * this.scale)
        $('#' + this.topoSvgId).empty()
        this.$createResourceAllView(this.topoSvgId, this.createViewTree(), this.scale)
      },
      createViewTree () {
        if (this.showType === 'first') {
          return this.$createDepartViewTree(this.current)
        } else if (this.showType === 'second') {
          return this.$createCategoryViewTree(this.current)
        }
      },
      getResMaxSize () {
        return 100
      },
      initResShowBtn (data) {
        let _this = this
        var subData = []
        var allResBtn = $('#' + _this.allResBtnId)
        var partResBtn = $('#' + _this.partResBtnId)
        if (data.length < _this.getResMaxSize()) {
          allResBtn.attr('src', '/static/images/btn_allres_gray.png')
          partResBtn.attr('src', '/static/images/btn_partres_gray.png')
          subData = data
        } else {
          allResBtn.attr('src', '/static/images/btn_allres_light.png')
          partResBtn.attr('src', '/static/images/btn_partres_unlight.png')
          var count = 0
          data.forEach(function (value) {
            if (count >= _this.getResMaxSize()) {
              return
            }
            count++
            subData.push(value)
          })
        }
        return subData
      }
    }
  }
</script>
<style lang='less'>
  .node circle {
    stroke: steelblue;
    stroke-width: 1px;
    cursor:pointer;
  }
  .node text {
    fill: #6A788D;
    cursor: pointer;
  }
  .node text:hover {
    fill: #000000;
  }
  .node {
    font-size: 9px;
    display:block;
  }

  .hidenode {
    font: 12px sans-serif;
    display:none;
  }

  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }
</style>
