import React, { useRef, useEffect } from 'react';
import Select from 'react-select/async';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

const AsyncSelect = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }

          return ref.select.state.value.map((option) => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }

        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Select
      cacheOptions
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
};

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AsyncSelect;
