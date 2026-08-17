/* ==========================================
   MUKESH MANPOWER - CLIENT DATABASE OPERATIONS
   File: firebase/db-clients.js
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

const CLIENTS_COLLECTION = "client_requirements";

// 1. Save New Client Requirement to Firestore
export async function saveClientRequirement(data) {
    try {
        const docRef = await addDoc(collection(db, CLIENTS_COLLECTION), {
            companyName: data.companyName || "",
            clientPhone: data.clientPhone || "",
            workerCount: Number(data.workerCount) || 1,
            workerCategory: data.workerCategory || "",
            workLocation: data.workLocation || "",
            requirementMessage: data.requirementMessage || "",
            status: "Pending",
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error saving client requirement:", error);
        return { success: false, error: error.message };
    }
}

// 2. Fetch All Client Requirements (For Admin Dashboard)
export async function fetchAllClientRequirements() {
    try {
        const q = query(collection(db, CLIENTS_COLLECTION), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const clients = [];
        querySnapshot.forEach((doc) => {
            clients.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: clients };
    } catch (error) {
        console.error("Error fetching client requirements:", error);
        return { success: false, error: error.message };
    }
}

