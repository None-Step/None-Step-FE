import React, { useState } from 'react';
import styled from 'styled-components';

const Clode = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // ID 검증
    if (formData.id.length < 4 || formData.id.length > 12) {
      newErrors.id = '아이디는 4-12자여야 합니다.';
      isValid = false;
    } else {
      newErrors.id = '';
    }

    // 비밀번호 검증
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = '비밀번호는 8-16자의 대소문자, 숫자, 특수문자를 포함해야 합니다.';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    // 비밀번호 확인
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    } else {
      newErrors.passwordConfirm = '';
    }

    // 이름 검증
    if (formData.name.length < 2) {
      newErrors.name = '이름은 두 글자 이상이어야 합니다.';
      isValid = false;
    } else {
      newErrors.name = '';
    }

    // 이메일 검증
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    // 휴대폰 번호 검증
    if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = '휴대폰 번호는 11자리 숫자여야 합니다.';
      isValid = false;
    } else {
      newErrors.phone = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Logo>이호선</Logo>
      <Title>회원가입</Title>
      
      <InputGroup>
        <Label>아이디</Label>
        <Input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디"
        />
        <ConfirmButton type="button">확인</ConfirmButton>
        {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label>비밀번호</Label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Input
          type="password"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          placeholder="비밀번호 확인"
        />
        <ConfirmButton type="button">비밀번호 확인</ConfirmButton>
        {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label>이름</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름"
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label>이메일</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일"
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label>휴대폰 번호</Label>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="휴대폰 번호"
        />
        <ConfirmButton type="button">인증</ConfirmButton>
        {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
      </InputGroup>

      <Input
        type="text"
        placeholder="인증번호"
      />

      <SubmitButton type="submit">회원가입</SubmitButton>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ConfirmButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 18px;
`;

export default Clode;