export const BRAND = {
  name: "printtie",
  tagline: "당신의 작품을 간편하게, 안전하게 판매하세요",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

// Adjust NAV_ITEMS to point to actual routes present in the app.
// Many pages use routes like /home, /artworks, /artworks/new, /mypage, /checkout, /login, /register
// Update nav to reference those paths so header links navigate correctly.
export const NAV_ITEMS: NavItem[] = [
  { label: "홈", href: "/home" },
  { label: "작품 둘러보기", href: "/artworks" },
  { label: "작품 등록", href: "/artworks/new" },
  { label: "마이페이지", href: "/mypage" },
  { label: "문의/신고", href: "/ops-report-center" },
];

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "회사",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "서비스",
    links: [
      { label: "작품 등록 가이드", href: "/guides/selling" },
      { label: "결제 정책", href: "/policies/payment" },
      { label: "이용 약관", href: "/legal/terms" },
    ],
  },
  {
    title: "지원",
    links: [
      { label: "자주 묻는 질문", href: "/help/faq" },
      { label: "CS 센터", href: "/support" },
      { label: "신고/검수", href: "/reports" },
    ],
  },
  {
    title: "개발자",
    links: [
      { label: "API", href: "/dev/api" },
      { label: "문서", href: "/dev/docs" },
      { label: "상태", href: "/status" },
    ],
  },
];
