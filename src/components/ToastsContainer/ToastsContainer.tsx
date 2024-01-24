import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import Toasts from '@/store/Toasts';
import { OverlayToaster, Toast } from '@blueprintjs/core';

type Props = {
  toasts: typeof Toasts;
};

export const ToastsContainer: FC<Props> = observer(({ toasts }) => {
  return (
    <OverlayToaster>
      {toasts.toasts.map((toast, index) => (
        <Toast
          {...toast}
          timeout={5000}
          onDismiss={() => toasts.removeToast(toast)}
          key={index}
        />
      ))}
    </OverlayToaster>
  );
});
