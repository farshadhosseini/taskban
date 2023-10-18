import Button from "../../../components/Common/Form/Button";
import Input from "../../../components/Common/Form/Input";
import useAxios from "../../../hooks/useAxios";
import { useState, useEffect } from 'react'
import {
  required,
  email,
  validate,
  strong,
  minLength,
} from "../../../utils/validator/index";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../../constants/api.url";
import { selectUser } from "../../../features/authSlice";
import {useSelector} from "react-redux"

const rules = {
  email: [required, email],
  username: [required],
  old_password: [required],
  new_password: [required, strong, minLength(8)],
  new_password1: [required]
};

type Values = {
  [key: string]: string;
};
 
const Information: React.FC = (): JSX.Element => {
  const user=useSelector(selectUser)
  const [errors, setErrors] = useState<string[]>([]);
  const [values, setValues] = useState<Values>({
    email: "",
    old_password: "",
    username: "",
    new_password: "",
    new_password1: ""
  });
  
  const [response, error, loading, fetcher] = useAxios();
  const [getUserResponse, getUserError, getUserLoading, getUserfetcher] = useAxios();
  const handleChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

 const getUser=async()=>{
  await getUserfetcher("get",`${API_URL.Register}${user.user_id}/`)
 }

  const handleClick =async () => {
    const resultErrors = validate(values, rules);
    if(resultErrors.length){
      setErrors(resultErrors)
    }
    else{
       await fetcher("put",`${API_URL.ChangePassword}`,values)
    }
    
    if (values.newPassword !== values.confirmNewPassword) {
      toast.error("تکرار رمز عبور جدید با رمز عبور جدید مطابقت ندارد", {
        position: "bottom-left",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getUser()
    if(getUserResponse){
      setValues({...values,email:getUserResponse.email})
    }
    if (response) {
      toast.success(response, {
        position: "bottom-left",
        autoClose: 3000,
      });
    }   
  }, [response,errors])
  return (
    <div className="flex flex-row-reverse">
      <div className="w-[354px] mt-[160px] mr-[58px]">
        <h2 className="text-[31px] text-bold text-right mb-[32px]" >اطلاعات حساب</h2>
        <form className="flex flex-col gap-S">
          <Input
            name="email"
            id="email"
            type="email"
            label="ایمیل"
            hasLabel={true}
            className="h-XL"
            onChange={(name, value) => handleChange(name, value)}
          />
          <Input
            name="username"
            id="username"
            type="text"
            label="نام کاربری"
            hasLabel={true}
            className="h-XL"
            onChange={(name, value) => handleChange(name, value)}
          />

          <Input
            name="old_password"
            id="old_password"
            type="password"
            label="رمز عبور فعلی"
            className="h-XL"
            hasLabel={true}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Input
            name="new_password"
            id="new_password"
            type="password"
            label="رمز عبور جدید"
            className="h-XL"
            hasLabel={true}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Input
            name="new_password1"
            id="new_password1"
            type="password"
            label="تکرار رمز عبور جدید"
            className="h-XL"
            hasLabel={true}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Button
            text="ثبت تغییرات"
            type="button"
            onClick={handleClick}
            hasIcon={false}
            className="text-white text-sm font-black leading-normal h-XL self-stretch rounded-md bg-brand-primary w-full mt-M"
          />
        </form>
      </div>      
    </div>
  );
}

export default Information;
