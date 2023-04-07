import React, { memo } from 'react';
import styled from 'styled-components';

type ErrorProps = {
  children: React.ReactNode;
  styled?: string;
};

const ErrorEl = styled.p<{ styled?: string }>`
  ${(props) =>
    props.styled ||
    `color: var(--form-errors);
    font-size: 12px;
    position: absolute;
    bottom: -16px;
    left: 0;`}
`;

function Error(props: ErrorProps) {
  return <ErrorEl {...props}>{props.children}</ErrorEl>;
}

export default memo(Error);
