 // Language Management
        let currentLang = 'ar';
        
        // Products Data
        const products = [
            {
                id: 1,
                name: {
                    ar: "قميص كلاسيكي أسود",
                    en: "Classic Black Shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/black shirt.jpg",
                sizes: ["S", "M", "L", "XL"]
            },
            {
                id: 2,
                name: {
                    ar: "قميص كلاسيك",
                    en: "Classic shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/shirt 1.jpg",
                sizes: ["M", "L", "XL"]
            },
            {
                id: 3,
                name: {
                    ar: "قميص كلاسيك",
                    en: "Classic shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/shirt 2.jpg",
                sizes: ["M", "L", "XL"]
            },
            {
                id: 4,
                name: {
                    ar: "قميص كلاسيك",
                    en: "Classic shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/shirt 3.jpg",
                sizes: ["M", "L", "XL"]
            },
            {
                id: 5,
                name: {
                    ar: "قميص كلاسيك",
                    en: "Classic shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/shirt 4.jpg",
                sizes: ["M", "L", "XL"]
            },
            {
                id: 6,
                name: {
                    ar: "قميص كلاسيك",
                    en: "Classic shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/shirt 5.jpg",
                sizes: ["M", "L", "XL"]
            },
            {
                id: 7,
                name: {
                    ar: "قميص كلاسيك",
                    en: "Classic shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/shirt 6.jpg",
                sizes: ["M", "L", "XL"]
            },
            {
                id: 8,
                name: {
                    ar: "قميص كلاسيك",
                    en: "Classic shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/shirt 7.jpg",
                sizes: ["M", "L", "XL"]
            },
            {
                id: 9,
                name: {
                    ar: "قميص كلاسيك",
                    en: "Classic shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/shirt 8.jpg",
                sizes: ["M", "L", "XL"]
            },
            {
                id: 10,
                name: {
                    ar: "قميص كلاسيك",
                    en: "Classic shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/shirt 9.jpg",
                sizes: ["M", "L", "XL"]
            },
            {
                id: 11,
                name: {
                    ar: "قميص كلاسيك",
                    en: "Classic shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/shirt 10.jpg",
                sizes: ["M", "L", "XL"]
            },
            {
                id: 12,
                name: {
                    ar: "قميص كلاسيك",
                    en: "Classic shirt"
                },
                price: 350,
                category: "shirts",
                image: "images/shirt 11.jpg",
                sizes: ["M", "L", "XL"]
            },
            {
                id: 13,
                name: {
                    ar: "بنطال هاي ويست اسود",
                    en: "Black Haywest Pants"
                },
                price: 450,
                category: "pants",
                image: "images/black.hay.west1.jpg",
                sizes: ["30", "32", "34", "36"]
            },
            {
                id: 14,
                name: {
                    ar: "بنطال هاي ويست بيجي",
                    en: "Beeg Haywest Pants"
                },
                price: 450,
                category: "pants",
                image: "images/white hay west 1.jpg",
                sizes: ["30", "32", "34", "36", "38"]
            },
            {
                id: 15,
                name: {
                    ar: "حذاء كلاسيك اسود",
                    en: "Black Classic Shoes"
                },
                price: 550,
                category: "shoes",
                image: "images/black lv.jpg",
                sizes: ["40", "41", "42", "43", "44"]
            },
            
        ];

        // Cart
        let cart = [];

        // DOM Elements
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const categoryButtons = document.querySelectorAll('.category-btn');
        const productsGrid = document.getElementById('productsGrid');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const orderForm = document.getElementById('orderForm');
        const orderFormElement = document.getElementById('orderFormElement');
        const imageModal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const closeModal = document.getElementById('closeModal');
        const navLinks = document.querySelectorAll('.nav-link');
        const langBtn = document.getElementById('langBtn');
        const langOptions = document.getElementById('langOptions');
        const langOptionBtns = document.querySelectorAll('.lang-option');
        const cartIcon = document.getElementById('cartIcon');
        const cartCount = document.getElementById('cartCount');
        const checkoutBtn = document.getElementById('checkoutBtn');

        // Toggle Mobile Menu
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });

        // Language Switcher
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langOptions.classList.toggle('show');
        });

        // Close language options when clicking outside
        document.addEventListener('click', function() {
            langOptions.classList.remove('show');
        });

        // Language Option Selection
        langOptionBtns.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');
                if (lang !== currentLang) {
                    // Change language
                    changeLanguage(lang);
                    // Update button text
                    langBtn.querySelector('span').textContent = this.textContent;
                    // Close options
                    langOptions.classList.remove('show');
                }
            });
        });

        // Change Language Function
        function changeLanguage(lang) {
            currentLang = lang;
            
            // Update HTML direction
            document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
            
            // Update all elements with data attributes
            document.querySelectorAll('[data-ar]').forEach(element => {
                if (lang === 'ar') {
                    element.textContent = element.getAttribute('data-ar');
                } else {
                    element.textContent = element.getAttribute('data-en');
                }
            });
            
            // Update category buttons
            categoryButtons.forEach(button => {
                if (lang === 'ar') {
                    button.textContent = button.getAttribute('data-ar');
                } else {
                    button.textContent = button.getAttribute('data-en');
                }
            });
            
            // Reload products with new language if any are displayed
            if (productsGrid.innerHTML !== '') {
                const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
                loadProducts(activeCategory);
            }
            
            // Update cart
            updateCart();
        }

        // Load Products
        function loadProducts(category = 'all') {
            productsGrid.innerHTML = '';
            
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(product => product.category === category);
            
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name[currentLang]}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">${product.name[currentLang]}</h3>
                        <div class="product-price">${product.price} ${currentLang === 'ar' ? 'جنيه' : 'EGP'}</div>
                        <div class="size-selector">
                            ${product.sizes.map(size => 
                                `<button class="size-btn" data-size="${size}">${size}</button>`
                            ).join('')}
                        </div>
                        <button class="add-to-cart" data-id="${product.id}">${currentLang === 'ar' ? 'إضافة إلى الطلب' : 'Add to Order'}</button>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });

            // Add event listeners to size buttons
            document.querySelectorAll('.size-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove selected class from all buttons in the same product
                    this.parentElement.querySelectorAll('.size-btn').forEach(b => {
                        b.classList.remove('selected');
                    });
                    // Add selected class to clicked button
                    this.classList.add('selected');
                });
            });

            // Add event listeners to add to cart buttons
            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    const product = products.find(p => p.id === productId);
                    const sizeBtn = this.parentElement.querySelector('.size-btn.selected');
                    
                    if (!sizeBtn) {
                        alert(currentLang === 'ar' ? 'يرجى اختيار المقاس أولاً' : 'Please select a size first');
                        return;
                    }
                    
                    const size = sizeBtn.getAttribute('data-size');
                    addToCart(product, size);
                });
            });

            // Add event listeners to product images for modal
            document.querySelectorAll('.product-image').forEach(img => {
                img.addEventListener('click', function() {
                    modalImage.src = this.src;
                    imageModal.style.display = 'flex';
                });
            });
        }

        // Add to Cart
        function addToCart(product, size) {
            const existingItem = cart.find(item => 
                item.id === product.id && item.size === size
            );
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    size: size,
                    quantity: 1
                });
            }
            
            updateCart();
            alert(currentLang === 'ar' 
                ? `تم إضافة ${product.name[currentLang]} (مقاس ${size}) إلى الطلب`
                : `${product.name[currentLang]} (Size ${size}) has been added to your order`);
        }

        // Update Cart
        function updateCart() {
            cartItems.innerHTML = '';
            let total = 0;
            let totalItems = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                totalItems += item.quantity;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <span>${item.name[currentLang]} (${currentLang === 'ar' ? 'مقاس' : 'Size'} ${item.size}) × ${item.quantity}</span>
                    <span>${itemTotal} ${currentLang === 'ar' ? 'جنيه' : 'EGP'}</span>
                `;
                cartItems.appendChild(cartItem);
            });
            
            cartTotal.textContent = currentLang === 'ar' 
                ? `المجموع: ${total} جنيه` 
                : `Total: ${total} EGP`;
                
            cartCount.textContent = totalItems;
            
            // Enable/disable checkout button based on cart items
            if (totalItems > 0) {
                checkoutBtn.disabled = false;
            } else {
                checkoutBtn.disabled = true;
            }
        }

        // Category Filter
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                loadProducts(category);
            });
        });

        // Checkout Button
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                // Show order form
                orderForm.classList.add('show');
                // Scroll to order form
                orderForm.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                
                if (category === 'all' || category === 'shirts' || category === 'pants' || category === 'shoes') {
                    // Remove active class from all category buttons
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to corresponding category button
                    document.querySelector(`.category-btn[data-category="${category}"]`).classList.add('active');
                    
                    loadProducts(category);
                    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
                } else if (category === 'testimonials') {
                    document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' });
                } else if (category === 'contact') {
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Form Submission
        orderFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (cart.length === 0) {
                alert(currentLang === 'ar' 
                    ? 'يرجى إضافة منتجات إلى الطلب أولاً' 
                    : 'Please add products to your order first');
                return;
            }
            
            const name = document.getElementById('customerName').value;
            const phone = document.getElementById('phone').value;
            const backupPhone = document.getElementById('backupPhone').value;
            const address = document.getElementById('address').value;
            const notes = document.getElementById('notes').value;
            
            let message = currentLang === 'ar' 
                ? `طلب جديد من Teto Classic%0A%0A`
                : `New Order from Teto Classic%0A%0A`;
                
            message += currentLang === 'ar' ? `الاسم: ${name}%0A` : `Name: ${name}%0A`;
            message += currentLang === 'ar' ? `رقم الهاتف: ${phone}%0A` : `Phone: ${phone}%0A`;
            message += currentLang === 'ar' 
                ? `رقم هاتف احتياطي: ${backupPhone || 'غير مذكور'}%0A` 
                : `Backup Phone: ${backupPhone || 'Not provided'}%0A`;
            message += currentLang === 'ar' ? `العنوان: ${address}%0A` : `Address: ${address}%0A`;
            message += currentLang === 'ar' 
                ? `تفاصيل إضافية: ${notes || 'لا يوجد'}%0A%0A` 
                : `Additional Details: ${notes || 'None'}%0A%0A`;
                
            message += currentLang === 'ar' ? `المنتجات المطلوبة:%0A` : `Requested Products:%0A`;
            
            let total = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                message += currentLang === 'ar' 
                    ? `- ${item.name[currentLang]} (مقاس ${item.size}) × ${item.quantity} = ${itemTotal} جنيه%0A`
                    : `- ${item.name[currentLang]} (Size ${item.size}) × ${item.quantity} = ${itemTotal} EGP%0A`;
            });
            
            message += currentLang === 'ar' 
                ? `%0Aالمجموع الكلي: ${total} جنيه` 
                : `%0ATotal: ${total} EGP`;
            
            // Open WhatsApp with the message
            const whatsappURL = `https://wa.me/201156670617?text=${message}`;
            window.open(whatsappURL, '_blank');
            
            // Reset form and cart
            orderFormElement.reset();
            cart = [];
            updateCart();
            orderForm.classList.remove('show');
            
            alert(currentLang === 'ar' 
                ? 'تم إرسال طلبك بنجاح! سنتصل بك قريباً.' 
                : 'Your order has been sent successfully! We will contact you soon.');
        });

        // Modal
        closeModal.addEventListener('click', () => {
            imageModal.style.display = 'none';
        });

        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
            }
        });

        // Initialize - No products loaded by default
        updateCart();