/* ==========================================
   MUKESH MANPOWER - Client Requirement Automation
   File: js/client-requirement.js
   ========================================== */

const statePricing = {
    "Delhi": { helper: 1000, skilled: 1250, operator: 1650 },
    "Haryana": { helper: 1000, skilled: 1250, operator: 1650 },
    "Punjab": { helper: 875, skilled: 1185, operator: 1500 },
    "UttarPradesh": { helper: 875, skilled: 1185, operator: 1500 },
    "Rajasthan": { helper: 875, skilled: 1125, operator: 1500 },
    "Uttarakhand": { helper: 875, skilled: 1125, operator: 1500 },
    "HimachalPradesh": { helper: 875, skilled: 1125, operator: 1500 },
    "JammuKashmir": { helper: 875, skilled: 1125, operator: 1500 },
    "Karnataka": { helper: 1250, skilled: 1750, operator: 2000 },
    "TamilNadu": { helper: 1065, skilled: 1435, operator: 1750 },
    "Telangana": { helper: 1065, skilled: 1435, operator: 1750 },
    "Kerala": { helper: 1250, skilled: 1750, operator: 2000 },
    "AndhraPradesh": { helper: 940, skilled: 1250, operator: 1625 },
    "Maharashtra": { helper: 1065, skilled: 1500, operator: 1875 },
    "Gujarat": { helper: 1000, skilled: 1315, operator: 1690 },
    "Goa": { helper: 1000, skilled: 1315, operator: 1690 },
    "Bihar": { helper: 875, skilled: 1125, operator: 1500 },
    "Jharkhand": { helper: 875, skilled: 1125, operator: 1500 },
    "WestBengal": { helper: 875, skilled: 1185, operator: 1500 },
    "Odisha": { helper: 875, skilled: 1125, operator: 1500 },
    "MadhyaPradesh": { helper: 875, skilled: 1125, operator: 1500 },
    "Chhattisgarh": { helper: 875, skilled: 1125, operator: 1500 },
    "Assam": { helper: 875, skilled: 1185, operator: 1500 },
    "OtherUT": { helper: 1000, skilled: 1300, operator: 1650 }
};

