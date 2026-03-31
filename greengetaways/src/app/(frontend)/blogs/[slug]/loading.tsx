export default function BlogDetailLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d2b2f' }}>
      {/* Hero */}
      <div
        style={{
          padding: '80px 24px 60px',
          background: 'linear-gradient(180deg, rgba(0,148,68,0.08) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div className="skeleton" style={{ height: 26, width: 90, borderRadius: 13 }} />
            <div className="skeleton" style={{ height: 26, width: 76, borderRadius: 13 }} />
          </div>
          {/* Title */}
          <div className="skeleton" style={{ height: 52, width: '80%' }} />
          <div className="skeleton" style={{ height: 52, width: '55%' }} />
          {/* Excerpt */}
          <div className="skeleton" style={{ height: 20, width: '90%' }} />
          <div className="skeleton" style={{ height: 20, width: '75%' }} />
          {/* Meta */}
          <div style={{ display: 'flex', gap: 24, marginTop: 4 }}>
            {[120, 100, 80].map((w, i) => (
              <div key={i} className="skeleton" style={{ height: 16, width: w }} />
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 64px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[100, 95, 90, 80, 100, 70, 85, 95, 60, 88, 75, 92].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: 16, width: `${w}%` }} />
          ))}
          {/* Tags */}
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {[80, 90, 70].map((w, i) => (
              <div key={i} className="skeleton" style={{ height: 28, width: w, borderRadius: 14 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
