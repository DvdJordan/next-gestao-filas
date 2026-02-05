import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px', // Raio menor para parecer mais "bloco" como o TradingView
        }}
      >
        <div
          style={{
            fontSize: '26px', // Aumentado significativamente
            color: 'white',
            fontWeight: 900,
            fontStyle: 'italic',
            display: 'flex',
            transform: 'translateX(-1px)', // Compensa a inclinação para centralizar visualmente
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-2px',
          }}
        >
          N
          <span style={{ 
            color: '#2b5de0',
            marginLeft: '0px',
            textShadow: '0 0 5px rgba(43, 93, 224, 0.5)' // Leve brilho neon no ponto
          }}>
            .
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}