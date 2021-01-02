declare module 'remotedev';
declare module 'reoverlay';
declare module 'zwitch' {
  export type ZwitchPayload = {
    [key: string]: any;
  };
  export type ZwitchHandler = (payload: ZwitchPayload) => any;

  export type ZwitchHandlerMap = {
    [key: string]: ZwitchHandler;
  };

  export type ZwitchOptions = {
    invalid?: (props: any) => any;
    unknown?: (props: any) => any;
    handlers?: ZwitchHandlerMap;
  };

  export function zwitch(key: string, options?: ZwitchOptions): ZwitchHandler;

  export default zwitch;
}
declare module '*.md';
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'resolve-url' {
  export default function resolveUrl(...parts: string[]): string;
}
