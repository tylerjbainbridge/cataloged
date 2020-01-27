import React, { useState, useEffect } from 'react';
import {
  Box,
  Spinner,
  Image as ChackraImage,
  Icon,
  IconProps,
  SpinnerProps,
} from '@chakra-ui/core';

export interface LazeImageProps {
  [key: string]: any;
  isReady?: any | boolean;
  loadingContainerProps?: any;
  showSpinner?: boolean;
  placeholderIcon?: IconProps['name'];
  spinnerSize?: SpinnerProps['size'];
}

export const LazyImage = ({
  src,
  isReady = true,
  showSpinner = true,
  loadingContainerProps,
  placeholderIcon = 'view-off',
  spinnerSize = 'xl',
  fit = false,
  ...props
}: LazeImageProps) => {
  const img = new Image();
  img.src = src;

  const [isImageLoaded, setIsImageLoaded] = useState<boolean | null>(
    !!img.naturalWidth || img.complete,
  );
  const [isBroken, setIsBroken] = useState(false);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (isReady) {
      img.onload = () => setIsImageLoaded(true);
      img.onerror = () => setIsBroken(true);

      setDimensions({
        width: img.width,
        height: img.height,
      });
    }
  }, [isReady, src]);

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
      width={props.width}
      height={props.height}
      {...newProps}
      {...loadingContainerProps}
    >
      {src && showSpinner ? (
        <Spinner size={spinnerSize} />
      ) : (
        <Icon size="50px" name={isBroken ? 'warning' : placeholderIcon} />
      )}
    </Box>
  ) : (
    <ChackraImage src={src} {...newProps} />
  );
};
