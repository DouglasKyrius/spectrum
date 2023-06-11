'use client';

import { usePathname } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMediaQuery } from 'react-responsive';

type CollapseSidebarContextInterface = {
  collapseClickOrHover: boolean;
  collapseClick: boolean;
  collapseHover: boolean;
  onToggleCollapse: () => void;
  onCloseCollapse: () => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
};

const initialState = {
  collapseClickOrHover: false,
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => {},
  onCloseCollapse: () => {},
  onHoverEnter: () => {},
  onHoverLeave: () => {},
};

const CollapseSidebarContext =
  createContext<CollapseSidebarContextInterface>(initialState);

const CollapseSidebarProvider = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isMobile = !useMediaQuery({ minWidth: 1024 });
  const pathname = usePathname();
  const [collapse, setCollapse] = useState({
    click: false,
    hover: false,
  });

  useEffect(() => {
    if (!isDesktop) {
      setCollapse({
        click: false,
        hover: false,
      });
    }
  }, [isDesktop]);

  useEffect(() => {
    if (isMobile && collapse.click) {
      document.body.style.overflow = 'hidden';
    }
    if (!isMobile || !collapse.click) {
      document.body.style.removeProperty('overflow');
    }
  }, [collapse.click, isMobile]);

  const handleToggleCollapse = useCallback(() => {
    setCollapse((col) => ({ ...col, click: !col.click }));
  }, []);

  const handleCloseCollapse = useCallback(() => {
    setCollapse((col) => ({ ...col, click: false }));
  }, []);

  const handleHoverEnter = useCallback(() => {
    if (!collapse.click) {
      setCollapse((col) => ({ ...col, hover: true }));
    }
  }, [collapse]);

  const handleHoverLeave = useCallback(() => {
    if (!collapse.click) {
      setCollapse((col) => ({ ...col, hover: false }));
    }
  }, [collapse]);

  useEffect(() => {
    if (isMobile) {
      handleCloseCollapse();
    }
  }, [isMobile, pathname, handleCloseCollapse]);

  const value: CollapseSidebarContextInterface = useMemo(
    () => ({
      collapseClickOrHover: collapse.click || collapse.hover,
      collapseClick: collapse.click,
      collapseHover: collapse.hover,
      onToggleCollapse: handleToggleCollapse,
      onCloseCollapse: handleCloseCollapse,
      onHoverEnter: handleHoverEnter,
      onHoverLeave: handleHoverLeave,
    }),
    [
      collapse.click,
      collapse.hover,
      handleToggleCollapse,
      handleCloseCollapse,
      handleHoverEnter,
      handleHoverLeave,
    ]
  );

  return (
    <CollapseSidebarContext.Provider value={value}>
      {children}
    </CollapseSidebarContext.Provider>
  );
};

const useCollapseSidebar: () => CollapseSidebarContextInterface = () => {
  const stateContext = useContext(CollapseSidebarContext);
  if (stateContext === null) {
    throw new Error(
      'useCollapseSidebar() can only be used inside of <CollapseSidebarProvider />, please declare it at a higher level.'
    );
  }
  return stateContext;
};

export { CollapseSidebarContext, CollapseSidebarProvider, useCollapseSidebar };
