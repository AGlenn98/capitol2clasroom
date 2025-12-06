import { useState, useEffect, useCallback } from "react";
import { UserStance } from "@/types/legislation";

const STORAGE_KEY = "c2c_bill_stances";

interface StanceRecord {
  [billId: string]: UserStance;
}

export function useUserStance(billId: number | string) {
  const [stance, setStance] = useState<UserStance>(null);
  
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const stances: StanceRecord = JSON.parse(stored);
        setStance(stances[String(billId)] || null);
      } catch {
        setStance(null);
      }
    }
  }, [billId]);
  
  const updateStance = useCallback((newStance: UserStance) => {
    setStance(newStance);
    
    const stored = localStorage.getItem(STORAGE_KEY);
    let stances: StanceRecord = {};
    
    if (stored) {
      try {
        stances = JSON.parse(stored);
      } catch {
        stances = {};
      }
    }
    
    if (newStance === null) {
      delete stances[String(billId)];
    } else {
      stances[String(billId)] = newStance;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stances));
  }, [billId]);
  
  const toggleStance = useCallback(() => {
    if (stance === 'support') {
      updateStance('oppose');
    } else if (stance === 'oppose') {
      updateStance(null);
    } else {
      updateStance('support');
    }
  }, [stance, updateStance]);
  
  return { stance, setStance: updateStance, toggleStance };
}

export function useAllStances() {
  const [stances, setStances] = useState<StanceRecord>({});
  
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setStances(JSON.parse(stored));
      } catch {
        setStances({});
      }
    }
  }, []);
  
  return stances;
}
