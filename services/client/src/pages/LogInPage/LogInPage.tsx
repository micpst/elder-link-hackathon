import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { supabase } from '../../supabaseClient';
import { ILoginFormValues } from '../../types/ILogInFormValues';
import Input from '../../components/Input/Input';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

const LogInPage = () => {
  const { auth } = supabase;

  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>();

  const onSubmit: SubmitHandler<ILoginFormValues> = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const { data, error } = await auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: 'Email jest wymagany',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Email"
            type="text"
            placeholder="Wpisz swój email"
            value={value}
            onChange={onChange}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: 'Hasło jest wymagane',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Hasło"
            type="password"
            placeholder="Wpisz hasło"
            value={value}
            onChange={onChange}
            error={errors.password?.message}
          />
        )}
      />
      <SubmitButton text="Zaloguj się" isLoading={isLoading} />
      <div className="flex gap-2 justify-center mt-4">
        <span>Nie masz jeszcze konta?</span>
        <Link to="/signup" className="font-semibold">
          Zarejstruj się.
        </Link>
      </div>
    </form>
  );
};

export default LogInPage;
