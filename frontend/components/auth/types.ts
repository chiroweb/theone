export interface SignupFormData {
    // Step 1: Identity
    name: string;
    email: string;
    phone: string;
    location: string;
    isPhoneVerified?: boolean; // New

    // Step 2: User Type
    role: "business" | "founder" | "invited" | null;

    // Step 3-A: Business
    companyName?: string;
    jobTitle?: string;
    bizRegistrationNumber?: string; // New
    isBizVerified?: boolean; // New
    revenue?: string;
    employeeCount?: string; // New
    website?: string;
    industry?: string; // New

    // Step 3-B: Founder
    startupField?: string;
    founderBio?: string;
    briefBio?: string; // Deprecated? Keeping for compatibility if needed, but focus on founderBio
    expertRoles?: string[];
    portfolioUrl?: string;
    startupStage?: string; // New

    // Step 4: Common
    motivation: string; // "Take" related?
    contribution: string; // "Give" related?
    giveElements?: string[]; // New
    takeElements?: string[]; // New
    referralCode?: string; // New
    termsAgreed?: boolean; // New
}

export const INITIAL_DATA: SignupFormData = {
    name: "",
    email: "",
    phone: "",
    location: "",
    role: null,
    companyName: "",
    jobTitle: "",
    motivation: "",
    contribution: "",
};
