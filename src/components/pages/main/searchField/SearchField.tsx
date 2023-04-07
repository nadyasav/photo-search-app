import React, { memo, useEffect, useRef } from 'react';
import { ISearchFieldProps } from '../../../../types/customTypes';
import styles from './SearchFeald.module.css';
import BaseBtn from 'components/baseBtn/BaseBtn';

function SearchField(props: ISearchFieldProps) {
  const searchFieldValueRef = useRef<HTMLInputElement>(null);

  const handleInputValue = () => {
    if (searchFieldValueRef.current) {
      props.sendInputValue(searchFieldValueRef.current.value);
    }
  };

  useEffect(() => {
    const currentRef = searchFieldValueRef.current;
    return () => {
      if (currentRef) {
        localStorage.setItem('searchFieldValue', currentRef.value);
      }
    };
  }, []);

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleInputValue();
    }
  };

  return (
    <div className={styles.search_box}>
      <input
        ref={searchFieldValueRef}
        data-testid="searchInput"
        type="search"
        className={styles.search_input}
        defaultValue={props.searchValue}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
      />
      <span className={styles.search_btn__box}>
        <BaseBtn type="button" onClick={handleInputValue} data-testid="searchBtn">
          Search
        </BaseBtn>
      </span>
    </div>
  );
}

export default memo(SearchField);
