import React, { FunctionComponent } from 'react';

export enum ModalName {
  CREATE_FILES_MODAL,
  CREATE_LINK_MODAL,
  CREATE_NOTE_MODAL,
  FILTER_FEED_MODAL,
}

type ContextProps = {
  globalModalState: {
    [key in ModalName]: boolean;
  };
  openModal: (modalName: ModalName) => any;
  closeModal: (modalName: ModalName) => any;
  toggleModal: (modalName: ModalName) => any;
  closeAll: () => any;
};

export const GlobalModalContext = React.createContext<ContextProps>(
  {} as ContextProps,
);

export const GlobalModalProvider: FunctionComponent = ({ children }) => {
  const [globalModalState, setGlobalModalState] = React.useState({
    [ModalName.CREATE_FILES_MODAL]: false,
    [ModalName.CREATE_LINK_MODAL]: false,
    [ModalName.CREATE_NOTE_MODAL]: false,
    [ModalName.FILTER_FEED_MODAL]: false,
  });

  const updateModal = (modalName: ModalName, isOpen: boolean) =>
    setGlobalModalState({
      ...globalModalState,
      [modalName]: isOpen,
    });

  const openModal = (modalName: ModalName) => updateModal(modalName, true);
  const closeModal = (modalName: ModalName) => updateModal(modalName, false);
  const toggleModal = (modalName: ModalName) =>
    setGlobalModalState(state => ({
      ...state,
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

  return (
    <GlobalModalContext.Provider
      value={{
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

export const useGlobalModal = (modalName: ModalName) => {
  const {
    openModal,
    closeModal,
    toggleModal,
    globalModalState,
  } = React.useContext(GlobalModalContext);

  return {
    openModal: () => openModal(modalName),
    closeModal: () => closeModal(modalName),
    toggleModal: () => toggleModal(modalName),
    isModalOpen: globalModalState[modalName],
  };
};
