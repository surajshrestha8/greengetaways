export default function BlogsLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d2b2f' }}>
      {/* Hero skeleton */}
      <div
        style={{
          padding: '80px 24px 60px',
          background: 'linear-gradient(180deg, rgba(0,148,68,0.08) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(105,189,69,0.15)',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="skeleton" style={{ height: 48, width: '45%', maxWidth: 360 }} />
          <div className="skeleton" style={{ height: 18, width: '65%', maxWidth: 520 }} />
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <div className="skeleton" style={{ height: 22, width: 80, borderRadius: 11 }} />
              <div className="skeleton" style={{ height: 22, width: 70, borderRadius: 11 }} />
            </div>
            <div className="skeleton" style={{ height: 26, width: '90%' }} />
            <div className="skeleton" style={{ height: 26, width: '70%' }} />
            <div className="skeleton" style={{ height: 15, width: '100%' }} />
            <div className="skeleton" style={{ height: 15, width: '85%' }} />
            <div className="skeleton" style={{ height: 15, width: '75%' }} />
            <div className="skeleton" style={{ height: 14, width: 90, marginTop: 8, borderRadius: 4 }} />
          </div>
        ))}
      </div>
    </div>
  )
}
