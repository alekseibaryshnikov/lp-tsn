import { Pass as PassComponent } from '@/components/Pass';
import { isValid } from '@/core/pass.utils';
import { CreationDialog } from '@/pages/Passes/CreationDialog';
import { fetchAndSetPasses } from '@/pages/Passes/api';
import { Pass } from '@/pages/Passes/types';
import LocalStorageService from '@/services/LocalStorage';
import Toasts from '@/store/Toasts';
import { Alignment, Button, FormGroup, Icon, Switch } from '@blueprintjs/core';
import { FC, useEffect, useState } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import styles from './Passes.module.scss';

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

  const logOut = () => {
    LocalStorageService.removeAuthToken();
    window.location.reload();
  };

  const handleRefresh = () => fetchAndSetPasses(setPasses);

  useEffect(() => {
    handleRefresh();
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
          ? filteredPasses.map(pass => (
              <PassComponent pass={pass} key={pass.id} />
            ))
          : 'Ничего не найдено'}
        <CreationDialog
          isOpen={creationPassDialogVisible}
          onClose={toggleCreationPassDialog}
          toasts={toasts}
          refresh={handleRefresh}
        />
      </aside>
    </PullToRefresh>
  );
};

export default Passes;
