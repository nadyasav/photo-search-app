import React, { memo, useEffect } from 'react';
import styles from './Form.module.css';
import { IFormData, IFormProps } from '../../../../types/customTypes';
import { ERROR_TEXT } from 'constants/constants';
import BaseBtn from 'components/baseBtn/BaseBtn';
import getDateFormatted from './getDateFormatted';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CustomInput,
  CustomSelect,
  CustomInputFile,
  CustomRadioBtn,
  CustomCheckbox,
} from 'components';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import {
  setFile,
  setFileName,
  setFormData,
  resetForm,
  setFormState,
  setErrors,
} from 'store/formSlice';

function Form(props: IFormProps) {
  const dispatch = useAppDispatch();
  const { form, fileName, isformChanged, formErrors } = useAppSelector((state) => state.form);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    trigger,
  } = useForm<IFormData>({
    defaultValues: {
      ...form,
    },
    mode: formErrors ? 'onChange' : 'onSubmit',
  });
  const watchFile = watch('file', '');
  const dateMin = getDateFormatted(new Date(), 150);
  const dateMax = getDateFormatted(new Date());

  useEffect(() => {
    if (formErrors) {
      trigger();
    }
  }, []);

  useEffect(() => {
    if (watchFile) {
      if (watchFile.length) {
        if (typeof watchFile !== 'string') {
          const name = (watchFile[0] as unknown as File).name;
          dispatch(setFileName(name));
          uploadFile({ ...getValues() }).then((name) => {
            const file = name as string;
            dispatch(setFile(file));
          });
        }
      } else {
        dispatch(setFileName(ERROR_TEXT.fileNotSelected));
      }
    }
  }, [dispatch, getValues, watchFile]);

  useEffect(() => {
    return () => {
      const { firstName, lastName, dateOfBirth, gender, country, agree } = { ...getValues() };
      dispatch(setFormData({ firstName, lastName, dateOfBirth, gender, country, agree }));
      dispatch(setErrors(!!Object.keys(errors).length));
    };
  }, [dispatch, getValues, errors]);

  function uploadFile(data: IFormData) {
    const promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(data.file[0] as unknown as Blob);
    });

    return promise;
  }

  const handleFormSubmit: SubmitHandler<IFormData> = (data) => {
    data.file = form.file;
    props.sendData(data);

    dispatch(resetForm());
    reset({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      country: '',
      gender: '',
      agree: '',
      file: '',
    });
    setFileName(ERROR_TEXT.fileNotSelected);
    dispatch(setFormState(false));
  };

  const handleFormChange = () => {
    dispatch(setFormState(true));
  };

  function deleteFile() {
    dispatch(setFile(''));
    setValue('file', '');
    dispatch(setFileName(ERROR_TEXT.fileNotSelected));
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      onChange={handleFormChange}
      className={styles.form}
      data-testid="formRegistration"
    >
      <div className={`${styles.input__box} ${styles.col_2}`}>
        <h3 className={styles.input__title}>First Name</h3>
        <CustomInput
          {...register('firstName', {
            required: ERROR_TEXT.empty,
            pattern: { value: /^[ a-zA-Zа-яА-Я\-\']+$/, message: ERROR_TEXT.symbols },
          })}
          error={errors.firstName?.message}
          name="firstName"
          type="text"
          data-testid="formFName"
        />
      </div>
      <div className={`${styles.input__box} ${styles.col_2}`}>
        <h3 className={styles.input__title}>Last Name</h3>
        <CustomInput
          {...register('lastName', {
            required: ERROR_TEXT.empty,
            pattern: { value: /^[ a-zA-Zа-яА-Я\-\']+$/, message: ERROR_TEXT.symbols },
          })}
          error={errors.lastName?.message}
          name="lastName"
          type="text"
          data-testid="formLName"
        />
      </div>
      <div className={`${styles.input__box} ${styles.col_2}`}>
        <h3 className={styles.input__title}>Date of Birth</h3>
        <CustomInput
          {...register('dateOfBirth', {
            required: ERROR_TEXT.date,
            min: { value: dateMin, message: ERROR_TEXT.dateRange + dateMin + ` - ` + dateMax },
            max: { value: dateMax, message: ERROR_TEXT.dateRange + dateMin + ` - ` + dateMax },
          })}
          error={errors.dateOfBirth?.message}
          min={dateMin}
          max={dateMax}
          name="dateOfBirth"
          type="date"
          data-testid="formDate"
        />
      </div>
      <div className={`${styles.input__box} ${styles.col_2}`}>
        <h3 className={styles.input__title}>Country</h3>
        <CustomSelect
          {...register('country', {
            required: ERROR_TEXT.country,
          })}
          error={errors.country?.message}
          name="country"
          data-testid="formCountry"
          options={[
            { value: '', text: 'Select Country', hidden: true },
            { value: 'Belarus', text: 'Belarus' },
            { value: 'USA', text: 'USA' },
            { value: 'Iceland', text: 'Iceland' },
          ]}
        />
      </div>
      <div className={`${styles.input__box} ${styles.col_2}`}>
        <h3 className={styles.input__title}>Profile Picture</h3>
        <CustomInputFile
          {...register('file', {
            validate: (value) => value.length > 0 || ERROR_TEXT.file,
          })}
          error={errors.file?.message}
          fileName={fileName}
          btnText="Upload picture"
          name="file"
          accept=".jpg, .jpeg, .png"
          data-testid="formFile"
          deleteFile={deleteFile}
          inputFilesLength={getValues().file.length}
        />
      </div>
      <div className={styles.input__box}>
        <h3 className={styles.input__title}>Gender</h3>
        <CustomRadioBtn
          {...register('gender', {
            required: ERROR_TEXT.switcher,
          })}
          error={errors.gender?.message}
          buttons={[{ value: 'male' }, { value: 'female' }]}
          name="gender"
        />
      </div>
      <div className={styles.input__box}>
        <p className={styles.input_text}>I agree to the processing of my personal data.</p>
        <CustomCheckbox
          {...register('agree', {
            required: ERROR_TEXT.agree,
          })}
          error={errors.agree?.message}
          name="agree"
          data-testid="formAgree"
          value="yes"
        />
      </div>
      <div className={styles.form_btn__box}>
        <BaseBtn
          disabled={!isformChanged || !!Object.keys(errors).length}
          type="submit"
          data-testid="formRegistrBtn"
        >
          Submit
        </BaseBtn>
      </div>
    </form>
  );
}

export default memo(Form);
