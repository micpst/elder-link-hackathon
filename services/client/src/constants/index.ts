import { IActivity } from '../types/IActivity';

export const routePaths = {
  home: '/',
  swipe: '/swipe',
  login: '/login',
  signup: '/signup',
  settings: '/settings',
  createTicket: '/create-ticket',
};

export const BREAKPOINTS = {
  mobile: 768,
};

export const imageExtensionsUpload = {
  'image/*': ['.jpeg', '.jpg', '.bmp', '.svg', '.png', '.webp'],
};

export const activities: IActivity[] = [
  {
    label: 'Transport',
    value: 'TRANSPORTATION',
  },
  {
    label: 'Zakupy',
    value: 'SHOPPING',
  },
  {
    label: 'Wizyta u domu',
    value: 'HOME_VISIT',
  },
  {
    label: 'Wsparcie technologiczne',
    value: 'TECHNOLOGY_ASSISTANCE',
  },
  {
    label: 'Wsparcie zdrowia psychicznego',
    value: 'MENTAL_HEALTH_SUPPORT',
  },
];
