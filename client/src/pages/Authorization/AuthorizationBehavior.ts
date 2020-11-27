import React, { useState }  from 'react'
import { AuthorizationTemplate } from './AuthorizationTemplate'
import { useDispatch } from 'react-redux'
import { authLogin } from '../../redux/authToolkitRedux/StoreSlices/authorization'

export function AuthorizationBehavior(): JSX.Element {
    const dispatch = useDispatch()
  
    type Form = {
      email: string
      password: string
    }
  
    const [form, setForm] = useState<Form>({
      email: '',
      password: '',
    })
  
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
      setForm({ ...form, [event.target.name]: event.target.value })
    }
  
    function loginHandler() {
      dispatch(authLogin(form))
    }
    return React.createElement(AuthorizationTemplate, {
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