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

<template>
   <div class="background-image-container">
      <div v-if="!isMobile" class="background-image">
         <button class="check-more-btn">Check More</button>
      </div>
      <div v-else class="mobile-background-image">
         <button class="mobile-check-more-btn">Check More</button>
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
      background-image: url("https://en.akkogear.com/wp-content/uploads/2025/03/KIT-Custom-Build-PC.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
   }

   .check-more-btn {
      position: absolute;
      top: 280px;
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
   .mobile-background-image {
      width: 375px;
      height: 461px;
      background-image: url("https://en.akkogear.com/wp-content/uploads/2025/03/KIT-Custom-Build-PC.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      margin: 0 auto;
   }

   .mobile-check-more-btn {
      position: absolute;
      top: 135px;
      left: 50%;
      transform: translateX(-50%);
      width: 124px;
      height: 30px;
      background-color: transparent;
      color: #ffffff;
      border: 2px solid white;
      border-radius: 6px;
      font-family: Poppins, Poppins;
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      cursor: pointer;
      transition: all 0.3s ease;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
   }

   .mobile-check-more-btn:hover {
      background-color: white;
      color: black;
   }

   @media (max-width: 375px) {
      .background-image-container {
         height: 461px;
      }
   }
</style>
