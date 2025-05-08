export const ButtonVariants = ['icon', 'outline', 'primary', 'text'] as const;
export type ButtonVariant = (typeof ButtonVariants)[number];

export const ButtonIcons = [''] as const;
export type ButtonIcon = (typeof ButtonIcons)[number];
