/* ============================================
   BTM LANDING PAGE JAVASCRIPT
   Blue-throated Macaw - Barba Azul Reserve
   
   Features:
   - Scroll animations (fade in on scroll)
   - Typewriter effect for hero title
   - Number counter animation for stats
   - Smooth scroll behavior
   - Intersection Observer for lazy animations
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================
       SCROLL ANIMATIONS
       Fade in elements as they enter viewport
    ============================================ */
  const btmAnimatedElements = document.querySelectorAll(
    ".btm-glass-card, .btm-stat-card, .btm-donation-card, " +
      ".btm-support-image-container, .btm-action-image-container, " +
      ".btm-section-header, .btm-video-wrapper, .btm-connect-link",
  )

  // Add initial animation class
  btmAnimatedElements.forEach((el, index) => {
    el.classList.add("btm-fade-in-up")
    // Add staggered delay based on index within its section
    const delayClass = `btm-delay-${(index % 4) + 1}`
    el.classList.add(delayClass)
  })

  // Intersection Observer for scroll animations
  const btmObserverOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1,
  }

  const btmAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("btm-visible")
        // Optionally stop observing after animation
        // btmAnimationObserver.unobserve(entry.target);
      }
    })
  }, btmObserverOptions)

  btmAnimatedElements.forEach((el) => {
    btmAnimationObserver.observe(el)
  })

  /* ============================================
       TYPEWRITER EFFECT
       For hero title text
    ============================================ */
  const btmTypewriterElement = document.querySelector(".btm-typewriter")

  if (btmTypewriterElement) {
    const btmOriginalText = btmTypewriterElement.getAttribute("data-text") || btmTypewriterElement.textContent

    // Reset and animate
    function btmStartTypewriter() {
      btmTypewriterElement.textContent = ""
      btmTypewriterElement.style.width = "0"

      let btmCharIndex = 0
      const btmTypeSpeed = 80 // milliseconds per character

      function btmTypeChar() {
        if (btmCharIndex < btmOriginalText.length) {
          btmTypewriterElement.textContent += btmOriginalText.charAt(btmCharIndex)
          btmCharIndex++
          setTimeout(btmTypeChar, btmTypeSpeed)
        }
      }

      // Start typing after a short delay
      setTimeout(btmTypeChar, 500)
    }

    // Start typewriter effect when page loads
    btmStartTypewriter()
  }

  /* ============================================
       NUMBER COUNTER ANIMATION
       For statistics section
    ============================================ */
  const btmStatNumbers = document.querySelectorAll(".btm-stat-number")

  function btmAnimateCounter(element) {
    const btmText = element.textContent
    const btmMatch = btmText.match(/[\d,]+/)

    if (!btmMatch) return

    const btmTargetNumber = Number.parseInt(btmMatch[0].replace(/,/g, ""))
    const btmSuffix = btmText.replace(btmMatch[0], "")
    const btmDuration = 2000 // 2 seconds
    const btmFrameRate = 60
    const btmTotalFrames = btmDuration / (1000 / btmFrameRate)
    const btmIncrement = btmTargetNumber / btmTotalFrames

    let btmCurrentNumber = 0
    let btmFrame = 0

    function btmUpdateCounter() {
      btmFrame++
      btmCurrentNumber = Math.min(Math.round(btmIncrement * btmFrame), btmTargetNumber)

      // Format number with commas
      const btmFormattedNumber = btmCurrentNumber.toLocaleString()
      element.innerHTML = btmFormattedNumber + btmSuffix

      if (btmFrame < btmTotalFrames) {
        requestAnimationFrame(btmUpdateCounter)
      }
    }

    btmUpdateCounter()
  }

  // Observe stat numbers for counter animation
  const btmCounterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          btmAnimateCounter(entry.target)
          btmCounterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  btmStatNumbers.forEach((el) => {
    btmCounterObserver.observe(el)
  })

  /* ============================================
       STATS CAROUSEL DOTS (MOBILE)
       Sync dots with visible stat card and allow tapping
    ============================================ */
  const btmStatsGrid = document.querySelector(".btm-stats-grid")
  const btmStatsCards = document.querySelectorAll(".btm-stat-card")
  const btmStatsDots = document.querySelectorAll(".btm-stats-dot")

  function btmSetActiveDot(index) {
    btmStatsDots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("btm-stats-dot--active")
      } else {
        dot.classList.remove("btm-stats-dot--active")
      }
    })
  }

  if (btmStatsGrid && btmStatsCards.length && btmStatsDots.length) {
    // Observe which card is centered in the horizontal scroll (mainly on mobile)
    const btmStatsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(btmStatsCards).indexOf(entry.target)
            if (index >= 0) {
              btmSetActiveDot(index)
            }
          }
        })
      },
      {
        root: btmStatsGrid,
        threshold: 0.6,
      },
    )

    btmStatsCards.forEach((card) => btmStatsObserver.observe(card))

    // Allow tapping dots to jump to a specific card
    btmStatsDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        const card = btmStatsCards[index]
        if (card) {
          card.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          })
        }
      })
    })
  }

  /* ============================================
       SMOOTH SCROLL FOR ANCHOR LINKS
    ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach((btmAnchor) => {
    btmAnchor.addEventListener("click", function (e) {
      const btmTargetId = this.getAttribute("href")

      if (btmTargetId === "#") return

      const btmTargetElement = document.querySelector(btmTargetId)

      if (btmTargetElement) {
        e.preventDefault()
        btmTargetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  /* ============================================
       CTA BUTTON HOVER EFFECTS
       Enhanced interactivity
    ============================================ */
  const btmCtaButtons = document.querySelectorAll(".btm-cta-button")

  btmCtaButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.02)"
    })

    btn.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })

  /* ============================================
       PARALLAX EFFECT FOR HERO BACKGROUND
       Subtle movement on scroll
    ============================================ */
  const btmHeroBgImage = document.querySelector(".btm-hero-bg-image")

  if (btmHeroBgImage) {
    window.addEventListener("scroll", () => {
      const btmScrolled = window.pageYOffset
      const btmParallaxSpeed = 0.3

      // Only apply parallax in hero section
      if (btmScrolled < window.innerHeight) {
        btmHeroBgImage.style.transform = `translateY(${btmScrolled * btmParallaxSpeed}px)`
      }
    })
  }

  /* ============================================
       CONNECT ICONS TOOLTIP
       Show title on hover (optional enhancement)
    ============================================ */
  const btmConnectLinks = document.querySelectorAll(".btm-connect-link")

  btmConnectLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const btmTitle = this.getAttribute("title")
      // Could add custom tooltip here if needed
    })
  })

  /* ============================================
       DONATION STEPS PROGRESS
       Circles fill as you scroll through the list
    ============================================ */
  const btmDonationSteps = document.querySelectorAll(".btm-donation-step")

  if (btmDonationSteps.length) {
    function btmSetDonationProgress(activeIndex) {
      btmDonationSteps.forEach((step, index) => {
        step.classList.toggle("btm-donation-step--active", index === activeIndex)
        step.classList.toggle("btm-donation-step--completed", index < activeIndex)
      })
    }

    const btmDonationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(btmDonationSteps).indexOf(entry.target)
            if (index >= 0) {
              btmSetDonationProgress(index)
            }
          }
        })
      },
      {
        root: null,
        threshold: 0.4,
      },
    )

    btmDonationSteps.forEach((step) => btmDonationObserver.observe(step))

    // Inicial: marcar el primer paso como activo
    btmSetDonationProgress(0)
  }

  /* ============================================
       VIDEO LAZY LOADING
       Load video only when in viewport
    ============================================ */
  const btmVideoIframe = document.querySelector(".btm-video-iframe")

  if (btmVideoIframe) {
    const btmVideoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video src is already set, but we could lazy load here
            const btmSrc = btmVideoIframe.getAttribute("src")
            if (btmSrc && btmSrc.includes("autoplay=0")) {
              btmVideoIframe.setAttribute("src", btmSrc.replace("autoplay=0", "autoplay=1"))
            }
            btmVideoObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )

    btmVideoObserver.observe(btmVideoIframe)
  }

  /* ============================================
       ACCESSIBILITY: Reduced Motion Support
    ============================================ */
  const btmPrefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (btmPrefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll(".btm-fade-in-up").forEach((el) => {
      el.classList.add("btm-visible")
      el.style.transition = "none"
    })

    // Stop typewriter animation
    const btmTypewriter = document.querySelector(".btm-typewriter")
    if (btmTypewriter) {
      btmTypewriter.style.animation = "none"
      btmTypewriter.style.borderRight = "none"
    }
  }

  /* ============================================
       DEBUG LOG (remove in production)
    ============================================ */
  console.log("[BTM] Landing page initialized successfully")
})
