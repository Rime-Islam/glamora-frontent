"use client";
import React from "react";
import { Modalbox } from "../modal/Modalbox";
import CForm from "../Form/CForm";
import CInput from "../Form/CInput";
import { FieldValues } from "react-hook-form";
import CButton from "../Form/CButton";
import { toast } from "sonner";
import { useUpdatePass } from "@/hooks/user.hook";
import { KeyRound, ShieldAlert, ArrowRight } from "lucide-react";

const ChangePassword = () => {
  const { mutate, isPending } = useUpdatePass();

  const onFromSubmit = async (data: FieldValues) => {
    if (data.password !== data.cPassword) {
      toast.error("Passwords do not match. Please try again.");
    } else {
      mutate(
        { password: data.password },
        {
          onSuccess: () => {
            toast.success("Password updated successfully! Safety first. 🔐");
          },
          onError: () => {
            toast.error("Failed to update password. Please try again.");
          },
        }
      );
    }
  };

  return (
    <div className="flex">
      <Modalbox
        title="Update Account Password"
        descrip="Ensure your account is using a long, random password to stay secure."
        btnText="Change Password"
        btnIcon={<KeyRound className="w-4 h-4" />}
        btncss="bg-gray-900 text-white rounded-xl px-5 py-2.5 hover:bg-rose-500 transition-all font-bold gap-2 shadow-lg shadow-gray-100"
      >
        <div className="mt-2">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 mb-6">
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed font-medium">
              You will be required to log in again on all devices after changing your password. Make sure you remember your new credentials.
            </p>
          </div>

          <CForm onFromSubmit={onFromSubmit}>
            <div className="space-y-5">
              <div className="group">
                <CInput
                  name="password"
                  label="New Password"
                  type="password"
                  placeHolder="••••••••"
                />
              </div>
              <div className="group">
                <CInput
                  name="cPassword"
                  label="Confirm New Password"
                  type="password"
                  placeHolder="••••••••"
                />
              </div>
              
              <div className="pt-4">
                <button
                  disabled={isPending}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-rose-500 transition-all duration-300 shadow-lg shadow-gray-100 disabled:opacity-50"
                >
                  {isPending ? (
                    "Updating Password..."
                  ) : (
                    <>
                      Update Password
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </CForm>
        </div>
      </Modalbox>
    </div>
  );
};

export default ChangePassword;