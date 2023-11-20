import axios, { AxiosError } from 'axios';
import { useModal } from '../lib/hooks/use-modal';

export const $API = axios.create();

$API.interceptors.response.use((response) => {
  return response;
}, (error: AxiosError) => {
  if (error?.response && error?.response?.status === 403) {
    const { onOpen } = useModal.getState();
    onOpen('pro-modal');
  }

  return Promise.reject(error);
});
