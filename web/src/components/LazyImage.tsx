import React, { useState, useEffect, useRef } from 'react';
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
  failureNode?: JSX.Element | null;
  shrinkAndCenterThreshold?: number | null;
}

export const LazyImage = ({
  src,
  isReady = true,
  showSpinner = true,
  loadingContainerProps,
  placeholderIcon = 'view-off',
  spinnerSize = 'xl',
  fit = false,
  shrinkAndCenterThreshold = null,
  failureNode,
  ...props
}: LazeImageProps) => {
  const img = React.useMemo(() => {
    const temp = new Image();

    // temp.crossOrigin = 'anonymous';
    temp.src = src;

    return temp;
  }, [src]);

  const [isImageLoaded, setIsImageLoaded] = useState<boolean | null>(
    !!img.naturalWidth || img.complete,
  );

  const [isBroken, setIsBroken] = useState(false);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (isReady) {
      img.onload = function(evt) {
        setIsImageLoaded(true);
        // @ts-ignore
        const width = this.width;
        // @ts-ignore
        const height = this.height;

        setDimensions({ width, height });
      };

      img.onerror = () => setIsBroken(true);
    }
  }, [isReady, src]);

  const newProps = {
    rounded: 'lg',
    ...props,
  };

  const isReadyToDisplay = (isReady || isImageLoaded) && src && !isBroken;

  // const isLandscape = dimensions.width > dimensions.height;

  if (isBroken && failureNode !== undefined) {
    return failureNode;
  }

  if (
    isReadyToDisplay &&
    shrinkAndCenterThreshold &&
    dimensions.width &&
    shrinkAndCenterThreshold > dimensions.width &&
    dimensions.height &&
    shrinkAndCenterThreshold > dimensions.height
  ) {
    console.log({ src, shrinkAndCenterThreshold, ...dimensions });

    return (
      <Box
        d="flex"
        justifyContent="center"
        alignItems="center"
        rounded="lg"
        width={props.width}
        height={props.height}
        border="1px solid lightgray"
      >
        <ChackraImage
          src={src}
          {...newProps}
          maxWidth={dimensions.width}
          maxHeight={dimensions.height}
        />
      </Box>
    );
  }

  if (isReadyToDisplay) {
    return (
      <ChackraImage src={src} border="1px solid lightgray" {...newProps} />
    );
  }

  return (
    <Box
      d="flex"
      justifyContent="center"
      alignItems="center"
      rounded="lg"
      width={props.width}
      height={props.height}
      border="1px solid lightgray"
      {...newProps}
      {...loadingContainerProps}
    >
      {isBroken ? (
        <Icon size="16px" name="warning" />
      ) : src && showSpinner ? (
        <Spinner size={spinnerSize} />
      ) : (
        <Icon size="16px" name={placeholderIcon} />
      )}
    </Box>
  );
};
