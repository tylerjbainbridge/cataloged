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
  hasBorder?: boolean;
  clickProps?: any;
  containerProps?: any;
}

export const LazyImage = ({
  src,
  isReady = true,
  showSpinner = true,
  loadingContainerProps,
  placeholderIcon = 'view-off',
  spinnerSize = 'xl',
  hasBorder = false,
  fit = false,
  shrinkAndCenterThreshold = null,
  failureNode,
  clickProps,
  containerProps = {},
  ...props
}: LazeImageProps) => {
  const img = React.useMemo(() => {
    const temp = new Image();

    // temp.crossOrigin = 'anonymous';
    temp.referrerPolicy = 'origin';
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
    // console.log({ src, shrinkAndCenterThreshold, ...dimensions });

    return (
      <Box
        d="flex"
        justifyContent="center"
        alignItems="center"
        rounded="lg"
        width={props.width}
        height={props.height}
        {...clickProps}
        {...containerProps}
      >
        <ChackraImage
          src={src}
          {...newProps}
          maxWidth={dimensions.width > 50 ? dimensions.width : 50}
          maxHeight={dimensions.height > 50 ? dimensions.height : 50}
        />
      </Box>
    );
  }

  if (isReadyToDisplay) {
    return (
      <ChackraImage
        src={src}
        // border={hasBorder ? '1px solid lightgray' : undefined}
        {...clickProps}
        {...newProps}
        {...containerProps}
      />
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
      {...newProps}
      {...loadingContainerProps}
      {...containerProps}
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
