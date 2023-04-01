import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useGeolocated } from 'react-geolocated';

import { ISignUpFormValues } from '../../types/ISignUpFormValues';
import Input from '../../components/Input/Input';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { supabase } from '../../supabaseClient';
import ImageUpload from '../../components/ImageUpload/ImageUpload';

const SignUpPage = () => {
  const { auth } = supabase;
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormValues>();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  console.log(coords);

  const onSubmit: SubmitHandler<ISignUpFormValues> = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }) => {
    try {
      if (password !== confirmPassword) return;
      setIsLoading(true);
      const { data, error } = await auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4 mt-16 md:w-96">
      <h1 className="font-bold text-center text-2xl text-green-400">Zarejestruj się.</h1>
      <Controller
        control={control}
        name="photo"
        rules={{
          required: {
            value: true,
            message: 'Zdjęcie jest wymagane',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <ImageUpload value={value} onChange={onChange} />
        )}
      />
      <Controller
        control={control}
        name="firstName"
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: 'Imię jest wymagane',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Imię"
            type="text"
            placeholder="Wpisz imię"
            value={value}
            onChange={onChange}
            error={errors.firstName?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="lastName"
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: 'Nazwisko jest wymagane',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Nazwisko"
            type="text"
            placeholder="Wpisz nazwisko"
            value={value}
            onChange={onChange}
            error={errors.lastName?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
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
            placeholder="Wpisz email"
            value={value}
            onChange={onChange}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
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
      <Controller
        control={control}
        name="confirmPassword"
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: 'Należy potwierdzić hasło',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Powtórz hasło"
            type="password"
            placeholder="Wpisz hasło ponownie"
            value={value}
            onChange={onChange}
            error={errors.confirmPassword?.message}
          />
        )}
      />
      <SubmitButton text="Zarejestruj się" isLoading={isLoading} />
      <div className="flex gap-2 justify-center mt-4">
        <span>Masz już konto?</span>
        <Link to="/login" className="font-semibold">
          Zaloguj się.
        </Link>
      </div>
    </form>
  );
};

export default SignUpPage;
