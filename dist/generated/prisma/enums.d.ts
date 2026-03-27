export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly OPERATOR: "OPERATOR";
    readonly ANALYST: "ANALYST";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const AlertType: {
    readonly BLACKLIST: "BLACKLIST";
    readonly WATCHLIST: "WATCHLIST";
};
export type AlertType = (typeof AlertType)[keyof typeof AlertType];
