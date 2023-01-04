import React from "react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import Home from "../../pages/index";

export default {
  title: "Calculator/HomePage",
  component: Home,
  parameters: {},
};

const Template = (args) => <Home />;

export const Default = Template.bind({});

export const InteractiveTest = Template.bind({});
InteractiveTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvasElement.querySelector("#calculator-form");
  await userEvent.type(form.querySelector("#first"), "1");
  await userEvent.type(form.querySelector("#second"), "2");
  await userEvent.selectOptions(form.querySelector("#operation"), ["add"]);

  await userEvent.click(canvas.getByRole("button"));

  await waitFor(() => {
    expect(canvasElement.querySelector("#result").innerText).toBe("3");
  });
};

