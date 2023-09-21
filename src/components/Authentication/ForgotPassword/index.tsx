import { useState } from "react";
import AuthLayout from "../../Layouts/Auth";
import Card from "../../Layouts/Auth/Card";
import Input from "../../Form/Input/Index";
import Button from "../../Form/Button";

const ForgotPassword: React.FC = (): JSX.Element => {
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSent(!isSent);
  };

  return (
    <AuthLayout>
      <Card page={"forgot"}>
        <section className="flex flex-col items-center isSent justify-center gap-L self-stretch">
          <form className="flex flex-col items-center gap-5 self-stretch">
          {!isSent 
            ? <>
                <Input name="email" id="email" type="email" labelText="ایمیل خود را وارد کنید" hasLabel={true}/>          
                <Button text="دریافت ایمیل بازیابی رمز عبور" type="submit" onClick={handleClick}/>        
              </>
            : <p className="text-black text-sm font-normal leading-normal">
                .لینک بازیابی رمز عبور برای شما ایمیل شد. لطفا ایمیل خود را بررسی
                کنید
              </p>
           } 
          </form>
        </section>
      </Card>
    </AuthLayout>
  );
};

export default ForgotPassword;
