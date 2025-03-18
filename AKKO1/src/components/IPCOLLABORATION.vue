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
      <!-- PC端展示 -->
      <div v-if="!isMobile" class="text-container">
         <h1 class="main-title">IPCOLLABORATION</h1>
         <p class="sub-title">Type with Your Favorite Characters</p>
         <button class="check-more-btn">Check More</button>
      </div>

      <!-- 移动端展示 -->
      <div v-else class="mobile-text-container">
         <h1 class="mobile-main-title">IPCOLLABORATION</h1>
         <p class="mobile-sub-title">Type with Your Favorite Characters</p>
         <button class="mobile-check-more-btn">Check More</button>
      </div>
   </div>
</template>

<style scoped>
   .background-image-container {
      width: 100vw;
      height: 300px;
      margin-left: calc(-50vw + 50%);
      margin-right: calc(-50vw + 50%);
      overflow: hidden;
      position: relative;
   }

   .text-container {
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
   }

   .main-title {
      padding-top: 80px;
      width: 374px;
      height: 60px;
      font-family: Poppins, sans-serif;
      font-weight: 700;
      font-size: 40px;
      color: #000000;
      line-height: 46.88px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin: 0;
      letter-spacing: 0;
   }

   .sub-title {
      width: 540px;
      height: 36px;
      font-family: Poppins, sans-serif;
      font-weight: 300;
      font-size: 24px;
      color: #959595;
      line-height: 28.13px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin: 60px 0 0 0;
   }

   .check-more-btn {
      position: absolute;
      top: 201px;
      left: 50%;
      transform: translateX(-50%);
      width: 148px;
      height: 36px;
      background-color: transparent;
      color: #000000;
      border: 2px solid rgb(0, 0, 0);
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
      background-color: rgb(153, 153, 153);
      color: black;
   }

   /* 移动端样式 */
   .mobile-text-container {
      position: absolute;
      /* top: 30px; */
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
   }

   .mobile-main-title {
      padding-top: 80px;
      width: 225px;
      height: 36px;
      font-family: Poppins, Poppins;
      font-weight: 500;
      font-size: 24px;
      color: #000000;
      line-height: 28px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin: 0;
   }

   .mobile-sub-title {
      width: 375px;
      height: 36px;
      background: #ffffff;
      border-radius: 0px 0px 0px 0px;
      font-family: Poppins, sans-serif;
      font-weight: 300;
      font-size: 18px;
      color: #959595;
      line-height: 24px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin: 40px 0 0 0;
   }

   .mobile-check-more-btn {
      position: absolute;
      top: 161px;
      left: 50%;
      transform: translateX(-50%);
      width: 124px;
      height: 30px;
      background-color: transparent;
      color: #000000;
      border: 2px solid rgb(0, 0, 0);
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
      background-color: transparent;
      color: #000000;
   }

   .mobile-check-more-btn:active {
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
   }

   @media (max-width: 375px) {
      .background-image-container {
         height: 240px;
      }
   }
</style>
