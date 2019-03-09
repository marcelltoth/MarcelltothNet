declare module 'react-social-sharing'{

    import * as React from 'react';

    interface SharingButtonProps{
        link: string;
        simple?: boolean;
        simpleReverse?: boolean;
        big?: boolean;
        medium?: boolean;
        small?: boolean;
        solid?: boolean;
        solidcircle?: boolean;
        styles?: React.CSSProperties;
    }

    interface SharingButtonPropsWithMessage extends SharingButtonProps{
        message?: string;
    }

    interface MailButtonProps extends SharingButtonProps{
        subject?: string;
        body?: string;
    }

    export const Twitter : React.FC<SharingButtonPropsWithMessage>;

    export const Facebook : React.FC<SharingButtonProps>;

    export const Google : React.FC<SharingButtonProps>;

    export const Tumblr : React.FC<SharingButtonProps>;

    export const Mail : React.FC<MailButtonProps>;

    export const Pinterest : React.FC<SharingButtonPropsWithMessage>;

    export const Linkedin : React.FC<SharingButtonPropsWithMessage>;

    export const Reddit : React.FC<SharingButtonProps>;

    export const Xing : React.FC<SharingButtonPropsWithMessage>;

    export const Whatsapp : React.FC<SharingButtonPropsWithMessage>;

    export const HackerNews : React.FC<SharingButtonPropsWithMessage>;

    export const VK : React.FC<SharingButtonPropsWithMessage>;

    export const Telegram : React.FC<SharingButtonPropsWithMessage>;

}