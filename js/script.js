let myVar = "ma variable"
myVar = "variable changée"
const myVar2 = "ma variable 2"
const isTrue = true
const isFalse = false
const chiffre1 = 4
const chiffre2 = 3
const test = "test " + myVar + "value"
const test2 = `test ${myVar} dzqdqzd `
const array = ["item 1", "item 2", "item 3", "item 4"]

const obj = {
  title: "Mon titre",
  description: "Ma description",
}

const myFunction = (item, item2) => {}

myFunction("toto", 5)
myFunction("tata", 6)

const calcul = (nb1, nb2) => {
  return nb1 + nb1
}

const result = calcul(4, 5)

const div = document.createElement("div")
div.classList.add("top")
div.innerHTML = `<span>Top zone</span>`

function menuMobile() {
  const btn = document.querySelector(".burger")
  const header = document.querySelector(".header")
  const links = document.querySelectorAll(".navbar a")

  btn.addEventListener("click", () => {
    header.classList.toggle("show-nav")
  })

  links.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("show-nav")
    })
  })
}

menuMobile()

/* Porfolio */

function tabsFilters() {
  const tabs = document.querySelectorAll(".portfolio-filters a")
  const projets = document.querySelectorAll(".portfolio .card")

  const resetActiveLinks = () => {
    tabs.forEach((elem) => {
      elem.classList.remove("active")
    })
  }

  const showProjets = (elem) => {
    console.log(elem)
    projets.forEach((projet) => {
      const filter = projet.getAttribute("data-category")

      if (elem === "all") {
        projet.parentNode.classList.remove("hide")
        return
      }

      console.log("tutu")

      filter !== elem ? projet.parentNode.classList.add("hide") : projet.parentNode.classList.remove("hide")
    })
  }

  tabs.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      event.preventDefault()
      const filter = elem.getAttribute("data-filter")
      showProjets(filter)
      resetActiveLinks()
      elem.classList.add("active")
    })
  })
}

tabsFilters()

function disableBodyScroll() {
  document.body.style.overflow = "hidden"
}

function enableBodyScroll() {
  document.body.style.overflow = ""
}

// effets

const observerIntersectionAnimation = () => {
  const sections = document.querySelectorAll("section")
  const skills = document.querySelectorAll(".skills .bar")

  sections.forEach((section, index) => {
    if (index === 0) return
    section.style.opacity = "0"
    section.style.transition = "all 1.6s"
  })

  skills.forEach((elem, index) => {
    elem.style.width = "0"
    elem.style.transition = "all 1.6s"
  })

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const elem = entry.target
        elem.style.opacity = 1
      }
    })
  })

  sections.forEach((section) => {
    sectionObserver.observe(section)
  })

  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const elem = entry.target
        elem.style.width = elem.dataset.width + "%"
      }
    })
  })

  skills.forEach((skill) => {
    skillsObserver.observe(skill)
  })
}

observerIntersectionAnimation()

const toggleDarkMode = () => {
  const body = document.body
  const darkModeToggle = document.getElementById("dark-mode-toggle")
  const icon = darkModeToggle.querySelector("img");

  const isDarkMode = localStorage.getItem("dark-mode") === "true"

  if (isDarkMode) {
    body.classList.add("dark-mode")
    icon.src = "./img/light_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
  }

  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")
    const isDark = body.classList.contains("dark-mode")
    localStorage.setItem("dark-mode", isDark)

    icon.src = isDark ? "./img/light_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" : "./img/dark_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";  
  })
}

toggleDarkMode()

const handleContactForm = () => {
  const form = document.getElementById("contactForm")
  const successMessage = document.getElementById("successMessage")
  const submitBtn = document.getElementById("submitBtn")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const originalBtnContent = submitBtn.innerHTML
      submitBtn.innerHTML = "Envoi en cours..."
      submitBtn.disabled = true

      const formData = new FormData(form)
      const data = {}
      formData.forEach((value, key) => {
        data[key] = value
      })

      fetch("https://formsubmit.co/ajax/dybrilboudiaf14@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          form.reset()
          successMessage.style.display = "flex"
          submitBtn.innerHTML = "Envoyé !"

          setTimeout(() => {
            submitBtn.innerHTML = originalBtnContent
            submitBtn.disabled = false
          }, 3000)

          setTimeout(() => {
            successMessage.style.display = "none"
          }, 5000)
        })
        .catch((error) => {
          console.error("Error:", error)
          submitBtn.innerHTML = "Erreur, réessayez"
          submitBtn.disabled = false

          setTimeout(() => {
            submitBtn.innerHTML = originalBtnContent
          }, 3000)
        })
    })
  }
}

handleContactForm()

