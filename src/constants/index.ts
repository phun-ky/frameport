/**
 * Style object for hiding an element in the HTML.
 *
 * @type {{ clip: string, height: string, margin: string, overflow: string, position: string, width: string }}
 */
export const HIDE_TEMPLATE_STYLE: {
  clip: string;
  height: string;
  margin: string;
  overflow: string;
  position: string;
  width: string;
} = {
  clip: 'rect(1px, 1px, 1px, 1px)',
  height: '1px',
  margin: '0',
  overflow: 'hidden',
  position: 'absolute',
  width: '1px'
};

/**
 * Default meta headers for an HTML document.
 *
 * @type {string[]}
 */
export const DEFAULT_HEADERS: string[] = [
  '<meta charset="utf-8" />',
  '<meta name="robots" content="none" />',
  '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />',
  '<meta name="viewport" content="width=device-width, initial-scale=1" />'
];
