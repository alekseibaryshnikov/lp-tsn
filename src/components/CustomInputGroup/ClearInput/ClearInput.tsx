import { Button } from '@blueprintjs/core';
import { FC } from 'react';

type Props = {
  clear: VoidFunction;
};
export const ClearInput: FC<Props> = ({ clear }) => {
  return <Button onClick={clear} icon="cross" minimal />;
};
