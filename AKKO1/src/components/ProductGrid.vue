<template>
   <div class="product-grid-container">
      <!-- 产品网格 -->
      <div class="grid-layout">
         <!-- 左侧大区域：键盘 -->
         <div class="grid-item keyboards">
            <h2>KEYBOARDS</h2>
            <div class="image-container">
               <img
                  src="https://en.akkogear.com/wp-content/uploads/2025/03/MU02-Mechanical-Keyboard.png"
                  alt="键盘"
               />
            </div>
            <div class="upshadow"></div>
         </div>

         <!-- 右上角：鼠标 -->
         <div class="grid-item mouse">
            <h2>MOUSE</h2>
            <div class="image-container">
               <img
                  src="https://en.akkogear.com/wp-content/uploads/2025/03/Mouse-Pulse01.png"
                  alt="鼠标"
               />
            </div>
         </div>

         <!-- 右下角：DIY套件 -->
         <div class="grid-item diy-kit">
            <h2>DIY KIT</h2>
            <div class="image-container shadow">
               <img
                  src="https://en.akkogear.com/wp-content/uploads/2025/03/5075B-Via-customize-keyboard.png"
                  alt="DIY套件"
               />
            </div>
            <div class="bottomshadow"></div>
         </div>

         <!-- 左下角：开关 -->
         <div class="grid-item switch">
            <h2>SWITCH</h2>
            <div class="image-container">
               <img
                  src="https://en.akkogear.com/wp-content/uploads/2025/03/Rosewood.png"
                  alt="开关"
               />
            </div>
         </div>

         <!-- 左下角：键帽 -->
         <div class="grid-item keycaps">
            <h2>KEYCAPS</h2>
            <div class="image-container">
               <img
                  src="https://en.akkogear.com/wp-content/uploads/2025/03/Keycaps.png"
                  alt="键帽"
               />
            </div>
         </div>
      </div>

      <!-- 页面指示器 - 长方形 -->
      <!-- <div class="page-indicator">
         <div class="indicator-bar active"></div>
         <div class="indicator-bar"></div>
      </div> -->
   </div>
</template>

<script setup>
   // 简化脚本，移除切换相关功能
</script>

