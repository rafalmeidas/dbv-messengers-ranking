export const ButtonVariants = ['icon', 'outline', 'primary', 'text'] as const;

export type ButtonVariant = (typeof ButtonVariants)[number];
