import { useState, useCallback } from "react";

export function useToast(duration = 3000) {
  const [toast, setToast] = useState(null);

  const show = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), duration);
  }, [duration]);

  const dismiss = useCallback(() => setToast(null), []);

  return { toast, show, dismiss };
}
