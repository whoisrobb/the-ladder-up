import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(100),
})
.superRefine(
({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
    ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
        path: ["confirmPassword"],
    });
    }
}
);

export const loginSchema = z.object({
    value: z.string().min(3).max(255),
    password: z.string().min(6).max(100)
})