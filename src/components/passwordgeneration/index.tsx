"use client";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css'
import Image from "next/image";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { Wrapper } from "./styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
interface PasswordFields {
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  specialChars: boolean;
}

interface Iprops extends HTMLAttributes<HTMLDivElement> {}

const PasswordRegistration: FC<Iprops> = () => {
  const [passwordLength, setPasswordLength] = useState<number>(10);
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<{
    strength: string;
    classname: string;
  }>({ strength: "", classname: "" });
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [checkboxStates, setCheckboxStates] = useState<PasswordFields>({
    upper: true,
    lower: false,
    numbers: true,
    specialChars: false
  });

  const { upper, lower, numbers, specialChars } = checkboxStates;

  const onChangePasswordLength = (value: any) => {
    setPasswordLength(value);
  };

  const generatePassword = () => {
    console.log("hey");
    let charSet = "";

    if (upper) {
      charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (lower) {
      charSet += "abcdefghijklmnopqrstuvwxyz";
    }
    if (specialChars) {
      charSet += "!@#$%^&*()";
    }
    if (numbers) {
      charSet += "0123456789";
    }

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      password += charSet[Math.floor(Math.random() * charSet.length)];
    }

    setPassword(password);
    evaluatePasswordStrength(password);
  };

  const evaluatePasswordStrength = (password: string) => {
    const strengthRegexes = [/[A-Z]/, /[a-z]/, /[!@#$%^&*()]/, /[0-9]/];

    let strength = 0;
    let passwordStrength: string;
    let classname: string;

    if (password.length < 8) {
      passwordStrength = "Too Short";
      classname = "danger";
    } else {
      strengthRegexes.forEach((regex) => {
        if (regex.test(password)) {
          strength++;
        }
      });

      if (strength < 3) {
        passwordStrength = "Weak";
        classname = "danger";
      } else if (strength < 4) {
        passwordStrength = "Medium";
        classname = "warning";
      } else {
        passwordStrength = "Strong";
        classname = "success";
      }
    }

    setPasswordStrength({ strength: passwordStrength, classname });
  };

  const handlePasswordFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxStates((prev) => ({ ...prev, [name]: checked }));
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => generatePassword(), []);

  useEffect(() => {
    if (!upper && !lower && !numbers && !specialChars) {
      setCheckboxStates({
        upper: false,
        lower: true,
        numbers: false,
        specialChars: false
      });
    }
  }, [checkboxStates]);

  const copyPassword = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const { strength, classname } = passwordStrength;

  return (
    <Wrapper>
      <div className="img">
        <Image
          src="/assets/gif/password.gif"
          width={100}
          height={100}
          alt="Picture of the author"
        />
        <h1>PASSWORD GENERATOR</h1>
        <span>
          Ensure online account safety by creating strong and secure passwords
        </span>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input
            className="input"
            type="text"
            placeholder="your password"
            value={password}
            onChange={onChangePassword}
          />

          <Image
            onClick={generatePassword}
            className="refresh"
            src="/assets/icons/refresh.svg"
            width={20}
            height={20}
            alt="refresh"
          />
        </div>
        <div className="ml-1">
          <CopyToClipboard text={password} onCopy={copyPassword}>
            <button className="copy-btn">
              <Image
                src="/assets/icons/copy.svg"
                width={20}
                height={20}
                alt="copy"
              />

              {isCopied ? "Copied" : "Copy"}
            </button>
          </CopyToClipboard>
        </div>
        <div>
          <span className={`${classname} fw-500`}>{strength}</span>
        </div>
      </div>

      <div className="slider-section">
        <label className="flex justify-start items-center ">
          <p>Password Length:</p>
          <span>{passwordLength}</span>
        </label>
        <Slider
          type="range"
          className="input-range"
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
        />
      </div>
      <div className="elements">
        <div className="checkbox-wrapper">
          <label>lowercase</label>
          <input
            type="checkbox"
            className="input-range"
            id="lowercase"
            checked={lower}
            name="lower"
            onChange={handlePasswordFields}
          ></input>
        </div>
        <div className="checkbox-wrapper">
          <label>Uppercase</label>
          <input
            type="checkbox"
            id="uppercase"
            checked={upper}
            name="upper"
            onChange={handlePasswordFields}
            className="input-range"
          ></input>
        </div>
        <div className="checkbox-wrapper">
          <label>number</label>
          <input
            type="checkbox"
            className="input-range"
            id="number"
            checked={numbers}
            name="number"
            onChange={handlePasswordFields}
          ></input>
        </div>
        <div className="checkbox-wrapper">
          <label>special chracters</label>
          <input
            type="checkbox"
            className="input-range"
            id="specialChars"
            checked={specialChars}
            name="specialChars"
            onChange={handlePasswordFields}
          ></input>
        </div>
      </div>
    </Wrapper>
  );
};

export default PasswordRegistration;
