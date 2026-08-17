/* ==========================================
   MUKESH MANPOWER - WORKER DATABASE OPERATIONS
   File: firebase/db-workers.js
   ========================================== */

import { db } from "./firebase-config.js";
import { 
    collection, 
    addDoc, 
    getDocs, 
    orderBy, 
    query, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const WORKERS_COLLECTION = "worker_registrations";

// 1. Save New Worker Registration to Firestore
export async function saveWorkerRegistration(data) {
    try {
        const docRef = await addDoc(collection(db, WORKERS_COLLECTION), {
            workerName: data.workerName || "",
            workerMobile: data.workerMobile || "",
            workerLocation: data.workerLocation || "",
            workerSkill: data.workerSkill || "",
            workerExperience: data.workerExperience || "",
            workerAge: Number(data.workerAge) || null,
            workerMessage: data.workerMessage || "",
            status: "Verified",
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error saving worker registration:", error);
        return { success: false, error: error.message };
    }
}

// 2. Fetch All Worker Registrations (For Admin Dashboard)
export async function fetchAllWorkerRegistrations() {
    try {
        const q = query(collection(db, WORKERS_COLLECTION), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const workers = [];
        querySnapshot.forEach((doc) => {
            workers.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: workers };
    } catch (error) {
        console.error("Error fetching worker registrations:", error);
        return { success: false, error: error.message };
    }
    }

