export const ButtonVariants = ['icon', 'outline', 'primary', 'text'] as const;
export type ButtonVariant = (typeof ButtonVariants)[number];

export const ButtonIcons = [
  'add',
  'edit',
  'home',
  'link',
  'login',
  'logout',
  'google',
] as const;
export type ButtonIcon = (typeof ButtonIcons)[number];
