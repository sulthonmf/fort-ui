import { ImageResponse } from 'next/og';

/**
 * Renders the minimalist monochrome fort-ui icon as a PNG via Next.js ImageResponse.
 */
export function createFortIconResponse(size: number) {
  const radius = Math.round(size / 2);
  const svgSize = Math.round((58 / 96) * size);

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: radius,
          backgroundColor: '#09090b',
        }}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6.5 19V7C6.5 5.9 7.4 5 8.5 5H18"
            stroke="#ffffff"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 12H16.5"
            stroke="#ffffff"
            strokeWidth="2.7"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    {
      width: size,
      height: size,
    },
  );
}
