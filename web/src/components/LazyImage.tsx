import React, { useState, useEffect } from 'react';
import { Segment, Image as SemanticImage } from 'semantic-ui-react';

export const LazyImage = ({
  src,
  style,
  isReady = true,
}: {
  src: string;
  style: any;
  isReady?: boolean;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState<string | null>(null);

  useEffect(() => {
    if (isReady) {
      const squareImage = new Image();
      squareImage.onload = e => setIsImageLoaded(squareImage.src);
      squareImage.src = src;
    }
  }, [isReady]);

  return !isReady || !isImageLoaded ? (
    <Segment loading style={style} />
  ) : (
    <SemanticImage size="huge" rounded style={style} src={src} />
  );
};
