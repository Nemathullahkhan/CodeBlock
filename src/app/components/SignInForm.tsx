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
    router.push(props.callbackUrl? props.callbackUrl:"/home");
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
              <FormLabel className="text-[13px] px-1">Email</FormLabel>
              <div className="flex items-center border-2 rounded-md px-4 gap-2">
                <FaEnvelope className="text-zinc-200/90 w-4 h-4 " />
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
              <FormLabel className="text-[13px] px-1">Password</FormLabel>
              <div className="flex items-center border-2 rounded-md px-4 gap-2">
                <FaLock className="text-zinc-200/90 w-4 h-4" />
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
        <div className="flex justify-center mt-4 mb-3">
          <Button type="submit" className="w-32  rounded-lg h-5">
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
