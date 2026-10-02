export default function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, string> = {
    arrow: 'M7 17 17 7M7 7h10v10',
    down: 'M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5',
    mail: 'M3 5h18v14H3zM3 5l9 8 9-8',
    phone: 'M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c-10 3-21-8-16-16Z',
    pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    code: 'm8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18',
    sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    moon: 'M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z',
    menu: 'M4 6h16M4 12h16M4 18h16',
    close: 'm6 6 12 12M6 18 18 6',
    screen: 'M3 3h18v14H3zM8 21h8m-4-4v4',
    briefcase: 'M3 7h18v14H3zM8 7V3h8v4M3 12a24 24 0 0 0 18 0M12 11v4',
    book: 'M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3zM12 6v16',
    check: 'm5 12 4 4L19 6',
    heart: 'M12 21 3 12C-3 4 7-2 12 6c5-8 15-2 9 6Z',
    eye: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    bot: 'M12 8V4H8 M12 8h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h8z M2 14h2 M20 14h2 M15 13v2 M9 13v2',
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.code} />
    </svg>
  )
}
