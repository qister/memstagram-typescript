import React, { useState }  from 'react'
import { AuthorizationTemplate } from './AuthorizationTemplate'
import { useDispatch } from 'react-redux'
import { authLogin } from '../../redux/authToolkitRedux/StoreSlices/authorization'
import { AuthForm } from '../../constants/types'

export function AuthorizationBehavior(): JSX.Element {
    const dispatch = useDispatch()
  
    const [form, setForm] = useState<AuthForm>({
      email: '5@gmail.com',
      password: '123123',
    })
  
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
      setForm({ ...form, [event.target.name]: event.target.value })
    }
  
    function loginHandler() {
      dispatch(authLogin(form))
    }
    return React.createElement(AuthorizationTemplate, {
        form,
        changeHandler,
        loginHandler,
    })
}







// const registerHandler = async () => {
    //   try {
    //     const data = await request('/api/auth/register', 'POST', { ...form }, {'Content-Type': 'application/json'})
    //   } catch (e) {
    //     console.log('Register error: ', e.message)
        
    //   }
    // }