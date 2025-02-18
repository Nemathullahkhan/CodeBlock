"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import {  z } from "zod";

interface SignInProps {
  callbackUrl?: string;
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof formSchema>;

const SignInForm = (props: SignInProps) => {

    const router = useRouter();
  const form = useForm<InputType>({
    resolver: zodResolver(formSchema),
  });

  const saveUser = async (values: InputType) => {
    const result = await signIn("credentials",{  // basically calling authorize function from route.ts signIn === authorize()
        redirect:false,
        username: values.email,
        password:values.password
    });
    if(!result?.ok) {
        toast.error(result?.error);
        return;
    }
    router.push(props.callbackUrl? props.callbackUrl:"/");
    toast.success("Welcome")
    console.log(values);
    //
  };
  // states for password
  const [showPassword, setPassword] = useState(false);

  const toggleView = () => {
    setPassword((prev) => !prev);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(saveUser)}
        className="flex flex-col gap-2"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="flex items-center border rounded-md p-2 gap-2">
                <FaEnvelope className="text-gray-500" />
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="flex items-center border rounded-md p-2 gap-2">
                <FaLock className="text-gray-500" />
                <Input type={showPassword ? "text" : "password"} {...field} />
                {showPassword ? (
                  <FaEyeSlash onClick={toggleView} />
                ) : (
                  <FaEye onClick={toggleView} />
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit" className="w-48 ">
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
