"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import validator from "validator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { passwordStrength } from "check-password-strength";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordStrength from "./PasswordStrength";
import { registerUser } from "@/lib/actions/authActions";
import { toast } from "react-toastify";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .max(45, { message: "First name must be less than 45 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(45, { message: "Last name must be less than 45 characters" })
      .regex(/^[a-zA-Z]+$/, "No special characters allowed!"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().refine((val) => validator.isMobilePhone(val, "any"), {
      message: "Please enter a valid phone number! (without any country codes)",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must be less than 50 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must be less than 50 characters" }),
    accepted: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept the terms and conditions",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const form = useForm<InputType>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      accepted: false,
    },
  });
// for password strength 

 const passwordy = form.watch("password");
 const passwordLength:string | undefined = form.watch("password")
  
 

  const [passStrength,setPassStrength] = useState(0);
  useEffect(()=>{
    if(passwordy){
      setPassStrength(passwordStrength(passwordy).id)
      console.log(passStrength)
    }
  },[passwordy])

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const saveUser = async (values: InputType) => { // savind database here
    const {confirmPassword,accepted, ...user} = values; // we are destructing 
    try{
      const result = await registerUser(user);
      toast.success("User registerd succesfully");
    }catch(error){
      toast.error("Failed to register");
      console.log(error);
    }

  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(saveUser)}
        className="grid grid-cols-1 md:grid-cols-2  p-4 shadow-lg border rounded-md w-full max-w-2xl mx-auto"
      >
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <div className="flex items-center border rounded-md p-2 gap-2">
                <FaUser className="text-gray-500" />
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1 ">Last Name</FormLabel>
              <div className="flex items-center border rounded-md p-2 gap-2">
                <FaUser className="text-gray-500" />
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Email</FormLabel>
              <div className="flex items-center border rounded-md p-2 gap-2">
                <FaEnvelope className="text-gray-500" />
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
              </div>
              <FormMessage /> 
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Phone</FormLabel>
              <div className="flex items-center border rounded-md p-2 gap-2">
                <FaPhone className="text-gray-500" />
                <FormControl>
                  <Input type="tel" placeholder="Enter your phone number" {...field} />
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
            <FormItem className="col-span-2">
              <FormLabel>Password</FormLabel>
              <div className="flex items-center border rounded-md p-2 gap-2">
                <FaLock className="text-gray-500" />
                <FormControl>
                  <Input type={showPassword ? "text" : "password"} placeholder="Enter password" {...field} />
                </FormControl>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <FormMessage /> 
            </FormItem>
          )}
        />
        {/* Password Strength  */}
        <div className="flex items-center w-full col-span-2">
        <PasswordStrength passStrength = {passStrength} passwordLength = {passwordLength} />
        </div>

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Confirm Password</FormLabel>
              <div className="flex items-center border rounded-md p-2 gap-1">
                <FaLock className="text-gray-500" />
                <FormControl>
                  <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" {...field} />
                </FormControl>
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-500">
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <FormMessage /> 

            </FormItem>
          )}
        />

        {/* Terms & Conditions Checkbox */}
        <FormField
          control={form.control}
          name="accepted"
          render={({ field }) => (
            <FormItem className="col-span-2 flex items-center gap-1">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="flex items-center gap-2">
                I accept the terms and conditions
              </FormLabel>
              <FormMessage />

            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="col-span-2 mt-2">
          <Button type="submit" className="w-full">Submit</Button>
        </div>
      </form>
    </Form>
  );
}



// "use client";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { FaUser } from "react-icons/fa";
// import { IoMdMail } from "react-icons/io";
// import { RiLockPasswordFill } from "react-icons/ri";
// import { FaPhone } from "react-icons/fa6";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { FaKey } from "react-icons/fa6";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { Controller, SubmitHandler, useForm } from "react-hook-form";

// const FormSchema = z
//   .object({
//     firstName: z
//       .string()
//       .min(2, { message: "First name must be atleast 2 characters" })
//       .max(45, { message: "First name must be less than 45 characters" })
//       .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
//     lastName: z
//       .string()
//       .min(2, { message: "Last name must be atleast 2 characters" })
//       .max(45, { message: "Last name must be less than 45 characters" })
//       .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
//     email: z.string().email("Please a valid email address"),
//     phone: z
//       .string()
//       .refine(validator.isMobilePhone, "Please enter a valid phone number!"),
//     password: z
//       .string()
//       .min(6, { message: "Password must be atleast 6 charactesr" })
//       .max(50, "Password must be less than 50 characters"),
//     confirmPassword: z
//       .string()
//       .min(6, { message: "Password must be atleast 6 charactesr" })
//       .max(50, "Password must be less than 50 characters"),
//     accepted: z.literal(true, {
//       errorMap: () => ({
//         message: "Please accept all terms",
//       }),
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Password and confirm password doesn't match!",
//     path: ["confirmPassword"],
//   });

