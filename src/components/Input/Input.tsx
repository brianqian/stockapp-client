import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.form``;

interface Props {
  handleSubmit: (value: string) => void;
}

const Input = ({ handleSubmit }: Props) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toUpperCase());
  };

  // const handleSubmit = (value: string) => {
  //   dispatch({ type: action, payload: value });
  // };

  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault();
        console.log('value', value);
        handleSubmit(value);
      }}
    >
      <input value={value} onChange={handleChange} />
      <button type="button" onClick={() => handleSubmit(value)}>
        Submit
      </button>
    </Container>
  );
};
export default Input;
