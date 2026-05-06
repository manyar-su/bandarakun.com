import { useEffect, useMemo, useState } from 'react'
import prod1 from '../assets/prod1.jpg'
import prod2 from '../assets/prod2.jpg'
import prod3 from '../assets/prod3.jpg'
import logoNew from '../assets/logo-new.jpg'
import bannerNew from '../assets/banner-new.jpg'

const products = [
  {
    id: 1,
    name: 'ChatGPT Team VIP Sharing',
    oldPrice: 149000,
    price: 79000,
    image: prod1,
    badge: 'Best Seller',
    category: 'ai',
    subcategory: 'VIP Sharing',
    duration: '30 Hari',
    access: 'Shared Access',
    stock: 'Ready',
    desc: 'Cocok untuk riset, prompt writing, dan kerja harian dengan proses cepat.',
    benefits: ['Proses cepat', 'Cocok untuk kerja tim', 'Support after order'],
  },
  {
    id: 2,
    name: 'Canva Pro VIP Sharing',
    oldPrice: 99000,
    price: 49000,
    image: prod2,
    badge: 'Tools Favorite',
    category: 'tools',
    subcategory: 'VIP Sharing',
    duration: '30 Hari',
    access: 'Invite Access',
    stock: 'Ready',
    desc: 'Untuk desain konten, presentasi, dan kebutuhan branding lebih cepat.',
    benefits: ['Mudah dipakai', 'Cocok untuk konten harian', 'Akses cepat'],
  },
  {
    id: 3,
    name: 'CapCut Pro Sharing',
    oldPrice: 89000,
    price: 45000,
    image: prod3,
    badge: 'Apps Pilihan',
    category: 'apps',
    subcategory: 'VIP Sharing',
    duration: '30 Hari',
    access: 'Shared Access',
    stock: 'Ready',
    desc: 'Pas untuk editing video short content dengan workflow yang lebih ringkas.',
    benefits: ['Cocok creator', 'Proses order simpel', 'Bantu percepat produksi'],
  },
  {
    id: 4,
    name: 'Claude Pro VIP Sharing',
    oldPrice: 159000,
    price: 85000,
    image: prod1,
    badge: 'AI Premium',
    category: 'ai',
    subcategory: 'VIP Sharing',
    duration: '30 Hari',
    access: 'Shared Access',
    stock: 'Limited',
    desc: 'Untuk drafting, analisa, dan penulisan yang butuh output lebih rapi.',
    benefits: ['Output lebih rapi', 'Cocok untuk kerja dokumen', 'Bisa buat analisa'],
  },
  {
    id: 5,
    name: 'Notion AI Tools Access',
    oldPrice: 109000,
    price: 59000,
    image: prod2,
    badge: 'Productivity',
    category: 'tools',
    subcategory: 'VIP Sharing',
    duration: '30 Hari',
    access: 'Shared Workspace',
    stock: 'Ready',
    desc: 'Cocok untuk catatan, SOP, knowledge base, dan manajemen kerja.',
    benefits: ['Lebih rapi', 'Produktivitas naik', 'Mudah dipakai'],
  },
  {
    id: 6,
    name: 'YouTube Premium Apps Sharing',
    oldPrice: 59000,
    price: 29000,
    image: prod3,
    badge: 'Hemat',
    category: 'apps',
    subcategory: 'VIP Sharing',
    duration: '30 Hari',
    access: 'Invite Access',
    stock: 'Ready',
    desc: 'Pilihan simpel untuk kebutuhan hiburan dan pemakaian harian.',
    benefits: ['Harga hemat', 'Simple', 'Cepat aktif'],
  },
]

const testimonials = [
  { name: 'Rafi, Jakarta', text: 'Produknya jelas, prosesnya cepat, dan enak karena tinggal pilih kategori.' },
  { name: 'Nadia, Bandung', text: 'Bagian AI, Tools, dan Apps jadi lebih gampang dibedakan.' },
  { name: 'Bayu, Surabaya', text: 'Checkout lebih meyakinkan karena ada detail akses, durasi, dan status stok.' },
]

const trustPoints = [
  'Kategori AI, Tools, dan Apps lebih jelas',
  'Tampilan produk lebih informatif sebelum checkout',
  'Ada alur beli, FAQ, dan CTA ke admin',
]

const howToBuy = [
  'Pilih kategori lalu cek produk yang paling cocok',
  'Klik detail atau beli sekarang untuk lihat info akses dan durasi',
  'Isi kontak lalu lanjutkan konfirmasi ke admin',
]

