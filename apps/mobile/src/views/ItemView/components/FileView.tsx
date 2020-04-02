import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {
  ItemFull_file,
  ItemFull,
} from 'cataloged-shared/graphql/__generated__/ItemFull';
// @ts-ignore
import styled from '@emotion/native';

import { WebView } from 'react-native-webview';

import { Box, Text, FormInput, FormPicker } from '../../../components/UI';
import { ROUTES } from '../../../Router';
import { openModalSelect } from '../../ModalSelectView';

export interface ItemWithFile extends ItemFull {
  file: ItemFull_file;
}

export interface FileViewProps {
  item: ItemWithFile;
}

const FileImage = styled.Image`
  /* height: 200px; */
  height: 100%;
  width: 100%;
`;

const TextInputFullWidth = styled.TextInput`
  width: 100%;

  border-radius: 10px;
`;

const ButtonFullWidth = styled.Button`
  width: 100%;

  border-radius: 10px;
`;

export const FileEditView = ({ item }: FileViewProps) => {
  const { file } = item;

  const { control, handleSubmit, watch, getValues, errors } = useForm({
    defaultValues: {
      title: file.title,
      description: file.description,
      status: item.status,
    },
  });

  watch();

  console.log(getValues());

  const onSubmit = (data: any) =>
    Alert.alert('Form Data', JSON.stringify(data));

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Box
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <FileImage source={{ uri: item.file.image }} resizeMode="cover" />
          <Box style={{ padding: 10 }}>
            <Controller
              as={FormInput}
              control={control}
              label="Title"
              name="title"
              onChange={(args) => args[0].nativeEvent.text}
              rules={{ required: true }}
            />
            <Controller
              as={FormInput}
              control={control}
              label="Description"
              name="description"
              onChange={(args) => args[0].nativeEvent.text}
              multiline={true}
              numberOfLines={4}
            />

            <Controller
              as={FormPicker}
              control={control}
              label="Status"
              name="status"
              onChange={([value]) => value}
              options={[
                {
                  value: 'NOT_STARTED',
                  label: 'Not started',
                },
                {
                  value: 'IN_PROGRESS',
                  label: 'In progress',
                },
                {
                  value: 'DONE',
                  label: 'Done',
                },
              ]}
            />

            <ButtonFullWidth title="Submit" onPress={handleSubmit(onSubmit)} />
          </Box>
        </Box>
      </SafeAreaView>
    </>
  );
};

const FileDisplayView = ({ item }: FileViewProps) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
        }}
      >
        <FileImage source={{ uri: item.file.fullUrl }} resizeMode="contain" />
      </Box>
    </>
  );
};

const FileView = (props: FileViewProps) => {
  const {
    item: { file },
  } = props;

  return <FileDisplayView {...props} />;

  return <FileEditView {...props} />;
};

export { FileView };
