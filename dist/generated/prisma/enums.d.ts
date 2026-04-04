export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly OPERATOR: "OPERATOR";
    readonly ANALYST: "ANALYST";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const AlertType: {
    readonly BLACKLIST: "BLACKLIST";
    readonly WATCHLIST: "WATCHLIST";
    readonly WHITELIST: "WHITELIST";
};
export type AlertType = (typeof AlertType)[keyof typeof AlertType];
