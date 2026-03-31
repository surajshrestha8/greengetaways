export default function ConfirmationLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d2b2f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(105,189,69,0.2)',
          borderRadius: 20,
          padding: '48px 40px',
          maxWidth: 560,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Icon placeholder */}
        <div className="skeleton" style={{ height: 64, width: 64, borderRadius: '50%' }} />

        {/* Heading */}
        <div className="skeleton" style={{ height: 34, width: '60%' }} />

        {/* Subtext */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', alignItems: 'center' }}>
          <div className="skeleton" style={{ height: 16, width: '80%' }} />
          <div className="skeleton" style={{ height: 16, width: '65%' }} />
        </div>

        {/* Reference box */}
        <div
          style={{
            background: 'rgba(105,189,69,0.06)',
            border: '1px solid rgba(105,189,69,0.2)',
            borderRadius: 12,
            padding: '20px 24px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div className="skeleton" style={{ height: 12, width: 130 }} />
          <div className="skeleton" style={{ height: 32, width: '70%' }} />
        </div>

        {/* Detail rows */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="skeleton" style={{ height: 16, width: '35%' }} />
            <div className="skeleton" style={{ height: 16, width: '40%' }} />
          </div>
        ))}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <div className="skeleton" style={{ height: 44, width: 140, borderRadius: 8 }} />
          <div className="skeleton" style={{ height: 44, width: 140, borderRadius: 8 }} />
        </div>
      </div>
    </div>
  )
}
