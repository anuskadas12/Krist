// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Profile dropdown functionality
    const profileBtn = document.getElementById("profileBtn")
    const userInfo = document.getElementById("userInfo")
  
    if (profileBtn && userInfo) {
      profileBtn.addEventListener("click", () => {
        userInfo.classList.toggle("active")
      })
  
      // Close dropdown when clicking outside
      document.addEventListener("click", (event) => {
        if (!profileBtn.contains(event.target) && !userInfo.contains(event.target)) {
          userInfo.classList.remove("active")
        }
      })
    }
  
    // Size buttons functionality
    const sizeButtons = document.querySelectorAll(".size-btn")
  
    sizeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Toggle active class on the clicked button
        this.classList.toggle("active")
      })
    })
  
    // Product action buttons hover effect
    const productCards = document.querySelectorAll(".product-card")
  
    productCards.forEach((card) => {
      const actionButtons = card.querySelectorAll(".action-btn")
  
      actionButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
          e.preventDefault()
  
          // Add to cart functionality
          if (this.querySelector("svg path").getAttribute("d").includes('circle cx="9" cy="21"')) {
            alert("Product added to cart!")
          }
  
          // Add to wishlist functionality
          if (this.querySelector("svg path").getAttribute("d").includes("M20.84 4.61")) {
            this.classList.toggle("liked")
            if (this.classList.contains("liked")) {
              this.querySelector("svg").style.fill = "#ff4444"
              this.querySelector("svg").style.stroke = "#ff4444"
            } else {
              this.querySelector("svg").style.fill = "none"
              this.querySelector("svg").style.stroke = "currentColor"
            }
          }
  
          // Quick view functionality
          if (this.querySelector('svg circle[cx="11"]')) {
            alert("Quick view coming soon!")
          }
        })
      })
    })
  
    // Pagination functionality
    const pageButtons = document.querySelectorAll(".page-btn:not(.next)")
  
    pageButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        pageButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // Here you would typically fetch products for the selected page
        // For demo purposes, we'll just scroll to top
        window.scrollTo({
          top: document.querySelector(".products-section").offsetTop - 100,
          behavior: "smooth",
        })
      })
    })
  
    // Filter and sort functionality
    const categoryFilter = document.getElementById("category-filter")
    const priceFilter = document.getElementById("price-filter")
    const sortOptions = document.getElementById("sort-options")
  
    // Add event listeners to filters and sort options
    ;[categoryFilter, priceFilter, sortOptions].forEach((element) => {
      if (element) {
        element.addEventListener("change", () => {
          // Here you would typically filter and sort products
          // For demo purposes, we'll just log the selected values
          console.log("Category:", categoryFilter.value)
          console.log("Price Range:", priceFilter.value)
          console.log("Sort By:", sortOptions.value)
  
          // Simulate loading
          const productsGrid = document.querySelector(".products-grid")
          productsGrid.style.opacity = "0.5"
  
          setTimeout(() => {
            productsGrid.style.opacity = "1"
          }, 500)
        })
      }
    })
  
    // Newsletter form submission
    const newsletterForm = document.querySelector(".newsletter-form")
  
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault()
        const emailInput = this.querySelector('input[type="email"]')
  
        if (emailInput.value) {
          alert("Thank you for subscribing to our newsletter!")
          emailInput.value = ""
        }
      })
    }
  })
  
  // Logout functionality
  function handleLogout() {
    // Here you would typically handle the logout process
    alert("You have been logged out.")
  
    // Hide the user info dropdown
    const userInfo = document.getElementById("userInfo")
    if (userInfo) {
      userInfo.classList.remove("active")
    }
  }
  