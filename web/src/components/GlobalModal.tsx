import React, { FunctionComponent } from 'react';

export interface Disclosure {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export enum ModalName {
  CREATE_FILES_MODAL,
  CREATE_LINK_MODAL,
  CREATE_NOTE_MODAL,
  FILTER_FEED_MODAL,
  VIEW_FILE_MODAL,
  SPOTLIGHT_MODAL,
}

type ContextProps = {
  globalModalState: {
    [key in ModalName]: boolean;
  };
  openModal: (modalName: ModalName) => any;
  closeModal: (modalName: ModalName) => any;
  toggleModal: (modalName: ModalName) => any;
  closeAll: () => any;
  isAnyModalOpen: boolean;
};

export const GlobalModalContext = React.createContext<ContextProps>(
  {} as ContextProps,
);

const INITIAL_STATE = {
  [ModalName.CREATE_FILES_MODAL]: false,
  [ModalName.CREATE_LINK_MODAL]: false,
  [ModalName.CREATE_NOTE_MODAL]: false,
  [ModalName.FILTER_FEED_MODAL]: false,
  [ModalName.VIEW_FILE_MODAL]: false,
  [ModalName.SPOTLIGHT_MODAL]: false,
};

export const GlobalModalProvider: FunctionComponent = ({ children }) => {
  const [globalModalState, setGlobalModalState] = React.useState(INITIAL_STATE);

  const updateModal = (modalName: ModalName, isOpen: boolean) =>
    setGlobalModalState({
      ...INITIAL_STATE,
      [modalName]: isOpen,
    });

  const openModal = (modalName: ModalName) => updateModal(modalName, true);
  const closeModal = (modalName: ModalName) => updateModal(modalName, false);
  const toggleModal = (modalName: ModalName) =>
    setGlobalModalState(state => ({
      ...INITIAL_STATE,
      [modalName]: !state[modalName],
    }));

  const closeAll = () =>
    setGlobalModalState(
      // @ts-ignore
      Object.keys(globalModalState).reduce(
        (p, k) => ({
          ...p,
          [k]: false,
        }),
        {} as {
          [k in ModalName]: false;
        },
      ),
    );

  const isAnyModalOpen = Object.values(globalModalState).some(Boolean);

  return (
    <GlobalModalContext.Provider
      value={{
        isAnyModalOpen,
        globalModalState,
        openModal,
        closeModal,
        toggleModal,
        closeAll,
      }}
    >
      {children}
    </GlobalModalContext.Provider>
  );
};

export const useGlobalModal = (modalName?: ModalName) => {
  const {
    openModal,
    closeModal,
    toggleModal,
    globalModalState,
    closeAll,
    isAnyModalOpen,
  } = React.useContext(GlobalModalContext);

  return {
    closeAll,
    // @ts-ignore
    openModal: () => openModal(modalName),
    // @ts-ignore
    closeModal: () => closeModal(modalName),
    // @ts-ignore
    toggleModal: () => toggleModal(modalName),
    // @ts-ignore
    isModalOpen: globalModalState[modalName],
    isAnyModalOpen,
  };
};
