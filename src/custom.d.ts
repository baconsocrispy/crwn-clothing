// necessary code for TypeScript to import ReactComponent 
// and the file path types correctly. Gets included in the tsconfig.json
declare module "*.svg" {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}