<script setup>
   import { ref, onMounted } from "vue";
   // 引入Swiper相关组件和样式
   import { Swiper, SwiperSlide } from "swiper/vue";
   import { Autoplay } from "swiper/modules";
   import "swiper/css";
   import "swiper/css/autoplay";

   const isMobile = ref(false); // 是否为移动端
   const swiperInstance = ref(null); // 存储Swiper实例

   // 检测设备是否为移动端
   const checkMobile = () => {
      isMobile.value = window.innerWidth <= 375;
   };

   onMounted(() => {
      checkMobile();
      window.addEventListener("resize", checkMobile);
   });

   const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
   };
</script>

<template>
   <div class="background-image-container">
      <!-- PC端展示 -->
      <div v-if="!isMobile" class="background-image">
         <button class="check-more-btn">Check More</button>
      </div>

      <!-- 移动端轮播 -->
      <div v-else class="mobile-background-container">
         <swiper
            :slides-per-view="1"
            :space-between="0"
            :pagination="false"
            :autoplay="{
               delay: 3000,
               disableOnInteraction: false,
            }"
            :modules="[Autoplay]"
            class="mobile-background-swiper"
            @swiper="onSwiper"
            :loop="true"
            :loopAdditionalSlides="2"
         >
            <!-- 图片1 -->
            <swiper-slide class="mobile-background-slide">
               <div class="mobile-background-image">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/SJ-MAGNETIC-SWITCHES-1.jpg"
                     alt="MAGNETIC SWITCHES"
                  />
               </div>
            </swiper-slide>

            <!-- 图片2 -->
            <swiper-slide class="mobile-background-slide">
               <div class="mobile-background-image">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/Snap-Keys.jpg"
                     alt="Snap Keys"
                  />
               </div>
            </swiper-slide>

            <!-- 图片3 -->
            <swiper-slide class="mobile-background-slide">
               <div class="mobile-background-image">
                  <img
                     src="https://en.akkogear.com/wp-content/uploads/2025/03/SJ-RAPID-TRIGGER-1.jpg"
                     alt="RAPID TRIGGER"
                  />
               </div>
            </swiper-slide>
         </swiper>
      </div>
   </div>
</template>

<style scoped>
   .background-image-container {
      width: 100vw;
      height: 1000px;
      margin-left: calc(-50vw + 50%);
      margin-right: calc(-50vw + 50%);
      overflow: hidden;
      position: relative;
   }

   .background-image {
      width: 1920px;
      height: 1000px;
      background-image: url("https://en.akkogear.com/wp-content/uploads/2025/03/MAGNETIC-SWITCH-Keyboard.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
   }

   .check-more-btn {
      position: absolute;
      top: 201px;
      left: 50%;
      transform: translateX(-50%);
      width: 148px;
      height: 36px;
      background-color: transparent;
      color: #ffffff;
      border: 2px solid white;
      border-radius: 6px;
      font-size: 16px;
      line-height: 18.75px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
   }

   .check-more-btn:hover {
      background-color: white;
      color: black;
   }

   /* 移动端样式 */
   .mobile-background-container {
      width: 100%;
      height: 643px;
      overflow: hidden;
   }

   .mobile-background-swiper {
      width: 100%;
      height: 100%;
   }

   .mobile-background-slide {
      width: 100%;
      height: 100%;
   }

   .mobile-background-image {
      width: 100%;
      height: 100%;
   }

   .mobile-background-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }

   @media (max-width: 375px) {
      .background-image-container {
         height: 643px;
      }
   }
</style>
