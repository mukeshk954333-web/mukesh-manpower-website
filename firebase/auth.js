/* ==========================================
   MUKESH MANPOWER - AUTHENTICATION MODULE
   File: firebase/auth.js
   ========================================== */

import { auth } from "./firebase-config.js";
import { 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 1. Admin Login Function
export async function loginAdmin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// 2. Admin Logout Function
export async function logoutAdmin() {
    try {
        await signOut(auth);
        window.location.href = "login.html";
    } catch (error) {
        console.error("Logout Error:", error);
    }
}

// 3. Protect Admin Pages (Session Check)
export function checkAdminSession() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // अगर एडमिन लॉगिन नहीं है, तो लॉगिन पेज पर भेजें
            window.location.href = "login.html";
        }
    });
}

