import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

export const useCrisp = () => {
  useEffect(() => {
    Crisp.configure('2d244482-0263-4b0c-a810-d98b5eec1f3e');
  }, []);
};
