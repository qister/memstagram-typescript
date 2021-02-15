import React from "react";
import { Form, Input, Button, Checkbox } from "antd";

import { AuthForm } from '../../constants/types'
import "./Authorization.scss";

interface Props {
  form: AuthForm,
  changeHandler(event: React.ChangeEvent<HTMLInputElement>): void;
  loginHandler(
    event: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>
  ): void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function AuthorizationTemplate({
  form,
  changeHandler,
  loginHandler,
}: Props): JSX.Element {

  const { email, password } = form

  console.log('AuthorizationTemplate email', email);
  console.log('AuthorizationTemplate password', password);

  const ROOT_CLASS = "authorization";
  return (
    <div className={ROOT_CLASS}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Email"
          name='email'
          getValueFromEvent={changeHandler}
        >
          <Input name='email' defaultValue={email} />
        </Form.Item>

        <Form.Item
          label="Password"
          name='password'
          getValueFromEvent={changeHandler}
        >
          <Input.Password name='password' defaultValue={password} />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" onClick={loginHandler}>Log in</Button>
        </Form.Item>
      </Form>

      {/* <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button> */}
    </div>
  );
}
