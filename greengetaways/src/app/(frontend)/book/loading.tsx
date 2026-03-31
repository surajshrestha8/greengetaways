export default function BookLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d2b2f' }}>
      {/* Header */}
      <div
        style={{
          padding: '32px 24px 24px',
          background: 'linear-gradient(180deg, rgba(0,148,68,0.1) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="skeleton" style={{ height: 14, width: 130, borderRadius: 4 }} />
          <div className="skeleton" style={{ height: 42, width: 260 }} />
        </div>
      </div>

      {/* Layout */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '40px 24px 60px',
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: 40,
          alignItems: 'start',
        }}
      >
        {/* Form card */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}>
          {[1, 2, 3].map((section) => (
            <div key={section} style={{ padding: '28px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="skeleton" style={{ height: 28, width: 28, borderRadius: '50%' }} />
                <div className="skeleton" style={{ height: 22, width: 160 }} />
              </div>
              {section === 1 && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="skeleton" style={{ height: 13, width: 80 }} />
                    <div className="skeleton" style={{ height: 44, borderRadius: 8 }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="skeleton" style={{ height: 13, width: 140 }} />
                    <div className="skeleton" style={{ height: 44, borderRadius: 8 }} />
                  </div>
                </>
              )}
              {section === 2 && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {[1, 2].map((f) => (
                      <div key={f} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div className="skeleton" style={{ height: 13, width: 80 }} />
                        <div className="skeleton" style={{ height: 44, borderRadius: 8 }} />
                      </div>
                    ))}
                  </div>
                  {[1, 2, 3].map((f) => (
                    <div key={f} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div className="skeleton" style={{ height: 13, width: 100 }} />
                      <div className="skeleton" style={{ height: 44, borderRadius: 8 }} />
                    </div>
                  ))}
                </>
              )}
              {section === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div className="skeleton" style={{ height: 13, width: 220 }} />
                  <div className="skeleton" style={{ height: 100, borderRadius: 8 }} />
                </div>
              )}
            </div>
          ))}
          <div style={{ margin: '24px 32px 32px' }}>
            <div className="skeleton" style={{ height: 52, borderRadius: 8 }} />
          </div>
        </div>

        {/* Summary card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="skeleton" style={{ height: 12, width: 90 }} />
          <div className="skeleton" style={{ height: 26, width: '85%' }} />
          <div className="skeleton" style={{ height: 26, width: '65%' }} />
          {[100, 80].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: 16, width: `${w}%` }} />
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
          {[70, 60, 50].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: 16, width: `${w}%` }} />
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="skeleton" style={{ height: 20, width: 50 }} />
            <div className="skeleton" style={{ height: 36, width: 100 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
