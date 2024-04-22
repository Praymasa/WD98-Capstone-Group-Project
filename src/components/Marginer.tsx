import React from "react";
import styled from "styled-components";

interface MarginerProps {
  direction?: "horizontal" | "vertical";
  $margin?: string | number;
}

const HorizontalMargin = styled.span<MarginerProps>`
  display: flex;
  width: ${({ $margin }) =>
    typeof $margin === "string" ? $margin : `${$margin}px`};
`;

const VerticalMargin = styled.span<MarginerProps>`
  display: flex;
  height: ${({ $margin }) =>
    typeof $margin === "string" ? $margin : `${$margin}px`};
`;

function Marginer(props: MarginerProps) {
  const { direction } = props;

  if (direction === "horizontal") return <HorizontalMargin {...props} />;
  else {
    return <VerticalMargin {...props} />;
  }
}

Marginer.defaultProps = {
  direction: "horizontal",
};

export { Marginer };
