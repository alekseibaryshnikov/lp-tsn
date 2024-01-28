import { Spinner as BSpinner } from '@blueprintjs/core';
import { FC } from 'react';
import styles from './Spinner.module.scss';

type Props = {
  isLoading: boolean;
};

export const Spinner: FC<Props> = ({ isLoading }) => {
  return isLoading ? (
    <aside className={styles.Spinner}>
      <BSpinner />
    </aside>
  ) : null;
};
