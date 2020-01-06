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
  const [isBroken, setIsBroken] = useState(false);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (isReady) {
      const img = new Image();
      img.src = src;

      img.onload = () => setIsImageLoaded(img.src);
      img.onerror = () => setIsBroken(true);

      setDimensions({
        width: img.width,
        height: img.height,
      });
    }
  }, [isReady]);

  const newProps = {
    rounded: 'lg',
    ...props,
  };

  const isReadyToDisplay = !isReady || !isImageLoaded;

  // const isLandscape = dimensions.width > dimensions.height;

  return isReadyToDisplay || !src || isBroken ? (
    <Box
      d="flex"
      justifyContent="center"
      alignItems="center"
      rounded="lg"
      {...newProps}
      {...loadingContainerProps}
    >
      {src && showSpinner ? (
        <Spinner size="xl" />
      ) : (
        <Icon size="50px" name={isBroken ? 'warning' : placeholderIcon} />
      )}
    </Box>
  ) : (
    <ChackraImage src={src} {...newProps} />
  );
};
