import { toast } from 'react-toastify';

export const SucssesNotifications = (text) => {
        toast.success(text);
};

export const FailNotifications = (text) => {
    toast.error(text);
};

export const AtentionNotification = (text) => {
    toast.warn(text)
};