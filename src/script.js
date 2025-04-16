// Redirect to login page if not logged in
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
});
// Initialize Three.js scene
function initThreeJS() {
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(500, 500);
    document.getElementById('model-container').appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create a simple 3D dress model (using a basic shape for simplicity)
    const geometry = new THREE.ConeGeometry(2, 4, 32, 1, false, 0, Math.PI * 2);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0xff1493,
        specular: 0xffffff,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    
    const dress = new THREE.Mesh(geometry, material);
    scene.add(dress);
    
    // Add top part (bodice)
    const topGeometry = new THREE.CylinderGeometry(1, 2, 1, 32);
    const topMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff1493,
        specular: 0xffffff,
        shininess: 100
    });
    
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.y = 2;
    scene.add(top);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        dress.rotation.y += 0.01;
        top.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const container = document.getElementById('model-container');
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    
    // Animation for elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease';
        observer.observe(card);
    });
});
// Add dynamic hover effects to navbar
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            gsap.to(link, { y: -5, duration: 0.3, ease: 'power1.out' });
        });
        
        link.addEventListener('mouseout', () => {
            gsap.to(link, { y: 0, duration: 0.3, ease: 'power1.out' });
        });
    });
});

// Handle color picker for dress customization
document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('color-picker');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            const color = new THREE.Color(e.target.value);
            const modelContainer = document.getElementById('model-container');
            const scene = modelContainer.scene;
            
            if (scene) {
                scene.traverse((object) => {
                    if (object.isMesh && object.material) {
                        object.material.color.set(color);
                    }
                });
            }
        });
    }
});

// Handle add to cart functionality
document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            // Get selected options
            const size = document.getElementById('size-select').value;
            const quantity = document.getElementById('quantity-select').value;
            const color = document.getElementById('color-picker').value;
            
            // Create cart item
            const cartItem = {
                id: Date.now(),
                product: 'Custom Dress',
                size,
                quantity,
                color,
                price: 149.99
            };
            
            // Add to cart in local storage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Show confirmation
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = 'Item added to cart!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 2000);
            }, 100);
            
            // Update cart count
            updateCartCount();
        });
    }
});

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
        
        if (cart.length > 0) {
            cartCount.classList.add('has-items');
        } else {
            cartCount.classList.remove('has-items');
        }
    }
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

// Handle user authentication
function login(email, password) {
    // Simple mock authentication for demo purposes
    // In a real app, this would be a server request
    if (email === 'demo@example.com' && password === 'password123') {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        window.location.href = 'index.html';
        return true;
    }
    return false;
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (login(email, password)) {
                // Successful login handled in login function
            } else {
                // Show error message
                const errorMsg = document.getElementById('error-message');
                errorMsg.textContent = 'Invalid email or password';
                errorMsg.style.display = 'block';
            }
        });
    }
});

// Handle logout
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userEmail');
            window.location.href = 'login.html';
        });
    }
});