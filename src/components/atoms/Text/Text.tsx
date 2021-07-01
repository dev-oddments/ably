import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface TextProps {
  text: string;
  fontSetting?: string;
}

const Wrapper = styled.div<{ fontSetting: string }>`
  ${({ theme: { font }, fontSetting }) => font[fontSetting]};
`;
export default function Text({
  text,
  fontSetting = 'n14m',
}: TextProps): ReactElement {
  return <Wrapper fontSetting={fontSetting}>{text}</Wrapper>;
}
