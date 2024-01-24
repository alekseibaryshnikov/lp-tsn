import { FC, MouseEvent, useEffect, useState } from 'react';
import { Button, Dialog } from '@blueprintjs/core';
import styles from './PwaInstallNotification.module.scss';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

const PwaInstallNotification: FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const beforeInstallPromptListener = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const appInstalledListener = () => {
      setIsAppInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptListener);
    window.addEventListener('appinstalled', appInstalledListener);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptListener,
      );
      window.removeEventListener('appinstalled', appInstalledListener);
    };
  }, []);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();

    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    });
  };

  if (isAppInstalled) {
    return null;
  }

  return (
    <Dialog
      className={styles.PwaInstallNotification}
      isOpen={isOpen}
      onClose={() => setIsOpen(prev => !prev)}
      title={'Установить приложение'}
    >
      <div className={styles.buttonGroup}>
        <Button intent={'success'} onClick={handleClick} fill>
          Да
        </Button>
        <Button onClick={() => setIsOpen(prev => !prev)} fill>
          Нет
        </Button>
      </div>
    </Dialog>
  );
};

export default PwaInstallNotification;
