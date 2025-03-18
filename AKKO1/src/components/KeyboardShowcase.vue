<script setup>
   import { ref, onMounted, computed, watch } from "vue";
   import "../style/KeyboardShowcase.css"; // 导入外部CSS文件
   // 引入Swiper相关组件和样式
   import { Swiper, SwiperSlide } from "swiper/vue";
   import { Pagination, Autoplay } from "swiper/modules";
   import "swiper/css";
   import "swiper/css/pagination";
   import "swiper/css/autoplay";

   const showcaseRef = ref(null);
   const lastX = ref(null);
   const velocity = ref(0);
   const dampingFactor = 0; // 阻尼系数设为0，让滑动更直接
   const sensitivityFactor = 2.5; // 增加灵敏度系数
   const currentScrollPosition = ref(0);
   const isMobile = ref(false); // 是否为移动端
   const currentMobilePage = ref(0); // 移动端当前页码
   const swiperInstance = ref(null); // 存储Swiper实例

   // 设置初始滚动位置
   const initialScrollPosition = 500; // 初始滚动位置，可以根据需要调整

   // 检测设备是否为移动端
   const checkMobile = () => {
      isMobile.value = window.innerWidth <= 375;
   };

   // 计算遮罩透明度
   const maskOpacity = computed(() => {
      if (!showcaseRef.value) return 0.8;

      const maxScroll =
         showcaseRef.value.scrollWidth - showcaseRef.value.clientWidth;
      // 使用响应式变量而不是直接读取DOM属性
      const progress = currentScrollPosition.value / maxScroll;

      // 当滚动到最右侧时（progress接近1），遮罩完全消失（opacity为0）
      // 当滚动到中间位置时，遮罩部分显示
      // 当滚动到最左侧时（progress接近0），遮罩完全显示（opacity为0.8）
      if (progress >= 0.95) {
         return 0; // 滚动到最右侧，遮罩完全消失
      } else if (progress <= 0.05) {
         return 0.8; // 滚动到最左侧，遮罩完全显示
      } else {
         // 中间状态，遮罩透明度随滚动进度变化
         return 0.8 * (1 - progress);
      }
   });

   // 监听滚动事件
   const handleScroll = () => {
      if (showcaseRef.value) {
         currentScrollPosition.value = showcaseRef.value.scrollLeft;
      }
   };

   const onDrag = (e) => {
      e.preventDefault();
      const currentX = e.pageX;

      // 如果是第一次移动，记录初始位置
      if (lastX.value === null) {
         lastX.value = currentX;
         return;
      }

      // 计算移动距离和速度，增加灵敏度
      const deltaX = (currentX - lastX.value) * sensitivityFactor;
      velocity.value = deltaX * dampingFactor;

      // 更新滚动位置
      if (showcaseRef.value) {
         showcaseRef.value.scrollLeft -= deltaX;
         // 更新当前滚动位置
         currentScrollPosition.value = showcaseRef.value.scrollLeft;
      }

      // 更新最后位置
      lastX.value = currentX;
   };

   const endDrag = () => {
      lastX.value = null;
      velocity.value = 0;
   };

   // 设置移动端当前页
   const setMobilePage = (pageIndex) => {
      if (pageIndex >= 0 && pageIndex < 6) {
         // 总共6张图片
         currentMobilePage.value = pageIndex;

         // 如果有Swiper实例，滑动到对应页
         if (swiperInstance.value) {
            // 由于启用了loop模式，需要使用slideToLoop方法
            swiperInstance.value.slideToLoop(pageIndex);
         }
      }
   };

   // 自动轮播
   let autoplayInterval = null;

   const startAutoplay = () => {
      // 清除之前的定时器
      if (autoplayInterval) {
         clearInterval(autoplayInterval);
      }

      // 设置新的定时器，每3秒切换一次
      autoplayInterval = setInterval(() => {
         if (isMobile.value) {
            // 移动端自动轮播 - 使用Swiper的内置自动轮播功能
            if (swiperInstance.value) {
               swiperInstance.value.slideNext();
            } else {
               // 如果Swiper实例不存在，使用我们自己的轮播逻辑
               const nextPage = (currentMobilePage.value + 1) % 6;
               setMobilePage(nextPage);
            }
         }
      }, 3000);
   };

   // 停止自动轮播
   const stopAutoplay = () => {
      if (autoplayInterval) {
         clearInterval(autoplayInterval);
         autoplayInterval = null;
      }
   };

   // 当用户交互时暂停自动轮播
   const pauseAutoplay = () => {
      stopAutoplay();
   };

   // 当用户交互结束时恢复自动轮播
   const resumeAutoplay = () => {
      startAutoplay();
   };

   const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
   };

   const onSlideChange = (swiper) => {
      // 在loop模式下，使用realIndex获取真实的幻灯片索引
      currentMobilePage.value = swiper.realIndex;
   };

   onMounted(() => {
      checkMobile();
      window.addEventListener("resize", checkMobile);

      if (showcaseRef.value) {
         // 设置初始滚动位置
         showcaseRef.value.scrollLeft = initialScrollPosition;
         currentScrollPosition.value = initialScrollPosition;

         // 添加滚动事件监听
         showcaseRef.value.addEventListener("scroll", handleScroll);
      }

      // 启动自动轮播
      startAutoplay();
   });
