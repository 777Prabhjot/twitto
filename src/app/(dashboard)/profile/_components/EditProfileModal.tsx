"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { X } from "lucide-react";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const EditProfileModal = () => {
  const { data, isSuccess } = trpc.userInfo.useQuery();
  const [values, setValues] = useState({
    name: "",
    bio: "",
    link: "",
  });
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const { mutate: updateProfile, isLoading } = trpc.updateProfile.useMutation({
    onSuccess(data) {
      toast.success("Profile updated successfully");
      setTimeout(() => {
        setModal(false);
        router.refresh();
      }, 1000);
    },
    onError(error) {
      toast.error("Something went wrong");
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setValues({
        name: data?.user?.name!,
        bio: data?.user?.bio!,
        link: data?.user?.link!,
      });
    }
  }, [isSuccess]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    updateProfile({
      name: values.name!,
      bio: values.bio!,
      link: values.link || "",
    });
  };

  return (
    <Dialog open={modal}>
      <DialogTrigger asChild>
        <button
          className="justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  rounded max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 mr-0 ml-auto"
          onClick={() => setModal(true)}
        >
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            onClick={() => setModal(false)}
          >
            <X className="h-7 w-7 hover:border p-1 rounded-sm cursor-pointer " />
          </div>
          <DialogDescription>
            <div className="flex items-center  bg-gray-50 dark:bg-gray-900">
              <div className="container">
                <div className="max-w-md  bg-white p-5 rounded-md shadow-sm">
                  <div className="m-7">
                    <div className="mb-6">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={values.name}
                        placeholder="Your Name"
                        required
                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="bio"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Your Bio
                      </label>
                      <textarea
                        rows={5}
                        name="bio"
                        value={values.bio!}
                        autoFocus
                        id="message"
                        placeholder="Your Bio"
                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="link"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Link
                      </label>
                      <input
                        type="text"
                        name="link"
                        id="link"
                        value={values.link!}
                        placeholder="Provide any link"
                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6">
                      {isLoading ? (
                        <button className="flex cursor-not-allowed justify-center w-full text-white bg-blue-300 rounded-md px-3 py-3">
                          <MoonLoader size={20} color="#dbeef6" />
                        </button>
                      ) : (
                        <button
                          className="w-full disabled:bg-gray-400 px-3 py-4 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none"
                          disabled={!values.bio || !values.name}
                          onClick={handleSubmit}
                        >
                          Update Profile
                        </button>
                      )}
                    </div>
                    <p
                      className="text-base text-center text-gray-400"
                      id="result"
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
