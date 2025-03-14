<script setup>
   import { ref, onMounted, onUnmounted, watch } from "vue";
   import { Swiper, SwiperSlide } from "swiper/vue";
   import {
      Navigation,
      Pagination,
      Autoplay,
      EffectFade,
   } from "swiper/modules";
   import "swiper/css";

   const modules = [Navigation, Pagination, Autoplay, EffectFade];
   const swiperInstance = ref(null);
   const currentIndex = ref(0);
   const progressBars = ref([0, 0, 0]); // 保留原有的进度条状态
   const intervalTime = 5000; // 轮播间隔时间
   let progressInterval;

   const items = ref([
      {
         image: "src/assets/slide1.jpg",
         title: "MOD007v3",
         subtitle: "The Year Of Dragon",
         description: "8k Polling Rate | 3-Tone Anodized | Hall Effect",
      },
      {
         image: "src/assets/slide1.jpg",
         title: "MOD007v3",
         subtitle: "The Year Of Dragon",
         description: "8k Polling Rate | 3-Tone Anodized | Hall Effect",
      },
      {
         image: "src/assets/slide1.jpg",
         title: "MOD007v3",
         subtitle: "The Year Of Dragon",
         description: "8k Polling Rate | 3-Tone Anodized | Hall Effect",
      },
   ]);

   // 初始化Swiper实例
   //这里传入的swiper是什么
   //swiper是一个对象，它包含了swiper的所有参数和方法
   const onSwiperInit = (swiper) => {
      swiperInstance.value = swiper;

      // 设置自动轮播方向为反向（从左向右）
      swiper.params.autoplay = {
         delay: intervalTime,
         disableOnInteraction: false,
         reverseDirection: true,
      };
      // 开始进度条逻辑
      startProgress();
   };

   // 滑动变化事件
   const onSlideChange = (swiper) => {
      currentIndex.value = swiper.realIndex;
      startProgress();
   };

   // 开始进度条逻辑
   const startProgress = () => {
      clearInterval(progressInterval); // 清除之前的定时器
      let currentProgress = 0;

      // 重置所有进度条
      progressBars.value = progressBars.value.map((_, index) =>
         index === currentIndex.value ? 0 : 0
      );

      progressInterval = setInterval(() => {
         currentProgress += 100 / (intervalTime / 100);
         progressBars.value[currentIndex.value] = Math.min(
            currentProgress,
            100
         );

         if (currentProgress >= 100) {
            // 自动向右滑动（使用slidePrev实现向右效果）
            prevSlide();
         }
      }, 100);
   };

   // 上一张（实际是向右）
   const prevSlide = () => {
      if (swiperInstance.value) {
         swiperInstance.value.slideNext();
      }
   };

   // 跳转到指定幻灯片
   const goToSlide = (index) => {
      if (swiperInstance.value) {
         swiperInstance.value.slideToLoop(index);
      }
   };

   onMounted(() => {
      // 确保进度条数量与图片数量匹配
      progressBars.value = Array(items.value.length).fill(0);
   });

   onUnmounted(() => {
      clearInterval(progressInterval);
   });
</script>

<template>
   <div class="carousel-container">
      <!-- 轮播图 -->
      <!-- <swiper
         :modules="modules"  // 模块
         :slides-per-view="1" // 每页显示1张
         :loop="true" // 循环
         :speed="500" // 速度
         :allow-touch-move="true" // 允许触摸移动
         @swiper="onSwiperInit" // 初始化
         @slideChange="onSlideChange" // 滑动变化
      > -->
      <swiper
         :modules="modules"
         :slides-per-view="1"
         :loop="true"
         :speed="500"
         :allow-touch-move="true"
         @swiper="onSwiperInit"
         @slideChange="onSlideChange"
         class="carousel"
      >
         <swiper-slide
            v-for="(item, index) in items"
            :key="index"
            class="carousel-item"
         >
            <img :src="item.image" :alt="item.title" />
            <div class="carousel-caption">
               <h2>{{ item.title }}</h2>
               <h3>{{ item.subtitle }}</h3>
               <p>{{ item.description }}</p>
            </div>
         </swiper-slide>
      </swiper>

      <!-- 进度指示器 -->
      <div class="progress-indicators">
         <div
            v-for="(progress, index) in progressBars"
            :key="index"
            class="progress-bar-container"
            @click="goToSlide(index)"
         >
            <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
         </div>
      </div>
   </div>
</template>

<style scoped>
   .carousel-container {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 960px;
      margin: -64px auto 0 auto; /* 使用auto边距实现水平居中，同时抵消header高度 */
   }

   .carousel {
      width: 100%;
      height: 100%;
      margin-top: 64px; /* 为header留出空间 */
   }

   .carousel-item {
      position: relative;
      width: 100%;
      height: 100%;
   }

   .carousel-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }

   /* 保留原有的样式 */
   .carousel-caption {
      position: absolute;
      top: 40%; /* 从50%改为40%，使文字整体上移 */
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      z-index: 2;
      width: 100%;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }

   .carousel-caption h2 {
      font-size: 5rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: 2px;
      line-height: 1.2;
   }

   .carousel-caption h3 {
      font-size: 3rem;
      font-weight: 400;
      margin: 15px 0;
      opacity: 0.9;
      line-height: 1.2;
   }

   .carousel-caption p {
      font-size: 1.8rem;
      margin: 15px 0;
      opacity: 0.8;
      line-height: 1.5;
   }

   /* 保留原有的进度指示器样式 */
   .progress-indicators {
      position: absolute;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 2;
   }

   .progress-bar-container {
      width: 87.07px;
      height: 8px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
      overflow: hidden;
      cursor: pointer;
   }

   .progress-bar {
      height: 100%;
      background-color: white;
      transition: width 0.1s linear;
   }

   /* 添加暗色遮罩效果 */
   .carousel-item::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 1;
   }

   /* 移动端适配 */
   @media (max-width: 375px) {
      .carousel-container {
         width: 100%;
         height: 202px; /* 250px转换为rem */
         margin-top: 0; /* 重置顶部边距 */
      }

      .carousel {
         margin-top: 0; /* 重置顶部边距 */
         width: 100%;
         height: 100%;
      }

      /* 调整文字大小 */
      .carousel-caption h2 {
         font-size: 1.5rem;
         letter-spacing: 0.0625rem; /* 1px转换为rem */
      }

      .carousel-caption h3 {
         font-size: 1rem;
         margin: 0.3125rem 0; /* 5px转换为rem */
      }

      .carousel-caption p {
         font-size: 0.8rem;
         margin: 0.3125rem 0; /* 5px转换为rem */
      }

      /* 调整指示器大小和位置 */
      .progress-indicators {
         bottom: 1.25rem; /* 20px转换为rem */
         gap: 0.3125rem; /* 5px转换为rem */
      }

      .progress-bar-container {
         width: 1.359375rem; /* 21.75px转换为rem */
         height: 0.1875rem; /* 3px转换为rem */
         border-radius: 0.0625rem; /* 1px转换为rem */
      }
   }
</style>

<!-- 添加全局样式以确保轮播图在所有屏幕尺寸下都水平居中 -->
<style>
   @media (max-width: 375px) {
      body,
      html {
         overflow-x: hidden; /* 防止水平滚动 */
         width: 100%;
         margin: 0;
         padding: 0;
      }
   }
</style>
