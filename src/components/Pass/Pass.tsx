import { Comment } from '@/pages/Passes/Comment';
import { Pass as PassType } from '@/pages/Passes/types';
import { Card } from '@blueprintjs/core';
import classNames from 'classnames';
import { FC, useMemo } from 'react';
import styles from './Pass.module.scss';

type Props = {
  pass: PassType;
};

export const Pass: FC<Props> = ({ pass }) => {
  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  const title = (pass: PassType) => (pass.date_end ? 'Разовый' : 'Постоянный');

  const formatCarPlate = (carPlate: string) =>
    carPlate.replace(/[^A-Za-z0-9А-Яа-я]/g, '');

  const status = useMemo(() => {
    if (!pass.date_end) {
      return 'permanent';
    }

    const dateNow = new Date();

    if (dateNow > new Date(pass.date_end) && !pass.date_arrival) {
      return 'expired';
    }

    if (pass.date_arrival) {
      return 'success';
    }

    return 'awaiting';
  }, [pass.date_arrival, pass.date_end]);

  const subTitle = useMemo(() => {
    if (status === 'permanent') {
      return;
    }

    if (status === 'expired') {
      return 'Срок действия истек';
    }

    if (status === 'success') {
      return 'Прибыл';
    }

    if (status === 'awaiting') {
      return 'Ожидание';
    }
  }, [status]);

  return (
    <Card key={pass.id} elevation={2} className={styles.Pass}>
      <div className={styles.title}>
        {<span>{title(pass)}</span>}
        <span
          className={classNames({
            [styles.awaiting]: status === 'awaiting',
            [styles.success]: status === 'success',
            [styles.expired]: status === 'expired',
          })}
        >
          {subTitle}
        </span>
      </div>
      {pass.pass_name && <div className={styles.name}>{pass.pass_name}</div>}
      {pass.number_auto && (
        <div className={styles.carPlate}>
          {formatCarPlate(pass.number_auto)}
        </div>
      )}
      {pass.date_start && (
        <div>
          Дата начала: <strong>{formatDate(pass.date_start)}</strong>
        </div>
      )}
      {pass.date_end && (
        <div>
          Дата окончания: <strong>{formatDate(pass.date_end)}</strong>
        </div>
      )}
      {pass.date_arrival && (
        <div>Дата прибытия: {formatDate(pass.date_arrival)}</div>
      )}
      {pass.comment && (
        <Comment
          title="Комментарий для оператора СКУД:"
          comment={pass.comment}
        />
      )}
      {pass.comment2 && (
        <Comment title="Комментарий для себя:" comment={pass.comment2} />
      )}
    </Card>
  );
};
