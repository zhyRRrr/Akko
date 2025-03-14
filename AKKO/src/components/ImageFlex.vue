<template>
   <div class="image-flex-container">
      <div class="image-flex-wrapper" :class="{ 'mobile-layout': isMobile }">
         <div
            class="image-card left-image"
            :class="{ 'mobile-card': isMobile }"
         >
            <img
               src="https://en.akkogear.com/wp-content/uploads/2025/03/Mechanical-Keyboard-discord.png"
               alt="左侧图片"
            />
         </div>
         <div
            class="image-card right-image"
            :class="{ 'mobile-card': isMobile }"
         >
            <img
               src="https://en.akkogear.com/wp-content/uploads/2025/03/Mechanical-Keyboard-Affiliate.png"
               alt="右侧图片"
            />
         </div>
      </div>
   </div>
</template>

<script setup>
   import { ref, onMounted } from "vue";

   const isMobile = ref(false); // 是否为移动端

   // 检测设备是否为移动端
   const checkMobile = () => {
      isMobile.value = window.innerWidth <= 375;
   };

   onMounted(() => {
      checkMobile();
      window.addEventListener("resize", checkMobile);
   });
</script>

<style scoped>
   .image-flex-container {
      width: 100%;
      /* min-height: 540px; */
      height: 540px;
      /* margin-left: 201px; */
      /* background-size: cover; */
      /* position: relative; */
      /* overflow: hidden; */
      padding: var(--spacing-xl) 0;
   }

   .image-flex-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      /* flex-wrap: wrap; */
      gap: 24px;
      /* max-width: var(--container-max-width); */
      /* margin: 0 auto; */
      /* padding: 0 var(--spacing-md); */
   }

   .image-card {
      /* flex: 1; */
      min-width: 300px;
      max-width: 705px;
      height: 420px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
   }

   .image-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
   }

   .image-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }

   /* 移动端样式 */
   @media (max-width: 375px) {
      .image-flex-container {
         height: auto;
         padding: 24px 0;
      }

      .mobile-layout {
         flex-direction: column;
         gap: 24px;
         padding: 0 14px;
      }

      .mobile-card {
         min-width: 100%;
         max-width: 100%;
         height: 200px;
         border-radius: 0;
      }

      .mobile-card:hover {
         transform: none;
         box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
   }
</style>
