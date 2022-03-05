import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form"; //librairie afin de faciliter la mise en place de formulaire
import { yupResolver } from "@hookform/resolvers/yup"; //nécessaire afin d'utiliser "react-hook-form" et "yup" ensemble
import loginValidation from "../validationSchema/loginValidation";
import axios from "axios";
import template from "../utils/template";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  // import des composants afin de vérifier nos formulaires
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation), //on indique à react-hook-form d'utiliser notre validationSchema afin de traiter les erreurs
  });

  const handleRegister = async (input) => {
    const res = await axios.post(`${template}api/login`, {
      email: input.email,
      password: input.password,
    });

    const data = await res;

    if (data.data.message === "LoginError") {
      alert("Email ou mot de passe incorrect");
    }

    if (data.data.message === "NoError") {
      router.push("/boards");
    }
  };

  return (
    <main className="w-screen h-screen p-7 bg-slate-50">
      <div className="flex justify-center">
        <Image src="/logo.svg" alt="trello logo" height="42" width="168" />
      </div>
      <img
        src="/login-left-stock.png"
        alt="background login image"
        className="hidden absolute left-0 bottom-0 lg:block lg:w-2/6"
      />
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-80 flex flex-col gap-y-5 mx-auto mt-10 shadow-md p-7 bg-white lg:w-96"
      >
        <h3 className="text-center font-bold text-blue-600">
          Log in to Trello
        </h3>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <input
                type="email"
                placeholder="Email"
                value={value || ""}
                className="border border-gray-400 p-2 w-full outline-0 rounded focus:border-blue-600"
                onChange={onChange}
              />
              {/* si il y a une erreur dans le champs, on affiche le message correspondant à l'erreur */}
              {!!error && (
                <p className="text-red-500 text-xs">{error?.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <input
                type="password"
                placeholder="Password"
                value={value || ""}
                className="border border-gray-400 p-2 w-full outline-0 rounded focus:border-blue-600"
                onChange={onChange}
              />
              {/* si il y a une erreur dans le champs, on affiche le message correspondant à l'erreur */}
              {!!error && (
                <p className="text-red-500 text-xs">{error?.message}</p>
              )}
            </div>
          )}
        />
        <p className="text-xs text-gray-400">
          By signing up, you confirm that you've read and accepted our{" "}
          <span className="text-blue-600 underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-blue-600 underline cursor-pointer">
            Privacy Policy
          </span>
        </p>
        <button
          type="submit"
          className="bg-[#2aa10f] p-2 rounded font-bold text-white transition ease hover:bg-[#378805]"
        >
          Log in
        </button>
        <p className="text-xs text-blue-600 text-center">
          Can't log in? <Link href="/login"><span className="font-bold cursor-pointer">Sign up for an account</span></Link>
        </p>
      </form>
      <img
        src="/login-right-stock.png"
        alt="background login"
        className="hidden absolute bottom-0 right-0 lg:block lg:w-2/6"
      />
    </main>
  );
}