<style scoped>
   .product-grid-container {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: calc(20 * 100vw / 1920);
      position: relative;
      margin-bottom: calc(100 * 100vw / 1920);
   }

   .grid-layout {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, calc(200 * 100vw / 1920));
      gap: calc(20 * 100vw / 1920);
      grid-template-areas:
         "keyboards keyboards mouse"
         "keyboards keyboards diy-kit"
         "switch keycaps diy-kit";
   }

   /* 页面指示器样式 - 长方形 */
   .page-indicator {
      display: flex;
      justify-content: center;
      gap: calc(8 * 100vw / 1920);
      margin-top: calc(56 * 100vw / 1920);
      position: relative;
      z-index: 10;
   }

   .indicator-bar {
      width: calc(30 * 100vw / 1920);
      height: calc(4 * 100vw / 1920);
      background-color: #ddd;
      transition: background-color 0.3s;
      border-radius: 0;
   }

   .indicator-bar.active {
      background-color: #666;
   }

   /* 保持原有的其他样式 */
   .grid-item {
      position: relative;
      background-color: #f4f6f9;
      border-radius: 0;
      overflow: hidden;
      padding: calc(20 * 100vw / 1920);
      transition: transform 0.3s ease;
   }

   .grid-item:hover {
      transform: translateY(calc(-5 * 100vw / 1920));
   }

   /* 键盘区域 */
   .keyboards {
      padding-top: calc(50 * 100vw / 1920);
      grid-area: keyboards;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
   }

   .keyboards h2 {
      font-size: calc(24 * 100vw / 1920);
      position: relative;
      padding-top: calc(50 * 100vw / 1920);
      /* padding-bottom: calc(-20 * 100vw / 1920); */
      /* margin-bottom: calc(10 * 100vw / 1920); */
      /* font-size: calc(24 * 100vw / 1920); */
   }

   .keyboards .image-container {
      transform: scale(0.8);
   }

   .keyboards .image-container img {
      
      /* width: 100%; */
      height: auto;
      object-fit: contain;
   }

   .image-container {
      margin-top: calc(-20 * 100vw / 1920);
   }

   .upshadow {
      width: calc(430 * 100vw / 1920);
      height: calc(24 * 100vw / 1920);
      background: linear-gradient(90deg, #d9d9d9 0%, #797979 53%, #d8d8d8 100%);
      border-radius: 0px 0px 0px 0px;
      opacity: 0.5;
      filter: blur(calc(36 * 100vw / 1920));
   }

   /* 鼠标区域 */
   .mouse {
      grid-area: mouse;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: calc(10 * 100vw / 1920);
      position: relative;
      overflow: hidden;
   }

   .mouse h2 {
      font-size: calc(24 * 100vw / 1920);
      position: relative;
      z-index: 2;
   }

   .mouse .image-container {
      position: absolute;
      width: 100%;
      height: 150%;
      bottom: -50%;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: flex-end;
   }

   .mouse .image-container img {
      width: 80%;
      height: auto;
      object-fit: contain;
   }

   /* DIY套件区域 */
   .diy-kit {
      grid-area: diy-kit;
      grid-row: span 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: calc(30 * 100vw / 1920);
   }

   .diy-kit h2 {
      margin-bottom: calc(20 * 100vw / 1920);
      margin-top: calc(20 * 100vw / 1920);
      padding-bottom: calc(20 * 100vw / 1920);
      font-size: calc(24 * 100vw / 1920);
   }

   .diy-kit .image-container {
      margin-top: 0;
      transform: scale(1.4);
   }

   .bottomshadow {
      width: calc(430 * 100vw / 1920);
      height: calc(24 * 100vw / 1920);
      background: linear-gradient(90deg, #d9d9d9 0%, #797979 53%, #d8d8d8 100%);
      border-radius: 0px 0px 0px 0px;
      opacity: 0.7;
      filter: blur(calc(36 * 100vw / 1920));
   }

   /* 开关和键帽区域共同样式 */
   .switch,
   .keycaps {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: calc(30 * 100vw / 1920);
   }

   .switch {
      grid-area: switch;
   }

   .keycaps {
      grid-area: keycaps;
   }

   /* 为KEYCAPS添加特殊样式 */
   .keycaps .image-container {
      transform: scale(1);
      margin-left: calc(-20 * 100vw / 1920); /* 调整位置，防止放大后溢出 */
   }

   /* 标题样式 */
   h2 {
      font-size: calc(24 * 100vw / 1920);
      color: #333;
      z-index: 2;
      font-weight: 600;
   }

   .switch h2,
   .keycaps h2 {
      margin-right: calc(40 * 100vw / 1920);
      min-width: calc(120 * 100vw / 1920);
      font-size: calc(24 * 100vw / 1920);
   }

   .switch .image-container img {
      transform: scale(0.7);
   }

   /* 图片容器样式 */
   .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
   }

   .image-container img {
      
      max-width: 80%;
      max-height: 80%;
      object-fit: contain;
   }

   /* 375px及以下的固定布局 - 使用固定像素值 */
   @media (max-width: 375px) {
      .product-grid-container {
         width: 375px;
         height: 320px;
         padding: 0;
         margin: 0;
         position: relative;
         margin-left: 0;
         margin-right: 0;
      }

      .grid-layout {
         width: 375px;
         height: 320px;
         position: relative;
         display: block;
         padding: 0;
         margin: 0;
      }

      /* KEYBOARDS 区域 */
      .keyboards {
         display: flex;
         justify-content: center;
         align-items: center;
         /* position: absolute; */
         width: 236px;
         height: 175px;
         left: 12px;
         background-color: #f4f6f9;
      }

      .keyboards h2 {
         position: absolute;
         width: 94px;
         height: 24px;
         left: 71px;
         top: 15px;
         font-size: 16px;
         line-height: 18.75px;
         text-align: center;
         margin: 0;
      }

      .keyboards .image-container {
         position: absolute;
         width: 222.34px;
         height: 175px;
         left: 7px;
         padding-top: 20px;
      }

      .keyboards .image-container img {
         margin-top: 20px;
         transform: scale(1.3);
         width: 100%;
         height: auto;
         object-fit: contain;
      }

      /* MOUSE 区域 */
      .mouse {
         position: absolute;
         width: 169.01px;
         height: 87.42px;
         left: 256px;
         top: 0;
         background-color: #f4f6f9;
         padding-top: 0;
         overflow: hidden;
      }

      .mouse h2 {
         position: absolute;
         width: 56px;
         height: 24px;
         left: 57px;
         top: 9px;
         font-size: 16px;
         line-height: 18.75px;
         text-align: center;
         margin: 0;
      }

      .mouse .image-container {
         position: absolute;
         width: 118.02px;
         height: 120px;
         left: 25.5px;
         bottom: -30px;
         top: auto;
         display: flex;
         justify-content: center;
         align-items: flex-end;
      }

      .mouse .image-container img {
         width: 100%;
         height: auto;
         object-fit: contain;
      }

      /* DIY KIT 区域 */
      .diy-kit {
         position: absolute;
         width: 170px;
         height: 175px;
         left: 256px;
         top: 95px;
         background-color: #f4f6f9;
         padding-top: 0;
      }

      .diy-kit h2 {
         position: absolute;
         width: 60px;
         height: 24px;
         left: 59px;
         top: 25px;
         font-size: 16px;
         line-height: 18.75px;
         text-align: center;
         /* margin: 0; */
         /* padding-bottom: 0; */
      }

      .diy-kit .image-container {
         position: absolute;
         width: 162px;
         height: 161px;
         left: 4px;
         top: 14px;
      }

      .diy-kit .image-container img {
         transform: scale(0.8);
         width: 100%;
         height: 100%;
         object-fit: contain;
      }

      /* SWITCH 区域 */
      .switch {
         position: absolute;
         width: 114px;
         height: 87.26px;
         left: 12px;
         top: 183px;
         background-color: #f4f6f9;
         padding: 0;
      }

      .switch h2 {
         position: absolute;
         width: 55px;
         height: 21px;
         left: 30px;
         top: 63px;
         font-size: 14px;
         line-height: 16.41px;
         text-align: center;
         margin: 0;
      }

      .switch .image-container {
         position: absolute;
         width: 65px;
         height: 53px;
         left: 25px;
         top: 8px;
         margin-top: 0;
      }

      .switch .image-container img {
         transform: scale(1.5);
         width: 100%;
         height: 100%;
         object-fit: contain;
      }

      /* KEYCAPS 区域 */
      .keycaps {
         position: absolute;
         width: 114px;
         height: 87.26px;
         left: 134px;
         top: 183px;
         background-color: #f4f6f9;
         padding: 0;
      }

      .keycaps h2 {
         position: absolute;
         width: 63px;
         height: 21px;
         left: 26px;
         top: 63px;
         font-size: 14px;
         line-height: 16.41px;
         text-align: center;
         margin: 0;
      }

      .keycaps .image-container {
         position: absolute;
         width: 65px;
         height: 53px;
         left: 25px;
         top: 8px;
         margin-left: 0;
         transform: none;
      }

      .keycaps .image-container img {
         transform: scale(2.1);
         width: 100%;
         height: 100%;
         object-fit: contain;
      }

      /* 移除阴影效果 */
      .upshadow,
      .bottomshadow {
         display: none;
      }

      /* 移除所有transform效果 */
      .grid-item,
      .grid-item:hover,
      .grid-item:active,
      .grid-item img,
      .grid-item:active img {
         transform: none;
      }

      /* 重置字体大小，使用固定像素值 */
      h2,
      .keyboards h2,
      .mouse h2,
      .diy-kit h2,
      .switch h2,
      .keycaps h2 {
         font-size: 16px;
      }

      .switch h2,
      .keycaps h2 {
         font-size: 14px;
      }
   }
</style>
