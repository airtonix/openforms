import React, { FC, HTMLAttributes, ReactChild } from 'react';
import SplitPane, { Pane } from 'react-split-pane';

import classes from './UiComponent.module.css';
import paneClasses from './SplitPaneResizer.module.css';

export interface UiComponentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
  splitSize: number;
  navSlot: React.ReactNode;
  workspaceSlot: React.ReactNode;
  propertySlot: React.ReactNode;
  onSplitSizeChange?: (size: number) => void;
}

export const UiComponent: FC<UiComponentProps> = props => {
  const {
    navSlot,
    workspaceSlot,
    propertySlot,
    splitSize = 200,
    onSplitSizeChange,
  } = props;

  function handleSplitSizeChange(size: number): void {
    if (typeof onSplitSizeChange !== 'function') return;
    onSplitSizeChange(size);
  }

  return (
    <div className={classes.UiComponent}>
      {navSlot}
      <SplitPane
        className={paneClasses.Resizer}
        split={'vertical'}
        defaultSize={splitSize}
        onChange={handleSplitSizeChange}
      >
        <Pane className={classes.UiComponent__PropertyPanel}>
          {propertySlot}
        </Pane>
        <Pane className={classes.UiComponent__Workspace}>{workspaceSlot}</Pane>
      </SplitPane>
    </div>
  );
};

UiComponent.displayName = 'UiComponent';
