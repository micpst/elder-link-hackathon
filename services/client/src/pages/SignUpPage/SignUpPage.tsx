import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useGeolocated } from 'react-geolocated';

import { ISignUpFormValues } from '../../types/ISignUpFormValues';
import Input from '../../components/Input/Input';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { supabase } from '../../supabaseClient';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import { useAppDispatch } from '../../hooks/useRedux';
import { createProvider } from '../../redux/thunks/providerThunk';
import { IProvider } from '../../types/IProvider';

const SignUpPage = () => {
  const dispatch = useAppDispatch();
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

  const onSubmit: SubmitHandler<ISignUpFormValues> = async ({
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    age,
    gender,
    maxDistance,
    photo,
  }) => {
    try {
      if (password !== confirmPassword) return;
      if (!coords) return;
      setIsLoading(true);
      const { data, error } = await auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            phone,
          },
        },
      });
      if (error) throw error;
      const provider: IProvider = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        latitude: coords.latitude,
        longitude: coords.longitude,
        age: parseInt(age),
        gender,
        max_distance: parseInt(maxDistance),
        activities: ['SHOPPING', 'TRANSPORTATION'],
        photo,
      };
      dispatch(createProvider(provider));
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
        name="phone"
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: 'Numer telefonu jest wymagany',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Numer telefonu"
            type="text"
            placeholder="Wpisz numer telefonu"
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
      <Controller
        control={control}
        name="gender"
        rules={{
          required: {
            value: true,
            message: 'Należy wybrać płeć',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Płeć"
            type="text"
            placeholder="Wybierz płeć"
            value={value}
            onChange={onChange}
            error={errors.confirmPassword?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="age"
        rules={{
          required: {
            value: true,
            message: 'Należy podać wiek',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Wiek"
            type="number"
            placeholder="Podaj wiek"
            value={value}
            onChange={onChange}
            error={errors.confirmPassword?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="maxDistance"
        rules={{
          required: {
            value: true,
            message: 'Należy podać maksymalną odległość w obrębie której chcemy szukać seniorów',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Maksymalna odległość"
            type="number"
            placeholder="Podaj maksymalną odległość w km"
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
