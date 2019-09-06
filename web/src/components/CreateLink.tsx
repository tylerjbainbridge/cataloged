import React, { useCallback, useState, useRef } from 'react';
import useForm from 'react-hook-form';
import {
  Button,
  List,
  Image,
  Segment,
  Modal,
  Input,
  Label,
  Form,
} from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as yup from 'yup';
import { usePaste } from '../hooks/usePaste';

const CreateLinkSchema = yup.object().shape({
  href: yup
    .string()
    .url('Invalid URL')
    .required('Required'),
});

const CREATE_LINK_MUTATION = gql`
  mutation createLink($href: String!) {
    createLink(href: $href) {
      id
      href
    }
  }
`;

export const CreateLink = () => {
  const { getValues, setValue, register, errors } = useForm({
    validationSchema: CreateLinkSchema,
    mode: 'onBlur',
  });

  const { href } = getValues();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createLink, { loading }] = useMutation(CREATE_LINK_MUTATION, {
    variables: { href },
    refetchQueries: ['getItems'],
    onCompleted: () => cleanup(),
  });

  const onPaste = (e: any) => {
    const pastedText = (e.originalEvent || e).clipboardData.getData(
      'text/plain',
    );

    if (pastedText) {
      setValue('href', pastedText);
    }
  };

  usePaste({ onPaste });

  const cleanup = () => {
    setIsModalOpen(false);
    setValue('href', '');
  };

  return (
    <Modal
      open={isModalOpen}
      closeIcon
      onClose={cleanup}
      size="tiny"
      centered={false}
      trigger={<Button icon="linkify" onClick={() => setIsModalOpen(true)} />}
      as={Form}
    >
      <Modal.Header>Paste link</Modal.Header>
      <Form.Field style={{ display: 'none' }}>
        <input name="href" defaultValue="" ref={register} />
        {errors.href && (
          <Label basic color="red" pointing>
            {errors.href.message}
          </Label>
        )}
      </Form.Field>
      <Modal.Content image scrolling>
        <Form.Field style={{ display: 'none' }}>
          <input name="href" defaultValue="" ref={register} />
          {errors.href && (
            <Label basic color="red" pointing>
              {errors.href.message}
            </Label>
          )}
        </Form.Field>

        {href && (
          <Segment basic loading={loading} style={{ width: '100%' }}>
            <a href={href} target="_blank">
              {href}
            </a>
          </Segment>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={!href}
          onClick={async () => {
            if (!loading) {
              await createLink();
            }
          }}
          labelPosition="right"
          icon="add"
          color={!href ? 'yellow' : 'green'}
          content={!href ? 'Waiting for link...' : 'Add'}
        />
      </Modal.Actions>
    </Modal>
  );
};
