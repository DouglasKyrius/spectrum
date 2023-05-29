import { FC, useEffect, useState } from 'react';

type OptionsTypes = {
  animated?: boolean;
  closeButton?: boolean;
  title?: string;
  message?: string;
  icon?: JSX.Element;
  buttons?: JSX.Element[];
};

interface UseModalReturnType {
  isModalVisible: boolean;
  isNestedModalVisible: boolean;
  hide: () => void;
  hideNested: () => void;
  options?: OptionsTypes;
}

export const useModal = (
  options?: OptionsTypes
): [UseModalReturnType, () => void, () => void] => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNestedModalVisible, setIsNestedModalVisible] = useState(false);

  const toggle = () => {
    setIsModalVisible((prev) => !prev);
  };

  const toggleNestedModal = () => {
    setIsNestedModalVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    }
    if (!isModalVisible) {
      document.body.style.removeProperty('overflow');
    }
  }, [isModalVisible]);

  return [
    {
      isModalVisible,
      isNestedModalVisible,
      hide: toggle,
      hideNested: toggleNestedModal,
      options,
    },
    toggle,
    toggleNestedModal,
  ];
};
