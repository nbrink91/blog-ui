export interface ReCaptchaOptions {
    action: string;
}

export interface ReCaptcha {
    ready(func: () => any): void;
    execute(siteKey: string, options?: ReCaptchaOptions): Promise<string>;
}
