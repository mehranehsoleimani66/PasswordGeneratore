"use client";

import styled from "styled-components";
export const Wrapper = styled.div`
  background-color: white;
  width: 700px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10px;
  gap: 30px;
  border-radius: 10px;

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0;
    width: 450px;
  }
  .password-input-wrapper {
    width: 450px;

    position: relative;
    display: flex;

    flex-wrap: wrap;
  }
  .input {
    width: 330px;
    border-radius: 10px;
    line-height: 40px;
    cursor: text;
  }
  .refresh {
    position: absolute;
    right: 28%;
    top: 20%;
    cursor: pointer;

  }
  .copy-btn {
    width: 90px;
    padding: 9px;
    border-radius: 10px;
    background-color: var(--primary-color);
    cursor: pointer;
  }
  .slider-section {
    display: flex;
    justify-content: start;
    flex-direction: column;
    width: 450px;
  }
  .elements {
    width: 450px;
    display: flex;
    flex-direction: column;
  }
  .checkbox-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
  .input-range {
   accent-color: var(--primary-color);
   
  }
`;
