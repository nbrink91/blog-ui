export interface RecaptchaOptions {
    action: string;
}

export interface ReCaptcha {
    ready(func: () => any): void;
    execute(siteKey: string, options?: RecaptchaOptions): Promise<string>;
}
