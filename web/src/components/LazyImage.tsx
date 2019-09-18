import React, { useState, useEffect } from 'react';
import { Segment, Image as SemanticImage, ImageProps } from 'semantic-ui-react';

export interface LazeImageProps {
  [key: string]: any;
  isReady?: boolean;
}

export const LazyImage = ({
  src,
  isReady = true,
  ...props
}: LazeImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState<string | null>(null);

  useEffect(() => {
    if (isReady) {
      const squareImage = new Image();
      squareImage.onload = e => setIsImageLoaded(squareImage.src);
      squareImage.src = src;
    }
  }, [isReady]);

  return !isReady || !isImageLoaded ? (
    <Segment basic loading {...props} />
  ) : (
    <SemanticImage rounded size="huge" src={src} {...props} />
  );
};
