import styled from 'styled-components';

export const FileBox = styled.div<{ fileBox?: string }>`
  ${(props) =>
    props.fileBox ||
    `display: flex;
    align-items: center;
    @media (max-width: 350px) {
        flex-direction: column;
        align-items: flex-start;
    }`}
`;

export const Label = styled.label<{ label?: string }>`
  ${(props) =>
    props.label ||
    `margin-right: 10px;
    flex-shrink: 0;
    @media (max-width: 350px) {
        margin: 0 0 15px 0;
        width: 100%;
    }`}
`;

export const UploadBtn = styled.span<{ uploadBtn?: string }>`
  ${(props) =>
    props.uploadBtn ||
    `display: inline-block;
    text-align: center;
    border: 1px solid #b4b7bd;
    padding: 10px;
    border-radius: 9px;
    cursor: pointer;
    transition: background-color 0.1s ease-in-out;
    width: 100%;

    &:hover {
        background-color: #fafcff;
      }`}
`;

export const Input = styled.input`
  visibility: hidden;
  height: 1px;
  width: 1px;
  overflow: hidden;
  opacity: 0;
  position: absolute;
`;

export const DeleteBtn = styled.button`
  border: none;
  width: 17px;
  height: 17px;
  cursor: pointer;
  display: block;
  background: transparent;
  position: relative;
  margin-left: 5px;

  &:hover&::before,
  &:hover&::after {
    background-color: #fafcff;
  }

  &:active,
  &:focus {
    background: transparent;
  }

  &::before,
  &::after {
    transform: rotate(45deg);
    position: absolute;
    left: 50%;
    top: 0;
    content: '';
    height: 100%;
    width: 2px;
    background-color: #b4b7bd;
    transition: background-color 0.1s ease-in-out;
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

export const FileName = styled.span<{ fileName?: string }>`
  ${(props) => props.fileName || ``}
`;
