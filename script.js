


// 🌙 / ☀️ Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    if (body.classList.contains("light-theme")) {
      toggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "light");
    } else {
      toggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    }
  });

  window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      body.classList.add("light-theme");
      toggleBtn.textContent = "☀️";
    }
  });
}

/* ================================
   ✅ Registration Form
================================ */
document.addEventListener("DOMContentLoaded", () => {
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;
    const email = document.getElementById("reg-email").value;
    const birthdate = document.getElementById("reg-birthdate").value;

    // === Username validation ===
    if (username.length < 5 || username.length > 20) {
      alert("❌ Username must be between 5 and 20 characters.");
      return;
    }
    if (/\s/.test(username)) {
      alert("❌ Username cannot contain spaces.");
      return;
    }

    // === Email validation ===
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    // === Password match check ===
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    // === Password validation ===
    if (password.length < 7) {
      alert("❌ Password must be at least 7 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      alert("❌ Password must include at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      alert("❌ Password must include at least one lowercase letter.");
      return;
    }
    if (!/[0-9]/.test(password)) {
      alert("❌ Password must include at least one number.");
      return;
    }
    if (!/[!@#$%^&*()_\-+=<>?]/.test(password)) {
      alert("❌ Password must include at least one special character (!@#$%^&* etc.).");
      return;
    }
    if (/\s/.test(password)) {
      alert("❌ Password cannot contain spaces.");
      return;
    }



    // Age restriction check
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    if (age < 13) {
      alert("❌ You must be at least 13 years old to create an account.");
      return;
    }

    const termsChecked = document.getElementById("reg-terms").checked;

    if (!termsChecked) {
      alert("❌ You must agree to the Terms of Use and Privacy Policy to create an account.");
      return;
    }

    localStorage.setItem(
      "arcuser",
      JSON.stringify({
        username,
        password,
        email,
        birthdate,
        lastUsernameChange: null
      })
    );

    localStorage.setItem("loggedIn", "true");
    window.location.href = "legacy.html";
  });
}
});

// Save inputs
document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", () => {
    localStorage.setItem(el.id, el.value);
  });
});

// Restore inputs
window.addEventListener("load", () => {
  document.querySelectorAll("input, select").forEach(el => {
    if (localStorage.getItem(el.id)) {
      el.value = localStorage.getItem(el.id);
    }
  });
});

/* ================================
   ✅ Login Form
================================ */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const storedUser = JSON.parse(localStorage.getItem("arcuser"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "legacy.html";
    } else {
      alert("❌ Invalid ArcID or password");
    }
  });
}

/* ================================
   ✅ Populate Profile/Legacy Page
================================ */
const storedUser = JSON.parse(localStorage.getItem("arcuser"));
const loggedIn = localStorage.getItem("loggedIn");

if (storedUser && loggedIn === "true") {
  const usernameDisplay = document.getElementById("displayusername");
  const emailDisplay = document.getElementById("displayemail");
  const bioDisplay = document.getElementById("displaybio");

  if (usernameDisplay) usernameDisplay.textContent = storedUser.username;
  if (emailDisplay) emailDisplay.textContent = storedUser.email;
  if (bioDisplay) bioDisplay.textContent = storedUser.bio || "";
}

/* ================================
   ✅ Auth Guard
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const storedUserAuth = JSON.parse(localStorage.getItem("arcuser"));
  const loggedInAuth = localStorage.getItem("loggedIn");

  const loginBox = document.getElementById("loginBox");
  const profileBox = document.getElementById("profileBox");
  const welcomeMsg = document.getElementById("welcomeMsg");

  if (storedUserAuth && loggedInAuth === "true") {
    if (loginBox) loginBox.style.display = "none";
    if (profileBox) profileBox.style.display = "block";
    if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${storedUserAuth.username}`;
  } else {
    if (loginBox) loginBox.style.display = "block";
    if (profileBox) profileBox.style.display = "none";
  }
});

/* ================================
   ✅ Edit Profile Button
================================ */
const editProfileBtn = document.getElementById("editProfileBtn");
if (editProfileBtn) {
  editProfileBtn.addEventListener("click", () => {
    window.location.href = "edit-profile.html";
  });
}

