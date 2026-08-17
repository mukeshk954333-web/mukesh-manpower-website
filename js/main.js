/* ==========================================
   MUKESH MANPOWER - GLOBAL JAVASCRIPT
   File: js/main.js
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                if (menuIcon) menuIcon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                mobileMenu.classList.add('hidden');
                if (menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if (menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // 2. Client Requirement Form -> WhatsApp Submission
    const clientForm = document.getElementById("clientRequirementForm");
    if (clientForm) {
        clientForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const company = document.getElementById("companyName")?.value.trim() || "";
            const phone = document.getElementById("clientPhone")?.value.trim() || "";
            const count = document.getElementById("workerCount")?.value.trim() || "";
            const category = document.getElementById("workerCategory")?.value || "";
            const location = document.getElementById("workLocation")?.value.trim() || "";
            const msg = document.getElementById("requirementMessage")?.value.trim() || "";

            const waText = `*MUKESH MANPOWER - नई क्लाइंट रिक्वायरमेंट*%0A` +
                `🏢 *कंपनी/नाम:* ${company}%0A` +
                `📞 *फोन:* ${phone}%0A` +
                `👥 *वर्कर्स संख्या:* ${count}%0A` +
                `🗂️ *कैटेगरी:* ${category}%0A` +
                `📍 *लोकेशन:* ${location}%0A` +
                `📝 *विवरण:* ${msg || "कोई नहीं"}`;

            window.open(`https://wa.me/916379403821?text=${waText}`, "_blank");
        });
    }

    // 3. Worker Registration Form -> WhatsApp Submission
    const workerForm = document.getElementById("workerRegistrationForm");
    if (workerForm) {
        workerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("workerName")?.value.trim() || "";
            const phone = document.getElementById("workerMobile")?.value.trim() || "";
            const skill = document.getElementById("workerSkill")?.value || "";
            const location = document.getElementById("workerLocation")?.value.trim() || "";
            const exp = document.getElementById("workerExperience")?.value || "";
            const age = document.getElementById("workerAge")?.value.trim() || "";
            const msg = document.getElementById("workerMessage")?.value.trim() || "";

            const waText = `*MUKESH MANPOWER - कामगार पंजीकरण (Job)*%0A` +
                `👤 *नाम:* ${name}%0A` +
                `📞 *फोन:* ${phone}%0A` +
                `🛠️ *काम/Skill:* ${skill}%0A` +
                `📍 *पता:* ${location}%0A` +
                `⏳ *अनुभव:* ${exp || "लागू नहीं"}%0A` +
                `🎂 *उम्र:* ${age || "लागू नहीं"}%0A` +
                `📝 *अन्य विवरण:* ${msg || "कोई नहीं"}`;

            window.open(`https://wa.me/916379403821?text=${waText}`, "_blank");
        });
    }
});
              
