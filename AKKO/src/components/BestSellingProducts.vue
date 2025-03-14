<script setup>
   import { ref, computed, onMounted, watch } from "vue";
   import { product } from "../data/products.js";
   import "../style/BestSellingProducts.css";
   // 引入Swiper相关组件和样式
   import { Swiper, SwiperSlide } from "swiper/vue";
   import { Pagination, Navigation, Autoplay } from "swiper/modules";
   import "swiper/css";
   import "swiper/css/pagination";
   import "swiper/css/autoplay";

   const currentPage = ref(0); // 当前页码
   const isMobile = ref(false); // 是否为移动端
   const swiperInstance = ref(null); // 存储Swiper实例
   const mobilePage = ref(0); // 移动端当前页码

   // 检测设备是否为移动端
   const checkMobile = () => {
      isMobile.value = window.innerWidth <= 375;
   };

   onMounted(() => {
      checkMobile();
      window.addEventListener("resize", checkMobile);

      // 启动自动轮播
      startAutoplay();
   });

   const categories = ref([
      "Keyboard",
      "Barebone",
      "Kit",
      "KeySwitches",
      "Mice",
      "Keycaps",
   ]);

   const activeCategory = ref("Keyboard");

   // 产品数据
   const products = ref(product);

   // 添加计算属性来过滤和分页产品
   const filteredProducts = computed(() => {
      const filtered = products.value.filter(
         (product) => product.category === activeCategory.value
      );
      const startIndex = currentPage.value * 5;
      return filtered.slice(startIndex, startIndex + 5);
   });

   // 获取当前分类的所有产品
   const currentCategoryProducts = computed(() => {
      return products.value.filter(
         (product) => product.category === activeCategory.value
      );
   });

   // 计算当前分类的总页数
   const totalPages = computed(() => {
      return Math.ceil(currentCategoryProducts.value.length / 5);
   });

   // 移动端产品分组（每组2个）
   const mobileProductGroups = computed(() => {
      const filtered = products.value.filter(
         (product) => product.category === activeCategory.value
      );
      // 限制最多10个产品
      const limitedProducts = filtered.slice(0, 10);

      // 将产品分组，每组2个
      const groups = [];
      for (let i = 0; i < limitedProducts.length; i += 2) {
         groups.push(
            limitedProducts.slice(i, Math.min(i + 2, limitedProducts.length))
         );
      }
      return groups;
   });

   // 移动端总页数
   const mobileTotalPages = computed(() => {
      return mobileProductGroups.value.length;
   });

   // 获取当前显示的移动端产品组
   const currentMobileGroup = computed(() => {
      if (mobilePage.value < mobileProductGroups.value.length) {
         return mobileProductGroups.value[mobilePage.value];
      }
      return [];
   });

   const setActiveCategory = (category) => {
      activeCategory.value = category;
      currentPage.value = 0; // 切换分类时重置页码
      mobilePage.value = 0; // 重置移动端页码
   };

   const nextPage = () => {
      if (currentPage.value < totalPages.value - 1) {
         currentPage.value++;
      } else {
         // 循环到第一页
         currentPage.value = 0;
      }
   };

   const prevPage = () => {
      if (currentPage.value > 0) {
         currentPage.value--;
      } else {
         // 循环到最后一页
         currentPage.value = totalPages.value - 1;
      }
   };

   // 移动端下一页
   const nextMobilePage = () => {
      if (mobilePage.value < mobileTotalPages.value - 1) {
         mobilePage.value++;
      } else {
         // 循环到第一页
         mobilePage.value = 0;
      }
   };

   // 移动端上一页
   const prevMobilePage = () => {
      if (mobilePage.value > 0) {
         mobilePage.value--;
      } else {
         // 循环到最后一页
         mobilePage.value = mobileTotalPages.value - 1;
      }
   };

   // 设置当前页
   const setPage = (pageIndex) => {
      if (pageIndex >= 0 && pageIndex < totalPages.value) {
         currentPage.value = pageIndex;
      }
   };

   // 设置移动端当前页
   const setMobilePage = (pageIndex) => {
      if (pageIndex >= 0 && pageIndex < mobileTotalPages.value) {
         mobilePage.value = pageIndex;
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
            nextMobilePage();
         } else {
            nextPage();
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

   // 处理滑动
   let startX = 0;
   let isDragging = false;

   const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX;
      pauseAutoplay(); // 用户开始交互时暂停自动轮播
   };

   const handleMouseMove = (e) => {
      if (!isDragging) return;
      const currentX = e.pageX;
      const diff = currentX - startX;

      if (Math.abs(diff) > 100) {
         // 滑动距离超过100px时触发翻页
         if (diff > 0) {
            prevPage();
         } else {
            nextPage();
         }
         isDragging = false;
         startX = currentX;
      }
   };

   const handleMouseUp = () => {
      isDragging = false;
      resumeAutoplay(); // 用户结束交互时恢复自动轮播
   };

   // 移动端触摸滑动处理
   let touchStartX = 0;

   const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      pauseAutoplay(); // 用户开始交互时暂停自动轮播
   };

   const handleTouchMove = (e) => {
      const touchCurrentX = e.touches[0].clientX;
      const diff = touchCurrentX - touchStartX;

      if (Math.abs(diff) > 50) {
         // 滑动距离超过50px时触发翻页
         if (diff > 0) {
            prevMobilePage();
         } else {
            nextMobilePage();
         }
         touchStartX = touchCurrentX;
      }
   };

   const handleTouchEnd = () => {
      resumeAutoplay(); // 用户结束交互时恢复自动轮播
   };

   // 监听分类变化，重新开始自动轮播
   watch(activeCategory, () => {
      startAutoplay();
   });
