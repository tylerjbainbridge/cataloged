import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, Text } from '../components/UI';
import { ROUTES } from '../Router';

Icon.loadFont();

export interface ModalSelectViewProps {
  componentId?: string;
  value: any | any[];
  onChange: any;
  options: any;
  multiSelect: any;
}

export const openModalSelect = (
  navigation: any,
  { onChange, options, value, multiSelect }: ModalSelectViewProps,
) => {
  navigation.showModal({
    stack: {
      options: {
        topBar: {
          visible: false,
        },
      },
      children: [
        {
          component: {
            name: ROUTES.MODAL_SELECT,
            passProps: {
              options,
              value,
              multiSelect,
              onChange,
            },
          },
        },
      ],
    },
  });
};

export const ModalSelectView = ({
  componentId,
  onChange,
  options,
  value,
  multiSelect,
}: ModalSelectViewProps) => {
  // useEffect(() => {
  //   func();
  // }, []);

  const isSelected = (optionValue: any) => {
    if (multiSelect && Array.isArray(value)) {
      return value.includes(optionValue);
    }

    return value === optionValue;
  };

  const handlePress = (optionValue: any) => () => {
    onChange(optionValue);

    if (!multiSelect) {
      Navigation.dismissModal(componentId);
    }
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <ScrollView style={{ padding: 20 }}>
          {options.map(({ label, value }: any) => (
            <TouchableOpacity
              onPress={handlePress(value)}
              style={{
                width: '100%',
                height: 60,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: 10,
                  borderBottomColor: COLORS.LIGHT_GRAY,
                  borderBottomWidth: 1,
                }}
              >
                <Text style={{ fontSize: 18, maxWidth: '60%' }}>{label}</Text>
                {/* <Switch /> */}
                {isSelected(value) && <Icon name="check" size={18} />}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
