"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { parseCookies, setCookie } from "nookies";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function LoginPage() {

  const router = useRouter();
  useEffect(() => {
    const cookies = parseCookies();
    const loggedIn = cookies.loggedIn === 'true';

    if (loggedIn) {
      router.push('/update-unproccess-error');
    }
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      console.log(user);

      const response = await fetch(
        "https://api-codehub.vercel.app/api/conferences/company-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        setCookie(null, "loggedIn", "true", {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push("/update-unproccess-error");
      } else {
        throw new Error("Sign-up failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Email or Password is incorrect");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="min-h-screen flex flex-wrap flex-col items-center justify-center">
      <Card className="w-[300px] sm:w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Link
              className="text-right text-xs text-slate-500 hover:underline hover:text-slate-300"
              href="/forgotpassword"
            >
              Forgot Password
            </Link>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            disabled={
              user.email.length > 0 && user.password.length > 0 ? false : true
            }
            onClick={onLogin}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
            
        </CardFooter>
      </Card>
    </div>
  );
}
