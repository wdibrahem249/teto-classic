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
    const orderModal = document.getElementById('orderModal');
    const closeOrder = document.getElementById('closeOrder');
    const submitOrder = document.getElementById('submitOrder');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
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
    
    // Order form elements
    const orderProductImage = document.getElementById('orderProductImage');
    const orderProductName = document.getElementById('orderProductName');
    const orderProductPrice = document.getElementById('orderProductPrice');
    const orderProductCode = document.getElementById('orderProductCode');
    const orderProductSize = document.getElementById('orderProductSize');
    const additionalNotes = document.getElementById('additionalNotes');
    
    // Global state
    let cart = [];
    let currentLanguage = 'ar';
    let currentProduct = null;
    let selectedSize = '';
    
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

    // Sample products data مع إضافة رمز لكل منتج
    const products = {
        shirts: [
            {
                id: 1,
                code: 'A-4',
                name: {
                    ar: 'قميص كاروهات سادة ',
                    en: 'carohat Shirt'
                },
                price: 449,
                images: [
                    'images/shirt.1.1.jpg',
                    'images/shirt.1.2.jpg',
                ],
                category: 'shirts',
                sizes: ["", "", "", "2XL"],
                description: {
                    ar: 'قميص كلاسيكي مصمم بأناقة مع تفاصيل عالية الجودة. مثالي للمناسبات الرسمية والعملية.',
                    en: 'Classic shirt elegantly designed with high-quality details. Perfect for formal and business occasions.'
                }
            },
            {
                id: 2,
                code: 'A-3',
                name: {
                    ar: 'قميص  زيتي',
                    en: 'Olive Green Shirt'
                },
                price: 399,
                images: [
                    'images/shirt.2.1.jpg',
                    'images/shirt.2.2.jpg',
                    'images/shirt.2.3.jpg',
                ],
                category: 'shirts',
                sizes: ["", "L", "", ""],
                description: {
                    ar: 'قميص زيتي فاخر سناسب كل المناسبات والمشاوير الرسمية.',
                    en: 'olive green shirt luxuour for all formal occasions with elegant and modern design.'
                }
            },
            {
                id: 3,
                code: 'A-1',
                name: {
                    ar: 'قميص كتان فاخر كم طويل لون جنزاوي',
                    en: 'luxurious long-sleeved linen shirt in a denim color'
                },
                price: 449,
                images: [
                    'images/shirt.3.1.jpg',
                    'images/shirt.3.2.jpg',
                    'images/shirt.3.3.jpg',
                ],
                category: 'shirts',
                sizes: ["", "", "L"],
                description: {
                    ar: 'قميص جنزاوي كلاسيكي يعكس الأناقة والثقة، مثالي للقاءات المهمة.',
                    en: 'Classic denim shirt reflecting elegance and confidence, perfect for important meetings.'
                }
            },
            {
                id: 4,
                code: 'A-7',
                name: {
                    ar: 'قميص قطن حلاوي سادة ',
                    en: 'powder-pink shirt'
                },
                price: 424,
                images: [
                    'images/shirt.4.1.jpg',
                    
                ],
                category: 'shirts',
                sizes: ["", "3XL", "2XL"],
                description: {
                    ar: 'قميص حلاوي سادة بكم طويل, يعكس الأناقة والثقة، مثالي للقاءات المهمة.',
                    en: 'A long-sleeve shirt in powder-pink, designed to reflect elegance and confidense'
                }
            },
            {
                id: 5,
                code: 'C-3',
                name: {
                    ar: 'قميص قطن حلاوي مخطط',
                    en: 'Striped powder-pink Cotton shirt'
                },
                price: 424,
                images: [
                    'images/shirt.5.1.jpg',
                    
                ],
                category: 'shirts',
                sizes: ["", "M", "2XL"],
                description: {
                    ar: 'قميص حلاوي مخطط بكم طويل, يعكس الأناقة والثقة، مثالي للقاءات المهمة.',
                    en: 'A long-sleeve shirt in powder-pink with sriped, designed to reflect elegance and confidense'
                }
            },
            {
                id: 6,
                code: 'A-2',
                name: {
                    ar: 'قميص كحلي فاخر',
                    en: 'Luxuour navy shirt'
                },
                price: 449,
                images: [
                    'images/shirt.6.1.jpg',
                    'images/shirt.6.2.jpg',
                ],
                category: 'shirts',
                sizes: ["", "", "L"],
                description: {
                    ar: 'قميص كحلي فاخر بكم طويل, يعكس الأناقة والثقة، مثالي للقاءات الرسمية.',
                    en: 'A luxuour navy long-sleeve shirt, designed for formal occasions'
                }
            },
            {
                id: 7,
                code: 'A-2',
                name: {
                    ar: 'قميص مخطط رمادي',
                    en: 'Striped Gray shirt'
                },
                price: 449,
                images: [
                    'images/shirt.7.1.jpg',
                    'images/shirt.7.2.jpg',
                ],
                category: 'shirts',
                sizes: ["", "", "2XL"],
                description: {
                    ar: 'قميص رمادي مخطط فاخر بكم طويل, يعكس الأناقة والثقة، مثالي للقاءات الرسمية.',
                    en: 'A luxurious long-sleeve striped gray shirt, designed for formal occasions'
                }
            },
            {
                id: 8,
                code: 'C-1',
                name: {
                    ar: 'قميص اسود',
                    en: 'Black shirt'
                },
                price: 349,
                images: [
                    'images/shirt.8.1.jpg',
                    'images/shirt.8.2.jpg',
                ],
                category: 'shirts',
                sizes: ["", "L", "XL"],
                description: {
                    ar: 'قميص اسود فاخر بكم طويل, يعكس الأناقة والثقة، مثالي للقاءات الرسمية.',
                    en: 'A luxurious long-sleeve black shirt, designed for formal occasions'
                }
            },
             {
                id: 9,
                code: 'B-6',
                name: {
                    ar: 'قميص كاروهات اسود',
                    en: 'Black carohat shirt'
                },
                price: 349,
                images: [
                    'images/shirt.9.1.jpg',
                    'images/shirt.9.2.jpg',
                    'images/shirt.9.3.jpg',
                ],
                category: 'shirts',
                sizes: ["", "", "2XL"],
                description: {
                    ar: 'قميص كاروهات اسود راقي بكم طويل..',
                    en: 'A classy black carohat shirt long-sleeve shirt'
                }
            },
            {
                id: 10,
                code: 'B-7',
                name: {
                    ar: 'قميص بيجي سادة',
                    en: 'beagy shirt'
                },
                price: 449,
                images: [
                    'images/shirt.10.1.jpg',
                    'images/shirt.10.2.jpg',
                    'images/shirt.10.3.jpg',
                ],
                category: 'shirts',
                sizes: ["", "", "2XL"],
                description: {
                    ar: 'قميص بيجي راقي بكم طويل..',
                    en: 'A classy beagy shirt long-sleeve shirt'
                }
            },
            {
                id: 11,
                code: 'B-8',
                name: {
                    ar: 'قميص كاروهات',
                    en: 'carohat shirt'
                },
                price: 424,
                images: [
                    'images/shirt.11.1.jpg',
                    'images/shirt.11.2.jpg',
                    'images/shirt.11.3.jpg',
                ],
                category: 'shirts',
                sizes: ["", "3XL", "2XL"],
                description: {
                    ar: 'قميص كاروهات راقي بكم طويل..',
                    en: 'A classy  carohat shirt long-sleeve shirt'
                }
            },
            {
                id: 12,
                code: 'B-9',
                name: {
                    ar: 'قميص كاروهات ابيض',
                    en: 'white carohat shirt'
                },
                price: 424,
                images: [
                    'images/shirt.12.1.jpg',
                    'images/shirt.12.2.jpg',
                ],
                category: 'shirts',
                sizes: ["L", "XL", "2XL", "3XL"],
                description: {
                    ar: 'قميص كاروهات ابيض مخطط اسود راقي بكم طويل..',
                    en: 'A classy white carohat shirt long-sleeve shirt'
                }
            },
            {
                id: 13,
                code: 'A-10',
                name: {
                    ar: 'قميص اخضر فاتح',
                    en: 'white green shirt'
                },
                price: 424,
                images: [
                    'images/shirt.13.1.jpg',
                    'images/shirt.13.2.jpg',
                ],
                category: 'shirts',
                sizes: ["L", "", "2XL", ""],
                description: {
                    ar: 'قميص اخضر فاتح مناسب للطلعات البسيطة راقي بكم طويل..',
                    en: 'A classy white-green shirt long-sleeve shirt'
                }
            },
           {
                id: 14,
                code: 'A-6',
                name: {
                    ar: 'قميص لبني فاتح',
                    en: 'white BLUE shirt'
                },
                price: 449,
                images: [
                    'images/shirt.14.1.jpg',
                    'images/shirt.14.2.jpg',
                    'images/shirt.14.3.jpg',
                ],
                category: 'shirts',
                sizes: ["L", "", "2XL", "3XL"],
                description: {
                    ar: 'قميص لبني فاتح مناسب للطلعات البسيطة راقي بكم طويل..',
                    en: 'A classy white-blue shirt long-sleeve shirt'
                }
            },
            {
                id: 15,
                code: 'C-2',
                name: {
                    ar: 'قميص كبدي سادة',
                    en: 'Dark Maroon Shirt'
                },
                price: 499,
                images: [
                    'images/shirt.15.1.jpeg',
                    
                ],
                category: 'shirts',
                sizes: ["2XL", "4XL", "5XL", ""],
                description: {
                    ar: 'قميص كبدي سادة فاخر مناسب للطلعات البسيطة راقي بكم طويل',
                    en: 'A classy dark maroon shirt shirt long-sleeve shirt'
                }
            },
            {
                id: 16,
                code: 'B-10',
                name: {
                    ar: 'قميص سماوي مخطط',
                    en: 'Striped Sky-blue Shirt'
                },
                price: 424,
                images: [
                    'images/shirt.16.1.jpeg',
                    'images/shirt.16.2.jpeg',
                ],
                category: 'shirts',
                sizes: ["", "", "2XL", ""],
                description: {
                    ar: 'قميص مخطط سماوي فاخر مناسب للطلعات البسيطة راقي بكم طويل',
                    en: 'A classy striped sky-blue shirt shirt long-sleeve shirt'
                }
            },
            
            {
                id: 18,
                code: 'B-2',
                name: {
                    ar: 'قميص كاروهات اسود',
                    en: 'black carohat Shirt'
                },
                price: 449,
                images: [
                    'images/shirt.18.1.jpeg',
                    'images/shirt.18.2.jpeg',
                    'images/shirt.18.3.jpeg',
                ],
                category: 'shirts',
                sizes: ["", "M", "2XL", ""],
                description: {
                    ar: 'قميص اسود كاروهات فاخر مناسب للطلعات البسيطة راقي بكم طويل',
                    en: 'A classy carohat black shirt shirt long-sleeve shirt'
                }
            },
        ],
        pants: [
            {
                id: 4,
                code: 'PST-04',
                name: {
                    ar: 'بنطلون كلاسيكي أسود',
                     en: 'Classic Black Pants'
                },
                price: 450,
                images: [
                    'images/pants.2.1.jpg',
                    'images/pants.2.2.jpg',
                    'images/pants.2.3.jpg',
                ],
                category: 'pants',
                sizes: ["32", "34", "36", "38", "40"],
                description: {
                    ar: 'بنطلون أسود كلاسيكي يناسب جميع المناسبات مع قصة مثالية.',
                    en: 'Classic black pants suitable for all occasions with perfect cut.'
                }
            },
            {
                id: 5,
                code: 'PT-002',
                name: {
                    ar: 'بنطلون كلاسيكي بيجي',
                    en: 'Classic peage Pants'
                },
                price: 480,
                images: [
                    'images/pants.1.1.jpg',
                    'images/pants.1.2.jpg',
                ],
                category: 'pants',
                sizes: ["30", "32", "34", "36"],
                description: {
                    ar: 'بنطلون بيجي أنيق يتميز بالراحة والأناقة في نفس الوقت.',
                    en: 'Elegant peage pants characterized by comfort and elegance at the same time.'
                }
            }
        ],
        shoes: [
            {
                id: 6,
                code: 'SH-001',
                name: {
                    ar: 'حذاء كلاسيكي أسود',
                    en: 'Classic Black Shoes'
                },
                price: 600,
                images: [
                    'images/shose.1.2.jpg',
                    'images/shose.1.3.jpg',
                ],
                category: 'shoes',
                sizes: ["40", "41", "42", "43", "44"],
                description: {
                    ar: 'حذاء أسود كلاسيكي يجمع بين الأناقة والراحة في تصميم مبتكر.',
                    en: 'Classic black shoes combining elegance and comfort in an innovative design.'
                }
            },
            {
                id: 7,
                code: 'SH-002',
                name: {
                    ar: 'حذاء كلاسيكي بني',
                    en: 'Classic Brown Shoes'
                },
                price: 650,
                images: [
                    'images/shose.2.1.jpg',
                    'images/shose.2.2.jpg',
                ],
                category: 'shoes',
                sizes: ["39", "40", "41", "42", "43"],
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
                <div class="product-code">${product.code}</div>
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

    // دالة لإنشاء عناصر المقاسات ديناميكياً
    function createSizeOptions(sizes) {
        let html = '';
        sizes.forEach(size => {
            html += `
                <div class="size-option" data-size="${size}">
                    <span>${size}</span>
                </div>
            `;
        });
        return html;
    }

    // Open order form directly
    function openOrderForm(product) {
        // تحديث معلومات المنتج في نموذج الطلب
        orderProductImage.src = product.images[0];
        orderProductName.textContent = product.name[currentLanguage];
        orderProductPrice.textContent = product.price + ' ' + (currentLanguage === 'ar' ? 'جنيه' : 'EGP');
        orderProductCode.textContent = product.code;
        orderProductSize.textContent = selectedSize ? selectedSize : 'لم يتم اختيار مقاس';
        
        // إعادة تعيين الحقول
        document.getElementById('customerName').value = '';
        document.getElementById('primaryPhone').value = '';
        document.getElementById('secondaryPhone').value = '';
        document.getElementById('customerAddress').value = '';
        additionalNotes.value = '';
        
        // فتح نموذج الطلب
        orderModal.classList.add('active');
    }

    // Show product detail page
    function showProductDetailPage(product) {
        currentProduct = product;
        selectedSize = ''; // إعادة تعيين المقاس المختار
        
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show product detail section
        document.getElementById('product-detail').classList.add('active');
        
        // Update product details
        document.getElementById('productDetailTitle').textContent = product.name[currentLanguage];
        document.getElementById('productDetailPrice').textContent = product.price + ' ' + (currentLanguage === 'ar' ? 'جنيه' : 'EGP');
        document.getElementById('productDetailCode').textContent = product.code;
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
        
        // تحديث عرض المقاسات الخاصة بالمنتج
        const sizeOptionsContainer = document.querySelector('.size-options');
        if (sizeOptionsContainer) {
            sizeOptionsContainer.innerHTML = createSizeOptions(product.sizes);
            
            // إضافة event listeners للمقاسات الجديدة
            const sizeOptions = sizeOptionsContainer.querySelectorAll('.size-option');
            sizeOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // إزالة التحديد من جميع المقاسات
                    sizeOptions.forEach(opt => opt.classList.remove('active'));
                    // تحديد المقاس المختار
                    this.classList.add('active');
                    selectedSize = this.getAttribute('data-size');
                });
            });
        }
        
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
                    <div class="product-code">${suggestion.code}</div>
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
        // التحقق من اختيار مقاس إذا كان المنتج له مقاسات
        if (product.sizes && product.sizes.length > 0 && !selectedSize) {
            showNotification(currentLanguage === 'ar' ? 'يرجى اختيار المقاس أولاً' : 'Please select a size first');
            return;
        }
        
        const existingItem = cart.find(item => item.id === product.id && item.size === selectedSize);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: 1,
                size: selectedSize,
                code: product.code
            });
        }
        
        updateCartCount();
        showNotification(currentLanguage === 'ar' ? 'تمت إضافة المنتج إلى السلة' : 'Product added to cart');
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
        
        // Order form
        const formTitle = document.querySelector('#checkoutForm h3');
        if (formTitle) {
            formTitle.textContent = currentLanguage === 'ar' ? 'معلومات العميل' : 'Customer Information';
        }
        
        document.querySelector('label[for="customerName"]').textContent = currentLanguage === 'ar' ? 'الاسم بالكامل *' : 'Full Name *';
        document.querySelector('label[for="primaryPhone"]').textContent = currentLanguage === 'ar' ? 'رقم الهاتف الأساسي *' : 'Primary Phone Number *';
        document.querySelector('label[for="secondaryPhone"]').textContent = currentLanguage === 'ar' ? 'رقم الهاتف الاحتياطي' : 'Secondary Phone Number';
        document.querySelector('label[for="customerAddress"]').textContent = currentLanguage === 'ar' ? 'العنوان التفصيلي *' : 'Address *';
        document.querySelector('label[for="additionalNotes"]').textContent = currentLanguage === 'ar' ? 'ملاحظات إضافية' : 'Additional Notes';
        
        const submitBtn = document.getElementById('submitOrder');
        if (submitBtn) {
            submitBtn.innerHTML = currentLanguage === 'ar' 
                ? '<i class="fab fa-whatsapp"></i> إرسال الطلب عبر واتساب' 
                : '<i class="fab fa-whatsapp"></i> Send Order via WhatsApp';
        }
        
        // Footer
        document.querySelectorAll('.footer-links a').forEach((link, index) => {
            const texts = ['سياسة الخصوصية', 'الاسئلة الشائعة'];
            const enTexts = ['Privacy Policy', 'FAQ'];
            link.textContent = currentLanguage === 'ar' ? texts[index] : enTexts[index];
        });
        
        const copyright = document.querySelector('.copyright');
        copyright.textContent = currentLanguage === 'ar' 
            ? '2025 Teto Classic. جميع الحقوق محفوظة.' 
            : '2025 Teto Classic. All rights reserved.';
            
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
            }
        });

        // Buy now in detail page
        buyNowBtn.addEventListener('click', function() {
            if (currentProduct) {
                openOrderForm(currentProduct);
            }
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
            // يمكنك إضافة منطق للشراء من السلة هنا
            alert(currentLanguage === 'ar' ? 'سيتم تطوير هذه الخاصية قريباً' : 'This feature will be developed soon');
        });

        // Close order modal
        closeOrder.addEventListener('click', function() {
            orderModal.classList.remove('active');
        });

        // Submit order from order modal
        submitOrder.addEventListener('click', function() {
            const name = document.getElementById('customerName').value;
            const primaryPhone = document.getElementById('primaryPhone').value;
            const address = document.getElementById('customerAddress').value;
            
            if (!name || !primaryPhone || !address) {
                alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
                return;
            }
            
            // Create detailed order message for WhatsApp
            let message = '🛒 *طلب جديد - Teto Classic* %0A%0A';
            
            message += '*📋 معلومات العميل:*%0A';
            message += '👤 الاسم: ' + name + '%0A';
            message += '📞 الهاتف: ' + primaryPhone + '%0A';
            
            const secondaryPhone = document.getElementById('secondaryPhone').value;
            if (secondaryPhone) {
                message += '📱 الهاتف الاحتياطي: ' + secondaryPhone + '%0A';
            }
            
            message += '📍 العنوان: ' + address + '%0A';
            
            const notes = additionalNotes.value;
            if (notes) {
                message += '📝 الملاحظات: ' + notes + '%0A';
            }
            
            message += '%0A';
            
            message += '*🛍️ المنتج المطلوب:*%0A';
            message += '📦 المنتج: ' + currentProduct.name[currentLanguage] + '%0A';
            message += '🆔 الرمز: ' + currentProduct.code + '%0A';
            message += '💰 السعر: ' + currentProduct.price + ' جنيه%0A';
            
            if (selectedSize) {
                message += '📏 المقاس: ' + selectedSize + '%0A';
            }
            
            message += '🖼️ الصورة: ' + currentProduct.images[0] + '%0A';
            
            message += '%0A*💰 المجموع:* ' + currentProduct.price + ' جنيه%0A%0A';
            message += '⏰ وقت الطلب: ' + new Date().toLocaleString('ar-EG') + '%0A%0A';
            message += 'شكراً لثقتكم في Teto Classic! 🎉';
            
            // Send via WhatsApp
            const url = 'https://wa.me/201275533360?text=' + message;
            window.open(url, '_blank');
            
            // Reset and close
            orderModal.classList.remove('active');
            
            showNotification(currentLanguage === 'ar' 
                ? 'تم إرسال طلبك بنجاح إلى الواتساب' 
                : 'Your order has been sent successfully to WhatsApp');
        });

        // Close order modal when clicking outside
        orderModal.addEventListener('click', function(e) {
            if (e.target === orderModal) {
                orderModal.classList.remove('active');
            }
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
                    <div class="cart-item-code">🆔 ${item.code}</div>
                    ${item.size ? `<div class="cart-item-size">${currentLanguage === 'ar' ? 'المقاس: ' : 'Size: '}${item.size}</div>` : ''}
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            const removeBtn = cartItem.querySelector('.cart-item-remove');
            removeBtn.addEventListener('click', function() {
                removeFromCart(item.id, item.size);
            });
            
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = getCartTotal();
    }

    // Remove item from cart
    function removeFromCart(productId, size) {
        cart = cart.filter(item => !(item.id === productId && item.size === size));
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
