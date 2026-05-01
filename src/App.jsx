import { useMemo, useState } from 'react'
import './App.css'
import prod1 from './assets/prod1.jpg'
import prod2 from './assets/prod2.jpg'
import prod3 from './assets/prod3.jpg'
import logoNew from './assets/logo-new.jpg'
import bannerNew from './assets/banner-new.jpg'

const products = [
  { id: 1, name: 'Codex 5.3 / 5.4 Private', oldPrice: 137500, price: 55000, image: prod1, tag: 'Token', category: 'token', desc: 'Akun private 1 bulan, proses cepat, support aktivasi.' },
  { id: 2, name: 'Leonardo API Access Ready', oldPrice: 137500, price: 55000, image: prod2, tag: 'AI', category: 'ai', desc: 'Siap pakai untuk generate image AI dan workflow otomatis.' },
  { id: 3, name: 'AI Editing Booster Pack', oldPrice: 137500, price: 55000, image: prod3, tag: 'Editing', category: 'editing', desc: 'Cocok untuk kebutuhan editing konten cepat dan konsisten.' },
  { id: 4, name: 'Token Starter 100K', oldPrice: 137500, price: 55000, image: prod1, tag: 'Token', category: 'token', desc: 'Pilihan hemat untuk mulai trial dan testing use case.' },
  { id: 5, name: 'AI Prompt Bundle Premium', oldPrice: 137500, price: 55000, image: prod2, tag: 'AI', category: 'ai', desc: 'Template prompt siap pakai untuk hasil lebih presisi.' },
  { id: 6, name: 'Editing Fast Track Access', oldPrice: 137500, price: 55000, image: prod3, tag: 'Editing', category: 'editing', desc: 'Optimasi proses editing untuk creator dan seller.' },
]

const testimonials = [
  { name: 'Rafi, Jakarta', text: 'Prosesnya cepat, habis bayar langsung dibantu aktivasi.' },
  { name: 'Nadia, Bandung', text: 'UI-nya jelas, checkout simpel, dan admin responsif.' },
  { name: 'Bayu, Surabaya', text: 'Harga promonya masuk, cocok buat mulai jualan AI service.' },
]

export default function App() {
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ email: '', whatsapp: '' })
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProducts = useMemo(() => (
    activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory)
  ), [activeCategory])

  return (
    <main>
      <header className="hero" style={{ backgroundImage: `linear-gradient(140deg,rgba(11,31,77,.86),rgba(18,51,122,.82)), url(${bannerNew})` }}>
        <div className="parallax-layer" />
        <img src={logoNew} alt="Bandar Akun" className="hero-logo" />
        <h1>Bandar Akun Marketplace</h1>
        <p>Produk AI, Editing, dan Token dengan proses cepat & aman</p>
        <a href="#produk" className="btn primary">Aktifkan Sekarang</a>
      </header>

      <section id="produk" className="section">
        <div className="section-head">
          <h2>Produk Unggulan</h2>
          <span className="chip">Diskon 60% terbatas</span>
        </div>

        <div className="filters">
          {['all', 'ai', 'editing', 'token'].map((c) => (
            <button key={c} className={`filter ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>
              {c === 'all' ? 'Semua' : c.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid">
          {filteredProducts.map((p) => (
            <article key={p.id} className="card">
              <img src={p.image} alt={p.name} />
              <div className="card-body">
                <span className="tag">{p.tag}</span>
                <h3>{p.name}</h3>
                <p className="desc">{p.desc}</p>
                <div className="price-wrap">
                  <span className="old-price">Rp{p.oldPrice.toLocaleString('id-ID')}</span>
                  <span className="discount">Diskon 60%</span>
                </div>
                <p className="price">Rp{p.price.toLocaleString('id-ID')}</p>
                <button className="btn" onClick={() => setSelected(p)}>Beli Sekarang</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section testimonials">
        <h2>Testimoni Customer</h2>
        <div className="testi-grid">
          {testimonials.map((t) => (
            <article key={t.name} className="testi-card">
              <p>“{t.text}”</p>
              <strong>{t.name}</strong>
            </article>
          ))}
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Proses Pembelian</h3>
            <p className="muted">{selected.name}</p>
            <div className="price-wrap">
              <span className="old-price">Rp{selected.oldPrice.toLocaleString('id-ID')}</span>
              <span className="discount">Diskon 60%</span>
            </div>
            <p className="price">Rp{selected.price.toLocaleString('id-ID')}</p>
            <label>Email</label>
            <input type="email" placeholder="contoh@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <label>Nomor WhatsApp</label>
            <input type="text" placeholder="08xxxxxxxxxx" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
            <div className="modal-actions">
              <button className="btn" onClick={() => setSelected(null)}>Batal</button>
              <a className="btn primary" href="#" onClick={(e) => { e.preventDefault(); alert('Data tersimpan. Lanjut ke pembayaran QRIS / rekening.') }}>Lanjut Bayar</a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
