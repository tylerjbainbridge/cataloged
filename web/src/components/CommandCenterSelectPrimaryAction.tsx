import React from 'react';
import _ from 'lodash';
import { useMutation } from '@apollo/client';
import { Box, Tag, Flex, Stack, Text, Spinner } from '@chakra-ui/core';
import { FaCheck } from 'react-icons/fa';

import { ModalSelect, useRelevantItems } from './CommandCenter';
import { getKeybindAsArray } from '../util/helpers';

export const CommandCenterSelectPrimaryAction = ({
  activeOptions,
  updatePrimaryAction,
}: any) => {
  const relevantItems = useRelevantItems();

  return (
    <ModalSelect
      handleSelection={(selection: any) => updatePrimaryAction(selection.value)}
      header={
        <>
          Command Center{' '}
          {relevantItems.length ? ` (${relevantItems.length})` : ''}
        </>
      }
      getOptions={(search: string) =>
        activeOptions.filter(
          (option: any) =>
            !search ||
            //@ts-ignore
            option.display.toLowerCase().includes(search.toLowerCase()),
        )
      }
      getItemNode={(item: any) => (
        <>
          <Flex alignItems="center" color="gray.700">
            {item.icon && (
              <Box mr="10px">
                {React.cloneElement(item.icon, { size: '12px' })}
              </Box>
            )}{' '}
            <Text fontSize="lg" fontWeight="semibold">
              {item.display}
            </Text>
          </Flex>
          {!!item.keybind && (
            <Stack d="flex" alignItems="center" pr="20px" spacing={2} isInline>
              {getKeybindAsArray(item.keybind).map((key, idx) =>
                key === 'then' ? (
                  <Text key={idx + key}>then</Text>
                ) : (
                  <Tag
                    size="sm"
                    key={idx + key}
                    variantColor="gray"
                    textAlign="center"
                  >
                    {key}
                  </Tag>
                ),
              )}
            </Stack>
          )}
        </>
      )}
    />
  );
};
