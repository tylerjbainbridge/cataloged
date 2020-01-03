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
  fit = false,
  ...props
}: LazeImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (isReady) {
      const imageObj = new Image();
      imageObj.onload = e => setIsImageLoaded(imageObj.src);
      imageObj.src = src;

      setDimensions({
        width: imageObj.width,
        height: imageObj.height,
      });
    }
  }, [isReady]);

  const newProps = {
    rounded: 'lg',
    ...props,
  };

  const isReadyToDisplay = !isReady || !isImageLoaded;

  const isLandscape = dimensions.width > dimensions.height;

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
