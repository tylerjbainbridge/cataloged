import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {
  ItemFull_link,
  ItemFull,
} from 'cataloged-shared/graphql/__generated__/ItemFull';
// @ts-ignore
import styled from '@emotion/native';

import { WebView } from 'react-native-webview';

import { Box, Text, FormInput, FormPicker } from '../../../components/UI';
// import { Navigation } from 'react-native-navigation';
import { ROUTES } from '../../../Router';
import { openModalSelect } from '../../ModalSelectView';

export interface ItemWithLink extends ItemFull {
  link: ItemFull_link;
}

export interface LinkViewProps {
  item: ItemWithLink;
}

const LinkImage = styled.Image`
  height: 200px;
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

export const LinkEditView = ({ item }: LinkViewProps) => {
  const { link } = item;

  const { control, handleSubmit, watch, getValues, errors } = useForm({
    defaultValues: {
      title: link.title,
      description: link.description,
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
          <LinkImage source={{ uri: item.link.image }} resizeMode="cover" />
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

const LinkView = (props: LinkViewProps) => {
  const {
    item: { link },
  } = props;

  return <WebView source={{ uri: link.href }} />;

  return <LinkEditView {...props} />;
};

export { LinkView };
