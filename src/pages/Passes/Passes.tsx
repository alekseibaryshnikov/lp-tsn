import { FC, useEffect, useReducer, useState } from 'react';
import { Pass } from '@/pages/Passes/types.ts';
import httpClient from '@/services/HttpClient/HttpClient.ts';
import {
  Alignment,
  Button,
  Card,
  FormGroup,
  Icon,
  Navbar,
  Switch,
} from '@blueprintjs/core';
import styles from './Passes.module.scss';
import { Nullable } from '@/core/types.ts';
import * as classNames from 'classnames';
import { sortByDate } from '@/core/date.utils.ts';
import Toasts from '@/store/Toasts.ts';
import { CreationDialog } from '@/pages/Passes/CreationDialog/CreationDialog';
import LocalStorageService from '@/services/LocalStorage';
import { Comment } from '@/pages/Passes/Comment/Comment.tsx';

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

  useEffect(() => {
    httpClient
      .post('', { action: 'getPassList' })
      .then(response => {
        const passList = response.data.data as Pass[];

        const expired = sortByDate(
          passList.filter(
            pass => pass.date_end && new Date(pass.date_end) < new Date(),
          ),
          'date_end',
          true,
        );

        const active = passList.filter(
          pass => !expired.some(item => item.id === pass.id),
        );

        const temporary = sortByDate(
          active.filter(pass => pass.date_end),
          'date_end',
          true,
        );

        const permanent = sortByDate(
          active.filter(pass => !pass.date_end),
          'date_start',
          true,
        );

        setPasses([...temporary, ...permanent, ...expired]);
      })
      .catch(error => {
        console.log(error);

        toasts.addToast({
          message: error.message,
          intent: 'danger',
        });
      });
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
    <aside className={styles.Passes}>
      <Navbar fixedToTop className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <Navbar.Group align="left">
            <Button
              intent="success"
              text="Заказать пропуск"
              onClick={toggleCreationPassDialog}
            />
          </Navbar.Group>
          <Navbar.Group align="right">
            <Button
              text={<Icon icon="log-out" />}
              onClick={logOut}
              active={false}
              intent="primary"
            />
          </Navbar.Group>
        </div>
      </Navbar>
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
                  [styles.inService]: isValid(pass.date_end, pass.date_arrival),
                  [styles.expired]: !isValid(pass.date_end, pass.date_arrival),
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
  );
};

export default Passes;
