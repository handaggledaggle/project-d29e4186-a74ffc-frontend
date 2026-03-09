"use client";

import * as React from "react";
import type { ID } from "@/types";

export type CartLine = {
  artworkId: ID;
  title?: string;
  thumbnailUrl?: string;
  unitPrice?: number;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
};

type CartActions = {
  add: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  remove: (artworkId: ID) => void;
  setQuantity: (artworkId: ID, quantity: number) => void;
  clear: () => void;
};

const CartContext = React.createContext<(CartState & CartActions) | null>(null);

function reducer(state: CartState, action:
  | { type: "ADD"; line: Omit<CartLine, "quantity"> & { quantity: number } }
  | { type: "REMOVE"; artworkId: ID }
  | { type: "SET_QTY"; artworkId: ID; quantity: number }
  | { type: "CLEAR" }
): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.lines.find((l) => l.artworkId === action.line.artworkId);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.artworkId === action.line.artworkId
              ? { ...l, quantity: l.quantity + action.line.quantity }
              : l
          ),
        };
      }
      return { lines: [...state.lines, action.line] };
    }
    case "REMOVE":
      return { lines: state.lines.filter((l) => l.artworkId !== action.artworkId) };
    case "SET_QTY": {
      const quantity = Math.max(0, Math.floor(action.quantity));
      if (quantity === 0) {
        return { lines: state.lines.filter((l) => l.artworkId !== action.artworkId) };
      }
      return {
        lines: state.lines.map((l) =>
          l.artworkId === action.artworkId ? { ...l, quantity } : l
        ),
      };
    }
    case "CLEAR":
      return { lines: [] };
    default:
      return state;
  }
}

const STORAGE_KEY = "printtie_cart_v1";

function loadInitialState(): CartState {
  if (typeof window === "undefined") return { lines: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed?.lines || !Array.isArray(parsed.lines)) return { lines: [] };
    return parsed;
  } catch {
    return { lines: [] };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, undefined as unknown as CartState, loadInitialState);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const value = React.useMemo(() => {
    const actions: CartActions = {
      add: (line) =>
        dispatch({
          type: "ADD",
          line: {
            ...line,
            quantity: Math.max(1, Math.floor(line.quantity ?? 1)),
          },
        }),
      remove: (artworkId) => dispatch({ type: "REMOVE", artworkId }),
      setQuantity: (artworkId, quantity) => dispatch({ type: "SET_QTY", artworkId, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
    return { ...state, ...actions };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function computeCartTotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + (l.unitPrice ?? 0) * l.quantity, 0);
}
