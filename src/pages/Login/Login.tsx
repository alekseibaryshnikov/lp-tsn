import { FC, FormEvent, useState } from 'react';
import { Button, ControlGroup } from '@blueprintjs/core';
import { Action, FormValues, LoginRq } from './types';
import httpClient from '@/services/HttpClient';
import { observer } from 'mobx-react-lite';
import Toasts from '@/store/Toasts';
import { ApiResponse, Nullable } from '@/core/types';
import localStorage from '@/services/LocalStorage';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import Logo from '@/components/Logo';
import { CustomInputGroup } from '@/components/CustomInputGroup/CustomInputGroup.tsx';

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

    if (step > 0 && (formValues.codeSMS?.length ?? 0) < 6) {
      return true;
    }
  };

  const authRequest = async () => {
    const { phone, codeSMS } = formValues;

    if (!phone) {
      showToast('Введите номер телефона', 'danger');
      return;
    }

    if (step === Steps.Code && !codeSMS) {
      showToast('Введите код СМС', 'danger');
      return;
    }

    const action: Action =
      step === Steps.Phone ? 'firstStep-Phone' : 'secondStep-Code';

    const data: LoginRq = {
      action,
      phone,
      codeSMS,
      apiKey: null,
    };

    try {
      const response = await httpClient.post<ApiResponse>('', data);

      if (response.data.error) {
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

          localStorage.setAuthToken(response.data.token);
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
      <form onSubmit={onFormSubmit}>
        <ControlGroup fill>
          {step === Steps.Phone && (
            <CustomInputGroup
              type="phone"
              name="phone"
              placeholder="Телефон"
              onChange={event => {
                setFormValues(prev => ({
                  ...prev,
                  phone: event.target.value,
                }));
              }}
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
              clear={() => setFormValues(prev => ({ ...prev, codeSMS: '' }))}
            />
          )}
          <Button
            type="submit"
            intent="primary"
            text="Отправить"
            disabled={isFormInvalid()}
          />
        </ControlGroup>
      </form>
    </div>
  );
});

export type { Props };
export default Login;