// type InputType = z.infer<typeof FormSchema>;

// const SignUpForm = () => {
//   const { register, handleSubmit, reset, control } = useForm<InputType>();
//   const [isVisible, setVisible] = useState(true);
//   const toggleView = () => {
//     setVisible((prev) => !prev);
//   };

//   const saveUser: SubmitHandler<InputType> = async (data) => {
//     console.log(data);
//   };
//   return (
//     <>
//       <form
//         onSubmit={handleSubmit(saveUser)}
//         className="grid grid-cols-2 gap-3 p-2 shadow border rounded-md place-items-stretch"
//       >
//         {/* First Name */}
//         <div className="bg-zinc-800 px-2 rounded-lg">
//           <Label className="text-xs text-zinc-300">First Name </Label>
//           <div className="flex gap-2 items-center">
//             <FaUser className="size-3" />
//             <Input
//               {...register("firstName")}
//               className="flex w-full h-8 bg-transparent"
//             />
//           </div>
//         </div>
//         {/* Last Name */}
//         <div className="bg-zinc-800 px-2 rounded-lg">
//           <Label className="text-xs text-zinc-300">Last Name </Label>
//           <div className="flex gap-2 items-center">
//             <FaUser className="size-3" />
//             <Input
//               {...register("lastName")}
//               className="flex w-full h-8 bg-transparent"
//             />
//           </div>
//         </div>
//         {/* Email */}
//         <div className="bg-zinc-800 px-2 rounded-lg col-span-2">
//           <Label className="text-xs text-zinc-300">Email </Label>
//           <div className="flex gap-2 items-center">
//             <IoMdMail className="size-4" />
//             <Input
//               {...register("email")}
//               className="flex w-full h-8 bg-transparent focus-visible:outline-black"
//             />
//           </div>
//         </div>

//         {/* Phone */}
//         <div className="bg-zinc-800 px-2 rounded-lg col-span-2">
//           <Label className="text-xs text-zinc-300">Email </Label>
//           <div className="flex gap-2 items-center">
//             <FaPhone className="size-4" />
//             <Input
//               {...register("phone")}
//               className="flex w-full h-8 bg-transparent focus-visible:outline-black"
//             />
//           </div>
//         </div>

//         {/* Password */}
//         <div className="bg-zinc-800 px-2 rounded-lg col-span-2">
//           <Label className="text-xs text-zinc-300">Password </Label>
//           <div className="flex gap-2 items-center">
//             <FaKey className="size-4" />
//             <Input
//               {...register("password")}
//               type={isVisible ? "text" : "password"}
//               className="flex w-full h-8 bg-transparent focus-visible:outline-black"
//             />
//             {isVisible ? (
//               <FaEyeSlash
//                 className="size-5 cursor-pointer"
//                 onClick={toggleView}
//               />
//             ) : (
//               <FaEye className="size-5 cursor-pointer" onClick={toggleView} />
//             )}
//           </div>
//         </div>

//         {/* Confirm Password */}
//         <div className="bg-zinc-800 px-2 rounded-lg col-span-2">
//           <Label className="text-xs text-zinc-300">Confirm Password </Label>
//           <div className="flex gap-2 items-center">
//             <RiLockPasswordFill className="size-4" />
//             <Input
//               type={isVisible ? "text" : "password"}
//               {...register("confirmPassword")}
//               className="flex w-full h-8 bg-transparent focus-visible:outline-black"
//             />
//           </div>
//         </div>
//         {/* Terms & conditions */}
//         <div className="items-top flex space-x-2 mt-1 col-span-2">
//           <Controller
//             control={control}
//             name="accepted"
//             render={() => (
//               <>
//                 <Checkbox id="terms1" {...register("accepted")} />
//                 <div className="grid gap-1.5 leading-none">
//                   <label
//                     htmlFor="terms1"
//                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                   >
//                     Accept terms and conditions
//                   </label>
//                   <p className="text-xs text-muted-foreground">
//                     You agree to our Terms of Service and Privacy Policy.
//                   </p>
//                 </div>
//               </>
//             )}
//           />
//         </div>
//         {/* SUbmit button */}
//         <div className="flex justify-center col-span-2">
//           <Button type="submit" className="mt-1 w-48">
//             Submit{" "}
//           </Button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default SignUpForm;