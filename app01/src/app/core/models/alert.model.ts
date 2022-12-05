import { AlertButton, AlertInput, AnimationBuilder, IonicSafeString } from "@ionic/angular";

export interface AlertOptions {
    header?: string;
    subHeader?: string;
    message?: string | IonicSafeString;
    cssClass?: string | string[];
    inputs?: AlertInput[];
    buttons?: (AlertButton | string)[];
    backdropDismiss?: boolean;
    translucent?: boolean;
    animated?: boolean;
    htmlAttributes?: { [key: string]: any };
  
    keyboardClose?: boolean;
    id?: string;
  
    enterAnimation?: AnimationBuilder;
    leaveAnimation?: AnimationBuilder;
  }