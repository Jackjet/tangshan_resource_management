<template>
  <div class="swiper-box">
    <div class="swiper-container">
      <div class="swiper-wrapper" ref="wrapper">
        <div v-for="item in items" class="swiper-item" @click="showResTypeDg(item.code)">
          <div class="icon">
            <img :src="item.icon">
          </div>
          <p class="text">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <div class="swiper-prev-btn" @click="handlePrev"></div>
    <div class="swiper-after-btn" @click="handleAfter"></div>
  </div>
</template>
<script>
  export default {
    props: ['swiperItems'],
    data () {
      return {
        leftHidden: 0,
        rightHidden: 1,
        itemWidth: 133,
        distance: 0,
        items: this.swiperItems
      }
    },
    watch: {
      swiperItems: {
        handler (curVal, oldVal) {
          this.items = curVal
        },
        deep: true
      }
    },
    methods: {
      handlePrev () {
        if (this.leftHidden > 0) {
          this.leftHidden--
          this.rightHidden++
          this.distance += this.itemWidth
          this.$refs.wrapper.style['transform'] = 'translate3d(' + this.distance + 'px, 0px, 0px)'
        }
      },
      handleAfter () {
        if (this.rightHidden > 0) {
          this.leftHidden++
          this.rightHidden--
          this.distance += -this.itemWidth
          this.$refs.wrapper.style['transform'] = 'translate3d(' + this.distance + 'px, 0px, 0px)'
        }
      },
      showResTypeDg (deptCode) {
        console.log(deptCode)
        this.$emit('showResTypeDg', deptCode)
      }
    }
  }
</script>
<style lang="less">
  .swiper-box {
    width: 100%;
    position: relative;
    .swiper-container {
      width: 1050px;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
    }
    .swiper-wrapper {
      width: 2500px;
      overflow: hidden;
      transition: all .3s;
      padding: 10px 0;
      .swiper-item {
        width: 118px;
        height: 145px;
        background: #fff;
        float: left;
        margin-right: 15px;
        background: url(./images/depart-item.png);
        box-sizing: border-box;
        text-align: center;
        transition: all .3s;
        &:hover {
          box-shadow: 0 2px 10px rgba(0,0,0,1);
        }
        .text {
          font-size: 18px;
          color: #fff;
          margin: 0;
        }
        .icon {
          height: 100px;
          line-height: 100px;
          img {
            vertical-align: middle;
          }
        }
      }
    }
    .swiper-after-btn {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 0;
      top: 50%;
      cursor: pointer;
      transform: translateY(-50%);
      background: url(./images/icon-right.png) center center no-repeat;
      &:hover {
        background-color: #000;
        border-radius: 50%;
        opacity: .4;
      }
    }
    .swiper-prev-btn {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 0;
      top: 50%;
      cursor: pointer;
      transform: translateY(-50%);
      background: url(./images/icon-left.png) center center no-repeat;
      &:hover {
        background-color: #000;
        border-radius: 50%;
        opacity: .4;
      }
    }
  }
</style>
