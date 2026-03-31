"use client";

import { useMemo, useState } from "react";
import { MessageSquareText, PhoneCall, X } from "lucide-react";

type ContactButton = {
  key: "zalo" | "messenger" | "whatsapp" | "kakao" | "phone";
  label: string;
  href?: string;
  bgClass: string;
  iconSrc?: string;
  iconAlt?: string;
};

const CONTACT_BUTTONS: ContactButton[] = [
  {
    key: "zalo",
    label: "Zalo",
    href: "https://zalo.me/",
    bgClass: "bg-[#0a7cff]",
    iconSrc: "https://cdn.simpleicons.org/zalo",
    iconAlt: "Zalo logo",
  },
  {
    key: "messenger",
    label: "Messenger",
    href: "https://m.me/",
    bgClass: "bg-[#1e6fff]",
    iconSrc: "https://cdn.simpleicons.org/messenger",
    iconAlt: "Messenger logo",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/",
    bgClass: "bg-[#25d366]",
    iconSrc: "https://cdn.simpleicons.org/whatsapp",
    iconAlt: "WhatsApp logo",
  },
  {
    key: "kakao",
    label: "KakaoTalk",
    bgClass: "bg-[#f7e600] text-black",
    iconSrc: "https://cdn.simpleicons.org/kakaotalk",
    iconAlt: "KakaoTalk logo",
  },
  {
    key: "phone",
    label: "Phone",
    href: "tel:+84912345678",
    bgClass: "bg-[#0f766e]",
  },
];

export default function FloatingContactButtons() {
  const [isKakaoOpen, setIsKakaoOpen] = useState(false);

  const kakaoQrSrc = useMemo(() => {
    const kakaoUrl = "https://open.kakao.com/o/vietbike";
    const encoded = encodeURIComponent(kakaoUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encoded}`;
  }, []);

  return (
    <>
      <div className="fixed right-2 md:right-4 bottom-16 md:bottom-20 z-90 flex flex-col gap-1.5 md:gap-2">
        {CONTACT_BUTTONS.map((item) => {
          if (item.key === "kakao") {
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setIsKakaoOpen(true)}
                className={`group flex items-center gap-1.5 md:gap-2 rounded-full ${item.bgClass} px-2.5 md:px-3 py-2 md:py-2.5 shadow-lg shadow-black/20 border border-black/10`}
                aria-label="Open KakaoTalk QR code"
              >
                <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/90 flex items-center justify-center overflow-hidden">
                  {item.iconSrc ? (
                    <img
                      src={item.iconSrc}
                      alt={item.iconAlt || `${item.label} logo`}
                      className="w-3 h-3 md:w-3.5 md:h-3.5 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : null}
                </span>
                <span className="hidden md:inline text-black text-xs font-bold whitespace-nowrap pr-0.5">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-1.5 md:gap-2 rounded-full ${item.bgClass} px-2.5 md:px-3 py-2 md:py-2.5 shadow-lg shadow-black/20 border border-black/10`}
              aria-label={`Open ${item.label}`}
            >
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/90 flex items-center justify-center overflow-hidden">
                {item.iconSrc ? (
                  <img
                    src={item.iconSrc}
                    alt={item.iconAlt || `${item.label} logo`}
                    className="w-3 h-3 md:w-3.5 md:h-3.5 object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <PhoneCall size={12} className="text-[#0f766e]" />
                )}
              </span>
              <span className="hidden md:inline text-white text-xs font-bold whitespace-nowrap pr-0.5">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>

      {isKakaoOpen ? (
        <div
          className="fixed inset-0 z-100 bg-black/55 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={() => setIsKakaoOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white p-5 md:p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="KakaoTalk QR Code"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-on-surface">
                <MessageSquareText size={18} />
                <h3 className="font-bold text-lg">KakaoTalk</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsKakaoOpen(false)}
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center"
                aria-label="Close KakaoTalk QR modal"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-secondary mb-4">
              Scan this QR code to connect with VietBike on KakaoTalk.
            </p>

            <div className="w-full rounded-2xl bg-surface-container p-3 flex items-center justify-center">
              <img
                src={kakaoQrSrc}
                alt="KakaoTalk QR code"
                className="w-55 h-55 rounded-xl bg-white"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
