"use client";
import CButton from "@/components/common/Form/CButton";
import CForm from "@/components/common/Form/CForm";
import CInput from "@/components/common/Form/CInput";
import { Modalbox } from "@/components/common/modal/Modalbox";
import { useReplyRating } from "@/hooks/rating.hook";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { MessageCircle, Send, ArrowRight } from "lucide-react";

const Reply = ({ id }: { id: string }) => {
  const { mutate, isPending } = useReplyRating();
  
  const onFormSubmit = async (data: FieldValues) => {
    mutate(
      { id, vendorReply: data.vendorReply },
      {
        onSuccess: () => {
          toast.success("Engagement recorded successfully! ✨");
          setTimeout(() => window.location.reload(), 1000);
        },
        onError: () => {
          toast.error("Communication error. Please try again.");
        },
      }
    );
  };

  return (
    <div>
      <Modalbox 
        title="Author Response" 
        descrip="Craft a thoughtful reply to show your customer that you value their perspective."
        btnText="Respond"
        variant="outline"
        btncss="h-10 px-6 rounded-2xl bg-white border-gray-100 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all text-xs font-black uppercase tracking-widest shadow-sm flex items-center gap-2"
        btnIcon={<MessageCircle className="w-3.5 h-3.5" />}
      >
        <div className="mt-4">
          <CForm onFromSubmit={onFormSubmit}>
            <div className="space-y-6">
              <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
                 <CInput 
                    name="vendorReply" 
                    label="Internal Response Message" 
                    placeholder="e.g. Thank you for your feedback! We're thrilled you enjoyed the product..."
                 />
                 <p className="mt-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    Personalized replies significantly increase customer retention and shop trust.
                 </p>
              </div>
              
              <button 
                type="submit" 
                disabled={isPending}
                className="w-full h-14 rounded-2xl bg-gray-900 text-white font-black text-sm hover:bg-rose-500 transition-all shadow-xl hover:shadow-rose-100 flex items-center justify-center gap-3 disabled:bg-gray-100 disabled:text-gray-400 group"
              >
                {isPending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        Conclude Communication
                        <Send className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all" />
                    </>
                )}
              </button>
            </div>
          </CForm>
        </div>
      </Modalbox>
    </div>
  );
};

export default Reply;