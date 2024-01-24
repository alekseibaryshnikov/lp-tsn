import {
  FormFields,
  PassStatus,
  PassType,
} from '@/pages/Passes/CreationDialog/types';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  InputGroup,
  SegmentedControl,
  TextArea,
} from '@blueprintjs/core';
import { FC, FormEvent, useState } from 'react';
import httpClient from '@/services/HttpClient';
import Toasts from '@/store/Toasts';
import { ApiResponse } from '@/core/types';
import { Spinner } from '@/pages/Passes/CreationDialog/Spinner';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  toasts: typeof Toasts;
  refresh: VoidFunction;
};

export const CreationDialog: FC<Props> = ({
  isOpen,
  onClose,
  toasts,
  refresh,
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [passStatus, setPassStatus] = useState<PassStatus>(PassStatus.oneTime);
  const [passType, setPassType] = useState<PassType>(PassType.car);
  const onSubmit = async (formEvent: FormEvent) => {
    setIsloading(true);
    formEvent.preventDefault();
    formEvent.stopPropagation();
    const formData = new FormData(formEvent.target as HTMLFormElement);
    formData.set(FormFields.vidPropusk, passStatus);
    formData.set(FormFields.vidAutoOrMan, passType);
    formData.set('action', 'createPass');

    try {
      const response = await httpClient.post<ApiResponse>('', formData);

      if (response.data.error) {
        toasts.addToast({
          message: response.data.error,
          intent: 'danger',
        });
        return;
      }

      toasts.addToast({
        message: 'Пропуск успешно создан',
        intent: 'success',
      });

      refresh();
      onClose();
    } catch (e) {
      toasts.addToast({
        message: 'Неизвестная ошибка. Попробуйте позже.',
        intent: 'danger',
      });
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Создание пропуска"
      style={{ margin: 'auto 15px', position: 'relative' }}
    >
      <form onSubmit={onSubmit}>
        <DialogBody>
          <Spinner isLoading={isLoading} />
          <FormGroup>
            <SegmentedControl
              options={[
                {
                  label: 'Разовый',
                  value: PassStatus.oneTime,
                },
                {
                  label: 'Временный',
                  value: PassStatus.temporary,
                  disabled: true,
                },
                {
                  label: 'Постоянный',
                  value: PassStatus.permanent,
                  disabled: true,
                },
              ]}
              defaultValue={passStatus}
              onValueChange={value => setPassStatus(value as PassStatus)}
            />
          </FormGroup>
          <FormGroup>
            <SegmentedControl
              options={[
                { label: 'Автомобиль', value: PassType.car },
                { label: 'Человек', value: PassType.human },
              ]}
              defaultValue={passType}
              onValueChange={value => setPassType(value as PassType)}
            />
          </FormGroup>
          {passType === PassType.human && (
            <FormGroup label="Ф.И.О *">
              <InputGroup
                type="text"
                name={FormFields.fio}
                required={passType === PassType.human}
              />
            </FormGroup>
          )}
          {passType === PassType.car && (
            <FormGroup label="Номер автомобиля *">
              <InputGroup
                type="text"
                name={FormFields.numberAuto}
                required={passType === PassType.car}
              />
            </FormGroup>
          )}
          <FormGroup label="Комментарий для оператора СКУД">
            <TextArea fill name={FormFields.comment} />
          </FormGroup>
          <FormGroup label="Комментарий для себя">
            <TextArea fill name={FormFields.comment2} />
          </FormGroup>
          <p>Поля, помеченные * обязательные</p>
        </DialogBody>
        <DialogFooter>
          <ButtonGroup style={{ gap: '15px' }}>
            <Button text="Отмена" onClick={onClose} />
            <Button text="Создать" intent="success" type="submit" />
          </ButtonGroup>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
