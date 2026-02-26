import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const PIN_STORAGE_KEY = 'kids_pin_unlocked';

interface PinLockContextType {
  isPinUnlocked: boolean;
  unlock: () => void;
  lock: () => void;
}

const PinLockContext = createContext<PinLockContextType>({
  isPinUnlocked: false,
  unlock: () => {},
  lock: () => {},
});

export function PinLockProvider({ children }: { children: React.ReactNode }) {
  const [isPinUnlocked, setIsPinUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(PIN_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const unlock = useCallback(() => {
    try {
      sessionStorage.setItem(PIN_STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
    setIsPinUnlocked(true);
  }, []);

  const lock = useCallback(() => {
    try {
      sessionStorage.removeItem(PIN_STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsPinUnlocked(false);
  }, []);

  return React.createElement(
    PinLockContext.Provider,
    { value: { isPinUnlocked, unlock, lock } },
    children
  );
}

export function usePinLock() {
  return useContext(PinLockContext);
}
