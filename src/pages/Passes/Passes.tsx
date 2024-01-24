import { FC, useEffect, useReducer, useState } from 'react';
import { Pass } from '@/pages/Passes/types';
import {
  Alignment,
  Button,
  Card,
  FormGroup,
  Icon,
  Switch,
} from '@blueprintjs/core';
import styles from './Passes.module.scss';
import { Nullable } from '@/core/types';
import Toasts from '@/store/Toasts';
import { CreationDialog } from '@/pages/Passes/CreationDialog';
import LocalStorageService from '@/services/LocalStorage';
import { Comment } from '@/pages/Passes/Comment';
import classNames from 'classnames';
import { fetchAndSetPasses } from '@/pages/Passes/api';
import PullToRefresh from 'react-simple-pull-to-refresh';

type Props = {
  toasts: typeof Toasts;
};

const Passes: FC<Props> = ({ toasts }) => {
  const [creationPassDialogVisible, setCreationPassDialogVisible] =
    useState(false);
  const toggleCreationPassDialog = () =>
    setCreationPassDialogVisible((prev: boolean) => !prev);

  const [passes, setPasses] = useState<Pass[]>([]);
  const [filteredPasses, setFilteredPasses] = useState<Pass[]>([]);
  const [onlyActive, setOnlyActive] = useState(false);
  const toggleOnlyActive = () => setOnlyActive((prev: boolean) => !prev);

  const [permanent, setPermanent] = useState(true);
  const togglePermanent = () => setPermanent((prev: boolean) => !prev);

  const [temporary, setTemporary] = useState(true);
  const toggleTemporary = () => setTemporary((prev: boolean) => !prev);
  const [, refresh] = useReducer(x => x + 1, 0);
  const logOut = () => {
    LocalStorageService.removeAuthToken();
    window.location.reload();
  };

  const handleRefresh = () => {
    return fetchAndSetPasses(setPasses);
  };

  useEffect(() => {
    fetchAndSetPasses(setPasses).then();
  }, []);

  useEffect(() => {
    setFilteredPasses(
      passes.filter(pass => {
        if (onlyActive && !isValid(pass.date_end, pass.date_arrival)) {
          return false;
        }

        if (permanent && !pass.date_end) {
          return true;
        }

        return !!(temporary && pass.date_end);
      }),
    );
  }, [passes, onlyActive, permanent, temporary]);

  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  const formatCarPlate = (carPlate: string) =>
    carPlate.replace(/[^A-Za-z0-9А-Яа-я]/g, '');

  const isValid = (endDate: Nullable<string>, arrived: Nullable<string>) => {
    if (!endDate) {
      return true;
    }

    return new Date(endDate) >= new Date() && !arrived;
  };

  const title = (pass: Pass) => (pass.date_end ? 'Разовый' : 'Постоянный');

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <aside className={styles.Passes}>
        <div className={styles.navbar}>
          <Button
            intent="success"
            text="Заказать пропуск"
            onClick={toggleCreationPassDialog}
          />
          <Button
            text={<Icon icon="log-out" />}
            onClick={logOut}
            active={false}
            intent="primary"
          />
        </div>
        <FormGroup className={styles.filterBar}>
          <Switch
            alignIndicator={Alignment.LEFT}
            inline
            label="Активные"
            checked={onlyActive}
            onChange={toggleOnlyActive}
          />
          <Switch
            alignIndicator={Alignment.LEFT}
            inline
            label="Постоянные"
            checked={permanent}
            onChange={togglePermanent}
          />
          <Switch
            alignIndicator={Alignment.LEFT}
            inline
            label="Временные"
            checked={temporary}
            onChange={toggleTemporary}
          />
        </FormGroup>
        {filteredPasses.length > 0
          ? filteredPasses.map(pass => {
              return (
                <Card
                  key={pass.id}
                  elevation={2}
                  className={classNames(styles.card, {
                    [styles.inService]: isValid(
                      pass.date_end,
                      pass.date_arrival,
                    ),
                    [styles.expired]: !isValid(
                      pass.date_end,
                      pass.date_arrival,
                    ),
                  })}
                >
                  <div className={styles.title}>{title(pass)}</div>
                  {pass.pass_name && (
                    <div className={styles.name}>{pass.pass_name}</div>
                  )}
                  {pass.number_auto && (
                    <div className={styles.carPlate}>
                      {formatCarPlate(pass.number_auto)}
                    </div>
                  )}
                  {pass.date_start && (
                    <div>
                      Дата начала:{' '}
                      <strong>{formatDate(pass.date_start)}</strong>
                    </div>
                  )}
                  {pass.date_end && (
                    <div>
                      Дата окончания:{' '}
                      <strong>{formatDate(pass.date_end)}</strong>
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
                    <Comment
                      title="Комментарий для себя:"
                      comment={pass.comment2}
                    />
                  )}
                </Card>
              );
            })
          : 'Ничего не найдено'}
        <CreationDialog
          isOpen={creationPassDialogVisible}
          onClose={toggleCreationPassDialog}
          toasts={toasts}
          refresh={refresh}
        />
      </aside>
    </PullToRefresh>
  );
};

export default Passes;
