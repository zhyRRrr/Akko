<template>
   <div class="keyboard-showcase-container">
      <div
         class="keyboard-showcase"
         ref="showcaseRef"
         @mousedown="startDrag"
         @mousemove="onDrag"
         @mouseup="endDrag"
         @mouseleave="endDrag"
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
      </div>
   </div>
</template>

<script setup>
   import { ref, onMounted } from "vue";

   const showcaseRef = ref(null);
   const isDragging = ref(false);
   const startX = ref(0);
   const scrollLeft = ref(0);

   const startDrag = (e) => {
      isDragging.value = true;
      startX.value = e.pageX - showcaseRef.value.offsetLeft;
      scrollLeft.value = showcaseRef.value.scrollLeft;
      showcaseRef.value.style.cursor = "grabbing";
   };

   const onDrag = (e) => {
      if (!isDragging.value) return;
      e.preventDefault();
      const x = e.pageX - showcaseRef.value.offsetLeft;
      const walk = (x - startX.value) * 1.5; // 滑动速度系数
      showcaseRef.value.scrollLeft = scrollLeft.value - walk;
   };

   const endDrag = () => {
      isDragging.value = false;
      showcaseRef.value.style.cursor = "grab";
   };

   onMounted(() => {
      // 初始化滚动位置，只显示左侧部分
      if (showcaseRef.value) {
         showcaseRef.value.scrollLeft = 0;
      }
   });
</script>

<style scoped>
   .keyboard-showcase-container {
      width: 100%;
      height: 720px;
      overflow: hidden;
      position: relative;
   }

   .keyboard-showcase {
      width: 100%;
      height: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      cursor: grab;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE and Edge */
      scroll-behavior: smooth;
   }

   .keyboard-showcase::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
   }

   .keyboard-grid {
      display: grid;
      grid-template-columns: 600px 395px 395px 320px;
      grid-template-rows: 348px 348px;
      gap: 24px;
      margin-left: 241px;
      width: max-content;
      height: 720px;
      position: relative;
   }

   .keyboard-card {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.3s ease;
   }

   .keyboard-card:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
   }

   .keyboard-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }

   .card-label {
      position: absolute;
      bottom: 16px;
      left: 16px;
      background-color: rgba(255, 255, 255, 0.8);
      padding: 6px 12px;
      border-radius: 4px;
      font-weight: bold;
      color: #333;
   }

   /* 特定卡片的位置和大小 */
   .cinnamoroll {
      grid-row: 1 / span 2;
      grid-column: 1;
      height: 720px;
   }

   .pompompurin {
      grid-row: 1;
      grid-column: 2 / span 2;
      width: 815px;
   }

   .kuromi {
      grid-row: 2;
      grid-column: 2;
   }

   .my-sweet-piano {
      grid-row: 2;
      grid-column: 3;
   }

   .kings-avatar {
      grid-row: 1;
      grid-column: 4;
      height: 246px;
      width: 320px;
   }

   .joy-of-life {
      position: absolute;
      left: calc(
         600px + 395px + 395px + 48px
      ); /* Cinnamoroll宽度 + Kuromi宽度 + MySweetPiano宽度 + 2个间距 */
      top: 270px;
      width: 320px;
      height: 450px;
   }
</style>
