<script setup>
   // 不需要ref和状态管理，直接使用CSS hover效果
</script>

<template>
   <div class="background-image-container">
      <div class="text-container">
         <h1 class="main-title">IN THE PRESS</h1>
         <button class="check-more-btn">View More</button>
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
      margin: 12px 0 0 0;
   }

   .check-more-btn {
      position: absolute;
      top: 146px;
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

   @media (max-width: 768px) {
      .background-image-container {
         height: 18.75rem;
      }

      .text-container {
         top: 1.875rem;
      }

      .main-title {
         padding-top: 5rem;
         width: 23.375rem;
         height: 3.75rem;
         font-size: 2.5rem;
         line-height: 2.93rem;
      }

      .check-more-btn {
         top: 9.125rem;
         width: 9.25rem;
         height: 2.25rem;
         border: 0.125rem solid rgb(0, 0, 0);
         border-radius: 0.375rem;
         font-size: 1rem;
         line-height: 1.172rem;
      }
   }
</style>
