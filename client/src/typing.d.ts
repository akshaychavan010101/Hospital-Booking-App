declare module 'react-typing-effect' {
    import * as React from 'react';
  
    export interface TypingProps {
      text: string[];
      speed?: number;
      eraseSpeed?: number;
      eraseDelay?: number;
      cursor?: string;
      cursorClassName?: string;
      className?: string;
      onTypingDone?: () => void;
    }
  
    export default class Typing extends React.Component<TypingProps> {}
  }
  
  