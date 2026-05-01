import './App.css'

const plans = [
  {
    name: 'Private Basic',
    price: 'Rp55.000',
    net: 'NETT setelah diskon',
    duration: '1 Bulan',
    cta: 'Pilih Paket Ini',
  },
]

function App() {
  return (
    <main>
      <section className="hero parallax">
        <span className="badge">Private Account</span>
        <h1>Codex 5.3 / 5.4</h1>
        <p>Look clean, buy cepat, dan langsung aktif.</p>
        <a href="#pricing" className="btn primary">Beli Sekarang</a>
      </section>

      <section id="pricing" className="section">
        <h2>Paket Akun Privat</h2>
        <div className="cards">
          {plans.map((plan) => (
            <article key={plan.name} className="card">
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <p className="muted">{plan.net}</p>
              <p>{plan.duration} • Proses Cepat • Garansi</p>
              <a href="#checkout" className="btn">{plan.cta}</a>
            </article>
          ))}
        </div>
      </section>

      <section id="checkout" className="section checkout">
        <h2>Checkout Otomatis</h2>
        <p>Pilih paket, isi data, lalu lanjut bayar via QRIS DANA atau transfer rekening.</p>
        <div className="payment-box">
          <strong>Metode Bayar</strong>
          <ul>
            <li>QRIS DANA (utama)</li>
            <li>Nomor rekening penerima (backup)</li>
          </ul>
          <button className="btn primary">Lanjut Pembayaran</button>
        </div>
      </section>
    </main>
  )
}

export default App