document.addEventListener("DOMContentLoaded", function () {
    const stateSelect = document.getElementById("stateSelect");
    const helperRateInput = document.getElementById("helperRate");
    const skilledRateInput = document.getElementById("skilledRate");
    const operatorRateInput = document.getElementById("operatorRate");

    const helperCountInput = document.getElementById("helperCount");
    const skilledCountInput = document.getElementById("skilledCount");
    const operatorCountInput = document.getElementById("operatorCount");

    const form = document.getElementById("allIndiaClientForm");
    const submitBtn = document.getElementById("submitBtn");
    const btnText = document.getElementById("btnText");

    function updateRates() {
        const selectedState = stateSelect.value;
        if (selectedState && statePricing[selectedState]) {
            helperRateInput.value = statePricing[selectedState].helper;
            skilledRateInput.value = statePricing[selectedState].skilled;
            operatorRateInput.value = statePricing[selectedState].operator;
        } else {
            helperRateInput.value = "";
            skilledRateInput.value = "";
            operatorRateInput.value = "";
        }
        calculateQuotation();
    }

    function calculateQuotation() {
        const hCount = Math.max(0, parseInt(helperCountInput.value, 10) || 0);
        const sCount = Math.max(0, parseInt(skilledCountInput.value, 10) || 0);
        const oCount = Math.max(0, parseInt(operatorCountInput.value, 10) || 0);

        const hRate = parseFloat(helperRateInput.value) || 0;
        const sRate = parseFloat(skilledRateInput.value) || 0;
        const oRate = parseFloat(operatorRateInput.value) || 0;

        const hTotal = hCount * hRate;
        const sTotal = sCount * sRate;
        const oTotal = oCount * oRate;

        const totalWorkers = hCount + sCount + oCount;
        const subtotal = hTotal + sTotal + oTotal;

        document.getElementById("summaryTotalWorkers").textContent = totalWorkers;
        document.getElementById("summaryHelperRow").textContent = `${hCount} × ₹${hRate.toLocaleString('en-IN')} = ₹${hTotal.toLocaleString('en-IN')}`;
        document.getElementById("summarySkilledRow").textContent = `${sCount} × ₹${sRate.toLocaleString('en-IN')} = ₹${sTotal.toLocaleString('en-IN')}`;
        document.getElementById("summaryOperatorRow").textContent = `${oCount} × ₹${oRate.toLocaleString('en-IN')} = ₹${oTotal.toLocaleString('en-IN')}`;
        document.getElementById("summarySubtotal").textContent = `₹${subtotal.toLocaleString('en-IN')}`;

        return { hCount, sCount, oCount, hRate, sRate, oRate, hTotal, sTotal, oTotal, totalWorkers, subtotal };
    }

    function validateForm() {
        let isValid = true;
        const state = stateSelect.value;
        const company = document.getElementById("companyName").value.trim();
        const contactPerson = document.getElementById("contactPerson").value.trim();
        const phone = document.getElementById("clientPhone").value.trim();
        const address = document.getElementById("siteAddress").value.trim();
        const consent = document.getElementById("agreementConsent").checked;

        const phoneRegex = /^[6-9]\d{9}$/;

        document.querySelectorAll(".error-msg").forEach(el => el.style.display = "none");
        document.querySelectorAll("input, select").forEach(el => el.classList.remove("input-error"));

        if (!state) {
            document.getElementById("stateError").style.display = "block";
            stateSelect.classList.add("input-error");
            isValid = false;
        }

        if (!company) {
            document.getElementById("companyError").style.display = "block";
            document.getElementById("companyName").classList.add("input-error");
            isValid = false;
        }

        if (!contactPerson) {
            document.getElementById("contactPersonError").style.display = "block";
            document.getElementById("contactPerson").classList.add("input-error");
            isValid = false;
        }

        if (!phoneRegex.test(phone)) {
            document.getElementById("phoneError").style.display = "block";
            document.getElementById("clientPhone").classList.add("input-error");
            isValid = false;
        }

        if (!address) {
            document.getElementById("addressError").style.display = "block";
            document.getElementById("siteAddress").classList.add("input-error");
            isValid = false;
        }

        const calc = calculateQuotation();
        if (calc.totalWorkers < 1) {
            document.getElementById("workerCountError").style.display = "block";
            isValid = false;
        }

        if (!consent) {
            document.getElementById("consentError").style.display = "block";
            isValid = false;
        }

        return isValid;
    }

    function generateRequirementId() {
        const date = new Date();
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(1000 + Math.random() * 9000);
        return `MM-${yyyy}${mm}${dd}-${random}`;
    }

    function buildWhatsAppMessage(data) {
        const rawMsg = `📋 *MUKESH MANPOWER*\n*NEW MANPOWER REQUIREMENT*\n\n` +
            `*Requirement ID:* ${data.requirementId}\n` +
            `*Company:* ${data.companyName}\n` +
            `*Contact Person:* ${data.contactPerson}\n` +
            `*Mobile:* ${data.clientPhone}\n` +
            `*State:* ${data.state}\n` +
            `*Site Address:* ${data.siteAddress}\n\n` +
            `--------------------------------\n` +
            `*MANPOWER BREAKDOWN*\n` +
            `--------------------------------\n` +
            `*Helper:* ${data.helperCount} × ₹${data.helperRate} = ₹${data.helperTotal.toLocaleString('en-IN')}\n` +
            `*Skilled:* ${data.skilledCount} × ₹${data.skilledRate} = ₹${data.skilledTotal.toLocaleString('en-IN')}\n` +
            `*Operator:* ${data.operatorCount} × ₹${data.operatorRate} = ₹${data.operatorTotal.toLocaleString('en-IN')}\n\n` +
            `*Total Workers:* ${data.totalWorkers}\n` +
            `*Estimated Daily Billing:* ₹${data.dailySubtotal.toLocaleString('en-IN')}\n` +
            `*GST:* Applicable as per law\n` +
            `*Payment Preference:* ${data.paymentCycle}\n` +
            `*Facility:* ${data.facility}\n` +
            `*Additional Note:* ${data.requirementMessage || 'None'}\n\n` +
            `--------------------------------\n` +
            `*Consent:* Confirmed (Contact Authorized)\n\n` +
            `*MUKESH MANPOWER*\n_Right People. Right Place. Right Time._`;

        return encodeURIComponent(rawMsg);
    }

    function saveRequirement(data) {
        try {
            const existing = JSON.parse(localStorage.getItem("mm_requirements") || "[]");
            existing.push(data);
            localStorage.setItem("mm_requirements", JSON.stringify(existing));
        } catch (err) {
            console.warn("Local storage backup skipped:", err);
        }
    }

    function showSuccessMessage(reqId, waEncodedMsg) {
        document.getElementById("formCard").classList.add("hidden");
        const successBox = document.getElementById("successBox");
        document.getElementById("displayReqId").textContent = reqId;
        document.getElementById("waDirectBtn").href = `https://wa.me/916379403821?text=${waEncodedMsg}`;
        successBox.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function resetForm() {
        form.reset();
        updateRates();
        document.getElementById("successBox").classList.add("hidden");
        document.getElementById("formCard").classList.remove("hidden");
        submitBtn.disabled = false;
        btnText.textContent = "Requirement एवं कोटेशन सबमिट करें";
    }

    stateSelect.addEventListener("change", updateRates);
    [helperCountInput, skilledCountInput, operatorCountInput].forEach(input => {
        input.addEventListener("input", calculateQuotation);
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!validateForm()) return;

        submitBtn.disabled = true;
        btnText.textContent = "Requirement तैयार हो रही है...";

        const calc = calculateQuotation();
        const reqId = generateRequirementId();
        const stateText = stateSelect.options[stateSelect.selectedIndex].text;

        const payload = {
            requirementId: reqId,
            companyName: document.getElementById("companyName").value.trim(),
            contactPerson: document.getElementById("contactPerson").value.trim(),
            clientPhone: document.getElementById("clientPhone").value.trim(),
            state: stateText,
            siteAddress: document.getElementById("siteAddress").value.trim(),
            helperCount: calc.hCount,
            helperRate: calc.hRate,
            helperTotal: calc.hTotal,
            skilledCount: calc.sCount,
            skilledRate: calc.sRate,
            skilledTotal: calc.sTotal,
            operatorCount: calc.oCount,
            operatorRate: calc.oRate,
            operatorTotal: calc.oTotal,
            totalWorkers: calc.totalWorkers,
            dailySubtotal: calc.subtotal,
            paymentCycle: document.getElementById("paymentCycle").value,
            facility: document.getElementById("facility").value,
            requirementMessage: document.getElementById("requirementMessage").value.trim(),
            createdAt: new Date().toISOString()
        };

        saveRequirement(payload);
        const waEncoded = buildWhatsAppMessage(payload);
        window.open(`https://wa.me/916379403821?text=${waEncoded}`, "_blank");
        showSuccessMessage(reqId, waEncoded);
    });

    document.getElementById("newReqBtn").addEventListener("click", resetForm);
});
          
