// JavaScript Code
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const continueShopping = document.getElementById('continueShopping');
    const proceedCheckout = document.getElementById('proceedCheckout');
    const checkoutForm = document.getElementById('checkoutForm');
    const submitOrder = document.getElementById('submitOrder');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const sendOptions = document.querySelectorAll('.send-option');
    const languageBtn = document.getElementById('languageBtn');
    const languageOptions = document.getElementById('languageOptions');
    const languageOptionItems = document.querySelectorAll('.language-option');
    const backToProducts = document.querySelector('.back-to-products');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    const statsBtn = document.getElementById('statsBtn');
    const adminStats = document.querySelector('.admin-stats');
    const closeStats = document.getElementById('closeStats');
    const exportStats = document.getElementById('exportStats');
    const resetStats = document.getElementById('resetStats');
    
    // Global state
    let cart = [];
    let selectedPlatform = 'whatsapp';
    let currentLanguage = 'ar';
    let currentProduct = null;
    
    // Statistics data
    let siteStats = {
        totalVisitors: 0,
        totalOrders: 0,
        totalSales: 0,
        monthlyVisitors: 0,
        dailyVisits: {},
        orders: [],
        topProducts: {}
    };

    // بيانات التقييمات
    let productRatings = {};

    // Sample products data
    const products = {
        shirts: [
            {
                id: 1,
                name: {
                    ar: 'قميص كلاسيكي أسود',
                    en: 'Classic Black Shirt'
                },
                price: 350,
                images: [
                    'images/shirt 14.jpg',
                    'images/shirt 14.jpg',
                    'images/shirt 14.jpg',
                ],
                category: 'shirts',
                description: {
                    ar: 'قميص كلاسيكي مصمم بأناقة مع تفاصيل عالية الجودة. مثالي للمناسبات الرسمية والعملية.',
                    en: 'Classic shirt elegantly designed with high-quality details. Perfect for formal and business occasions.'
                }
            },
            {
                id: 2,
                name: {
                    ar: 'قميص كلاسيكي أبيض',
                    en: 'Classic White Shirt'
                },
                price: 320,
                images: [
                    'images/shirt 1.jpg',
                    'images/shirt 1.jpg',
                    'images/shirt 1.jpg',
                ],
                category: 'shirts',
                description: {
                    ar: 'قميص أبيض نقي يناسب جميع المناسبات الرسمية مع تصميم أنيق وعصري.',
                    en: 'Pure white shirt suitable for all formal occasions with elegant and modern design.'
                }
            },
            {
                id: 3,
                name: {
                    ar: 'قميص كلاسيكي أزرق',
                    en: 'Classic Blue Shirt'
                },
                price: 380,
                images: [
                    'images/shirt 2.jpg',
                    'images/shirt 2.jpg',
                    'images/shirt 2.jpg',
                ],
                category: 'shirts',
                description: {
                    ar: 'قميص أزرق كلاسيكي يعكس الأناقة والثقة، مثالي للقاءات المهمة.',
                    en: 'Classic blue shirt reflecting elegance and confidence, perfect for important meetings.'
                }
            },
            {
                id: 4,
                name: {
                    ar: 'قميص كلاسيكي رمادي',
                    en: 'Classic Gray Shirt'
                },
                price: 340,
                images: [
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                ],
                category: 'shirts',
                description: {
                    ar: 'قميص رمادي أنيق يجمع بين الكلاسيكية والعصرية في تصميم واحد.',
                    en: 'Elegant gray shirt combining classic and contemporary in one design.'
                }
            }
        ],
        {
                id: 5,
                name: {
                    ar: 'قميص كلاسيكي رمادي',
                    en: 'Classic Gray Shirt'
                },
                price: 340,
                images: [
                    'img/shirt.1.1.jpg',
                    'img/shirt.1.2.jpg',
                    'img/shirt.1.3.jpg',
                ],
                category: 'shirts',
                description: {
                    ar: 'قميص رمادي أنيق يجمع بين الكلاسيكية والعصرية في تصميم واحد.',
                    en: 'Elegant gray shirt combining classic and contemporary in one design.'
                }
            }
        ],
    {
                id: 6,
                name: {
                    ar: 'قميص كلاسيكي رمادي',
                    en: 'Classic Gray Shirt'
                },
                price: 340,
                images: [
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                ],
                category: 'shirts',
                description: {
                    ar: 'قميص رمادي أنيق يجمع بين الكلاسيكية والعصرية في تصميم واحد.',
                    en: 'Elegant gray shirt combining classic and contemporary in one design.'
                }
            }
        ],
    {
                id: 7,
                name: {
                    ar: 'قميص كلاسيكي رمادي',
                    en: 'Classic Gray Shirt'
                },
                price: 340,
                images: [
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                ],
                category: 'shirts',
                description: {
                    ar: 'قميص رمادي أنيق يجمع بين الكلاسيكية والعصرية في تصميم واحد.',
                    en: 'Elegant gray shirt combining classic and contemporary in one design.'
                }
            }
        ],
    {
                id: 8,
                name: {
                    ar: 'قميص كلاسيكي رمادي',
                    en: 'Classic Gray Shirt'
                },
                price: 340,
                images: [
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                ],
                category: 'shirts',
                description: {
                    ar: 'قميص رمادي أنيق يجمع بين الكلاسيكية والعصرية في تصميم واحد.',
                    en: 'Elegant gray shirt combining classic and contemporary in one design.'
                }
            }
        ],
    {
                id: 9,
                name: {
                    ar: 'قميص كلاسيكي رمادي',
                    en: 'Classic Gray Shirt'
                },
                price: 340,
                images: [
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                ],
                category: 'shirts',
                description: {
                    ar: 'قميص رمادي أنيق يجمع بين الكلاسيكية والعصرية في تصميم واحد.',
                    en: 'Elegant gray shirt combining classic and contemporary in one design.'
                }
            }
        ],
    {
                id: 10,
                name: {
                    ar: 'قميص كلاسيكي رمادي',
                    en: 'Classic Gray Shirt'
                },
                price: 340,
                images: [
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                ],
                category: 'shirts',
                description: {
                    ar: 'قميص رمادي أنيق يجمع بين الكلاسيكية والعصرية في تصميم واحد.',
                    en: 'Elegant gray shirt combining classic and contemporary in one design.'
                }
            }
        ],
    {
                id: 11,
                name: {
                    ar: 'قميص كلاسيكي رمادي',
                    en: 'Classic Gray Shirt'
                },
                price: 340,
                images: [
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                    'images/shirt 3.jpg',
                ],
                category: 'shirts',
                description: {
                    ar: 'قميص رمادي أنيق يجمع بين الكلاسيكية والعصرية في تصميم واحد.',
                    en: 'Elegant gray shirt combining classic and contemporary in one design.'
                }
            }
        ],
        pants: [
            {
                id: 12,
                name: {
                    ar: 'بنطلون كلاسيكي أسود',
                    en: 'Classic Black Pants'
                },
                price: 450,
                images: [
                    'images/black.hay.west1.jpg',
                    'images/black.hay.west2.jpg',
                    'images/black.hay.west3.jpg',
                ],
                category: 'pants',
                description: {
                    ar: 'بنطلون أسود كلاسيكي يناسب جميع المناسبات مع قصة مثالية.',
                    en: 'Classic black pants suitable for all occasions with perfect cut.'
                }
            },
            {
                id: 13,
                name: {
                    ar: 'بنطلون كلاسيكي بيجي',
                    en: 'Classic peage Pants'
                },
                price: 480,
                images: [
                    'images/white hay west 1.jpg',
                    'images/white hay west.jpg',
                ],
                category: 'pants',
                description: {
                    ar: 'بنطلون بيجي أنيق يتميز بالراحة والأناقة في نفس الوقت.',
                    en: 'Elegant peage pants characterized by comfort and elegance at the same time.'
                }
            }
        ],
        shoes: [
            {
                id: 14,
                name: {
                    ar: 'حذاء كلاسيكي أسود',
                    en: 'Classic Black Shoes'
                },
                price: 600,
                images: [
                    'images/black lv.jpg',
                    'images/black lv3.jpg',
                ],
                category: 'shoes',
                description: {
                    ar: 'حذاء أسود كلاسيكي يجمع بين الأناقة والراحة في تصميم مبتكر.',
                    en: 'Classic black shoes combining elegance and comfort in an innovative design.'
                }
            },
            {
                id: 15,
                name: {
                    ar: 'حذاء كلاسيكي ',
                    en: 'Classic Shoes'
                },
                price: 650,
                images: [
                    'images/classic 1.jpg',
                    'images/classic shoese 2.jpg',
                    'images/classic lv.jpg',
                ],
                category: 'shoes',
                description: {
                    ar: 'حذاء بني أنيق يناسب الملابس الكلاسيكية والعصرية.',
                    en: 'Elegant brown shoes suitable for both classic and contemporary outfits.'
                }
            }
        ]
    };

    // Initialize the site
    function init() {
        loadProducts();
        setupEventListeners();
        updateCartCount();
        loadStatistics();
        setupStatistics();
        initRatings();
        
        // Load language preference from localStorage if available
        const savedLanguage = localStorage.getItem('tetoLanguage');
        if (savedLanguage) {
            switchLanguage(savedLanguage);
        }
        
        // تسجيل زيارة جديدة
        recordVisit();
    }

    // Load products into the grid
    function loadProducts() {
        for (const category in products) {
            const grid = document.getElementById(category + 'Grid');
            if (grid) {
                grid.innerHTML = '';
                products[category].forEach(product => {
                    const productCard = createProductCard(product);
                    grid.appendChild(productCard);
                });
            }
        }
    }

    // Create product card element
    function createProductCard(product) {
        const ratings = getProductRatings(product.id);
        const averageRating = calculateAverageRating(ratings);
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-offer">${currentLanguage === 'ar' ? 'عرض محدود' : 'Limited Offer'}</div>
            <div class="product-img">
                <img src="${product.images[0]}" alt="${product.name[currentLanguage]}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name[currentLanguage]}</h3>
                <div class="product-price">${product.price} ${currentLanguage === 'ar' ? 'جنيه' : 'EGP'}</div>
                ${ratings.length > 0 ? `
                <div class="quick-rating">
                    <div class="rating-stars-small">
                        ${generateStarRating(averageRating)}
                    </div>
                    <span class="rating-count">(${ratings.length})</span>
                </div>
                ` : ''}
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i>
                    ${currentLanguage === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
                </button>
                <button class="buy-now-btn" data-id="${product.id}">
                    <i class="fas fa-bolt"></i>
                    ${currentLanguage === 'ar' ? 'شراء الآن' : 'Buy Now'}
                </button>
            </div>
        `;
        
        // Add event listeners
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            addToCart(product);
            showNotification(currentLanguage === 'ar' ? 'تمت إضافة المنتج إلى السلة' : 'Product added to cart');
        });
        
        const buyNowBtn = card.querySelector('.buy-now-btn');
        buyNowBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openOrderForm(product);
        });
        
        card.addEventListener('click', function() {
            showProductDetailPage(product);
        });
        
        return card;
    }

    // نظام التقييمات
    function initRatings() {
        loadRatings();
        setupRatingListeners();
    }

    function loadRatings() {
        const savedRatings = localStorage.getItem('tetoProductRatings');
        if (savedRatings) {
            productRatings = JSON.parse(savedRatings);
        }
    }

    function saveRatings() {
        localStorage.setItem('tetoProductRatings', JSON.stringify(productRatings));
    }

    function setupRatingListeners() {
        // النجوم التفاعلية
        const starsInput = document.querySelector('.stars-input');
        if (starsInput) {
            const stars = starsInput.querySelectorAll('i');
            stars.forEach(star => {
                star.addEventListener('click', function() {
                    const rating = parseInt(this.getAttribute('data-rating'));
                    setStarRating(rating);
                });
                
                star.addEventListener('mouseover', function() {
                    const rating = parseInt(this.getAttribute('data-rating'));
                    highlightStars(rating);
                });
            });
            
            // إعادة تعيين النجوم عند مغادرة المنطقة
            starsInput.addEventListener('mouseleave', function() {
                const currentRating = parseInt(document.getElementById('selectedRating').textContent) || 0;
                highlightStars(currentRating);
            });
        }
        
        // زر إرسال التقييم
        const submitBtn = document.getElementById('submitRating');
        if (submitBtn) {
            submitBtn.addEventListener('click', submitRating);
        }
    }

    function setStarRating(rating) {
        document.getElementById('selectedRating').textContent = rating;
        highlightStars(rating);
        
        // تفعيل زر الإرسال
        const submitBtn = document.getElementById('submitRating');
        submitBtn.disabled = false;
    }

    function highlightStars(rating) {
        const stars = document.querySelectorAll('.stars-input i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('active');
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }

    function submitRating() {
        if (!currentProduct) return;
        
        const rating = parseInt(document.getElementById('selectedRating').textContent);
        if (rating === 0) {
            alert(currentLanguage === 'ar' ? 'يرجى اختيار تقييم' : 'Please select a rating');
            return;
        }
        
        const newRating = {
            id: Date.now(),
            productId: currentProduct.id,
            rating: rating,
            date: new Date().toISOString(),
            user: 'مستخدم'
        };
        
        addProductRating(newRating);
        updateProductRatingDisplay(currentProduct.id);
        
        // إعادة تعيين واجهة التقييم
        document.getElementById('selectedRating').textContent = '0';
        highlightStars(0);
        document.getElementById('submitRating').disabled = true;
        
        showNotification(currentLanguage === 'ar' ? 'شكراً لك! تم إضافة تقييمك بنجاح' : 'Thank you! Your rating has been added successfully');
    }

    function addProductRating(rating) {
        if (!productRatings[rating.productId]) {
            productRatings[rating.productId] = [];
        }
        productRatings[rating.productId].push(rating);
        saveRatings();
    }

    function getProductRatings(productId) {
        return productRatings[productId] || [];
    }

    function calculateAverageRating(ratings) {
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
        return sum / ratings.length;
    }

    function generateStarRating(averageRating) {
        let stars = '';
        const fullStars = Math.floor(averageRating);
        const hasHalfStar = averageRating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    function updateProductRatingDisplay(productId) {
        const ratings = getProductRatings(productId);
        const averageRating = calculateAverageRating(ratings);
        const totalRatings = ratings.length;
        
        // تحديث متوسط التقييم
        document.getElementById('averageRating').textContent = averageRating.toFixed(1);
        document.getElementById('totalRatings').textContent = totalRatings;
        
        // تحديث النجوم
        const averageStarsContainer = document.getElementById('averageRatingStars');
        averageStarsContainer.innerHTML = generateStarRating(averageRating);
        
        // تحديث قائمة التقييمات
        updateRatingsList(ratings);
        
        // تحديث التقييم السريع في أعلى الصفحة
        document.getElementById('ratingCount').textContent = totalRatings;
    }

    function updateRatingsList(ratings) {
        const container = document.getElementById('ratingsContainer');
        
        if (ratings.length === 0) {
            container.innerHTML = '<div class="no-ratings">' + 
                (currentLanguage === 'ar' ? 'لا توجد تقييمات حتى الآن. كن أول من يقيم هذا المنتج!' : 'No ratings yet. Be the first to rate this product!') + 
                '</div>';
            return;
        }
        
        container.innerHTML = '';
        
        // ترتيب التقييمات من الأحدث إلى الأقدم
        const sortedRatings = [...ratings].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedRatings.forEach(rating => {
            const ratingElement = document.createElement('div');
            ratingElement.className = 'rating-item';
            ratingElement.innerHTML = `
                <div class="rating-meta">
                    <div class="rating-stars-small">
                        ${generateStarRating(rating.rating)}
                    </div>
                    <span class="rating-date">${formatDate(rating.date)}</span>
                </div>
                <div class="rating-user">${rating.user}</div>
            `;
            container.appendChild(ratingElement);
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG');
    }

    // Open order form directly
    function openOrderForm(product) {
        // إضافة المنتج إلى السلة
        addToCart(product);
        
        // فتح نموذج الطلب مباشرة
        cartModal.classList.add('active');
        checkoutForm.classList.add('active');
        updateCartDisplay();
    }

    // Show product detail page
    function showProductDetailPage(product) {
        currentProduct = product;
        
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show product detail section
        document.getElementById('product-detail').classList.add('active');
        
        // Update product details
        document.getElementById('productDetailTitle').textContent = product.name[currentLanguage];
        document.getElementById('productDetailPrice').textContent = product.price + ' ' + (currentLanguage === 'ar' ? 'جنيه' : 'EGP');
        document.getElementById('productDetailImage').src = product.images[0];
        
        // Update thumbnails
        const thumbnailsContainer = document.querySelector('.image-thumbnails');
        thumbnailsContainer.innerHTML = '';
        
        product.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail' + (index === 0 ? ' active' : '');
            thumbnail.innerHTML = '<img src="' + image + '" alt="' + product.name[currentLanguage] + '">';
            
            thumbnail.addEventListener('click', function() {
                document.getElementById('productDetailImage').src = image;
                // Update active thumbnail
                document.querySelectorAll('.thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                thumbnail.classList.add('active');
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        // Update description
        const descriptionContent = document.querySelector('.description-content');
        descriptionContent.innerHTML = `
            <p>${product.description[currentLanguage]}</p>
            <ul>
                <li>${currentLanguage === 'ar' ? 'تصميم كلاسيكي أنيق' : 'Elegant classic design'}</li>
                <li>${currentLanguage === 'ar' ? 'قماش عالي الجودة يوفر راحة طوال اليوم' : 'High-quality fabric provides all-day comfort'}</li>
                <li>${currentLanguage === 'ar' ? 'ياقة كلاسيكية مع أزرار متناسقة' : 'Classic collar with coordinated buttons'}</li>
                <li>${currentLanguage === 'ar' ? 'جيب صدر عملي' : 'Functional chest pocket'}</li>
                <li>${currentLanguage === 'ar' ? 'تفصيل احترافي يضمن المتانة والمظهر الأنيق' : 'Professional finish ensures durability and elegant appearance'}</li>
            </ul>
        `;
        
        // تحديث عرض التقييمات
        updateProductRatingDisplay(product.id);
        
        // Load suggestions
        loadProductSuggestions(product);
    }

    // Load product suggestions for detail page
    function loadProductSuggestions(product) {
        const suggestionsGrid = document.getElementById('productSuggestionsGrid');
        suggestionsGrid.innerHTML = '';
        
        // Get complementary products based on category
        let complementaryCategory = '';
        if (product.category === 'shirts') complementaryCategory = 'pants';
        else if (product.category === 'pants') complementaryCategory = 'shirts';
        else complementaryCategory = 'pants';
        
        // Get 4 random products from complementary category
        const complementaryProducts = [...products[complementaryCategory]];
        const shuffled = complementaryProducts.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        
        selected.forEach(suggestion => {
            const ratings = getProductRatings(suggestion.id);
            const averageRating = calculateAverageRating(ratings);
            
            const suggestionCard = document.createElement('div');
            suggestionCard.className = 'product-card';
            suggestionCard.innerHTML = `
                <div class="product-img">
                    <img src="${suggestion.images[0]}" alt="${suggestion.name[currentLanguage]}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${suggestion.name[currentLanguage]}</h3>
                    <div class="product-price">${suggestion.price} ${currentLanguage === 'ar' ? 'جنيه' : 'EGP'}</div>
                    ${ratings.length > 0 ? `
                    <div class="quick-rating">
                        <div class="rating-stars-small">
                            ${generateStarRating(averageRating)}
                        </div>
                        <span class="rating-count">(${ratings.length})</span>
                    </div>
                    ` : ''}
                    <button class="add-to-cart-btn" data-id="${suggestion.id}">
                        <i class="fas fa-cart-plus"></i>
                        ${currentLanguage === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
                    </button>
                    <button class="buy-now-btn" data-id="${suggestion.id}">
                        <i class="fas fa-bolt"></i>
                        ${currentLanguage === 'ar' ? 'شراء الآن' : 'Buy Now'}
                    </button>
                </div>
            `;
            
            // Add event listeners for suggestion cards
            const addToCartBtn = suggestionCard.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                addToCart(suggestion);
                showNotification(currentLanguage === 'ar' ? 'تمت إضافة المنتج إلى السلة' : 'Product added to cart');
            });
            
            const buyNowBtn = suggestionCard.querySelector('.buy-now-btn');
            buyNowBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openOrderForm(suggestion);
            });
            
            suggestionCard.addEventListener('click', function() {
                showProductDetailPage(suggestion);
            });
            
            suggestionsGrid.appendChild(suggestionCard);
        });
    }

    // Add product to cart
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: 1
            });
        }
        
        updateCartCount();
    }

    // Update cart count in header
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: var(--secondary-color);
            color: var(--primary-color);
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1200;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // دوال الإحصائيات
    function setupStatistics() {
        // إظهار زر الإحصائيات
        statsBtn.style.display = 'block';
    }

    function loadStatistics() {
        const savedStats = localStorage.getItem('tetoStats');
        if (savedStats) {
            siteStats = JSON.parse(savedStats);
        }
        updateStatsDisplay();
    }

    function saveStatistics() {
        localStorage.setItem('tetoStats', JSON.stringify(siteStats));
    }

    function recordVisit() {
        const today = new Date().toDateString();
        const currentMonth = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric' });
        
        // زيادة الزوار الكلي
        siteStats.totalVisitors++;
        
        // زيادة زوار الشهر
        if (!siteStats.monthlyVisitors) {
            siteStats.monthlyVisitors = 0;
        }
        siteStats.monthlyVisitors++;
        
        // تسجيل الزيارة اليومية
        if (!siteStats.dailyVisits[today]) {
            siteStats.dailyVisits[today] = 0;
        }
        siteStats.dailyVisits[today]++;
        
        saveStatistics();
        updateStatsDisplay();
    }

    function recordOrder(orderData) {
        siteStats.totalOrders++;
        siteStats.totalSales += orderData.total;
        
        // حفظ بيانات الطلب
        const order = {
            id: generateOrderId(),
            date: new Date().toISOString(),
            customer: orderData.customer,
            products: orderData.products,
            total: orderData.total
        };
        
        siteStats.orders.unshift(order);
        
        // تحديث أفضل المنتجات مبيعاً
        orderData.products.forEach(product => {
            if (!siteStats.topProducts[product.id]) {
                siteStats.topProducts[product.id] = {
                    name: product.name,
                    sales: 0
                };
            }
            siteStats.topProducts[product.id].sales += product.quantity;
        });
        
        // حفظ فقط آخر 50 طلب
        if (siteStats.orders.length > 50) {
            siteStats.orders = siteStats.orders.slice(0, 50);
        }
        
        saveStatistics();
        updateStatsDisplay();
    }

    function generateOrderId() {
        return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
    }

    function updateStatsDisplay() {
        // تحديث البطاقات الرئيسية
        document.getElementById('totalVisitors').textContent = siteStats.totalVisitors.toLocaleString();
        document.getElementById('totalOrders').textContent = siteStats.totalOrders.toLocaleString();
        document.getElementById('totalSales').textContent = siteStats.totalSales.toLocaleString();
        document.getElementById('monthlyVisitors').textContent = siteStats.monthlyVisitors.toLocaleString();
        
        // تحديث الرسم البياني
        updateVisitsChart();
        
        // تحديث أفضل المنتجات
        updateTopProducts();
        
        // تحديث آخر الطلبات
        updateRecentOrders();
    }

    function updateVisitsChart() {
        const ctx = document.getElementById('visitsChart').getContext('2d');
        const last7Days = getLast7Days();
        const visitsData = last7Days.map(day => siteStats.dailyVisits[day] || 0);
        
        // رسم chart بسيط
        drawSimpleChart(ctx, last7Days, visitsData);
    }

    function getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toDateString());
        }
        return days;
    }

    function drawSimpleChart(ctx, labels, data) {
        // تنظيف canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        if (data.every(val => val === 0)) return;
        
        const padding = 40;
        const chartWidth = ctx.canvas.width - padding * 2;
        const chartHeight = ctx.canvas.height - padding * 2;
        const maxValue = Math.max(...data);
        
        // رسم المحاور
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.stroke();
        
        // رسم الخط
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = padding + (index * chartWidth) / (data.length - 1);
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // رسم النقاط
        ctx.fillStyle = '#D4AF37';
        data.forEach((value, index) => {
            const x = padding + (index * chartWidth) / (data.length - 1);
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // كتابة التسميات
        ctx.fillStyle = '#333333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        labels.forEach((label, index) => {
            const x = padding + (index * chartWidth) / (data.length - 1);
            const y = padding + chartHeight + 20;
            const dayName = new Date(label).toLocaleDateString('ar-EG', { weekday: 'short' });
            ctx.fillText(dayName, x, y);
        });
    }

    function updateTopProducts() {
        const topProductsContainer = document.getElementById('topProducts');
        const sortedProducts = Object.entries(siteStats.topProducts)
            .sort((a, b) => b[1].sales - a[1].sales)
            .slice(0, 5);
        
        topProductsContainer.innerHTML = '';
        
        sortedProducts.forEach(([id, product], index) => {
            const rankElement = document.createElement('div');
            rankElement.className = 'product-rank';
            rankElement.innerHTML = `
                <div class="product-name">${index + 1}. ${product.name[currentLanguage] || product.name.ar}</div>
                <div class="product-sales">${product.sales} مبيعات</div>
            `;
            topProductsContainer.appendChild(rankElement);
        });
    }

    function updateRecentOrders() {
        const ordersContainer = document.getElementById('recentOrdersList');
        const recentOrders = siteStats.orders.slice(0, 5);
        
        ordersContainer.innerHTML = '';
        
        if (recentOrders.length === 0) {
            ordersContainer.innerHTML = '<p style="text-align: center; color: #666;">لا توجد طلبات حديثة</p>';
            return;
        }
        
        recentOrders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            orderElement.innerHTML = `
                <div class="order-header">
                    <span class="order-id">${order.id}</span>
                    <span class="order-date">${new Date(order.date).toLocaleDateString('ar-EG')}</span>
                </div>
                <div class="order-details">
                    ${order.customer.name} - ${order.products.length} منتج - ${order.total} جنيه
                </div>
            `;
            ordersContainer.appendChild(orderElement);
        });
    }

    function exportStatistics() {
        const dataStr = JSON.stringify(siteStats, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'teto-stats-' + new Date().toISOString().split('T')[0] + '.json';
        link.click();
    }

    function resetStatistics() {
        siteStats = {
            totalVisitors: 0,
            totalOrders: 0,
            totalSales: 0,
            monthlyVisitors: 0,
            dailyVisits: {},
            orders: [],
            topProducts: {}
        };
        
        saveStatistics();
        updateStatsDisplay();
        
        showNotification(currentLanguage === 'ar' ? 'تم إعادة تعيين الإحصائيات' : 'Statistics have been reset');
    }

    // Switch language
    function switchLanguage(lang) {
        currentLanguage = lang;
        
        // Update HTML direction
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // Update all text elements
        updateAllTexts();
        
        // Update language options UI
        languageOptionItems.forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
                if (!option.querySelector('.fa-check')) {
                    option.innerHTML += ' <i class="fas fa-check"></i>';
                }
            } else {
                option.classList.remove('active');
                const checkIcon = option.querySelector('.fa-check');
                if (checkIcon) {
                    checkIcon.remove();
                }
            }
        });
        
        // Reload products to update names
        loadProducts();
        
        // Update product details if open
        if (currentProduct && document.getElementById('product-detail').classList.contains('active')) {
            showProductDetailPage(currentProduct);
        }
        
        // Update cart display if open
        if (cartModal.classList.contains('active')) {
            updateCartDisplay();
        }
        
        // Save language preference
        localStorage.setItem('tetoLanguage', lang);
    }

    // Update all texts based on current language
    function updateAllTexts() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach((link, index) => {
            const texts = ['الرئيسية', 'القمصان', 'البناطلين', 'الأحذية', 'آراء العملاء'];
            const enTexts = ['Home', 'Shirts', 'Pants', 'Shoes', 'Customer Reviews'];
            link.textContent = currentLanguage === 'ar' ? texts[index] : enTexts[index];
        });
        
        // Hero section
        const heroTitle = document.querySelector('.hero h1');
        heroTitle.textContent = currentLanguage === 'ar' 
            ? 'Teto Classic | حرفة سودانية بفخامة عالمية' 
            : 'Teto Classic | Sudanese Craftsmanship with Global Elegance';
        
        const heroDesc = document.querySelector('.hero p');
        heroDesc.textContent = currentLanguage === 'ar' 
            ? 'نقدم لكم أفضل تشكيلة من الملابس الرجالية الكلاسيكية التي تجمع بين الأناقة والجودة. قمصان، بناطلين، وأحذية مصممة بعناية لتليق برجولتك وأناقتك.' 
            : 'We offer you the finest selection of classic men\'s clothing that combines elegance and quality. Shirts, pants, and shoes carefully designed to suit your masculinity and style.';
        
        const tagline = document.querySelector('.tagline');
        tagline.textContent = currentLanguage === 'ar' 
            ? '"التميز ليس للجميع ، بل هو لأولئك الذين يفعلون كل ما يلزم 🥇"' 
            : '"Excellence is not for everyone, but for those who do whatever it takes 🥇"';
        
        const location = document.querySelector('.contact-info p:nth-child(2)');
        location.textContent = currentLanguage === 'ar' 
            ? '📍: SUG 🇸🇩 - EGP 🇪🇬' 
            : '📍: Sudan 🇸🇩 - Egypt 🇪🇬';
        
        const hashtag = document.querySelector('.contact-info p:nth-child(3)');
        hashtag.textContent = currentLanguage === 'ar' 
            ? '"#تميزك_سر_نجاحك 🖤🏆"' 
            : '"#YourExcellenceIsYourSuccess 🖤🏆"';
        
        // Section titles
        document.querySelectorAll('.section-title').forEach((title, index) => {
            const texts = ['آراء العملاء', 'القمصان', 'البناطلين', 'الأحذية'];
            const enTexts = ['Customer Reviews', 'Shirts', 'Pants', 'Shoes'];
            if (texts[index]) {
                title.textContent = currentLanguage === 'ar' ? texts[index] : enTexts[index];
            }
        });
        
        // Update back to products link
        backToProducts.innerHTML = currentLanguage === 'ar' 
            ? '<i class="fas fa-arrow-right"></i> العودة إلى المنتجات' 
            : '<i class="fas fa-arrow-left"></i> Back to Products';
        
        // Update buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.innerHTML = currentLanguage === 'ar' 
                ? '<i class="fas fa-cart-plus"></i> إضافة إلى السلة' 
                : '<i class="fas fa-cart-plus"></i> Add to Cart';
        });
        
        document.querySelectorAll('.buy-now-btn').forEach(btn => {
            btn.innerHTML = currentLanguage === 'ar' 
                ? '<i class="fas fa-bolt"></i> شراء الآن' 
                : '<i class="fas fa-bolt"></i> Buy Now';
        });
        
        // Update product suggestions title
        const suggestionsTitle = document.querySelector('.product-suggestions h3');
        if (suggestionsTitle) {
            suggestionsTitle.textContent = currentLanguage === 'ar' ? 'منتجات قد تعجبك' : 'You May Also Like';
        }
        
        // Cart modal
        const cartTitle = document.querySelector('.cart-content .section-title');
        if (cartTitle) {
            cartTitle.textContent = currentLanguage === 'ar' ? 'سلة التسوق' : 'Shopping Cart';
        }
        
        const cartTotal = document.querySelector('.cart-total');
        if (cartTotal) {
            cartTotal.innerHTML = currentLanguage === 'ar' 
                ? 'المجموع: <span id="cartTotal">0</span> جنيه' 
                : 'Total: <span id="cartTotal">0</span> EGP';
        }
        
        const continueShoppingBtn = document.getElementById('continueShopping');
        if (continueShoppingBtn) {
            continueShoppingBtn.textContent = currentLanguage === 'ar' ? 'مواصلة التسوق' : 'Continue Shopping';
        }
        
        const checkoutBtn = document.getElementById('proceedCheckout');
        if (checkoutBtn) {
            checkoutBtn.textContent = currentLanguage === 'ar' ? 'إتمام الشراء' : 'Proceed to Checkout';
        }
        
        // Checkout form
        const formTitle = document.querySelector('#checkoutForm h3');
        if (formTitle) {
            formTitle.textContent = currentLanguage === 'ar' ? 'معلومات العميل' : 'Customer Information';
        }
        
        document.querySelector('label[for="customerName"]').textContent = currentLanguage === 'ar' ? 'الاسم بالكامل' : 'Full Name';
        document.querySelector('label[for="primaryPhone"]').textContent = currentLanguage === 'ar' ? 'رقم الهاتف الأساسي' : 'Primary Phone Number';
        document.querySelector('label[for="secondaryPhone"]').textContent = currentLanguage === 'ar' ? 'رقم الهاتف الاحتياطي' : 'Secondary Phone Number';
        document.querySelector('label[for="customerAddress"]').textContent = currentLanguage === 'ar' ? 'العنوان' : 'Address';
        
        const sendMethodTitle = document.querySelector('#checkoutForm h3:nth-child(6)');
        if (sendMethodTitle) {
            sendMethodTitle.textContent = currentLanguage === 'ar' ? 'طريقة إرسال الطلب' : 'Order Sending Method';
        }
        
        document.querySelectorAll('.send-option p').forEach((p, index) => {
            const texts = ['واتساب', 'إنستجرام'];
            const enTexts = ['WhatsApp', 'Instagram'];
            p.textContent = currentLanguage === 'ar' ? texts[index] : enTexts[index];
        });
        
        const submitBtn = document.getElementById('submitOrder');
        if (submitBtn) {
            submitBtn.textContent = currentLanguage === 'ar' ? 'إرسال الطلب' : 'Send Order';
        }
        
        // Footer
        document.querySelectorAll('.footer-links a').forEach((link, index) => {
            const texts = ['سياسة الخصوصية', 'شروط الاستخدام', 'سياسة الإرجاع والاستبدال', 'الأسئلة الشائعة', 'اتصل بنا'];
            const enTexts = ['Privacy Policy', 'Terms of Use', 'Return & Exchange Policy', 'FAQ', 'Contact Us'];
            link.textContent = currentLanguage === 'ar' ? texts[index] : enTexts[index];
        });
        
        const copyright = document.querySelector('.copyright');
        copyright.textContent = currentLanguage === 'ar' 
            ? '&copy; 2023 Teto Classic. جميع الحقوق محفوظة.' 
            : '&copy; 2023 Teto Classic. All rights reserved.';
            
        // إحصائيات
        if (document.querySelector('.stats-container h2')) {
            document.querySelector('.stats-container h2').textContent = 
                currentLanguage === 'ar' ? 'إحصائيات الموقع' : 'Website Statistics';
        }
        
        // تحديث نصوص البطاقات
        const statTexts = {
            ar: ['إجمالي الزوار', 'إجمالي الطلبات', 'إجمالي المبيعات (جنيه)', 'زوار هذا الشهر'],
            en: ['Total Visitors', 'Total Orders', 'Total Sales (EGP)', 'Monthly Visitors']
        };
        
        document.querySelectorAll('.stat-info p').forEach((p, index) => {
            p.textContent = statTexts[currentLanguage][index];
        });
        
        // تحديث عناوين الأقسام
        const sectionTitles = {
            ar: ['الزيارات خلال آخر 7 أيام', 'المنتجات الأكثر مبيعاً', 'آخر الطلبات'],
            en: ['Visits in Last 7 Days', 'Top Selling Products', 'Recent Orders']
        };
        
        document.querySelectorAll('.chart-container h3, .recent-orders h3').forEach((h3, index) => {
            h3.textContent = sectionTitles[currentLanguage][index];
        });
        
        // تحديث أزرار الإجراءات
        if (exportStats) {
            exportStats.innerHTML = currentLanguage === 'ar' ? 
                '<i class="fas fa-download"></i> تصدير البيانات' : 
                '<i class="fas fa-download"></i> Export Data';
        }
        
        if (resetStats) {
            resetStats.innerHTML = currentLanguage === 'ar' ? 
                '<i class="fas fa-redo"></i> إعادة التعيين' : 
                '<i class="fas fa-redo"></i> Reset Stats';
        }
        
        // تحديث نصوص نظام التقييم
        const ratingSectionTitle = document.querySelector('.product-rating-section h3');
        if (ratingSectionTitle) {
            ratingSectionTitle.textContent = currentLanguage === 'ar' ? 'تقييم المنتج' : 'Product Rating';
        }
        
        const addRatingTitle = document.querySelector('.add-rating h4');
        if (addRatingTitle) {
            addRatingTitle.textContent = currentLanguage === 'ar' ? 'أضف تقييمك' : 'Add Your Rating';
        }
        
        const ratingValue = document.querySelector('.rating-value');
        if (ratingValue) {
            ratingValue.innerHTML = currentLanguage === 'ar' ? 
                'تقييمك: <span id="selectedRating">0</span>/5' : 
                'Your Rating: <span id="selectedRating">0</span>/5';
        }
        
        const submitRatingBtn = document.getElementById('submitRating');
        if (submitRatingBtn) {
            submitRatingBtn.innerHTML = currentLanguage === 'ar' ? 
                '<i class="fas fa-paper-plane"></i> إرسال التقييم' : 
                '<i class="fas fa-paper-plane"></i> Submit Rating';
        }
        
        const ratingsListTitle = document.querySelector('.ratings-list h4');
        if (ratingsListTitle) {
            ratingsListTitle.textContent = currentLanguage === 'ar' ? 'آراء العملاء' : 'Customer Reviews';
        }
        
        // تحديث نص عدم وجود تقييمات
        const noRatings = document.querySelector('.no-ratings');
        if (noRatings) {
            noRatings.textContent = currentLanguage === 'ar' ? 
                'لا توجد تقييمات حتى الآن. كن أول من يقيم هذا المنتج!' : 
                'No ratings yet. Be the first to rate this product!';
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        // Menu button
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                
                // Hide all sections
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show selected section
                document.getElementById(category).classList.add('active');
                
                // Close menu on mobile
                navMenu.classList.remove('active');
            });
        });

        // Back to products
        backToProducts.addEventListener('click', function(e) {
            e.preventDefault();
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            // Show home section
            document.getElementById('home').classList.add('active');
        });

        // Add to cart in detail page
        addToCartBtn.addEventListener('click', function() {
            if (currentProduct) {
                addToCart(currentProduct);
                showNotification(currentLanguage === 'ar' ? 'تمت إضافة المنتج إلى السلة' : 'Product added to cart');
            }
        });

        // Buy now in detail page
        buyNowBtn.addEventListener('click', function() {
            if (currentProduct) {
                openOrderForm(currentProduct);
            }
        });

        // Size selection
        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.size-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
            });
        });

        // Cart button
        cartBtn.addEventListener('click', function() {
            cartModal.classList.add('active');
            updateCartDisplay();
        });

        // Close cart
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
        });

        // Continue shopping
        continueShopping.addEventListener('click', function() {
            cartModal.classList.remove('active');
        });

        // Proceed to checkout
        proceedCheckout.addEventListener('click', function() {
            if (cart.length === 0) {
                alert(currentLanguage === 'ar' ? 'السلة فارغة' : 'Cart is empty');
                return;
            }
            checkoutForm.classList.add('active');
        });

        // Send options
        sendOptions.forEach(option => {
            option.addEventListener('click', function() {
                sendOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                selectedPlatform = this.getAttribute('data-platform');
            });
        });

        // Submit order
        submitOrder.addEventListener('click', function() {
            const name = document.getElementById('customerName').value;
            const primaryPhone = document.getElementById('primaryPhone').value;
            const address = document.getElementById('customerAddress').value;
            
            if (!name || !primaryPhone || !address) {
                alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
                return;
            }
            
            // تسجيل الطلب في الإحصائيات
            const orderData = {
                customer: { name, phone: primaryPhone, address },
                products: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: getCartTotal()
            };
            
            recordOrder(orderData);
            
            // Create order message
            let message = currentLanguage === 'ar' 
                ? 'طلب جديد من ' + name + '%0A'
                : 'New order from ' + name + '%0A';
            
            message += currentLanguage === 'ar' 
                ? 'رقم الهاتف: ' + primaryPhone + '%0A'
                : 'Phone: ' + primaryPhone + '%0A';
            
            const secondaryPhone = document.getElementById('secondaryPhone').value;
            if (secondaryPhone) {
                message += currentLanguage === 'ar' 
                    ? 'رقم احتياطي: ' + secondaryPhone + '%0A'
                    : 'Secondary phone: ' + secondaryPhone + '%0A';
            }
            
            message += currentLanguage === 'ar' 
                ? 'العنوان: ' + address + '%0A%0A'
                : 'Address: ' + address + '%0A%0A';
            
            message += currentLanguage === 'ar' ? 'المنتجات:%0A' : 'Products:%0A';
            
            cart.forEach(item => {
                message += '- ' + item.name[currentLanguage] + ' (' + item.quantity + 'x) - ' + (item.price * item.quantity) + ' ' + (currentLanguage === 'ar' ? 'جنيه' : 'EGP') + '%0A';
            });
            
            message += currentLanguage === 'ar' 
                ? '%0Aالمجموع: ' + getCartTotal() + ' جنيه'
                : '%0ATotal: ' + getCartTotal() + ' EGP';
            
            // Send via selected platform
            let url = '';
            if (selectedPlatform === 'whatsapp') {
                url = 'https://wa.me/201275533360?text=' + message;
            } else {
                // For Instagram, we'll open in a new tab with a message
                alert(currentLanguage === 'ar' 
                    ? 'يرجى إرسال الطلب يدوياً عبر إنستجرام مع تفاصيل الطلب أعلاه' 
                    : 'Please send the order manually via Instagram with the above order details');
                window.open('https://www.instagram.com/teto_classic_egy/', '_blank');
                return;
            }
            
            window.open(url, '_blank');
            
            // Reset cart and form
            cart = [];
            updateCartCount();
            document.getElementById('checkoutForm').reset();
            checkoutForm.classList.remove('active');
            cartModal.classList.remove('active');
            
            showNotification(currentLanguage === 'ar' 
                ? 'تم إرسال طلبك بنجاح' 
                : 'Your order has been sent successfully');
        });

        // Language switcher
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageOptions.classList.toggle('active');
        });

        // Language options
        languageOptionItems.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                switchLanguage(lang);
                languageOptions.classList.remove('active');
            });
        });

        // Close language options when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageBtn.contains(e.target) && !languageOptions.contains(e.target)) {
                languageOptions.classList.remove('active');
            }
        });

        // أحداث الإحصائيات
        statsBtn.addEventListener('click', function() {
            adminStats.style.display = 'flex';
            updateStatsDisplay();
        });

        closeStats.addEventListener('click', function() {
            adminStats.style.display = 'none';
        });

        exportStats.addEventListener('click', function() {
            exportStatistics();
        });

        resetStats.addEventListener('click', function() {
            if (confirm(currentLanguage === 'ar' ? 'هل أنت متأكد من إعادة تعيين جميع الإحصائيات؟' : 'Are you sure you want to reset all statistics?')) {
                resetStatistics();
            }
        });

        // إغلاق الإحصائيات بالنقر خارجها
        adminStats.addEventListener('click', function(e) {
            if (e.target === adminStats) {
                adminStats.style.display = 'none';
            }
        });
    }

    // Update cart display
    function updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>' + (currentLanguage === 'ar' ? 'السلة فارغة' : 'Cart is empty') + '</p>';
            cartTotal.textContent = '0';
            return;
        }
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name[currentLanguage]}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name[currentLanguage]}</h4>
                    <div class="cart-item-price">${item.price} ${currentLanguage === 'ar' ? 'جنيه' : 'EGP'} × ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            const removeBtn = cartItem.querySelector('.cart-item-remove');
            removeBtn.addEventListener('click', function() {
                removeFromCart(item.id);
            });
            
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = getCartTotal();
    }

    // Remove item from cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartCount();
        updateCartDisplay();
    }

    // Calculate cart total
    function getCartTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Initialize the site
    init();

});

