// main.js - النسخة الكاملة بدون نظام الإحصائيات

document.addEventListener('DOMContentLoaded', function() {
    console.log('Teto Classic - Initializing...');
    
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
    const submitRatingBtn = document.getElementById('submitRating');
    
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
    let currentUserRating = 0;
    
    // بيانات التقييمات المشتركة بين جميع المستخدمين
    let productRatings = {};

    // Sample products data
    const products = {
        shirts: [
            {
                id: 1,
                code: 'A-4',
                name: {
                    ar: 'قميص كاروهات سادة',
                    en: 'Plaid Solid Shirt'
                },
                price: 449,
                images: ['images/shirt.1.1.jpg', 'images/shirt.1.2.jpg'],
                category: 'shirts',
                sizes: ["", "", "", "2XL"],
                description: {
                    ar: 'قميص كلاسيكي مصمم بأناقة مع تفاصيل عالية الجودة. مثالي للمناسبات الرسمية والعملية.',
                    en: 'Classic shirt elegantly designed with high-quality details. Perfect for formal and business occasions.'
                },
                features: {
                    ar: ['قماش قطن 100%', 'ياقة كلاسيكية', 'أزرار معدنية', 'تناسب مريح'],
                    en: ['100% Cotton fabric', 'Classic collar', 'Metal buttons', 'Comfortable fit']
                }
            },
            {
                id: 2,
                code: 'A-3',
                name: {
                    ar: 'قميص زيتي',
                    en: 'Olive Green Shirt'
                },
                price: 399,
                images: ['images/shirt.2.1.jpg', 'images/shirt.2.2.jpg', 'images/shirt.2.3.jpg'],
                category: 'shirts',
                sizes: ["", "L", "", ""],
                description: {
                    ar: 'قميص زيتي فاخر يناسب كل المناسبات والمشاوير الرسمية.',
                    en: 'Luxurious olive green shirt suitable for all formal occasions and outings.'
                },
                features: {
                    ar: ['لون زيتي أنيق', 'تصميم عصري', 'جودة عالية', 'راحة طوال اليوم'],
                    en: ['Elegant olive color', 'Modern design', 'High quality', 'All-day comfort']
                }
            },
            {
                id: 3,
                code: 'A-1',
                name: {
                    ar: 'قميص كتان فاخر كم طويل لون جنزاوي',
                    en: 'Luxurious Long-sleeved Linen Shirt in Denim Color'
                },
                price: 449,
                images: ['images/shirt.3.1.jpg', 'images/shirt.3.2.jpg', 'images/shirt.3.3.jpg'],
                category: 'shirts',
                sizes: ["", "", "L"],
                description: {
                    ar: 'قميص جنزاوي كلاسيكي يعكس الأناقة والثقة، مثالي للقاءات المهمة.',
                    en: 'Classic denim shirt reflecting elegance and confidence, perfect for important meetings.'
                },
                features: {
                    ar: ['قماش كتان طبيعي', 'لون جنزاوي كلاسيكي', 'كم طويل', 'تنفس ممتاز'],
                    en: ['Natural linen fabric', 'Classic denim color', 'Long sleeves', 'Excellent breathability']
                }
            },
            {
                id: 4,
                code: 'A-7',
                name: {
                    ar: 'قميص قطن حلاوي سادة',
                    en: 'Powder Pink Solid Cotton Shirt'
                },
                price: 424,
                images: ['images/shirt.4.1.jpg'],
                category: 'shirts',
                sizes: ["", "3XL", "2XL"],
                description: {
                    ar: 'قميص حلاوي سادة بكم طويل، يعكس الأناقة والثقة، مثالي للقاءات المهمة.',
                    en: 'Long-sleeve shirt in powder pink, designed to reflect elegance and confidence.'
                },
                features: {
                    ar: ['لون حلاوي ناعم', 'قماش قطن ناعم', 'تصميم بسيط وأنيق', 'مناسب للعمل والمناسبات'],
                    en: ['Soft powder pink color', 'Smooth cotton fabric', 'Simple elegant design', 'Suitable for work and occasions']
                }
            },
            {
                id: 5,
                code: 'C-3',
                name: {
                    ar: 'قميص قطن حلاوي مخطط',
                    en: 'Striped Powder Pink Cotton Shirt'
                },
                price: 424,
                images: ['images/shirt.5.1.jpg'],
                category: 'shirts',
                sizes: ["", "M", "2XL"],
                description: {
                    ar: 'قميص حلاوي مخطط بكم طويل، يعكس الأناقة والثقة، مثالي للقاءات المهمة.',
                    en: 'Long-sleeve shirt in powder pink with stripes, designed to reflect elegance and confidence.'
                },
                features: {
                    ar: ['مخططات أفقية', 'لون حلاوي فاتح', 'قماش قطن مريح', 'تصميم عصري'],
                    en: ['Horizontal stripes', 'Light powder pink color', 'Comfortable cotton fabric', 'Modern design']
                }
            },
            {
                id: 6,
                code: 'A-2',
                name: {
                    ar: 'قميص كحلي فاخر',
                    en: 'Luxurious Navy Shirt'
                },
                price: 449,
                images: ['images/shirt.6.1.jpg', 'images/shirt.6.2.jpg'],
                category: 'shirts',
                sizes: ["", "", "L"],
                description: {
                    ar: 'قميص كحلي فاخر بكم طويل، يعكس الأناقة والثقة، مثالي للقاءات الرسمية.',
                    en: 'Luxurious navy long-sleeve shirt, designed for formal occasions.'
                },
                features: {
                    ar: ['لون كحلي عميق', 'جودة فاخرة', 'تناسب رسمي', 'مناسب للعمل'],
                    en: ['Deep navy color', 'Luxurious quality', 'Formal fit', 'Suitable for work']
                }
            },
            {
                id: 7,
                code: 'A-2',
                name: {
                    ar: 'قميص مخطط رمادي',
                    en: 'Striped Gray Shirt'
                },
                price: 449,
                images: ['images/shirt.7.1.jpg', 'images/shirt.7.2.jpg'],
                category: 'shirts',
                sizes: ["", "", "2XL"],
                description: {
                    ar: 'قميص رمادي مخطط فاخر بكم طويل، يعكس الأناقة والثقة، مثالي للقاءات الرسمية.',
                    en: 'Luxurious long-sleeve striped gray shirt, designed for formal occasions.'
                },
                features: {
                    ar: ['مخططات رمادية', 'تصميم رسمي', 'جودة عالية', 'تناسب مثالي'],
                    en: ['Gray stripes', 'Formal design', 'High quality', 'Perfect fit']
                }
            },
            {
                id: 8,
                code: 'C-1',
                name: {
                    ar: 'قميص أسود',
                    en: 'Black Shirt'
                },
                price: 349,
                images: [ 'images/shirt.8.2.jpg'],
                category: 'shirts',
                sizes: ["", "L", "XL"],
                description: {
                    ar: 'قميص أسود فاخر بكم طويل، يعكس الأناقة والثقة، مثالي للقاءات الرسمية.',
                    en: 'Luxurious long-sleeve black shirt, designed for formal occasions.'
                },
                features: {
                    ar: ['لون أسود كلاسيكي', 'مناسب لجميع المناسبات', 'جودة عالية', 'راحة ممتازة'],
                    en: ['Classic black color', 'Suitable for all occasions', 'High quality', 'Excellent comfort']
                }
            },
            {
                id: 9,
                code: 'B-6',
                name: {
                    ar: 'قميص كاروهات أسود',
                    en: 'Black Plaid Shirt'
                },
                price: 349,
                images: ['images/shirt.9.1.jpg', 'images/shirt.9.2.jpg', 'images/shirt.9.3.jpg'],
                category: 'shirts',
                sizes: ["", "", "2XL"],
                description: {
                    ar: 'قميص كاروهات أسود راقي بكم طويل.',
                    en: 'Classy black plaid long-sleeve shirt.'
                },
                features: {
                    ar: ['كاروهات أنيقة', 'لون أسود عميق', 'تصميم ريترو', 'قماش دافئ'],
                    en: ['Elegant plaid', 'Deep black color', 'Retro design', 'Warm fabric']
                }
            },
            {
                id: 10,
                code: 'B-7',
                name: {
                    ar: 'قميص بيجي سادة',
                    en: 'Beige Solid Shirt'
                },
                price: 449,
                images: ['images/shirt.10.1.jpg', 'images/shirt.10.2.jpg', 'images/shirt.10.3.jpg'],
                category: 'shirts',
                sizes: ["", "", "2XL"],
                description: {
                    ar: 'قميص بيجي راقي بكم طويل.',
                    en: 'Classy beige long-sleeve shirt.'
                },
                features: {
                    ar: ['لون بيجي محايد', 'مناسب للجميع', 'جودة عالية', 'راحة طويلة الأمد'],
                    en: ['Neutral beige color', 'Suitable for everyone', 'High quality', 'Long-lasting comfort']
                }
            },
            {
                id: 11,
                code: 'B-8',
                name: {
                    ar: 'قميص كاروهات',
                    en: 'Plaid Shirt'
                },
                price: 424,
                images: ['images/shirt.11.1.jpg', 'images/shirt.11.2.jpg', 'images/shirt.11.3.jpg'],
                category: 'shirts',
                sizes: ["", "3XL", "2XL"],
                description: {
                    ar: 'قميص كاروهات راقي بكم طويل.',
                    en: 'Classy plaid long-sleeve shirt.'
                },
                features: {
                    ar: ['كاروهات كلاسيكية', 'ألوان متناغمة', 'جودة ممتازة', 'مناسب للخارج'],
                    en: ['Classic plaid', 'Harmonious colors', 'Excellent quality', 'Suitable for outdoors']
                }
            },
            {
                id: 12,
                code: 'B-9',
                name: {
                    ar: 'قميص كاروهات أبيض',
                    en: 'White Plaid Shirt'
                },
                price: 424,
                images: ['images/shirt.12.1.jpg', 'images/shirt.12.2.jpg'],
                category: 'shirts',
                sizes: ["L", "XL", "2XL", "3XL"],
                description: {
                    ar: 'قميص كاروهات أبيض مخطط أسود راقي بكم طويل.',
                    en: 'Classy white plaid shirt with black stripes, long-sleeve.'
                },
                features: {
                    ar: ['أبيض نقي', 'مخططات سوداء', 'تباين جميل', 'مناسب للصيف'],
                    en: ['Pure white', 'Black stripes', 'Beautiful contrast', 'Suitable for summer']
                }
            },
            {
                id: 13,
                code: 'A-10',
                name: {
                    ar: 'قميص أخضر فاتح',
                    en: 'Light Green Shirt'
                },
                price: 424,
                images: ['images/shirt.13.1.jpg', 'images/shirt.13.2.jpg'],
                category: 'shirts',
                sizes: ["L", "", "2XL", ""],
                description: {
                    ar: 'قميص أخضر فاتح مناسب للطلعات البسيطة راقي بكم طويل.',
                    en: 'Classy light green long-sleeve shirt suitable for casual outings.'
                },
                features: {
                    ar: ['لون أخضر منعش', 'خفة الوزن', 'تهوية جيدة', 'مناسب للطقس الدافئ'],
                    en: ['Refreshing green color', 'Lightweight', 'Good ventilation', 'Suitable for warm weather']
                }
            },
            {
                id: 14,
                code: 'A-6',
                name: {
                    ar: 'قميص لبني فاتح',
                    en: 'Light Blue Shirt'
                },
                price: 449,
                images: ['images/shirt.14.1.jpg', 'images/shirt.14.2.jpg', 'images/shirt.14.3.jpg'],
                category: 'shirts',
                sizes: ["L", "", "2XL", "3XL"],
                description: {
                    ar: 'قميص لبني فاتح مناسب للطلعات البسيطة راقي بكم طويل.',
                    en: 'Classy light blue long-sleeve shirt suitable for casual outings.'
                },
                features: {
                    ar: ['لون أزرق فاتح', 'نعومة فائقة', 'لمسة ناعمة', 'مناسب للعمل'],
                    en: ['Light blue color', 'Super soft', 'Soft touch', 'Suitable for work']
                }
            },
            {
                id: 15,
                code: 'C-2',
                name: {
                    ar: 'قميص كبدي سادة',
                    en: 'Dark Maroon Solid Shirt'
                },
                price: 499,
                images: ['images/shirt.15.1.jpeg'],
                category: 'shirts',
                sizes: ["2XL", "4XL", "5XL", ""],
                description: {
                    ar: 'قميص كبدي سادة فاخر مناسب للطلعات البسيطة راقي بكم طويل',
                    en: 'Classy dark maroon solid shirt, luxurious, suitable for casual outings, long-sleeve.'
                },
                features: {
                    ar: ['لون كبدي غني', 'لمسة فاخرة', 'مقاسات كبيرة', 'جودة استثنائية'],
                    en: ['Rich maroon color', 'Luxurious touch', 'Large sizes', 'Exceptional quality']
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
                images: ['images/shirt.16.1.jpeg', 'images/shirt.16.2.jpeg'],
                category: 'shirts',
                sizes: ["", "", "2XL", ""],
                description: {
                    ar: 'قميص مخطط سماوي فاخر مناسب للطلعات البسيطة راقي بكم طويل',
                    en: 'Classy striped sky-blue shirt, luxurious, suitable for casual outings.'
                },
                features: {
                    ar: ['لون سماوي جميل', 'مخططات رفيعة', 'شكل رياضي', 'راحة ممتازة'],
                    en: ['Beautiful sky-blue color', 'Thin stripes', 'Sporty look', 'Excellent comfort']
                }
            },
            {
                id: 17,
                code: 'B-15',
                name: {
                    ar: 'قميص كاروهات زيتي',
                    en: 'Dark Green Plaid Shirt'
                },
                price: 424,
                images: ['images/shirt.17.1.jpeg'],
                category: 'shirts',
                sizes: ["", "", "2XL", ""],
                description: {
                    ar: 'قميص كاروهات زيتي فاخر مناسب للطلعات البسيطة راقي بكم طويل',
                    en: 'Classy dark green plaid shirt, luxurious, suitable for casual outings.'
                },
                features: {
                    ar: ['لون زيتي عميق', 'كاروهات كلاسيكية', 'مناسب للخريف', 'جودة عالية'],
                    en: ['Deep olive color', 'Classic plaid', 'Suitable for autumn', 'High quality']
                }
            },
            {
                id: 18,
                code: 'B-2',
                name: {
                    ar: 'قميص كاروهات أسود',
                    en: 'Black Plaid Shirt'
                },
                price: 449,
                images: ['images/shirt.18.1.jpeg', 'images/shirt.18.2.jpeg', 'images/shirt.18.3.jpeg'],
                category: 'shirts',
                sizes: ["", "M", "2XL", ""],
                description: {
                    ar: 'قميص أسود كاروهات فاخر مناسب للطلعات البسيطة راقي بكم طويل',
                    en: 'Classy black plaid shirt, luxurious, suitable for casual outings.'
                },
                features: {
                    ar: ['كاروهات سوداء', 'تصميم أنيق', 'مناسب للجميع', 'جودة فاخرة'],
                    en: ['Black plaid', 'Elegant design', 'Suitable for everyone', 'Luxurious quality']
                }
            },
            {
                id: 19,
                code: 'A-5',
                name: {
                    ar: 'قميص أسود قطن',
                    en: 'cotton Black Shirt'
                },
                price: 424,
                images: [ 'images/shirt.8.1.jpg'],
                category: 'shirts',
                sizes: ["L", "2XL", "3XL"],
                description: {
                    ar: 'قميص أسود قطن بكم طويل، يعكس الأناقة والثقة، مثالي للقاءات الرسمية.',
                    en: 'Luxurious long-sleeve black shirt, designed for formal occasions.'
                },
                features: {
                    ar: ['لون أسود كلاسيكي', 'مناسب لجميع المناسبات', 'جودة عالية', 'راحة ممتازة'],
                    en: ['Classic black color', 'Suitable for all occasions', 'High quality', 'Excellent comfort']
                }
            },
        ],
        pants: [
            {
                id: 19,
                code: 'PST-04',
                name: {
                    ar: 'بنطلون كلاسيكي أسود',
                    en: 'Classic Black Pants'
                },
                price: 450,
                images: ['images/pants.2.1.jpg', 'images/pants.2.2.jpg', 'images/pants.2.3.jpg'],
                category: 'pants',
                sizes: ["32", "34", "36", "38", "40"],
                description: {
                    ar: 'بنطلون أسود كلاسيكي يناسب جميع المناسبات مع قصة مثالية.',
                    en: 'Classic black pants suitable for all occasions with perfect cut.'
                },
                features: {
                    ar: ['قماش ممتاز', 'قصة كلاسيكية', 'متانة عالية', 'تناسب مثالي'],
                    en: ['Excellent fabric', 'Classic cut', 'High durability', 'Perfect fit']
                }
            },
            {
                id: 20,
                code: 'PT-002',
                name: {
                    ar: 'بنطلون كلاسيكي بيجي',
                    en: 'Classic Beige Pants'
                },
                price: 480,
                images: ['images/pants.1.1.jpg', 'images/pants.1.2.jpg'],
                category: 'pants',
                sizes: ["30", "32", "34", "36"],
                description: {
                    ar: 'بنطلون بيجي أنيق يتميز بالراحة والأناقة في نفس الوقت.',
                    en: 'Elegant beige pants characterized by comfort and elegance at the same time.'
                },
                features: {
                    ar: ['لون بيجي محايد', 'راحة فائقة', 'تصميم عصري', 'جودة عالية'],
                    en: ['Neutral beige color', 'Super comfort', 'Modern design', 'High quality']
                }
            }
        ],
        shoes: [
            {
                id: 21,
                code: 'SH-001',
                name: {
                    ar: 'حذاء كلاسيكي أسود',
                    en: 'Classic Black Shoes'
                },
                price: 600,
                images: ['images/shose.1.2.jpg', 'images/shose.1.3.jpg'],
                category: 'shoes',
                sizes: ["40", "41", "42", "43", "44"],
                description: {
                    ar: 'حذاء أسود كلاسيكي يجمع بين الأناقة والراحة في تصميم مبتكر.',
                    en: 'Classic black shoes combining elegance and comfort in an innovative design.'
                },
                features: {
                    ar: ['جلد طبيعي', 'نعل مريح', 'تصميم كلاسيكي', 'متانة عالية'],
                    en: ['Genuine leather', 'Comfortable sole', 'Classic design', 'High durability']
                }
            },
            {
                id: 22,
                code: 'SH-002',
                name: {
                    ar: 'حذاء كلاسيكي بني',
                    en: 'Classic Brown Shoes'
                },
                price: 650,
                images: ['images/shose.2.1.jpg', 'images/shose.2.2.jpg'],
                category: 'shoes',
                sizes: ["39", "40", "41", "42", "43"],
                description: {
                    ar: 'حذاء بني أنيق يناسب الملابس الكلاسيكية والعصرية.',
                    en: 'Elegant brown shoes suitable for both classic and contemporary outfits.'
                },
                features: {
                    ar: ['لون بني كلاسيكي', 'راحة طوال اليوم', 'تصميم أنيق', 'جودة فاخرة'],
                    en: ['Classic brown color', 'All-day comfort', 'Elegant design', 'Luxurious quality']
                }
            }
        ]
    };

    // Initialize the site
    function init() {
        console.log('Initializing Teto Classic...');
        
        // Load data first
        loadRatings();
        loadCart();
        
        // Setup everything else
        setupEventListeners();
        loadProducts();
        updateCartCount();
        
        // Load language preference
        const savedLanguage = localStorage.getItem('tetoLanguage');
        if (savedLanguage) {
            switchLanguage(savedLanguage);
        }
        
        console.log('Teto Classic initialized successfully!');
    }

    // Load products into the grid
    function loadProducts() {
        console.log('Loading products...');
        
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
                <img src="${product.images[0]}" alt="${product.name[currentLanguage]}" loading="lazy" 
                     onerror="this.onerror=null; this.src='images/default-product.jpg';">
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
            currentProduct = product;
            addToCart(product);
            showNotification(currentLanguage === 'ar' ? 'تمت إضافة المنتج إلى السلة' : 'Product added to cart');
        });
        
        const buyNowBtn = card.querySelector('.buy-now-btn');
        buyNowBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentProduct = product;
            selectedSize = '';
            openOrderForm(product);
        });
        
        card.addEventListener('click', function() {
            // Scroll to top first
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Then show product details
            setTimeout(() => {
                showProductDetailPage(product);
            }, 300);
        });
        
        return card;
    }

    // نظام التقييمات المحسّن
    function loadRatings() {
        console.log('Loading ratings...');
        const savedRatings = localStorage.getItem('tetoProductRatings');
        if (savedRatings) {
            try {
                productRatings = JSON.parse(savedRatings);
                console.log(`Loaded ${Object.keys(productRatings).length} product ratings`);
            } catch (e) {
                console.error('Error loading ratings:', e);
                productRatings = {};
            }
        } else {
            // Add sample ratings if none exist
            addSampleRatings();
        }
    }

    function saveRatings() {
        try {
            localStorage.setItem('tetoProductRatings', JSON.stringify(productRatings));
            console.log('Ratings saved successfully');
        } catch (e) {
            console.error('Error saving ratings:', e);
        }
    }

    function addSampleRatings() {
        console.log('Adding sample ratings...');
        
        // Sample users
        const users = ['محمد أحمد', 'علي محمود', 'خالد عمر', 'سالم يوسف', 'أحمد سعيد', 
                      'مصطفى كمال', 'يوسف حسن', 'حسام الدين', 'طارق عثمان', 'سامي رضا'];
        
        // Add ratings for all products
        Object.values(products).forEach(category => {
            category.forEach(product => {
                // Add 2-5 ratings per product
                const numRatings = Math.floor(Math.random() * 4) + 2;
                for (let i = 0; i < numRatings; i++) {
                    const rating = {
                        id: Date.now() + Math.random(),
                        productId: product.id,
                        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
                        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                        user: users[Math.floor(Math.random() * users.length)]
                    };
                    
                    if (!productRatings[product.id]) {
                        productRatings[product.id] = [];
                    }
                    productRatings[product.id].push(rating);
                }
            });
        });
        
        saveRatings();
        console.log('Sample ratings added');
    }

    function setupRatingListeners() {
        console.log('Setting up rating listeners...');
        
        // Rating stars
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
            
            starsInput.addEventListener('mouseleave', function() {
                highlightStars(currentUserRating);
            });
        }
        
        // Submit rating button
        if (submitRatingBtn) {
            submitRatingBtn.addEventListener('click', submitRating);
        }
    }

    function setStarRating(rating) {
        currentUserRating = rating;
        document.getElementById('selectedRating').textContent = rating;
        highlightStars(rating);
        
        // Enable submit button
        const submitBtn = document.getElementById('submitRating');
        if (submitBtn) {
            submitBtn.disabled = false;
        }
    }

    function highlightStars(rating) {
        const stars = document.querySelectorAll('.stars-input i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('far');
                star.classList.add('fas');
                star.classList.add('active');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
                star.classList.remove('active');
            }
        });
    }

    function submitRating() {
        if (!currentProduct) {
            showNotification(currentLanguage === 'ar' ? 'لم يتم تحديد منتج' : 'No product selected');
            return;
        }
        
        if (currentUserRating === 0) {
            showNotification(currentLanguage === 'ar' ? 'يرجى اختيار تقييم' : 'Please select a rating');
            return;
        }
        
        // Generate random user name
        const users = ['عميل Teto', 'مشتري راضي', 'عميل مميز', 'متابع Teto', 'عاشق الكلاسيك'];
        const randomName = users[Math.floor(Math.random() * users.length)];
        
        const newRating = {
            id: Date.now(),
            productId: currentProduct.id,
            rating: currentUserRating,
            date: new Date().toISOString(),
            user: randomName
        };
        
        addProductRating(newRating);
        updateProductRatingDisplay(currentProduct.id);
        
        // Reset
        currentUserRating = 0;
        document.getElementById('selectedRating').textContent = '0';
        highlightStars(0);
        submitRatingBtn.disabled = true;
        
        showNotification(currentLanguage === 'ar' 
            ? 'شكراً لك! تم إضافة تقييمك بنجاح' 
            : 'Thank you! Your rating has been added successfully');
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
        return (sum / ratings.length).toFixed(1);
    }

    function generateStarRating(averageRating) {
        const rating = parseFloat(averageRating);
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        
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
        
        // Update all rating displays
        const elements = {
            'quickAverageRating': averageRating,
            'ratingCount': totalRatings,
            'averageRating': averageRating,
            'totalRatings': totalRatings
        };
        
        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        }
        
        // Update stars
        const starContainers = ['quickRatingStars', 'averageRatingStars'];
        starContainers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = generateStarRating(averageRating);
            }
        });
        
        // Update ratings list
        updateRatingsList(ratings);
    }

    function updateRatingsList(ratings) {
        const container = document.getElementById('ratingsContainer');
        if (!container) return;
        
        if (ratings.length === 0) {
            container.innerHTML = '<div class="no-ratings">' + 
                (currentLanguage === 'ar' ? 'لا توجد تقييمات حتى الآن. كن أول من يقيم هذا المنتج!' : 'No ratings yet. Be the first to rate this product!') + 
                '</div>';
            return;
        }
        
        container.innerHTML = '';
        
        // Sort by date (newest first)
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
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffMins < 60) {
            return currentLanguage === 'ar' ? `قبل ${diffMins} دقيقة` : `${diffMins} minutes ago`;
        } else if (diffHours < 24) {
            return currentLanguage === 'ar' ? `قبل ${diffHours} ساعة` : `${diffHours} hours ago`;
        } else if (diffDays < 7) {
            return currentLanguage === 'ar' ? `قبل ${diffDays} يوم` : `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    }

    // Open order form directly
    function openOrderForm(product) {
        // Update product info
        orderProductImage.src = product.images[0];
        orderProductName.textContent = product.name[currentLanguage];
        orderProductPrice.textContent = product.price + ' ' + (currentLanguage === 'ar' ? 'جنيه' : 'EGP');
        orderProductCode.textContent = product.code;
        orderProductSize.textContent = selectedSize ? selectedSize : (currentLanguage === 'ar' ? 'لم يتم اختيار مقاس' : 'Size not selected');
        
        // Reset form
        document.getElementById('customerName').value = '';
        document.getElementById('primaryPhone').value = '';
        document.getElementById('secondaryPhone').value = '';
        document.getElementById('customerAddress').value = '';
        additionalNotes.value = '';
        
        // Show modal
        orderModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Show product detail page
    function showProductDetailPage(product) {
        console.log('Showing product details for:', product.name[currentLanguage]);
        
        currentProduct = product;
        selectedSize = '';
        currentUserRating = 0;
        
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Scroll to top of page
        window.scrollTo({ top: 80, behavior: 'smooth' });
        
        // Show product detail section
        const productDetailSection = document.getElementById('product-detail');
        productDetailSection.classList.add('active');
        
        // Update product details
        document.getElementById('productDetailTitle').textContent = product.name[currentLanguage];
        document.getElementById('productDetailPrice').textContent = product.price + ' ' + (currentLanguage === 'ar' ? 'جنيه' : 'EGP');
        document.getElementById('productDetailCode').textContent = product.code;
        
        // Update main image
        const productDetailImage = document.getElementById('productDetailImage');
        if (product.images && product.images.length > 0) {
            productDetailImage.src = product.images[0];
            productDetailImage.alt = product.name[currentLanguage];
        } else {
            productDetailImage.src = 'images/default-product.jpg';
        }
        
        // Update thumbnails
        const thumbnailsContainer = document.querySelector('.image-thumbnails');
        thumbnailsContainer.innerHTML = '';
        
        if (product.images && product.images.length > 0) {
            product.images.forEach((image, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.className = 'thumbnail' + (index === 0 ? ' active' : '');
                thumbnail.innerHTML = `<img src="${image}" alt="${product.name[currentLanguage]} ${index + 1}">`;
                
                thumbnail.addEventListener('click', function() {
                    productDetailImage.src = image;
                    document.querySelectorAll('.thumbnail').forEach(thumb => {
                        thumb.classList.remove('active');
                    });
                    thumbnail.classList.add('active');
                });
                
                thumbnailsContainer.appendChild(thumbnail);
            });
        } else {
            thumbnailsContainer.innerHTML = '<p>' + (currentLanguage === 'ar' ? 'لا توجد صور إضافية' : 'No additional images') + '</p>';
        }
        
        // Update description
        const descriptionContent = document.querySelector('.description-content');
        const descriptionHTML = `
            <p>${product.description[currentLanguage] || product.description.ar}</p>
            <h4>${currentLanguage === 'ar' ? 'المميزات:' : 'Features:'}</h4>
            <ul>
                ${product.features[currentLanguage].map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        descriptionContent.innerHTML = descriptionHTML;
        
        // Update sizes
        const sizeOptionsContainer = document.querySelector('.size-options');
        if (sizeOptionsContainer) {
            sizeOptionsContainer.innerHTML = '';
            
            if (product.sizes && product.sizes.length > 0) {
                product.sizes.forEach(size => {
                    if (size && size.trim() !== "") {
                        const sizeOption = document.createElement('div');
                        sizeOption.className = 'size-option';
                        sizeOption.textContent = size;
                        sizeOption.dataset.size = size;
                        
                        sizeOption.addEventListener('click', function() {
                            document.querySelectorAll('.size-option').forEach(opt => {
                                opt.classList.remove('active');
                            });
                            this.classList.add('active');
                            selectedSize = size;
                            
                            // Update help text
                            const sizeHelp = document.querySelector('.size-help span');
                            if (sizeHelp) {
                                sizeHelp.textContent = currentLanguage === 'ar' 
                                    ? `المقاس المختار: ${size}` 
                                    : `Selected size: ${size}`;
                            }
                        });
                        
                        sizeOptionsContainer.appendChild(sizeOption);
                    }
                });
                
                if (sizeOptionsContainer.children.length === 0) {
                    sizeOptionsContainer.innerHTML = `<div class="no-sizes">${currentLanguage === 'ar' ? 'لا توجد مقاسات متاحة' : 'No sizes available'}</div>`;
                }
            } else {
                sizeOptionsContainer.innerHTML = `<div class="no-sizes">${currentLanguage === 'ar' ? 'لا توجد مقاسات متاحة' : 'No sizes available'}</div>`;
            }
        }
        
        // Update ratings
        updateProductRatingDisplay(product.id);
        
        // Setup rating listeners
        setTimeout(() => {
            setupRatingListeners();
            
            // Reset rating input
            const selectedRatingElement = document.getElementById('selectedRating');
            if (selectedRatingElement) {
                selectedRatingElement.textContent = '0';
            }
            highlightStars(0);
            
            const submitBtn = document.getElementById('submitRating');
            if (submitBtn) {
                submitBtn.disabled = true;
            }
        }, 100);
        
        // Load suggestions
        loadProductSuggestions(product);
    }

    // Load product suggestions for detail page
    function loadProductSuggestions(product) {
        const suggestionsGrid = document.getElementById('productSuggestionsGrid');
        if (!suggestionsGrid) return;
        
        suggestionsGrid.innerHTML = '';
        
        // Get products from same category (excluding current product)
        const sameCategoryProducts = products[product.category].filter(p => p.id !== product.id);
        
        // If not enough products in same category, add from other categories
        let suggestions = [...sameCategoryProducts];
        if (suggestions.length < 4) {
            const otherProducts = [];
            for (const category in products) {
                if (category !== product.category) {
                    otherProducts.push(...products[category]);
                }
            }
            suggestions.push(...otherProducts.filter(p => p.id !== product.id));
        }
        
        // Take first 4
        suggestions = suggestions.slice(0, 4);
        
        suggestions.forEach(suggestion => {
            const ratings = getProductRatings(suggestion.id);
            const averageRating = calculateAverageRating(ratings);
            
            const suggestionCard = document.createElement('div');
            suggestionCard.className = 'product-card';
            suggestionCard.innerHTML = `
                <div class="product-img">
                    <img src="${suggestion.images[0]}" alt="${suggestion.name[currentLanguage]}" loading="lazy"
                         onerror="this.onerror=null; this.src='images/default-product.jpg';">
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
            
            // Add event listeners
            const addToCartBtn = suggestionCard.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                currentProduct = suggestion;
                addToCart(suggestion);
                showNotification(currentLanguage === 'ar' ? 'تمت إضافة المنتج إلى السلة' : 'Product added to cart');
            });
            
            const buyNowBtn = suggestionCard.querySelector('.buy-now-btn');
            buyNowBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                currentProduct = suggestion;
                selectedSize = '';
                openOrderForm(suggestion);
            });
            
            suggestionCard.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                    showProductDetailPage(suggestion);
                }, 300);
            });
            
            suggestionsGrid.appendChild(suggestionCard);
        });
    }

    // Cart functions
    function loadCart() {
        const savedCart = localStorage.getItem('tetoCart');
        if (savedCart) {
            try {
                cart = JSON.parse(savedCart);
                console.log('Cart loaded:', cart.length, 'items');
            } catch (e) {
                console.error('Error loading cart:', e);
                cart = [];
            }
        }
    }

    function saveCart() {
        try {
            localStorage.setItem('tetoCart', JSON.stringify(cart));
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }

    function addToCart(product) {
        // Check if size is required
        if (product.sizes && product.sizes.some(s => s.trim() !== "") && !selectedSize) {
            showNotification(currentLanguage === 'ar' ? 'يرجى اختيار المقاس أولاً' : 'Please select a size first');
            return;
        }
        
        const existingItem = cart.find(item => 
            item.id === product.id && 
            item.size === selectedSize
        );
        
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
                code: product.code,
                category: product.category
            });
        }
        
        saveCart();
        updateCartCount();
        showNotification(currentLanguage === 'ar' ? 'تمت إضافة المنتج إلى السلة' : 'Product added to cart');
    }

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-state">' + 
                (currentLanguage === 'ar' ? 'سلة التسوق فارغة' : 'Your shopping cart is empty') + 
                '</div>';
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
                <button class="cart-item-remove" data-id="${item.id}" data-size="${item.size || ''}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            const removeBtn = cartItem.querySelector('.cart-item-remove');
            removeBtn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const size = this.getAttribute('data-size');
                removeFromCart(id, size);
            });
            
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = getCartTotal();
    }

    function removeFromCart(productId, size) {
        cart = cart.filter(item => !(item.id === productId && item.size === size));
        saveCart();
        updateCartCount();
        updateCartDisplay();
        showNotification(currentLanguage === 'ar' ? 'تم إزالة المنتج من السلة' : 'Product removed from cart');
    }

    function getCartTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Show notification
    function showNotification(message) {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 3000);
    }

    // Switch language
    function switchLanguage(lang) {
        currentLanguage = lang;
        
        // Update HTML
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // Update UI
        updateAllTexts();
        
        // Update language options
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
        
        // Reload products
        loadProducts();
        
        // Update current product details
        if (currentProduct && document.getElementById('product-detail').classList.contains('active')) {
            showProductDetailPage(currentProduct);
        }
        
        // Update cart
        if (cartModal.classList.contains('active')) {
            updateCartDisplay();
        }
        
        // Save preference
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
        
        // Buttons and labels
        const translations = {
            'ar': {
                'addToCart': 'إضافة إلى السلة',
                'buyNow': 'شراء الآن',
                'backToProducts': 'العودة إلى المنتجات',
                'chooseSize': 'اختر المقاس:',
                'sizeHelp': 'يرجى اختيار المقاس المناسب',
                'limitedStock': 'قطع محدودة متبقية!',
                'productFeatures': 'تفاصيل المنتج',
                'rateProduct': 'تقييم المنتج',
                'addYourRating': 'أضف تقييمك',
                'yourRating': 'تقييمك:',
                'submitRating': 'إرسال التقييم',
                'customerReviews': 'آراء العملاء',
                'suggestedProducts': 'منتجات قد تعجبك',
                'orderSummary': 'ملخص الطلب',
                'customerInfo': 'معلومات العميل',
                'fullName': 'الاسم بالكامل *',
                'primaryPhone': 'رقم الهاتف الأساسي *',
                'secondaryPhone': 'رقم الهاتف الاحتياطي',
                'address': 'العنوان التفصيلي *',
                'additionalNotes': 'ملاحظات إضافية',
                'submitOrder': 'إرسال الطلب عبر واتساب',
                'shoppingCart': 'سلة التسوق',
                'continueShopping': 'مواصلة التسوق',
                'proceedCheckout': 'إتمام الشراء',
                'freeShipping': 'شحن مجاني',
                'limitedOffer': 'عرض محدود! ينتهي خلال 3 أيام',
                'qualityGuarantee': 'ضمان الجودة',
                'previewMeasure': 'معاينة وقياس قبل الاستلام',
                'fastDelivery': 'توصيل سريع'
            },
            'en': {
                'addToCart': 'Add to Cart',
                'buyNow': 'Buy Now',
                'backToProducts': 'Back to Products',
                'chooseSize': 'Choose Size:',
                'sizeHelp': 'Please select the appropriate size',
                'limitedStock': 'Limited stock remaining!',
                'productFeatures': 'Product Details',
                'rateProduct': 'Product Rating',
                'addYourRating': 'Add Your Rating',
                'yourRating': 'Your Rating:',
                'submitRating': 'Submit Rating',
                'customerReviews': 'Customer Reviews',
                'suggestedProducts': 'Products You May Like',
                'orderSummary': 'Order Summary',
                'customerInfo': 'Customer Information',
                'fullName': 'Full Name *',
                'primaryPhone': 'Primary Phone *',
                'secondaryPhone': 'Secondary Phone',
                'address': 'Detailed Address *',
                'additionalNotes': 'Additional Notes',
                'submitOrder': 'Submit Order via WhatsApp',
                'shoppingCart': 'Shopping Cart',
                'continueShopping': 'Continue Shopping',
                'proceedCheckout': 'Proceed to Checkout',
                'freeShipping': 'Free Shipping',
                'limitedOffer': 'Limited Offer! Ends in 3 days',
                'qualityGuarantee': 'Quality Guarantee',
                'previewMeasure': 'Preview & Measure Before Receipt',
                'fastDelivery': 'Fast Delivery'
            }
        };
        
        const langData = translations[currentLanguage];
        
        // Update buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            if (!btn.closest('.product-card')) {
                const icon = btn.querySelector('i');
                btn.innerHTML = `${icon ? icon.outerHTML + ' ' : ''}${langData.addToCart}`;
            }
        });
        
        document.querySelectorAll('.buy-now-btn').forEach(btn => {
            if (!btn.closest('.product-card')) {
                const icon = btn.querySelector('i');
                btn.innerHTML = `${icon ? icon.outerHTML + ' ' : ''}${langData.buyNow}`;
            }
        });
        
        // Update back to products
        const backBtn = document.querySelector('.back-to-products');
        if (backBtn) {
            const icon = backBtn.querySelector('i');
            backBtn.innerHTML = `${icon ? icon.outerHTML + ' ' : ''}${langData.backToProducts}`;
        }
        
        // Update size selection
        const sizeHeading = document.querySelector('.size-selection h3');
        if (sizeHeading) {
            sizeHeading.textContent = langData.chooseSize;
        }
        
        const sizeHelp = document.getElementById('sizeHelpText');
        if (sizeHelp) {
            sizeHelp.textContent = langData.sizeHelp;
        }
        
        // Update stock info
        const stockInfo = document.querySelector('.stock-info span');
        if (stockInfo) {
            stockInfo.textContent = langData.limitedStock;
        }
        
        // Update product description
        const productDesc = document.querySelector('.product-description h3');
        if (productDesc) {
            productDesc.textContent = langData.productFeatures;
        }
        
        // Update rating section
        const ratingHeading = document.querySelector('.product-rating-section h3');
        if (ratingHeading) {
            ratingHeading.textContent = langData.rateProduct;
        }
        
        const addRatingHeading = document.querySelector('.add-rating h4');
        if (addRatingHeading) {
            addRatingHeading.textContent = langData.addYourRating;
        }
        
        const ratingValue = document.querySelector('.rating-value');
        if (ratingValue) {
            const span = ratingValue.querySelector('span');
            if (span) {
                ratingValue.innerHTML = `${langData.yourRating} <span id="selectedRating">0</span>/5`;
            }
        }
        
        const submitRating = document.getElementById('submitRating');
        if (submitRating) {
            const icon = submitRating.querySelector('i');
            submitRating.innerHTML = `${icon ? icon.outerHTML + ' ' : ''}${langData.submitRating}`;
        }
        
        const reviewsHeading = document.querySelector('.ratings-list h4');
        if (reviewsHeading) {
            reviewsHeading.textContent = langData.customerReviews;
        }
        
        // Update suggestions
        const suggestionsHeading = document.querySelector('.product-suggestions h3');
        if (suggestionsHeading) {
            suggestionsHeading.textContent = langData.suggestedProducts;
        }
        
        // Update order modal
        const orderSummary = document.querySelector('.order-summary h3');
        if (orderSummary) {
            orderSummary.textContent = langData.orderSummary;
        }
        
        const customerInfo = document.querySelector('.checkout-form h3');
        if (customerInfo) {
            customerInfo.textContent = langData.customerInfo;
        }
        
        const nameLabel = document.querySelector('label[for="customerName"]');
        if (nameLabel) {
            nameLabel.textContent = langData.fullName;
        }
        
        const phoneLabel = document.querySelector('label[for="primaryPhone"]');
        if (phoneLabel) {
            phoneLabel.textContent = langData.primaryPhone;
        }
        
        const secPhoneLabel = document.querySelector('label[for="secondaryPhone"]');
        if (secPhoneLabel) {
            secPhoneLabel.textContent = langData.secondaryPhone;
        }
        
        const addressLabel = document.querySelector('label[for="customerAddress"]');
        if (addressLabel) {
            addressLabel.textContent = langData.address;
        }
        
        const notesLabel = document.querySelector('label[for="additionalNotes"]');
        if (notesLabel) {
            notesLabel.textContent = langData.additionalNotes;
        }
        
        const submitOrderBtn = document.getElementById('submitOrder');
        if (submitOrderBtn) {
            const icon = submitOrderBtn.querySelector('i');
            submitOrderBtn.innerHTML = `${icon ? icon.outerHTML + ' ' : ''}${langData.submitOrder}`;
        }
        
        // Update cart modal
        const cartTitle = document.querySelector('.cart-content .section-title');
        if (cartTitle) {
            cartTitle.textContent = langData.shoppingCart;
        }
        
        const continueBtn = document.getElementById('continueShopping');
        if (continueBtn) {
            continueBtn.textContent = langData.continueShopping;
        }
        
        const checkoutBtn = document.getElementById('proceedCheckout');
        if (checkoutBtn) {
            checkoutBtn.textContent = langData.proceedCheckout;
        }
        
        // Update cart total text
        const cartTotal = document.querySelector('.cart-total');
        if (cartTotal) {
            cartTotal.innerHTML = `${currentLanguage === 'ar' ? 'المجموع:' : 'Total:'} <span id="cartTotal">0</span> ${currentLanguage === 'ar' ? 'جنيه' : 'EGP'}`;
        }
        
        // Update delivery info
        const deliveryInfo = document.querySelector('.delivery-info span');
        if (deliveryInfo) {
            deliveryInfo.textContent = langData.freeShipping;
        }
        
        // Update limited offer
        const limitedOffer = document.querySelector('.limited-offer span');
        if (limitedOffer) {
            limitedOffer.textContent = langData.limitedOffer;
        }
        
        // Update features
        const features = document.querySelectorAll('.feature span');
        if (features.length >= 3) {
            features[0].textContent = langData.qualityGuarantee;
            features[1].textContent = langData.previewMeasure;
            features[2].textContent = langData.fastDelivery;
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        console.log('Setting up event listeners...');
        
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
                
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                document.getElementById(category).classList.add('active');
                navMenu.classList.remove('active');
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Back to products
        backToProducts.addEventListener('click', function(e) {
            e.preventDefault();
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById('home').classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
            document.body.style.overflow = 'hidden';
            updateCartDisplay();
        });

        // Close cart
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Continue shopping
        continueShopping.addEventListener('click', function() {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Proceed to checkout
        proceedCheckout.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification(currentLanguage === 'ar' ? 'السلة فارغة' : 'Cart is empty');
                return;
            }
            // يمكن تطوير هذه الخاصية لاحقاً
            showNotification(currentLanguage === 'ar' ? 'سيتم تطوير هذه الخاصية قريباً' : 'This feature will be developed soon');
        });

        // Close order modal
        closeOrder.addEventListener('click', function() {
            orderModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Submit order
        submitOrder.addEventListener('click', function() {
            const name = document.getElementById('customerName').value.trim();
            const primaryPhone = document.getElementById('primaryPhone').value.trim();
            const address = document.getElementById('customerAddress').value.trim();
            
            if (!name || !primaryPhone || !address) {
                showNotification(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
                return;
            }
            
            if (!currentProduct) {
                showNotification(currentLanguage === 'ar' ? 'لم يتم تحديد منتج' : 'No product selected');
                return;
            }
            
            // Create WhatsApp message
            let message = `*🛒 طلب جديد - Teto Classic*%0A%0A`;
            message += `*📋 معلومات العميل:*%0A`;
            message += `👤 الاسم: ${name}%0A`;
            message += `📞 الهاتف: ${primaryPhone}%0A`;
            
            const secondaryPhone = document.getElementById('secondaryPhone').value.trim();
            if (secondaryPhone) {
                message += `📱 الهاتف الاحتياطي: ${secondaryPhone}%0A`;
            }
            
            message += `📍 العنوان: ${address}%0A`;
            
            const notes = additionalNotes.value.trim();
            if (notes) {
                message += `📝 الملاحظات: ${notes}%0A`;
            }
            
            message += `%0A*🛍️ المنتج المطلوب:*%0A`;
            message += `📦 المنتج: ${currentProduct.name[currentLanguage]}%0A`;
            message += `🆔 الرمز: ${currentProduct.code}%0A`;
            message += `💰 السعر: ${currentProduct.price} جنيه%0A`;
            
            if (selectedSize) {
                message += `📏 المقاس: ${selectedSize}%0A`;
            }
            
            message += `%0A*💰 المجموع:* ${currentProduct.price} جنيه%0A%0A`;
            message += `⏰ وقت الطلب: ${new Date().toLocaleString('ar-EG')}%0A%0A`;
            message += `شكراً لثقتكم في Teto Classic! 🎉`;
            
            // Open WhatsApp
            const url = `https://wa.me/201275533360?text=${message}`;
            window.open(url, '_blank');
            
            // Close modal
            orderModal.classList.remove('active');
            document.body.style.overflow = '';
            
            showNotification(currentLanguage === 'ar' 
                ? 'تم إرسال طلبك بنجاح إلى الواتساب' 
                : 'Your order has been sent successfully to WhatsApp');
        });

        // Close order modal when clicking outside
        orderModal.addEventListener('click', function(e) {
            if (e.target === orderModal) {
                orderModal.classList.remove('active');
                document.body.style.overflow = '';
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

        // Close cart when clicking outside
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Prevent body scroll when modals are open
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (cartModal.classList.contains('active')) {
                    cartModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
                if (orderModal.classList.contains('active')) {
                    orderModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
        
        console.log('Event listeners setup completed');
    }

    // Initialize the site
    init();
});
