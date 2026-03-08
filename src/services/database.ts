import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../firebase";

export interface BookingData {
    id?: string;
    userId: string;
    customerName: string;
    event: string;
    date: string;
    status: string;
    paid: boolean;
    createdAt: string;
}

// User Profile Services
export const getUserProfile = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
};

// Booking Services
export const createBooking = async (bookingData: Omit<BookingData, 'id' | 'createdAt'>) => {
    console.log("Creating booking in Firestore...", bookingData);
    try {
        const docRef = await addDoc(collection(db, "bookings"), {
            ...bookingData,
            createdAt: new Date().toISOString()
        });
        console.log("Booking successfully created with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Firestore Error in createBooking:", error);
        throw error;
    }
};

export const getUserBookings = async (userId: string) => {
    console.log("Fetching bookings for user from Firestore:", userId);
    try {
        const q = query(
            collection(db, "bookings"),
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookingData));
        console.log(`Successfully fetched ${data.length} bookings`);
        return data;
    } catch (error) {
        console.error("Firestore Error in getUserBookings:", error);
        throw error;
    }
};

export const getAllBookings = async () => {
    try {
        const q = query(collection(db, "bookings"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookingData));
    } catch (error) {
        console.error("Firestore Error in getAllBookings:", error);
        throw error;
    }
};

export const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