</script>

<template>
   <div class="keyboard-showcase-container">
      <!-- PC端展示 -->
      <div v-if="!isMobile" class="container">
         <div
            class="keyboard-showcase"
            ref="showcaseRef"
            @mousemove="onDrag"
            @mouseleave="endDrag"
            @scroll="handleScroll"
         >
            <div class="keyboard-grid">
               <!-- 左侧大图 Cinnamoroll -->
               <div class="keyboard-card cinnamoroll">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/Cinnamoroll-600x720-1.jpg"
                     alt="Cinnamoroll"
                  />
                  <div class="card-label">Cinnamoroll</div>
               </div>

               <!-- 右上 Pompompurin -->
               <div class="keyboard-card pompompurin">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/pompompurin-815x348-1.jpg"
                     alt="Pompompurin"
                  />
                  <div class="card-label">Pompompurin</div>
               </div>

               <!-- 右中左 Kuromi -->
               <div class="keyboard-card kuromi">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/Kuromi-395x348-1.jpg"
                     alt="Kuromi"
                  />
                  <div class="card-label">Kuromi</div>
               </div>

               <!-- 右中右 My Sweet Piano -->
               <div class="keyboard-card my-sweet-piano">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/Piano-395x348-1.jpg"
                     alt="My Sweet Piano"
                  />
                  <div class="card-label">My Sweet Piano</div>
               </div>

               <!-- 右上角 The King's Avatar -->
               <div class="keyboard-card kings-avatar">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/The-Kings-Avatar-320x246-1.jpg"
                     alt="The King's Avatar"
                  />
                  <div class="card-label">The King's Avatar</div>
               </div>

               <!-- 右下 Joy of Life -->
               <div class="keyboard-card joy-of-life">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/Joy-of-life-320x450-1.jpg"
                     alt="Joy of Life"
                  />
                  <div class="card-label">Joy of Life</div>
               </div>
            </div>
            <div class="keyboard-mask" :style="{ opacity: maskOpacity }"></div>
         </div>
      </div>

      <!-- 移动端轮播 -->
      <div v-else class="mobile-showcase-container">
         <swiper
            :slides-per-view="1"
            :space-between="0"
            :pagination="false"
            :autoplay="{
               delay: 3000,
               disableOnInteraction: false,
            }"
            :modules="[Autoplay]"
            class="mobile-showcase-swiper"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :centeredSlides="true"
            :loop="true"
            :loopAdditionalSlides="2"
         >
            <!-- Cinnamoroll -->
            <swiper-slide class="mobile-showcase-slide">
               <div class="mobile-keyboard-card">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/Cinnamoroll-600x720-1.jpg"
                     alt="Cinnamoroll"
                  />
                  <div class="card-label">Cinnamoroll</div>
               </div>
            </swiper-slide>

            <!-- Pompompurin -->
            <swiper-slide class="mobile-showcase-slide">
               <div class="mobile-keyboard-card">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/pompompurin-815x348-1.jpg"
                     alt="Pompompurin"
                  />
                  <div class="card-label">Pompompurin</div>
               </div>
            </swiper-slide>

            <!-- Kuromi -->
            <swiper-slide class="mobile-showcase-slide">
               <div class="mobile-keyboard-card">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/Kuromi-395x348-1.jpg"
                     alt="Kuromi"
                  />
                  <div class="card-label">Kuromi</div>
               </div>
            </swiper-slide>

            <!-- My Sweet Piano -->
            <swiper-slide class="mobile-showcase-slide">
               <div class="mobile-keyboard-card">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/Piano-395x348-1.jpg"
                     alt="My Sweet Piano"
                  />
                  <div class="card-label">My Sweet Piano</div>
               </div>
            </swiper-slide>

            <!-- The King's Avatar -->
            <swiper-slide class="mobile-showcase-slide">
               <div class="mobile-keyboard-card">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/The-Kings-Avatar-320x246-1.jpg"
                     alt="The King's Avatar"
                  />
                  <div class="card-label">The King's Avatar</div>
               </div>
            </swiper-slide>

            <!-- Joy of Life -->
            <swiper-slide class="mobile-showcase-slide">
               <div class="mobile-keyboard-card">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/Joy-of-life-320x450-1.jpg"
                     alt="Joy of Life"
                  />
                  <div class="card-label">Joy of Life</div>
               </div>
            </swiper-slide>
         </swiper>

         <!-- 自定义移动端指示器 -->
         <div class="mobile-indicators">
            <div
               v-for="page in 6"
               :key="page"
               class="mobile-indicator"
               :class="{
                  'mobile-indicator-active': currentMobilePage === page - 1,
               }"
               @click="setMobilePage(page - 1)"
            ></div>
         </div>
      </div>
   </div>
</template>
