import { Button, Dialog } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import styles from './UpdatePWA.module.scss';

const UpdatePWA: React.FC = () => {
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );

  const onReload = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  };

  useEffect(() => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker?.addEventListener('statechange', () => {
          if (
            newWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            setWaitingWorker(newWorker);
            setShowReload(true);
          }
        });
      });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }, []);

  return (
    <Dialog isOpen={showReload}>
      <div className={styles.UpdatePWA}>
        <div className={styles.title}>Доступно новое обновление.</div>
        <div className={styles.buttons}>
          <Button fill intent="success" onClick={onReload}>
            Обновить
          </Button>
          <Button fill onClick={() => setShowReload(false)}>
            Закрыть
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdatePWA;
