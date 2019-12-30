import React, { useState, useEffect } from 'react';
import { Box, Spinner, Image as ChackraImage } from '@chakra-ui/core';

export interface LazeImageProps {
  [key: string]: any;
  isReady?: boolean;
  loadingContainerProps?: any;
  showSpinner?: boolean;
}

export const LazyImage = ({
  src,
  isReady = true,
  showSpinner = true,
  loadingContainerProps,
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

  const newProps = {
    rounded: 'lg',
    ...props,
  };

  return !isReady || !isImageLoaded ? (
    <Box
      d="flex"
      justifyContent="center"
      alignItems="center"
      rounded="lg"
      {...newProps}
      {...loadingContainerProps}
    >
      {showSpinner && <Spinner size="xl" />}
    </Box>
  ) : (
    <ChackraImage src={src} {...newProps} />
  );
};
