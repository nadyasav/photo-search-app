import React, { memo, useEffect, useState } from 'react';
import { CustomInputFileProps } from 'types/customTypes';
import Error from '../error/Error';
import { DeleteBtn, FileBox, FileName, Input, Label, UploadBtn } from './CustomInputFile.styled';

const CustomInputFile = React.forwardRef<HTMLInputElement, CustomInputFileProps>((props, ref) => {
  const {
    error = '',
    inputFilesLength = 0,
    handleChange,
    deleteFile,
    styled,
    onBlur,
    fileName = '',
    btnText = '',
    ...inputProps
  } = props;

  const [filesLength, setFilesLength] = useState<number>(0);

  useEffect(() => {
    setFilesLength(inputFilesLength);
  }, [inputFilesLength]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      handleChange(e);
    }
    setFilesLength(e.currentTarget.files?.length as number);
  };

  return (
    <>
      <FileBox>
        <Label>
          <UploadBtn>{btnText}</UploadBtn>
          <Input
            ref={ref}
            onChange={handleOnChange}
            onBlur={onBlur}
            {...inputProps}
            {...styled}
            type="file"
          />
        </Label>
        <FileName>{fileName}</FileName>
        {filesLength > 0 && <DeleteBtn type="button" onClick={deleteFile}></DeleteBtn>}
      </FileBox>
      {error && <Error styled={styled?.error}>{error}</Error>}
    </>
  );
});

export default memo(CustomInputFile);
