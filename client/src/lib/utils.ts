import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const serverUrl = 'https://the-ladder-up.onrender.com';
// export const serverUrl = 'http://localhost:3000';


export const categories = ['Music', 'Fashion', 'Films', 'Sports', 'Decor', 'Culinary'];


export const formatDate = (createdAt: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(createdAt).toLocaleDateString(undefined, options);
};


export const customBtn = "inline-flex items-center py-2 px-3 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
export const primary = "bg-primary text-primary-foreground hover:bg-primary/90"
export const destructive = "hover:bg-accent text-red-500"
export const outline = "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
export const secondary = "bg-secondary text-secondary-foreground hover:bg-secondary/80"
export const ghost = "hover:bg-accent hover:text-accent-foreground"


export const randomUser = () => {
  const val = Math.floor(Math.random() * users.length);
  return users[val];
}

const users = [
  {
    firstName: 'Adanna',
    lastName: 'Osei',
    username: 'dannasei',
    email: 'oseiadanna@example.com',
    password: 'oseiadanna',
  },
  {
    firstName: 'Jabari',
    lastName: 'Mwangi',
    username: 'mwangi_jaba',
    email: 'jabarimwangi@example.com',
    password: 'mwangijaba',
  },
  {
    firstName: 'Fatoumata',
    lastName: 'Diop',
    username: 'fatouma',
    email: 'fatoumatadiop@example.com',
    password: 'diopfatouma',
  },
]