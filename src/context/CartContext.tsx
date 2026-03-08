import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { collection, doc, onSnapshot, setDoc, deleteDoc, updateDoc, getDocs } from 'firebase/firestore';

export interface CartItem {
    id: string;
    title: string;
    price: number;         // numeric rupee value
    priceLabel: string;    // formatted "₹ XX,XXX"
    image: string;
    category: 'service' | 'package';
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, qty: number) => void;
    clearCart: () => void;
    totalCount: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        if (!user) {
            setItems([]);
            return;
        }

        const cartRef = collection(db, 'users', user.uid, 'cart');
        const unsubscribe = onSnapshot(cartRef, (snapshot) => {
            const fetchedItems: CartItem[] = [];
            snapshot.forEach(docSnap => {
                fetchedItems.push(docSnap.data() as CartItem);
            });
            setItems(fetchedItems);
        });

        return () => unsubscribe();
    }, [user]);

    const addItem = async (item: Omit<CartItem, 'quantity'>) => {
        if (!user) return; // Cart is restricted to logged-in users

        const cartItemRef = doc(db, 'users', user.uid, 'cart', item.id);
        const existing = items.find(i => i.id === item.id);

        if (existing) {
            await updateDoc(cartItemRef, { quantity: existing.quantity + 1 });
        } else {
            const newItem: CartItem = { ...item, quantity: 1 };
            await setDoc(cartItemRef, newItem);
        }
    };

    const removeItem = async (id: string) => {
        if (!user) return;
        const cartItemRef = doc(db, 'users', user.uid, 'cart', id);
        await deleteDoc(cartItemRef);
    };

    const updateQuantity = async (id: string, qty: number) => {
        if (!user || qty < 1) return;
        const cartItemRef = doc(db, 'users', user.uid, 'cart', id);
        await updateDoc(cartItemRef, { quantity: qty });
    };

    const clearCart = async () => {
        if (!user) return;
        const cartRef = collection(db, 'users', user.uid, 'cart');
        const snapshot = await getDocs(cartRef);
        snapshot.forEach(async (docSnap) => {
            await deleteDoc(doc(db, 'users', user.uid, 'cart', docSnap.id));
        });
        setItems([]);
    };

    const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
};
