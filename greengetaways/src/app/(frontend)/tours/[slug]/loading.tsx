export default function TourDetailLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d2b2f' }}>
      {/* Hero */}
      <div
        style={{
          height: 480,
          background: 'rgba(255,255,255,0.03)',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <div className="skeleton" style={{ position: 'absolute', inset: 0, borderRadius: 0 }} />
        <div style={{ position: 'relative', padding: '40px 32px', width: '100%', maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="skeleton" style={{ height: 14, width: 100, borderRadius: 4 }} />
          <div className="skeleton" style={{ height: 48, width: '55%', maxWidth: 520 }} />
          <div style={{ display: 'flex', gap: 12 }}>
            {[100, 90, 110].map((w, i) => (
              <div key={i} className="skeleton" style={{ height: 32, width: w, borderRadius: 16 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick facts bar */}
      <div style={{ background: 'rgba(0,148,68,0.08)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[120, 100, 130, 110].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: 20, width: w }} />
          ))}
        </div>
      </div>

      {/* Tabs + content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 0 }}>
          {[120, 100, 110, 130, 100].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: 40, width: w, borderRadius: '6px 6px 0 0' }} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40 }}>
          {/* Content area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[100, 90, 95, 80, 100, 70, 85, 60].map((w, i) => (
              <div key={i} className="skeleton" style={{ height: 16, width: `${w}%` }} />
            ))}
          </div>
          {/* Sidebar */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="skeleton" style={{ height: 36, width: '70%' }} />
            <div className="skeleton" style={{ height: 20, width: '50%' }} />
            {[90, 80, 70].map((w, i) => (
              <div key={i} className="skeleton" style={{ height: 16, width: `${w}%` }} />
            ))}
            <div className="skeleton" style={{ height: 48, borderRadius: 8, marginTop: 8 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
