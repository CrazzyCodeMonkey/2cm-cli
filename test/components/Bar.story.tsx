import React from "react";
import Bar from "./Bar";

export default {
  title: "components/Bar",
  component: Bar,
};

export const story1 = () => <Bar />;
story1.storyName = "Basic render";
