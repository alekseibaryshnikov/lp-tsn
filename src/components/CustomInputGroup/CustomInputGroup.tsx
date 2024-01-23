import { FC } from 'react';
import { InputGroup, InputGroupProps } from '@blueprintjs/core';
import ClearInput from '@/components/CustomInputGroup/ClearInput';
import { omit } from 'lodash';

type Props = {
  clear?: VoidFunction;
} & InputGroupProps;

export const CustomInputGroup: FC<Props> = props => {
  return (
    <InputGroup
      {...omit(props, ['clear'])}
      rightElement={props.clear && <ClearInput clear={props.clear} />}
    />
  );
};
