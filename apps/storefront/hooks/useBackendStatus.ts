import { useState, useEffect } from 'react';
import { checkBackendHealth } from '@/lib/api';

export function useBackendStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    checkStatus();
    // Kiểm tra lại mỗi 30 giây
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkStatus = async () => {
    const isHealthy = await checkBackendHealth();
    setStatus(isHealthy ? 'connected' : 'error');
  };

  return { status, refetch: checkStatus };
}
