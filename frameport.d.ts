/**
 * Example usage:
 * ```ts
 * const options: FrameportOptions = {
 *   html: '<div>Hello, World!</div>',
 *   height: '300',
 *   width: 400,
 *   className: 'my-embed',
 *   style: 'color: blue;',
 *   css: '.my-embed { background-color: yellow; }',
 *   code: 'console.log("Embedded content");',
 *   javascript: '/dummy.js',
 *   headers: ['Authorization: Bearer Token']
 * };
 * ```
 */
type FrameportFunctionType = () => void;

/**
 * Extends the global Window interface to add custom properties.
 */
declare global {
    interface Window {
        /**
         * Represents the frameport object for additional functionality.
         */
        frameport: any;
    }
}

declare const modes: {
    domReady: (frameport: FrameportFunctionType) => void;
    lazy: () => void;
    manual: (frameport: FrameportFunctionType) => void;
    activate: (frameport: FrameportFunctionType) => void;
};
declare const frameport: () => void;

export { frameport as default, modes };
