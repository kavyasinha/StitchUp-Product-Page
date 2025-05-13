// Complete JavaScript for Premium Jacket Product Page
document.addEventListener('DOMContentLoaded', function() {
    // ==== GLOBAL ELEMENTS ====
    const modalOverlay = document.querySelector('.modal-overlay');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // ==== 1. PRODUCT GALLERY ====
    function initProductGallery() {
        const mainImage = document.getElementById('main-image');
        const thumbnails = document.querySelectorAll('.gallery-thumbnails .thumbnail');
        const thumbnailContainer = document.querySelector('.thumbnails-container');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        // Make sure elements exist
        if (!mainImage || !thumbnails.length || !thumbnailContainer) {
            console.error('Product gallery elements not found');
            return;
        }
        
        // Set first thumbnail as active by default
        thumbnails[0].classList.add('active');
        
        // Handle thumbnail clicks
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update main image with this thumbnail's source
                mainImage.src = this.src;
                
                // Update active state
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Thumbnail navigation buttons
        if (prevBtn && nextBtn) {
            // Previous button click
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default button behavior
                thumbnailContainer.scrollBy({
                    left: -100,
                    behavior: 'smooth'
                });
            });
            
            // Next button click
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default button behavior
                thumbnailContainer.scrollBy({
                    left: 100,
                    behavior: 'smooth'
                });
            });
            
            // Update scroll button visibility on scroll
            thumbnailContainer.addEventListener('scroll', updateScrollButtonVisibility);
            
            // Initial visibility check
            updateScrollButtonVisibility();
            
            function updateScrollButtonVisibility() {
                const isAtStart = thumbnailContainer.scrollLeft <= 10;
                const isAtEnd = thumbnailContainer.scrollLeft + thumbnailContainer.clientWidth >= thumbnailContainer.scrollWidth - 10;
                
                // Toggle previous button visibility
                prevBtn.style.opacity = isAtStart ? '0.3' : '1';
                prevBtn.style.cursor = isAtStart ? 'default' : 'pointer';
                
                // Toggle next button visibility
                nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
                nextBtn.style.cursor = isAtEnd ? 'default' : 'pointer';
            }
        }
    }
    
    // ==== 2. SIZE CHART MODAL ====
    function initSizeChartModal() {
        const sizeChartBtn = document.getElementById('size-chart-btn');
        const sizeChartModal = document.getElementById('size-chart-modal');
        
        if (sizeChartBtn && sizeChartModal) {
            sizeChartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(sizeChartModal);
            });
        }
    }
    
    // ==== 3. PRODUCT VARIANTS ====
    function initProductVariants() {
        // Color swatches
        const colorSwatches = document.querySelectorAll('.color-swatch');
        const selectedColorText = document.getElementById('selected-color');
        
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', function() {
                // Update active state
                colorSwatches.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
                
                // Update selected color text
                if (selectedColorText) {
                    selectedColorText.textContent = this.dataset.color;
                }
                
                // Save selection to local storage
                localStorage.setItem('selectedColor', this.dataset.color);
            });
        });
        
        // Size options
        const sizeOptions = document.querySelectorAll('.size-option');
        const selectedSizeText = document.getElementById('selected-size');
        
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Update active state
                sizeOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // Update selected size text
                if (selectedSizeText) {
                    selectedSizeText.textContent = this.dataset.size;
                }
                
                // Save selection to local storage
                localStorage.setItem('selectedSize', this.dataset.size);
            });
        });
    }
    
    // ==== 4. COMPARE COLORS MODAL ====
    function initCompareColorsModal() {
        const compareColorsBtn = document.getElementById('compare-colors-btn');
        const compareColorsModal = document.getElementById('compare-colors-modal');
        const compareCheckboxes = document.querySelectorAll('.compare-checkbox');
        const selectedColors = document.querySelectorAll('.selected-color');
        
        if (compareColorsBtn && compareColorsModal) {
            compareColorsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(compareColorsModal);
            });
            
            // Handle checkbox changes
            compareCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const colorName = this.closest('.color-compare-item').dataset.color;
                    const selectedColor = document.querySelector(`.selected-color[data-color="${colorName}"]`);
                    
                    if (selectedColor) {
                        selectedColor.classList.toggle('active', this.checked);
                    }
                });
            });
        }
    }
    
    // ==== 5. COMPLEMENTARY PRODUCTS CAROUSEL ====
    function initCarousels() {
        const carousels = document.querySelectorAll('.complementary-carousel');
        
        carousels.forEach(carousel => {
            const container = carousel.querySelector('.carousel-container');
            const prevBtn = carousel.querySelector('.carousel-btn.prev');
            const nextBtn = carousel.querySelector('.carousel-btn.next');
            
            if (container && prevBtn && nextBtn) {
                // Previous button click
                prevBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    container.scrollBy({
                        left: -300,
                        behavior: 'smooth'
                    });
                });
                
                // Next button click
                nextBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    container.scrollBy({
                        left: 300,
                        behavior: 'smooth'
                    });
                });
                
                // Update button visibility on scroll
                container.addEventListener('scroll', function() {
                    const isAtStart = container.scrollLeft <= 10;
                    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
                    
                    prevBtn.style.opacity = isAtStart ? '0.3' : '1';
                    nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
                });
                
                // Initial visibility check
                const isAtStart = container.scrollLeft <= 10;
                const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
                
                prevBtn.style.opacity = isAtStart ? '0.3' : '1';
                nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
            }
        });
    }
    
    // ==== 7. PRODUCT INFO TABS ====
    function initProductTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                // Update active tab button
                tabBtns.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding panel
                tabPanels.forEach(panel => {
                    if (panel.id === tabId) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // ==== QUANTITY SELECTOR ====
    function initQuantitySelector() {
        const minusBtn = document.querySelector('.qty-btn.minus');
        const plusBtn = document.querySelector('.qty-btn.plus');
        const qtyInput = document.querySelector('.qty-input');
        
        if (minusBtn && plusBtn && qtyInput) {
            // Decrease quantity
            minusBtn.addEventListener('click', function() {
                let value = parseInt(qtyInput.value);
                if (value > 1) {
                    qtyInput.value = value - 1;
                }
            });
            
            // Increase quantity
            plusBtn.addEventListener('click', function() {
                let value = parseInt(qtyInput.value);
                qtyInput.value = value + 1;
            });
            
            // Validate input
            qtyInput.addEventListener('change', function() {
                let value = parseInt(this.value);
                if (isNaN(value) || value < 1) {
                    this.value = 1;
                }
            });
        }
    }
    
    // ==== IMAGE ZOOM EFFECT ====
    function initImageZoom() {
        const mainImage = document.getElementById('main-image');
        const zoomOverlay = document.querySelector('.image-zoom-overlay');
        
        if (mainImage && zoomOverlay) {
            zoomOverlay.addEventListener('mousemove', function(e) {
                const rect = mainImage.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;
                
                mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                mainImage.style.transform = 'scale(1.5)';
            });
            
            zoomOverlay.addEventListener('mouseleave', function() {
                mainImage.style.transform = 'scale(1)';
            });
        }
    }
    
    // ==== LOAD SAVED VARIANTS ====
    function loadSavedVariants() {
        // Load color selection
        const savedColor = localStorage.getItem('selectedColor');
        if (savedColor) {
            const colorSwatch = document.querySelector(`.color-swatch[data-color="${savedColor}"]`);
            const selectedColorText = document.getElementById('selected-color');
            
            if (colorSwatch) {
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                colorSwatch.classList.add('active');
                
                if (selectedColorText) {
                    selectedColorText.textContent = savedColor;
                }
            }
        }
        
        // Load size selection
        const savedSize = localStorage.getItem('selectedSize');
        if (savedSize) {
            const sizeOption = document.querySelector(`.size-option[data-size="${savedSize}"]`);
            const selectedSizeText = document.getElementById('selected-size');
            
            if (sizeOption) {
                document.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
                sizeOption.classList.add('active');
                
                if (selectedSizeText) {
                    selectedSizeText.textContent = savedSize;
                }
            }
        }
    }
    
    // ==== CART FUNCTIONALITY ====
    function initCartFunctionality() {
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        const addBundleBtn = document.querySelector('.add-bundle-btn');
        const quickAddBtns = document.querySelectorAll('.quick-add');
        const cartCount = document.querySelector('.cart-count');
        
        // Add main product to cart
        if (addToCartBtn && cartCount) {
            addToCartBtn.addEventListener('click', function() {
                updateCart(1);
                showNotification('Product added to cart!');
            });
        }
        
        // Add bundle to cart
        if (addBundleBtn && cartCount) {
            addBundleBtn.addEventListener('click', function() {
                updateCart(3); // Bundle has 3 items
                showNotification('Bundle added to cart!');
            });
        }
        
        // Quick add buttons
        if (quickAddBtns.length && cartCount) {
            quickAddBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    updateCart(1);
                    const productName = this.closest('.product-card').querySelector('h3').textContent;
                    showNotification(`${productName} added to cart!`);
                });
            });
        }
        
        // Update cart count
        function updateCart(quantity) {
            let currentCount = parseInt(cartCount.textContent || '0');
            cartCount.textContent = currentCount + quantity;
            
            // Add animation
            cartCount.classList.add('cart-pulse');
            setTimeout(() => {
                cartCount.classList.remove('cart-pulse');
            }, 300);
        }
        
        // Show notification
        function showNotification(message) {
            let notification = document.getElementById('notification');
            
            if (!notification) {
                notification = document.createElement('div');
                notification.id = 'notification';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background-color: #4CAF50;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 4px;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                `;
                document.body.appendChild(notification);
            }
            
            notification.textContent = message;
            notification.style.opacity = '1';
            
            setTimeout(() => {
                notification.style.opacity = '0';
            }, 3000);
        }
    }
    
    // ==== MODAL HANDLING ====
    function initModals() {
        // Open modal function
        window.openModal = function(modal) {
            if (modal && modalOverlay) {
                modal.style.display = 'block';
                modalOverlay.style.display = 'block';
                
                // Add animation classes
                setTimeout(() => {
                    modal.classList.add('modal-open');
                    modalOverlay.classList.add('overlay-open');
                }, 10);
            }
        };
        
        // Close modal function
        window.closeModal = function(modal) {
            if (modal && modalOverlay) {
                modal.classList.remove('modal-open');
                modalOverlay.classList.remove('overlay-open');
                
                // Remove after animation completes
                setTimeout(() => {
                    modal.style.display = 'none';
                    
                    // Only hide overlay if all modals are closed
                    const visibleModals = document.querySelectorAll('.modal[style*="display: block"]');
                    if (visibleModals.length === 0) {
                        modalOverlay.style.display = 'none';
                    }
                }, 300);
            }
        };
        
        // Close button event listeners
        closeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                closeModal(modal);
            });
        });
        
        // Close on overlay click
        if (modalOverlay) {
            modalOverlay.addEventListener('click', function() {
                modals.forEach(modal => {
                    if (modal.style.display === 'block') {
                        closeModal(modal);
                    }
                });
            });
        }
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modals.forEach(modal => {
                    if (modal.style.display === 'block') {
                        closeModal(modal);
                    }
                });
            }
        });
    }
    
    // ==== MICRO INTERACTIONS ====
    function addMicroInteractions() {
        // Product card hover effects
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.08)';
            });
        });
        
        // Button hover effects
        const buttons = document.querySelectorAll('button:not(.close-modal)');
        buttons.forEach(button => {
            button.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // ==== STYLE ADDITIONS ====
    function addStyles() {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            @keyframes cart-pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.3); }
                100% { transform: scale(1); }
            }
            
            .cart-pulse {
                animation: cart-pulse 0.3s ease-in-out;
            }
            
            .modal {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .modal-open {
                opacity: 1;
                transform: translateY(0);
            }
            
            .modal-overlay {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .overlay-open {
                opacity: 1;
            }
            
            .thumbnail-scroll-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: opacity 0.3s ease;
            }
            
            .product-card {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            button {
                transition: transform 0.1s ease;
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // ==== INITIALIZE EVERYTHING ====
    function init() {
        addStyles();
        initModals();
        initProductGallery();
        initSizeChartModal();
        initProductVariants();
        initCompareColorsModal();
        initCarousels();
        initProductTabs();
        initQuantitySelector();
        initImageZoom();
        initCartFunctionality();
        loadSavedVariants();
        addMicroInteractions();
    }
    
    // Run initialization
    init();
});