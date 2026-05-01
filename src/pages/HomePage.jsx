import { useMemo, useState } from 'react'
import prod1 from '../assets/prod1.jpg'
import prod2 from '../assets/prod2.jpg'
import prod3 from '../assets/prod3.jpg'
import logoNew from '../assets/logo-new.jpg'
import bannerNew from '../assets/banner-new.jpg'

const products = [
  { id: 1, name: 'Codex 5.3 / 5.4 Private', oldPrice: 137500, price: 55000, image: prod1, tag: 'Token', category: 'token', desc: 'Akun private 1 bulan, proses cepat, support aktivasi.' },
  { id: 2, name: 'Leonardo API Access Ready', oldPrice: 137500, price: 55000, image: prod2, tag: 'AI', category: 'ai', desc: 'Siap pakai untuk generate image AI dan workflow otomatis.' },
  { id: 3, name: 'AI Editing Booster Pack', oldPrice: 137500, price: 55000, image: prod3, tag: 'Editing', category: 'editing', desc: 'Cocok untuk kebutuhan editing konten cepat dan konsisten.' },
]

const testimonials = [
  { name: 'Rafi, Jakarta', text: 'Proses cepat dan aman.' },
  { name: 'Nadia, Bandung', text: 'Checkout gampang banget.' },
  { name: 'Bayu, Surabaya', text: 'Worth it buat mulai.' },
]

const avatarColor = ['#2563eb', '#7c3aed', '#0ea5e9']

export default function HomePage() {
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ email: '', whatsapp: '' })
  const [activeCategory, setActiveCategory] = useState('all')
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  const filteredProducts = useMemo(() => activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory), [activeCategory])

  return <main>
    <header
      className="hero"
      style={{ backgroundImage: `linear-gradient(140deg,rgba(11,31,77,.86),rgba(18,51,122,.82)), url(${bannerNew})` }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setPointer({ x, y })
      }}
      onMouseLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="parallax-layer" style={{ transform: `translate3d(${pointer.x * -20}px, ${pointer.y * -20}px, 0)` }} />
      <img src={logoNew} alt="Bandar Akun" className="hero-logo" style={{ transform: `translate3d(${pointer.x * 18}px, ${pointer.y * 18}px, 0) rotateY(${pointer.x * 12}deg) rotateX(${pointer.y * -12}deg)` }} />
      <h1>Bandar Akun Marketplace</h1>
      <p>Produk AI, Editing, dan Token</p>
    </header>

    <section className="section">
      <div className="filters">{['all', 'ai', 'editing', 'token'].map(c => <button key={c} className={`filter ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>{c === 'all' ? 'Semua' : c.toUpperCase()}</button>)}</div>
      <div className="grid">{filteredProducts.map(p => <article className="card" key={p.id}><img src={p.image} /><div className="card-body"><span className="tag">{p.tag}</span><h3>{p.name}</h3><p className="desc">{p.desc}</p><div className="price-wrap"><span className="old-price">Rp{p.oldPrice.toLocaleString('id-ID')}</span><span className="discount">Diskon 60%</span></div><p className="price">Rp{p.price.toLocaleString('id-ID')}</p><button className="btn" onClick={() => setSelected(p)}>Beli Sekarang</button></div></article>)}</div>
    </section>

    <section className="section testimonials"><h2>Testimoni</h2><div className="marquee"><div className="marquee-track">{[...testimonials, ...testimonials].map((t, i) => <article key={i} className="testi-card"><div className="avatar" style={{ background: avatarColor[i % avatarColor.length] }}>{t.name.charAt(0)}</div><p>“{t.text}”</p><strong>{t.name}</strong></article>)}</div></div></section>

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="modal" onClick={(e) => e.stopPropagation()}><h3>Proses Pembelian</h3><p className="muted">{selected.name}</p><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><label>Nomor WhatsApp</label><input type="text" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} /><div className="modal-actions"><button className="btn" onClick={() => setSelected(null)}>Batal</button><button className="btn primary">Lanjut Bayar</button></div></div></div>}
  </main>
}
