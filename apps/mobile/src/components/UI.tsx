import React from 'react';

import styled from '@emotion/native';
import {
  TextInput,
  TextInputProps,
  Picker,
  TouchableOpacity,
} from 'react-native';
import { openModalSelect } from '../views/ModalSelectView';

export enum COLORS {
  LIGHT_GRAY = '#E2E8F0',
}

export const Box = styled.View``;

export const Text = styled.Text`
  font-family: 'System';
  color: #1a202c;
`;

export const Button = styled.Button``;

export const BoxButton = styled.TouchableOpacity``;

const TextInputFullWidth = styled.TextInput`
  width: 100%;

  font-size: 22px;
  font-weight: 300;
  padding: 10px;

  border-color: ${COLORS.LIGHT_GRAY};
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
`;

const PickerFullWidth = styled.Picker``;

const ButtonFullWidth = styled.Button`
  width: 100%;

  border-radius: 10px;
`;

export interface FormItemProps extends TextInputProps {
  label?: string;
  children?: any;
}

export const FormItem = ({ label, children = null }: FormItemProps) => {
  return (
    <Box
      style={{
        width: '100%',
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          marginBottom: 5,
          fontSize: 20,
        }}
      >
        {label}
      </Text>
      {children}
    </Box>
  );
};

export interface FormInputProps extends TextInputProps {
  label?: string;
}

export const FormInput = ({ label, ...inputProps }: FormInputProps) => {
  return (
    <FormItem label={label}>
      <TextInputFullWidth {...inputProps} />
    </FormItem>
  );
};

export interface FormPickerProps extends TextInputProps {
  label?: string;
  options: { value: string; label: string }[];
}

export const FormPicker = ({
  label,
  options,
  value,
  onChange,
  ...pickerProps
}: FormPickerProps) => {
  return (
    <FormItem label={label}>
      <TextInputFullWidth
        editable={false}
        value={
          Array.isArray(value)
            ? value
                .map(
                  (val) =>
                    options.find((option) => option.value === val)?.label,
                )
                .join(', ')
            : options.find((option) => option.value === value)?.label
        }
        onTouchStart={() =>
          openModalSelect({
            multiSelect: false,
            value,
            onChange,
            options,
          })
        }
      />
    </FormItem>
  );
};
