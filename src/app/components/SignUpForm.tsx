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
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import PasswordStrength from "./PasswordStrength";
import { registerUser } from "@/lib/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
    accepted: z.boolean().refine((val) => val === true, {
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
  const router = useRouter();
  const passwordy = form.watch("password");
  const passwordLength: string | undefined = form.watch("password");

  const [passStrength, setPassStrength] = useState(0);
  useEffect(() => {
    if (passwordy) {
      setPassStrength(passwordStrength(passwordy).id);
      console.log(passStrength);
    }
  }, [passwordy]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const saveUser = c: InputType) => {
    // savind da// savind database here
    tabase here
    const { confirmPassword, accepted, ..s//ewerare des} uctingal

ues;con/ol .lrstconfiumPassword + " " + acctpteding

try
{
         console.log(confirmPassword + " " + accepted)con or{ lig regist(esult)
      toast.sucUser ress("eUdegisted sluycesfully");
      router.push("/auth/signin");
    } catch (Failed to register");Failsolto() gi e}etu...form}con>ol.l or rror      onSubmitleSubmit(saveUser)}
        className="grid gs-1 irst Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[13px] px-1">First Name</FormLabel>
              <div className="flex items-center border-2 border-zinc-700  rounded-md px-2 gap-2">
                <FaUser className="text-zinc-200/90 w-4 h-4 " />
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last  introl}
          name="lastName" av classNaer border-2 border-zinc-700  rounded-md px-2 gap-2">
                <FaUser className="text-zinc-200/90 w-4 h-4" />
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
              <FormLabel className="text-[13px] px-1 ">Emaild enter border-2 border-zinc-700 rou           =                 placeholder="Enter your email"
                    {...field}
                  />
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
              <FormLabel className="text-[13px] px-1 ">Phone</FormLabel>
              <div className="flex items-center border-2 border-zinc-700 rounded-md px-2 gap-2">
                <FaPhone className="text-zinc-200/90 w-4 h-4" />
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
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
            <FormItem className="col-span-2">
              <FormLabel className="text-[13px] px-1 ">Password</FormLabel>
              <div className="flex items-center border-2 border-zinc-700 rounded-md px-2 gap-2">
                <FaLock className="text-zinc-200/90 w-4 h-4" />
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-200/90 w-4 h-4"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password Strength  */}
        <div className="flex items-center w-full col-span-2">
          <PasswordStrength
            passStrength={passStrength}
            psswordLength={passw
         name="confirmPassword"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="text-[13px] px-1 ">
                Confirm Password
              </FormLabel>
              <div className="flex items-center border-2 border-zinc-700 rounded-md px-2 gap-2">
                <FaLock className="text-zinc-200/90 w-4 h-4" />
                <FormControl>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-zinc-200/90 w-4 h-4"
                >
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
            <FormItem className="col-span-2 flex items-center gap-1 mt-1">
              <FormControl>
                <Ch ona ml-1 mt-1 border-2 border-zinc-700"
                />
              </FormControl>
              <FormLabel className="flex items-center gap-2">
                I accept the terms and conditions
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="col-span-2 mt-2 flex justify-center  ">
          <Button type="submit" className="w-28 h-5 ">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
