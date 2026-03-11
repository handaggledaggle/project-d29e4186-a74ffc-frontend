"use client";

import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import ArtworkCreateClient from "./_components/ArtworkCreateClient";

// metadata cannot be exported from a client component. Move metadata to a server component wrapper.
// This file must remain a Client Component because it uses client hooks/events in children and AppShell.

export default function Page() {
  return (
    <AppShell>
      <div className="w-[1440px] mx-auto flex flex-col bg-white">
        <AppHeader className="h-16 bg-white border-b border-[#DDD6FE] shadow-sm px-8" />

        <section
          data-section-type="hero"
          className="flex flex-col items-start py-10 px-8 bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-white">작품 등록</h1>
            <p className="text-white/70">
              아티스트 계정으로 작품을 신속히 등록하고, 미리보기·임시저장 기능으로 안전하게 관리하세요.
            </p>
          </div>
        </section>

        <ArtworkCreateClient />

        <AppFooter className="py-12 px-8 bg-[#FFFFFF]" />
      </div>
    </AppShell>
  );
}
