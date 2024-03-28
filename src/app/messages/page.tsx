"use client";
import { ReactNode, useState } from "react";
import { useUIState, useActions } from "ai/rsc";
import type { AI } from "../action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SystemMessage, UserMessage } from "@/components/Messages";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>() as {
    // idk why TS is being dumb here but it is and I like my types
    submitUserMessage: (message: string) => Promise<{
      id: number;
      display: ReactNode;
    }>;
  };

  return (
    <div className="w-full h-screen flex flex-col relative">
      <div className="w-[800px] mx-auto flex flex-col items-start ">
        {/* <UserMessage message="Hi! What are you able to do?" />
        <SystemMessage message="I am a personal weights tracker which can help you record what you have been working on and get your weights up." /> */}
        {
          // View messages in UI state
          messages.map((message) => (
            <div key={message.id} className="w-full">
              {message.display}
            </div>
          ))
        }
        <div className="bg-white w-full h-[300px]"></div>
      </div>

      <form
        className="fixed z-30 bottom-12 md:w-1/2 bg-black py-2 px-6 rounded-full flex flex-row gap-4 left-1/2 -translate-x-1/2"
        onSubmit={async (e) => {
          e.preventDefault();

          // Add user message to UI state
          setMessages((currentMessages) => [
            ...currentMessages,
            {
              id: Date.now(),
              display: <UserMessage message={inputValue} />,
            },
          ]);

          // Submit and get response message
          const responseMessage = await submitUserMessage(inputValue);
          setMessages((currentMessages) => [
            ...currentMessages,
            responseMessage,
          ]);

          setInputValue("");
        }}
      >
        <Input
          placeholder="Send a message..."
          value={inputValue}
          className="border-0 text-white"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <Button
          type="submit"
          className="bg-white text-slate-800 hover:bg-slate-200"
        >
          Send
        </Button>
      </form>
    </div>
  );
}