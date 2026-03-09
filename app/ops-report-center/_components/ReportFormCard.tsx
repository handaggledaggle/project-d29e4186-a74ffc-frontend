"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const REPORT_TYPES = [
  "저작권 침해",
  "부적절한 콘텐츠",
  "결제/주문 이슈",
  "사기/스캠 의심",
  "기타",
] as const;

type ReportType = (typeof REPORT_TYPES)[number];

export function ReportFormCard({ className }: { className?: string }) {
  const [reportType, setReportType] = React.useState<ReportType | null>(null);

  return (
    <Card
      data-component="card"
      className={cn(
        "flex flex-col p-8 bg-white rounded-xl border border-[#DDD6FE] w-[720px] shadow-none",
        className
      )}
    >
      <h2 className="text-2xl font-bold text-[#4C1D95]">신고 접수하기</h2>
      <p className="text-[#6D28D9] mt-1">
        저작권 침해, 부적절한 콘텐츠, 결제/주문 이슈 등 문제 유형을 선택해 제출하세요.
      </p>

      <form className="flex flex-col gap-4 mt-6" onSubmit={(e) => e.preventDefault()}>
        {/* 신고 유형 */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm text-[#4C1D95]">신고 유형</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "h-10 w-full bg-white shadow-lg border border-[#DDD6FE] rounded-lg flex items-center justify-between px-3 text-left",
                  "text-[#4C1D95]"
                )}
              >
                <span className={cn(!reportType && "text-[#4C1D95]", reportType ? "" : "")}
                  >{reportType ?? "선택하세요"}</span
                >
                <span className="text-[#4C1D95]">▾</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[--radix-dropdown-menu-trigger-width]">
              {REPORT_TYPES.map((t) => (
                <DropdownMenuItem key={t} onSelect={() => setReportType(t)}>
                  {t}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 작품 ID */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm text-[#4C1D95]">작품 ID (있다면)</Label>
          <Input
            className="h-10 bg-white shadow-lg border border-[#DDD6FE] rounded-lg px-3 text-[#4C1D95]"
            placeholder="예: 2026-ART-0001"
          />
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm text-[#4C1D95]">제목</Label>
          <Input
            className="h-10 bg-white shadow-lg border border-[#DDD6FE] rounded-lg px-3 text-[#4C1D95]"
            placeholder="신고 제목을 입력하세요"
          />
        </div>

        {/* 상세 내용 */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm text-[#4C1D95]">상세 내용</Label>
          <textarea
            className={cn(
              "h-32 w-full resize-none bg-white shadow-lg border border-[#DDD6FE] rounded-lg p-3",
              "text-[#4C1D95] placeholder:text-[#4C1D95]/60",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDD6FE] focus-visible:ring-offset-0"
            )}
            placeholder="신고 사유, 관련 증거(URL/스크린샷 설명)를 자세히 작성해 주세요."
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <Label className="text-sm text-[#4C1D95]">연락처(선택)</Label>
            <Input
              className="h-10 bg-white shadow-lg border border-[#DDD6FE] rounded-lg px-3 text-[#4C1D95]"
              placeholder="이메일 또는 전화번호"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <Label className="text-sm text-[#4C1D95]">증거 파일(선택)</Label>
            <Input
              type="file"
              className={cn(
                "h-10 bg-white shadow-lg border border-[#DDD6FE] rounded-lg px-3 text-[#4C1D95]",
                "file:mr-3 file:rounded-md file:border-0 file:bg-[#FAF5FF] file:px-3 file:py-1 file:text-[#4C1D95]"
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-[#6D28D9]">개인정보 및 접수 내용은 조사 목적 외 사용되지 않습니다.</p>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="bg-white text-[#4C1D95] rounded-lg px-4 py-2 border-transparent shadow-none"
            >
              임시저장
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="bg-white text-[#4C1D95] rounded-lg px-6 py-2 border-transparent shadow-none"
            >
              신고 제출
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
