declare module 'react-rating-stars-component' {
    import * as React from 'react';
  
    interface ReactStarsProps {
      count?: number;
      value?: number;
      onChange?: (newRating: number) => void;
      size?: number;
      activeColor?: string;
      edit?: boolean;
      isHalf?: boolean;
      emptyIcon?: React.ReactElement;
      halfIcon?: React.ReactElement;
      filledIcon?: React.ReactElement;
    }
  
    const ReactStars: React.FC<ReactStarsProps>;
  
    export default ReactStars;
  }
  