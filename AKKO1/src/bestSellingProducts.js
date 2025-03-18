// 热销产品组件JavaScript代码
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM已加载，开始初始化热销产品区域');
    // 初始化热销产品区域
    initBestSellingSection();
});

function initBestSellingSection() {
    // 获取容器元素
    const container = document.querySelector('.best-selling-container');
    if (!container) {
        console.error('找不到.best-selling-container元素');
        return;
    }

    console.log('找到容器元素:', container);

    // 检查产品数据是否存在
    if (typeof product === 'undefined' || !Array.isArray(product) || product.length === 0) {
        console.error('产品数据不存在或为空');
        return;
    }

    console.log('产品数据已加载，共有产品:', product.length);

    // 产品分类 - 与HTML中的分类保持一致
    const categories = [
        "Keyboard",
        "Barebone",
        "Kit",
        "KeySwitches",
        "Mice",
        "Keycaps",
    ];

    // 默认选中的分类
    let activeCategory = "Keyboard";
    // 当前页码
    let currentPage = 0;
    // 移动端当前页码
    let mobilePage = 0;
    // PC端每页显示的产品数量
    const productsPerPage = 5;
    // 移动端每页显示的产品数量
    const mobileProductsPerPage = 2;
    // 自动轮播的间隔时间(毫秒)
    const autoSlideInterval = 3000;
    // 轮播计时器
    let autoplayInterval = null;
    // 当前设备类型（PC或移动端）
    let isMobile = window.innerWidth <= 768;
    // 触摸相关变量
    let touchStartX = 0;
    let isDragging = false;

    // 获取DOM元素
    const categoryItems = container.querySelectorAll('.category-item');
    const categoriesContainer = container.querySelector('.categories-container');
    const productsWrapper = container.querySelector('.products-wrapper');
    const indicators = container.querySelector('.indicators');
    const mobileProductsWrapper = container.querySelector('.mobile-products-wrapper');
    const mobileIndicators = container.querySelector('.mobile-indicators');
    const productsContainer = container.querySelector('.products-container');
    const mobileProductsContainer = container.querySelector('.mobile-products-container');

    // 初始化移动端分类滑动功能
    initCategoriesScroll();

    // 绑定分类点击事件
    categoryItems.forEach(item => {
        item.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            setActiveCategory(category);
        });
    });

    // 设置活动分类
    function setActiveCategory(category) {
        console.log('设置活动分类:', category);
        activeCategory = category;
        currentPage = 0; // 切换分类时重置页码
        mobilePage = 0; // 重置移动端页码

        // 更新分类样式
        categoryItems.forEach(item => {
            if (item.getAttribute('data-category') === category) {
                item.classList.add('active');
                // 移动端滚动到选中的分类
                if (isMobile) {
                    scrollToCategory(item);
                }
            } else {
                item.classList.remove('active');
            }
        });

        // 刷新产品显示
        updateProducts();
        updateMobileProducts();
    }

    // 初始化移动端分类滑动功能
    function initCategoriesScroll() {
        if (!categoriesContainer) return;

        // 移动端滑动相关变量
        let startX, scrollLeft, isScrolling = false;
        let startTime, isTap = false;

        // 移动端触摸事件
        categoriesContainer.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            scrollLeft = categoriesContainer.scrollLeft;
            startTime = new Date().getTime();
            isTap = true; // 初始假设是点击
            isScrolling = true;
            categoriesContainer.style.cursor = 'grabbing';
            categoriesContainer.style.scrollBehavior = 'auto';
        });

        categoriesContainer.addEventListener('touchmove', function (e) {
            if (!isScrolling) return;

            // 判断是否滑动超过阈值 (10px)
            if (Math.abs(e.touches[0].clientX - startX) > 10) {
                isTap = false; // 如果移动超过10px，则不是点击
                e.preventDefault();
            }

            const x = e.touches[0].clientX;
            const walk = (x - startX) * 1.5; // 滑动速度倍数
            categoriesContainer.scrollLeft = scrollLeft - walk;
        }, { passive: false }); // 明确指定不是被动事件处理程序

        categoriesContainer.addEventListener('touchend', function (e) {
            isScrolling = false;
            categoriesContainer.style.cursor = 'grab';
            categoriesContainer.style.scrollBehavior = 'smooth';

            // 检查是否是快速点击（小于300ms）且移动距离小
            const endTime = new Date().getTime();
            const timeDiff = endTime - startTime;

            if (isTap && timeDiff < 300) {
                // 是点击，不做额外处理，让原有的click事件处理
            } else {
                // 是滑动，检查是否应该吸附到最近的分类
                snapToNearestCategory();
            }
        });

        // PC端鼠标事件 (也支持移动端分类滑动)
        categoriesContainer.addEventListener('mousedown', function (e) {
            startX = e.clientX;
            scrollLeft = categoriesContainer.scrollLeft;
            isScrolling = true;
            categoriesContainer.style.cursor = 'grabbing';
            categoriesContainer.style.scrollBehavior = 'auto';
            e.preventDefault();
        });

        categoriesContainer.addEventListener('mousemove', function (e) {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.clientX;
            const walk = (x - startX) * 1.5; // 滑动速度倍数
            categoriesContainer.scrollLeft = scrollLeft - walk;
        });

        categoriesContainer.addEventListener('mouseup', function () {
            isScrolling = false;
            categoriesContainer.style.cursor = 'grab';
            categoriesContainer.style.scrollBehavior = 'smooth';

            // 检查是否应该吸附到最近的分类
            snapToNearestCategory();
        });

        categoriesContainer.addEventListener('mouseleave', function () {
            if (isScrolling) {
                isScrolling = false;
                categoriesContainer.style.cursor = 'grab';
                categoriesContainer.style.scrollBehavior = 'smooth';

                // 检查是否应该吸附到最近的分类
                snapToNearestCategory();
            }
        });
    }

    // 滚动到指定分类
    function scrollToCategory(categoryElement) {
        if (!categoriesContainer || !categoryElement) return;

        // 计算要滚动的位置
        const containerRect = categoriesContainer.getBoundingClientRect();
        const categoryRect = categoryElement.getBoundingClientRect();
        const offsetLeft = categoryRect.left - containerRect.left;
        const centerOffset = (containerRect.width - categoryRect.width) / 2;

        // 平滑滚动到分类中心位置
        categoriesContainer.scrollTo({
            left: categoriesContainer.scrollLeft + offsetLeft - centerOffset,
            behavior: 'smooth'
        });
    }

    // 吸附到最近的分类
    function snapToNearestCategory() {
        if (!categoriesContainer || !categoryItems.length) return;

        // 获取可视区域中心点
        const containerCenter = categoriesContainer.getBoundingClientRect().left +
            categoriesContainer.getBoundingClientRect().width / 2;

        // 寻找最接近中心的分类
        let closestCategory = null;
        let minDistance = Infinity;

        categoryItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(itemCenter - containerCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestCategory = item;
            }
        });

        // 滚动到最近的分类
        if (closestCategory) {
            scrollToCategory(closestCategory);
        }
    }

    // 过滤产品
    function getFilteredProducts() {
        const filtered = product.filter(item => item.category === activeCategory);
        console.log(`过滤后的${activeCategory}产品数量:`, filtered.length);
        return filtered;
    }

    // 获取当前页的产品
    function getCurrentPageProducts() {
        const filtered = getFilteredProducts();
        const startIndex = currentPage * productsPerPage;
        return filtered.slice(startIndex, startIndex + productsPerPage);
    }

    // 获取移动端分组产品
    function getMobileProductGroups() {
        const filtered = getFilteredProducts();
        // 限制最多10个产品
        const limitedProducts = filtered.slice(0, 10);

        // 将产品分组，每组2个
        const groups = [];
        for (let i = 0; i < limitedProducts.length; i += mobileProductsPerPage) {
            groups.push(
                limitedProducts.slice(i, Math.min(i + mobileProductsPerPage, limitedProducts.length))
            );
        }
        return groups;
    }

    // 获取当前显示的移动端产品组
    function getCurrentMobileGroup() {
        const groups = getMobileProductGroups();
        if (mobilePage < groups.length) {
            return groups[mobilePage];
        }
        return [];
    }

    // 计算总页数
    function getTotalPages() {
        return Math.ceil(getFilteredProducts().length / productsPerPage);
    }

    // 计算移动端总页数
    function getMobileTotalPages() {
        return getMobileProductGroups().length;
    }

    // 下一页
    function nextPage() {
        if (currentPage < getTotalPages() - 1) {
            currentPage++;
        } else {
            // 循环到第一页
            currentPage = 0;
        }
        updateProducts();
    }

    // 上一页
    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
        } else {
            // 循环到最后一页
            currentPage = getTotalPages() - 1;
        }
        updateProducts();
    }

    // 移动端下一页
    function nextMobilePage() {
        if (mobilePage < getMobileTotalPages() - 1) {
            mobilePage++;
        } else {
            // 循环到第一页
            mobilePage = 0;
        }
        updateMobileProducts();
    }

    // 移动端上一页
    function prevMobilePage() {
        if (mobilePage > 0) {
            mobilePage--;
        } else {
            // 循环到最后一页
            mobilePage = getMobileTotalPages() - 1;
        }
        updateMobileProducts();
    }

    // 设置当前页
    function setPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < getTotalPages()) {
            currentPage = pageIndex;
            updateProducts();
        }
    }

    // 设置移动端当前页
    function setMobilePage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < getMobileTotalPages()) {
            mobilePage = pageIndex;
            updateMobileProducts();
        }
    }

    // 创建PC端产品卡片HTML
    function createProductCardHTML(product, index) {
        // 移除首尾卡片的遮罩效果，所有卡片都显示正常
        console.log('创建产品卡片:', product.title);
        return `
            <div class="product-card">
                <div class="product-info">
                    <h4 class="product-title ${product.subtitle ? 'has-subtitle' : ''}">
                        ${product.title}
                    </h4>
                    ${product.subtitle ? `<h5 class="product-subtitle">${product.subtitle}</h5>` : ''}
                </div>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-details">
                    <div class="rating">
                        <div class="stars">
                            ${Array(5).fill().map(() => '<span class="star">★</span>').join('')}
                        </div>
                        <span class="review-count">${product.reviews}</span>
                    </div>
                    <div class="price">
                        <span class="current-price">$${product.currentPrice.toFixed(2)} USD</span>
                        <span class="original-price">$${product.originalPrice.toFixed(2)} USD</span>
                    </div>
                </div>
            </div>
        `;
    }

    // 创建移动端产品卡片HTML
    function createMobileProductCardHTML(product) {
        return `
            <div class="mobile-product-card">
                <div class="product-info">
                    <h4 class="product-title ${product.subtitle ? 'has-subtitle' : ''}">
                        ${product.title}
                    </h4>
                    ${product.subtitle ? `<h5 class="product-subtitle">${product.subtitle}</h5>` : ''}
                </div>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="mobile-product-details">
                    <div class="rating">
                        <div class="stars">
                            ${Array(5).fill().map(() => '<span class="star">★</span>').join('')}
                        </div>
                        <span class="review-count">${product.reviews}</span>
                    </div>
                    <div class="price">
                        <span class="current-price">$${product.currentPrice.toFixed(2)} USD</span>
                        <span class="original-price">$${product.originalPrice.toFixed(2)} USD</span>
                    </div>
                </div>
            </div>
        `;
    }

    // 更新产品显示
    function updateProducts() {
        // 获取当前页的产品
        const pageProducts = getCurrentPageProducts();
        console.log('当前页产品数量:', pageProducts.length);

        // 创建产品卡片HTML
        let productsHTML = '';
        pageProducts.forEach((product, index) => {
            productsHTML += createProductCardHTML(product, index);
        });

        // 更新产品显示
        console.log('更新产品HTML');
        productsWrapper.innerHTML = productsHTML;

        // 更新指示器
        updateIndicators();

        // 重启自动轮播
        startAutoplay();
    }

    // 更新移动端产品显示
    function updateMobileProducts() {
        // 获取当前组的产品
        const groupProducts = getCurrentMobileGroup();

        // 创建移动端产品卡片HTML
        let mobileProductsHTML = '';
        groupProducts.forEach(product => {
            mobileProductsHTML += createMobileProductCardHTML(product);
        });

        // 更新移动端产品显示
        mobileProductsWrapper.innerHTML = mobileProductsHTML;

        // 确保产品卡片居中显示
        mobileProductsWrapper.style.justifyContent = 'center';

        // 更新移动端指示器
        updateMobileIndicators();

        // 重启自动轮播
        startAutoplay();
    }

    // 更新指示器
    function updateIndicators() {
        const totalPages = getTotalPages();

        // 创建指示器HTML
        let indicatorsHTML = '';
        for (let i = 0; i < totalPages; i++) {
            indicatorsHTML += `
                <div class="indicator ${i === currentPage ? 'active' : ''}" 
                     data-page="${i}"></div>
            `;
        }

        // 更新指示器显示
        indicators.innerHTML = indicatorsHTML;

        // 绑定指示器点击事件
        indicators.querySelectorAll('.indicator').forEach(indicator => {
            indicator.addEventListener('click', function () {
                setPage(parseInt(this.getAttribute('data-page')));
            });
        });
    }

    // 更新移动端指示器
    function updateMobileIndicators() {
        const mobileTotalPages = getMobileTotalPages();

        // 创建移动端指示器HTML
        let mobileIndicatorsHTML = '';
        for (let i = 0; i < mobileTotalPages; i++) {
            mobileIndicatorsHTML += `
                <div class="mobile-indicator ${i === mobilePage ? 'mobile-indicator-active' : ''}" 
                     data-page="${i}"></div>
            `;
        }

        // 更新移动端指示器显示
        mobileIndicators.innerHTML = mobileIndicatorsHTML;

        // 绑定移动端指示器点击事件
        mobileIndicators.querySelectorAll('.mobile-indicator').forEach(indicator => {
            indicator.addEventListener('click', function () {
                setMobilePage(parseInt(this.getAttribute('data-page')));
            });
        });
    }

    // 自动轮播
    function startAutoplay() {
        // 清除之前的计时器
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }

        // 设置新的计时器
        autoplayInterval = setInterval(() => {
            if (isMobile) {
                nextMobilePage();
            } else {
                nextPage();
            }
        }, autoSlideInterval);
    }

    // 停止自动轮播
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // 暂停自动轮播
    function pauseAutoplay() {
        stopAutoplay();
    }

    // 恢复自动轮播
    function resumeAutoplay() {
        startAutoplay();
    }

    // 检测设备是否为移动端
    function checkMobile() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;

        // 如果设备类型发生变化，更新显示
        if (wasMobile !== isMobile) {
            if (isMobile) {
                // 切换到移动端显示
                productsContainer.style.display = 'none';
                indicators.style.display = 'none';
                mobileProductsContainer.style.display = 'block';
                mobileIndicators.style.display = 'flex';
                updateMobileProducts();
            } else {
                // 切换到PC端显示
                productsContainer.style.display = 'flex';
                indicators.style.display = 'flex';
                mobileProductsContainer.style.display = 'none';
                mobileIndicators.style.display = 'none';
                updateProducts();
            }
        }
    }

    // PC端鼠标事件
    productsContainer.addEventListener('mousedown', function (e) {
        isDragging = true;
        touchStartX = e.pageX;
        pauseAutoplay();
    });

    productsContainer.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        const currentX = e.pageX;
        const diff = currentX - touchStartX;

        if (Math.abs(diff) > 100) {
            if (diff > 0) {
                prevPage();
            } else {
                nextPage();
            }
            isDragging = false;
            touchStartX = currentX;
        }
    });

    productsContainer.addEventListener('mouseup', function () {
        isDragging = false;
        resumeAutoplay();
    });

    productsContainer.addEventListener('mouseleave', function () {
        if (isDragging) {
            isDragging = false;
            resumeAutoplay();
        }
    });

    // 移动端触摸事件
    mobileProductsContainer.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        pauseAutoplay();
    });

    mobileProductsContainer.addEventListener('touchmove', function (e) {
        const touchCurrentX = e.touches[0].clientX;
        const diff = touchCurrentX - touchStartX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                prevMobilePage();
            } else {
                nextMobilePage();
            }
            touchStartX = touchCurrentX;
        }
    });

    mobileProductsContainer.addEventListener('touchend', function () {
        resumeAutoplay();
    });

    // 初始化
    console.log('开始初始化产品显示');
    updateProducts();
    updateMobileProducts();
    checkMobile();
    startAutoplay();
    console.log('产品显示初始化完成');

    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile);
}

console.log('产品数据:', product);

console.log('产品数据:', product);