/* ================================
   ✅ Edit Profile Page
================================ */
const editForm = document.getElementById("editProfileForm");
if (editForm) {
  const storedUserEdit = JSON.parse(localStorage.getItem("arcuser"));

  const usernameInput = document.getElementById("edit-username");
  const emailInput = document.getElementById("edit-email");
  const bioInput = document.getElementById("edit-bio");
  const passwordInput = document.getElementById("edit-password");

  if (storedUserEdit) {
    usernameInput.value = storedUserEdit.username || "";
    emailInput.value = storedUserEdit.email || "";
    bioInput.value = storedUserEdit.bio || "";
  }

  // Check ArcID cooldown
  if (storedUserEdit.lastUsernameChange) {
    const lastChange = new Date(storedUserEdit.lastUsernameChange);
    const now = new Date();
    const daysSince = Math.floor((now - lastChange) / (1000 * 60 * 60 * 24));

    if (daysSince < 180) {
      usernameInput.disabled = true;
      const msg = document.createElement("p");
      msg.textContent = `⏳ You can change your ArcID again in ${180 - daysSince} days.`;
      msg.style.color = "red";
      usernameInput.insertAdjacentElement("afterend", msg);
    }
  }

  editForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const now = new Date();
    const updatedUser = {
      username: usernameInput.value,
      email: emailInput.value,
      bio: bioInput.value,
      password: storedUserEdit.password,
      lastUsernameChange: storedUserEdit.lastUsernameChange || null
    };

    // ArcID change lock
    if (updatedUser.username !== storedUserEdit.username) {
      if (storedUserEdit.lastUsernameChange) {
        const lastChange = new Date(storedUserEdit.lastUsernameChange);
        const daysSince = Math.floor((now - lastChange) / (1000 * 60 * 60 * 24));

        if (daysSince < 180) {
          alert(
            `❌ You can only change your ArcID once every 180 days.\n` +
            `Try again in ${180 - daysSince} days.`
          );
          return;
        }
      }
      updatedUser.lastUsernameChange = now.toISOString();
    }

    // Password update
    if (passwordInput.value.trim() !== "") {
      updatedUser.password = passwordInput.value;
    }

    localStorage.setItem("arcuser", JSON.stringify(updatedUser));
    alert("✅ Profile updated!");
    window.location.href = "profile.html";
  });
}

/* ================================
   ✅ Logout Button
================================ */
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "profile.html";
  });
}

/* ================================
   ✅ Delete Account Button
================================ */
const deleteAccountBtn = document.getElementById("deleteAccountBtn");
if (deleteAccountBtn) {
  deleteAccountBtn.addEventListener("click", () => {
    const confirmDelete = confirm("⚠️ Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      localStorage.removeItem("arcuser");
      localStorage.removeItem("loggedIn");
      alert("✅ Your account has been deleted.");
      window.location.href = "profile.html";
    }
  });
}

/* ================================
    ✅ Back to Top + Back to Register
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTop");
  const backToRegisterBtn = document.getElementById("backToRegister");

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (backToRegisterBtn) {
    backToRegisterBtn.addEventListener("click", () => {
      window.location.href = "register.html";
    });
  }
});

/* ================================
   ✅ Terms and Privacy Modal
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalFrame = document.getElementById("modalFrame");
  const closeModal = document.getElementById("closeModal");

  document.getElementById("openTerms").addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
    modalFrame.src = "terms.html";
  });

  document.getElementById("openPrivacy").addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
    modalFrame.src = "privacy.html";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    modalFrame.src = "";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalFrame.src = "";
    }
  });
});

/* ================================
   ✅ Mobile Product Card Overlay (Tap-to-open)
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach(card => {

    // Toggle open/close on tap
    card.addEventListener("click", (event) => {
      // Prevent clicks on the button inside from closing the card
      if (event.target.tagName === "BUTTON") return;

      card.classList.toggle("open");
    });
  });

  // Optional: tap outside any open card closes all
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".product-card")) {
      document.querySelectorAll(".product-card.open")
        .forEach(c => c.classList.remove("open"));
    }
  });

});
























