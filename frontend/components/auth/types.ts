export type UserRole = "business" | "founder" | null;

export interface SignupFormData {
    // Step 1: Basic
    name: string;
    email: string;
    phone: string;
    location: string;

    // Step 2: Role
    role: UserRole;

    // Step 3A: Business
    companyName?: string;
    jobTitle?: string;
    bizRegistrationNumber?: string;
    revenue?: string;
    industry?: string;
    subIndustry?: string;
    website?: string;

    // Step 3B: Founder
    startupField?: string;
    founderBio?: string;
    portfolioUrl?: string; // or file path mock
    expertRoles?: string[];

    // Step 4: Common
    motivation?: string;
    contribution?: string;
}

export const INITIAL_DATA: SignupFormData = {
    name: "",
    email: "",
    phone: "",
    location: "",
    role: null,
};
