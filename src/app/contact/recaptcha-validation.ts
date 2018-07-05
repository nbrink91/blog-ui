export interface RecaptchaValidation {
    success: boolean;
    score?: number;
    action?: string;
    challenge_ts?: string;
    hostname?: string;
    error_codes?: string[];
}