const heroCards = [
  { title: 'AI Access', value: 'Prompting • Writing • Research' },
  { title: 'Tools Stack', value: 'Design • Workflow • Productivity' },
  { title: 'Apps Ready', value: 'Editing • Creator • Daily Use' },
]

const avatarColor = ['#2563eb', '#7c3aed', '#0ea5e9']
const categoryOptions = [
  { key: 'all', label: 'Semua' },
  { key: 'ai', label: 'AI' },
  { key: 'tools', label: 'Tools' },
  { key: 'apps', label: 'Apps' },
]

export default function HomePage() {
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ email: '', whatsapp: '' })
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return products.filter((p) => {
      const categoryMatch = activeCategory === 'all' || p.category === activeCategory
      const queryMatch =
        !normalized ||
        [p.name, p.category, p.subcategory, p.desc, p.badge].some((value) => value.toLowerCase().includes(normalized))
      return categoryMatch && queryMatch
    })
  }, [activeCategory, query])

  const summary = useMemo(() => ({
    total: products.length,
    ai: products.filter((p) => p.category === 'ai').length,
    tools: products.filter((p) => p.category === 'tools').length,
    apps: products.filter((p) => p.category === 'apps').length,
  }), [])

  return (
    <main>
      <header
        className="hero"
        style={{ backgroundImage: `linear-gradient(140deg,rgba(11,31,77,.88),rgba(18,51,122,.82)), url(${bannerNew})` }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5
          setPointer({ x, y })
        }}
        onMouseLeave={() => setPointer({ x: 0, y: 0 })}
      >
        <div className="hero-orb orb-left" style={{ transform: `translate3d(${pointer.x * -35}px, ${pointer.y * -20 - scrollY * 0.06}px, 0)` }} />
        <div className="hero-orb orb-right" style={{ transform: `translate3d(${pointer.x * 28}px, ${pointer.y * 20 - scrollY * 0.08}px, 0)` }} />
        <div className="hero-grid-lines" style={{ transform: `translate3d(0, ${scrollY * 0.12}px, 0)` }} />
        <div className="parallax-layer" style={{ transform: `translate3d(${pointer.x * -20}px, ${pointer.y * -20 - scrollY * 0.1}px, 0)` }} />

        <div className="hero-content">
          <div className="hero-copy">
            <span className="hero-pill">VIP Sharing Marketplace</span>
            <h1>Akun VIP Sharing untuk AI, Tools, dan Apps</h1>
            <p>Pilih kategori dengan lebih jelas, cek detail aksesnya, lalu lanjut order dengan lebih cepat.</p>
            <div className="hero-actions">
              <a href="#catalog" className="btn primary">Lihat Katalog</a>
              <a href="#how-to-buy" className="btn ghost">Cara Order</a>
            </div>
            <div className="hero-stats">
              <div><strong>{summary.total}+</strong><span>Produk tampil</span></div>
              <div><strong>{summary.ai}</strong><span>Kategori AI</span></div>
              <div><strong>{summary.tools}</strong><span>Kategori Tools</span></div>
              <div><strong>{summary.apps}</strong><span>Kategori Apps</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src={logoNew}
              alt="Bandar Akun"
              className="hero-logo"
              style={{ transform: `translate3d(${pointer.x * 18}px, ${pointer.y * 18 - scrollY * 0.12}px, 0) rotateY(${pointer.x * 12}deg) rotateX(${pointer.y * -12}deg)` }}
            />
            <div className="floating-cards">
              {heroCards.map((card, index) => (
                <article
                  key={card.title}
                  className={`floating-card floating-card-${index + 1}`}
                  style={{ transform: `translate3d(${pointer.x * (index % 2 === 0 ? -14 : 14)}px, ${pointer.y * 10 - scrollY * (0.05 + index * 0.02)}px, 0)` }}
                >
                  <span>{card.title}</span>
                  <strong>{card.value}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="section trust-strip">
        {trustPoints.map((item) => <div className="trust-item" key={item}>{item}</div>)}
      </section>

      <section className="section" id="catalog">
        <div className="section-head">
          <div>
            <span className="eyebrow">Katalog</span>
            <h2>VIP Sharing by Category</h2>
            <p className="section-copy">Fokus ke 3 kelompok utama: AI, Tools, dan Apps. Jadi user lebih cepat paham apa yang dijual dan produk mana yang paling cocok.</p>
          </div>
          <div className="search-box">
            <label htmlFor="product-search">Cari produk</label>
            <input
              id="product-search"
              type="text"
              placeholder="Contoh: ChatGPT, Canva, CapCut"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="filters">
          {categoryOptions.map((c) => (
            <button key={c.key} className={`filter ${activeCategory === c.key ? 'active' : ''}`} onClick={() => setActiveCategory(c.key)}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="grid">
          {filteredProducts.map((p) => (
            <article className="card" key={p.id}>
              <img src={p.image} alt={p.name} />
              <div className="card-body">
                <div className="card-topline">
                  <span className="tag">{p.subcategory}</span>
                  <span className={`stock ${p.stock === 'Ready' ? 'ready' : 'limited'}`}>{p.stock}</span>
                </div>
                <h3>{p.name}</h3>
                <p className="desc">{p.desc}</p>
                <div className="mini-specs">
                  <span>{p.category.toUpperCase()}</span>
                  <span>{p.duration}</span>
                  <span>{p.access}</span>
                </div>
                <div className="price-wrap">
                  <span className="old-price">Rp{p.oldPrice.toLocaleString('id-ID')}</span>
                  <span className="discount">{p.badge}</span>
                </div>
                <p className="price">Rp{p.price.toLocaleString('id-ID')}</p>
                <ul className="benefits">
                  {p.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                </ul>
                <div className="card-actions">
                  <button className="btn" onClick={() => setSelected(p)}>Lihat Detail</button>
                  <button className="btn primary" onClick={() => setSelected(p)}>Beli Sekarang</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section feature-split" id="how-to-buy">
        <div className="panel">
          <span className="eyebrow">Kenapa lebih enak sekarang</span>
          <h2>Struktur produk lebih meyakinkan</h2>
          <ul className="check-list">
            <li>Ada kategori utama dan subkategori yang lebih jelas</li>
            <li>Detail produk sudah tampil: durasi, jenis akses, dan status stok</li>
            <li>Lebih gampang dibanding website yang cuma tampil nama + harga</li>
          </ul>
        </div>
        <div className="panel">
          <span className="eyebrow">Cara Order</span>
          <h2>Alur beli yang lebih simpel</h2>
          <ol className="step-list">
            {howToBuy.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <a className="btn primary full" href="#catalog">Pilih Produk Sekarang</a>
        </div>
      </section>

      <section className="section testimonials">
        <div className="section-head simple">
          <div>
            <span className="eyebrow">Trust</span>
            <h2>Testimoni Singkat</h2>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...testimonials, ...testimonials].map((t, i) => (
              <article key={i} className="testi-card">
                <div className="avatar" style={{ background: avatarColor[i % avatarColor.length] }}>{t.name.charAt(0)}</div>
                <p>“{t.text}”</p>
                <strong>{t.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-preview">
        <div className="section-head simple">
          <div>
            <span className="eyebrow">FAQ Ringkas</span>
            <h2>Pertanyaan yang paling sering muncul</h2>
          </div>
        </div>
        <div className="faq-grid">
          <article className="faq-card"><h3>Aksesnya model apa?</h3><p>Tergantung produk: shared access, invite access, atau workspace access. Detailnya ditampilkan di kartu produk.</p></article>
          <article className="faq-card"><h3>Berapa durasi aktif?</h3><p>Mayoritas ditampilkan per 30 hari supaya user langsung paham tanpa harus tanya admin dulu.</p></article>
          <article className="faq-card"><h3>Kalau masih bingung pilih?</h3><p>User bisa mulai dari kategori AI, Tools, atau Apps dulu, lalu lanjutkan ke admin setelah lihat detail produk.</p></article>
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selected.name}</h3>
            <p className="muted">{selected.subcategory} • {selected.category.toUpperCase()}</p>
            <div className="detail-grid">
              <div><span>Durasi</span><strong>{selected.duration}</strong></div>
              <div><span>Akses</span><strong>{selected.access}</strong></div>
              <div><span>Status</span><strong>{selected.stock}</strong></div>
              <div><span>Harga</span><strong>Rp{selected.price.toLocaleString('id-ID')}</strong></div>
            </div>
            <p className="desc">{selected.desc}</p>
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="emailkamu@contoh.com" />
            <label>Nomor WhatsApp</label>
            <input type="text" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="08xxxxxxxxxx" />
            <div className="modal-actions">
              <button className="btn" onClick={() => setSelected(null)}>Tutup</button>
              <a
                className="btn primary"
                href={`https://wa.me/6280000000000?text=${encodeURIComponent(`Halo admin, saya tertarik dengan ${selected.name}. Email: ${form.email || '-'}, WhatsApp: ${form.whatsapp || '-'}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                Chat Admin
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
