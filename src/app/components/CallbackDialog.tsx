import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";

// Sign up at https://formspree.io, create a form, and paste your form ID below
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CallbackDialog({ open, onOpenChange }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) setTimeout(() => setStatus("idle"), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Записатися на заняття</DialogTitle>
          <DialogDescription className="text-gray-400">
            Залиште контакти — ми зв'яжемося з вами найближчим часом
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            <p className="text-xl text-white font-medium">Заявку отримано!</p>
            <p className="text-gray-400">Ми зв'яжемося з вами найближчим часом.</p>
            <Button
              variant="outline"
              className="border-zinc-700 text-gray-300 mt-2"
              onClick={() => handleOpenChange(false)}
            >
              Закрити
            </Button>
          </div>
        ) : (
          <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Ваше ім'я"
              required
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-600"
            />
            <Input
              name="phone"
              type="tel"
              placeholder="Номер телефону"
              required
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-600"
            />
            <Textarea
              name="message"
              placeholder="Зручний час або коментар (необов'язково)"
              rows={3}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus-visible:ring-emerald-600 resize-none"
            />
            {status === "error" && (
              <p className="text-red-400 text-sm">
                Помилка відправки. Зателефонуйте нам:{" "}
                <a href="tel:+380634349623" className="underline">
                  +38 063 434 96 23
                </a>
              </p>
            )}
            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-base"
            >
              {status === "loading" ? "Відправка..." : "Записатися"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
