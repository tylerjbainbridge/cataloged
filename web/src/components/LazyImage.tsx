import React, { useState, useEffect } from 'react';
import {
  Box,
  Spinner,
  Image as ChackraImage,
  Icon,
  IconProps,
} from '@chakra-ui/core';

export interface LazeImageProps {
  [key: string]: any;
  isReady?: boolean;
  loadingContainerProps?: any;
  showSpinner?: boolean;
  placeholderIcon?: IconProps['name'];
}

export const LazyImage = ({
  src,
  isReady = true,
  showSpinner = true,
  loadingContainerProps,
  placeholderIcon = 'view-off',
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

  const isReadyToDisplay = !isReady || !isImageLoaded;

  return isReadyToDisplay || !src ? (
    <Box
      d="flex"
      justifyContent="center"
      alignItems="center"
      rounded="lg"
      backgroundColor="lightGrey"
      {...newProps}
      {...loadingContainerProps}
    >
      {src && showSpinner ? (
        <Spinner size="xl" />
      ) : (
        <Icon size="50px" name={placeholderIcon} />
      )}
    </Box>
  ) : (
    <ChackraImage src={src} {...newProps} />
  );
};
