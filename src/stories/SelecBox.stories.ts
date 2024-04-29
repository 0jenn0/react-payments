import type { Meta, StoryObj } from "@storybook/react";
import SelectBox from "../components/CardCompanySelector/CardCompanySelector";

const meta: Meta<typeof SelectBox> = {
  title: "Components/SelectBox",
  component: SelectBox,
  argTypes: {
    onSelect: { action: "selected" },
    setCompleted: { action: "completed" },
  },
};

export default meta;

type Story = StoryObj<typeof SelectBox>;

export const Default: Story = {};

export const WithSelectedValue: Story = {
  args: {
    onSelect: (value) => {
      console.log("Selected value:", value);
    },
    setCompleted: (isValid) => {
      console.log("Is completed:", isValid);
    },
  },
};
