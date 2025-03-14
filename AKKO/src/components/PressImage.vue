<script setup></script>

<template>
   <div class="press-container">
      <!-- 第一行 -->
      <div class="press-row">
         <div class="press-item large-left">
            <img
               class="mmorpg-logo"
               referrerpolicy="no-referrer"
               src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNGf353cd69aa240a3b42642e26f1759d30.png"
               alt="MMORPG"
            />
         </div>
         <div class="press-item large-right">
            <img
               class="pcgamer-logo"
               referrerpolicy="no-referrer"
               src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNGe0e4292764394b8a506ab803d95b34ef.png"
               alt="PC GAMER"
            />
         </div>
      </div>

      <!-- 第二行 -->
      <div class="press-row">
         <div class="press-item small-item">
            <img
               class="ign-logo"
               referrerpolicy="no-referrer"
               src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNG56109e8539b860b9b5f03041c9b20eae.png"
               alt="IGN"
            />
         </div>
         <div class="press-item small-item">
            <img
               class="forbes-logo"
               referrerpolicy="no-referrer"
               src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNG157a85c71b3b3ec4836ffda3abc8f2ed.png"
               alt="Forbes"
            />
         </div>
         <div class="press-item large-bottom">
            <img
               class="tomshardware-logo"
               referrerpolicy="no-referrer"
               src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNGd9dad4f791d9709dbe300e80fdf433bd.png"
               alt="Tom's HARDWARE"
            />
         </div>
      </div>
   </div>
</template>

<style scoped>
   .press-container {
      width: 1440px;
      margin: 0 auto;
      padding: 40px 0;
      position: relative;
   }

   .press-row {
      display: flex;
      gap: 24px;
      margin-bottom: 24px;
   }

   /* 第一行特别处理 */
   .press-row:first-child {
      margin-left: 0;
   }

   /* 第二行特别处理 */
   .press-row:nth-child(2) {
      margin-left: 0;
   }

   .press-item {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(244, 246, 249, 1);
      /* border-radius: 8px; */
   }

   .large-left {
      width: 804px;
      height: 200px;
   }

   .large-right {
      width: 611px;
      height: 170px;
   }

   .large-bottom {
      margin-top: -30px;
      width: 611px;
      height: 170px;
   }

   .small-item {
      width: 390px;
      height: 140px;
   }

   /* 保持原始图片尺寸 */
   .mmorpg-logo {
      width: 340px;
      height: 82px;
   }

   .pcgamer-logo {
      width: 271px;
      height: 52px;
   }

   .ign-logo {
      width: 244px;
      height: 58px;
   }

   .forbes-logo {
      width: 390px;
      height: 140px;
   }

   .tomshardware-logo {
      width: 350px;
      height: 70px;
   }
</style>
