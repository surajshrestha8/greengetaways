export default function ToursLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d2b2f' }}>
      {/* Hero skeleton */}
      <div
        style={{
          padding: '100px 24px 80px',
          background: 'linear-gradient(180deg, rgba(0,148,68,0.08) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="skeleton" style={{ height: 14, width: 120, borderRadius: 4 }} />
          <div className="skeleton" style={{ height: 52, width: '50%', maxWidth: 480 }} />
          <div className="skeleton" style={{ height: 18, width: '35%', maxWidth: 320 }} />
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[200, 160, 140, 160, 120].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: 38, width: w, borderRadius: 8 }} />
          ))}
        </div>
      </div>

      {/* Cards grid skeleton */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}
          >
            <div className="skeleton" style={{ height: 220, borderRadius: 0 }} />
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="skeleton" style={{ height: 22, width: '80%' }} />
              <div className="skeleton" style={{ height: 14, width: '60%' }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                {[80, 70, 90].map((w, j) => (
                  <div key={j} className="skeleton" style={{ height: 24, width: w, borderRadius: 12 }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <div className="skeleton" style={{ height: 28, width: 100 }} />
                <div className="skeleton" style={{ height: 38, width: 110, borderRadius: 8 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
