import { Button, Dialog } from '@blueprintjs/core';
import React, { useState, useEffect, MouseEvent } from 'react';
import styles from './InstallPWA.module.scss';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPWA: React.FC = () => {
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler as any);

    return () =>
      window.removeEventListener('beforeinstallprompt', handler as any);
  }, []);

  const onClick = (evt: MouseEvent) => {
    evt.preventDefault();
    promptInstall?.prompt();
  };

  if (!promptInstall) {
    return null;
  }

  return (
    <Dialog isOpen>
      <div className={styles.InstallPWA}>
        <div className={styles.title}>Установить приложение?</div>
        <div className={styles.buttons}>
          <Button onClick={onClick} intent="success">
            Установить
          </Button>
          <Button onClick={() => setPromptInstall(null)} intent="danger">
            Закрыть
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default InstallPWA;
