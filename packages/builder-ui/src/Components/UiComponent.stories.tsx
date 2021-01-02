import React from 'react';
import { Meta, Story } from '@storybook/react';
import { UiComponent, UiComponentProps } from './UiComponent';

const meta: Meta = {
  title: 'UiComponent',
  component: UiComponent,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<UiComponentProps> = args => <UiComponent {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({
  navSlot: 'navigation slot',
  propertySlot: 'property slot',
  workspaceSlot: 'property slot',
});

Default.args = {};
