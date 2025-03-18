<script setup>
   import Carousel from "./components/Carousel.vue";
   import ProductGrid from "./components/ProductGrid.vue";
   import BestSellingProducts from "./components/BestSellingProducts.vue";
   import BackgroundImage from "./components/BackgroundImage.vue";
   import BackgroundImagedown from "./components/BackgroundImagedown.vue";
   import IPCollaboration from "./components/IPCOLLABORATION.vue";
   import KeyboardShowcase from "./components/KeyboardShowcase.vue";
   import ImageFlex from "./components/ImageFlex.vue";
   import InThePress from "./components/INTHEPRESS.vue";
   import PressImage from "./components/PressImage.vue";
</script>

<template>
   <div class="app-container">
      <!-- <header class="header">
         <div class="header-content">
            <div class="logo">
               <img src="./assets/logo.svg" alt="Akko" />
            </div>
            <nav class="nav-menu">
               添加导航菜单
               <button class="menu-toggle" aria-label="Toggle menu">
                  <span></span>
                  <span></span>
                  <span></span>
               </button>
            </nav>
         </div>
      </header> -->
      <Carousel />
      <div class="section-spacing"></div>
      <div class="container">
         <ProductGrid />
      </div>
      <BestSellingProducts />
      <BackgroundImage />
      <BackgroundImagedown />
      <IPCollaboration />
      <KeyboardShowcase />
      <ImageFlex />
      <InThePress />
      <div class="container">
         <PressImage />
      </div>
   </div>
</template>

<style scoped>
   .app-container {
      width: 100%;
      overflow-x: hidden;
   }

   .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: calc(64 * 100vw / 1920);
      background-color: var(--primary-color);
      z-index: 1000;
   }

   .header-content {
      max-width: var(--container-max-width);
      height: 100%;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
      display: flex;
      align-items: center;
      justify-content: space-between;
   }

   .logo img {
      height: calc(30 * 100vw / 1920);
      width: auto;
   }

   .nav-menu {
      display: none; /* 默认隐藏导航菜单 */
   }

   .menu-toggle {
      display: none; /* 默认隐藏菜单按钮 */
      flex-direction: column;
      justify-content: space-between;
      width: calc(24 * 100vw / 1920);
      height: calc(18 * 100vw / 1920);
      background: transparent;
      border: none;
      padding: 0;
   }

   .menu-toggle span {
      width: 100%;
      height: calc(2 * 100vw / 1920);
      background-color: white;
      transition: all 0.3s ease;
   }

   /* .main-content {
      padding-top: calc(64 * 100vw / 1920); /* 为固定定位的header留出空间 */
   /* } */

   .section-spacing {
      height: var(--spacing-xl);
   }

   /* 响应式布局 */
   @media (max-width: 767px) {
      .header-content {
         padding: 0 var(--spacing-sm);
      }

      .menu-toggle {
         display: flex; /* 在移动端显示菜单按钮 */
      }

      .section-spacing {
         height: var(--spacing-lg);
      }
   }

   @media (min-width: 375px) and (max-width: 1023px) {
      .header-content {
         padding: 0 var(--spacing-md);
      }
   }

   @media (min-width: 1024px) {
      .nav-menu {
         display: flex; /* 在桌面端显示导航菜单 */
      }
   }

   /* 375px及以下的固定布局 */
   @media (max-width: 768px) {
      .header {
         height: 4rem;
      }

      .logo img {
         height: 1.875rem;
      }

      .menu-toggle {
         width: 1.5rem;
         height: 1.125rem;
      }

      .menu-toggle span {
         height: 0.125rem;
      }
   }
</style>