</script>

<template>
   <div class="best-selling-container">
      <div class="title-container">
         <h3 class="title">
            BEST SELLING PRODUCTS/<span class="mobile-break">TOP SELLING</span>
         </h3>
      </div>

      <div class="categories-container">
         <div
            v-for="category in categories"
            :key="category"
            class="category-item"
            :class="{ active: category === activeCategory }"
            @click="setActiveCategory(category)"
         >
            {{ category }}
         </div>
      </div>

      <!-- PC端产品展示 -->
      <div
         v-if="!isMobile"
         class="products-container"
         @mousedown="handleMouseDown"
         @mousemove="handleMouseMove"
         @mouseup="handleMouseUp"
         @mouseleave="handleMouseUp"
      >
         <div class="products-wrapper">
            <div
               v-for="(product, index) in filteredProducts"
               :key="index"
               class="product-card"
               :class="{ masked: index === 0 || index === 4 }"
            >
               <div class="product-info">
                  <h4
                     class="product-title"
                     :class="{ 'has-subtitle': product.subtitle }"
                  >
                     {{ product.title }}
                  </h4>
                  <h5 v-if="product.subtitle" class="product-subtitle">
                     {{ product.subtitle }}
                  </h5>
               </div>
               <div class="product-image">
                  <img :src="product.image" :alt="product.title" />
               </div>
               <div class="product-details">
                  <div class="rating">
                     <div class="stars">
                        <span v-for="n in 5" :key="n" class="star">★</span>
                     </div>
                     <span class="review-count">{{ product.reviews }}</span>
                  </div>
                  <div class="price">
                     <span class="current-price"
                        >${{ product.currentPrice.toFixed(2) }} USD</span
                     >
                     <span class="original-price"
                        >${{ product.originalPrice.toFixed(2) }} USD</span
                     >
                  </div>
               </div>
            </div>
         </div>
         <!-- 指示器 - 根据当前分类的总页数动态生成 -->
         <div class="indicators">
            <div
               v-for="page in totalPages"
               :key="page"
               class="indicator"
               :class="{ active: currentPage === page - 1 }"
               @click="setPage(page - 1)"
            ></div>
         </div>
      </div>

      <!-- 移动端产品展示（使用自定义轮播） -->
      <div
         v-else
         class="mobile-products-container"
         @touchstart="handleTouchStart"
         @touchmove="handleTouchMove"
         @touchend="handleTouchEnd"
      >
         <div class="mobile-products-wrapper">
            <div
               v-for="(product, index) in currentMobileGroup"
               :key="product.title + index"
               class="mobile-product-card"
            >
               <div class="product-info">
                  <h4
                     class="product-title"
                     :class="{ 'has-subtitle': product.subtitle }"
                  >
                     {{ product.title }}
                  </h4>
                  <h5 v-if="product.subtitle" class="product-subtitle">
                     {{ product.subtitle }}
                  </h5>
               </div>
               <div class="product-image">
                  <img :src="product.image" :alt="product.title" />
               </div>
               <div class="mobile-product-details">
                  <div class="rating">
                     <div class="stars">
                        <span v-for="n in 5" :key="n" class="star">★</span>
                     </div>
                     <span class="review-count">{{ product.reviews }}</span>
                  </div>
                  <div class="price">
                     <span class="current-price"
                        >${{ product.currentPrice.toFixed(2) }} USD</span
                     >
                     <span class="original-price"
                        >${{ product.originalPrice.toFixed(2) }} USD</span
                     >
                  </div>
               </div>
            </div>
         </div>

         <!-- 自定义移动端指示器 -->
         <div class="mobile-indicators">
            <div
               v-for="page in mobileTotalPages"
               :key="page"
               class="mobile-indicator"
               :class="{ 'mobile-indicator-active': mobilePage === page - 1 }"
               @click="setMobilePage(page - 1)"
            ></div>
         </div>
      </div>
   </div>
</template>
