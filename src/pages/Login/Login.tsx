import { FC, FormEvent, useRef, useState } from 'react';
import { Button, ButtonGroup, FormGroup } from '@blueprintjs/core';
import { Action, FormValues, LoginRq } from './types';
import httpClient from '@/services/HttpClient';
import { observer } from 'mobx-react-lite';
import Toasts from '@/store/Toasts';
import { ApiResponse, Nullable } from '@/core/types';
import LocalStorage from '@/services/LocalStorage';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import Logo from '@/components/Logo';
import { CustomInputGroup } from '@/components/CustomInputGroup';

type Props = {
  toasts: typeof Toasts;
};

const enum Steps {
  Phone = 0,
  Code = 1,
}

const Login: FC<Props> = observer(({ toasts }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    phone: '',
    codeSMS: '',
  });
  const [step, setStep] = useState(Steps.Phone);
  const nextStep = () => setStep(prev => prev + 1);
  const reset = () => setStep(Steps.Phone);
  const navigate = useNavigate();
  const ref = useRef<HTMLFormElement>(null);

  const showToast = (
    message: Nullable<string>,
    intent: 'danger' | 'success',
  ) => {
    toasts.addToast({
      message: message ?? 'Неизвестная ошибка. Попробуйте позже.',
      intent,
    });
  };

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (step === Steps.Code) {
      reset();
    }

    await authRequest();
  };

  const isFormInvalid = () => {
    if ((formValues.phone?.length ?? 0) < 11) {
      return true;
    }

    if (step > 0 && (formValues.codeSMS?.length ?? 0) < 4) {
      return true;
    }
  };

  const authRequest = async () => {
    if (isFormInvalid()) {
      console.warn('form is invalid', formValues);
      return;
    }

    const { phone, codeSMS } = formValues;
    const action: Action =
      step === Steps.Phone ? 'firstStep-Phone' : 'secondStep-Code';

    const data: LoginRq = {
      action,
      phone,
      codeSMS,
    };

    try {
      const response = await httpClient.post<ApiResponse>('', data);

      if (response.data.error) {
        if (response.data.error === 20) {
          nextStep();
        }

        showToast(response.data.errorText, 'danger');
        return;
      }

      switch (step) {
        case Steps.Phone:
          nextStep();
          break;
        case Steps.Code:
          if (!response.data.token) {
            showToast('Неизвестная ошибка. Попробуйте позже.', 'danger');
            return;
          }

          LocalStorage.setAuthToken(response.data.token);
          showToast('Вы успешно вошли в систему', 'success');
          setStep(Steps.Phone);
          navigate('/');
          break;
      }
    } catch (error: unknown) {
      showToast((error as Error).message, 'danger');
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <form onSubmit={onFormSubmit} ref={ref}>
        <FormGroup fill>
          {step === Steps.Phone && (
            <CustomInputGroup
              type="number"
              name="phone"
              placeholder="Телефон"
              onChange={event => {
                setFormValues(prev => ({
                  ...prev,
                  phone: event.target.value,
                }));
              }}
              value={formValues.phone}
              clear={() => setFormValues(prev => ({ ...prev, phone: '' }))}
            />
          )}
          {step === Steps.Code && (
            <CustomInputGroup
              type="number"
              name="codeSMS"
              maxLength={6}
              placeholder="Код СМС"
              onChange={event => {
                setFormValues({
                  ...formValues,
                  codeSMS: event.target.value,
                });
              }}
              value={formValues.codeSMS}
              clear={() => setFormValues(prev => ({ ...prev, codeSMS: '' }))}
            />
          )}
        </FormGroup>
        <ButtonGroup fill>
          <Button
            type="submit"
            intent="primary"
            text="Отправить"
            disabled={isFormInvalid()}
          />
        </ButtonGroup>
      </form>
    </div>
  );
});

export type { Props };
export default Login;
