export const ButtonVariants = ['icon', 'outline', 'primary', 'text'] as const;
export type ButtonVariant = (typeof ButtonVariants)[number];

export const ButtonIcons = [
  'add',
  'edit',
  'edit-arrow-up',
  'home',
  'link',
  'login',
  'logout',
  'diversity-3',
  'delete',
  'groups-2',
  'rate-review',
  'star',
  'tenancy',
  'google',
] as const;
export type ButtonIcon = (typeof ButtonIcons)[number];
