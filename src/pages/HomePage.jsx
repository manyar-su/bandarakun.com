import { useEffect, useMemo, useState } from 'react'
import prod1 from '../assets/prod1.jpg'
import prod2 from '../assets/prod2.jpg'
import prod3 from '../assets/prod3.jpg'

const STORAGE_KEY = 'bandarakun-products'

const defaultProducts = [
  {
    id: 1,
    name: 'Gemini Pro AI Private 1 Bulan',
    oldPrice: 219000,
    price: 99000,
    image: prod1,
    category: 'ai',
    location: 'Jakarta Pusat',
    sold: '250+ terjual',
    rating: '5.0',
    promo: 'Promo Mingguan',
    duration: '1 bulan',
  },
  {
    id: 2,
    name: 'Perplexity Pro Include ChatGPT Bundle',
    oldPrice: 179000,
    price: 120000,
    image: prod2,
    category: 'ai',
    location: 'Jakarta Barat',
    sold: '180+ terjual',
    rating: '5.0',
    promo: 'Hemat Bonus',
    duration: '1 bulan',
  },
  {
    id: 3,
    name: 'Canva Pro Sharing Tools Premium',
    oldPrice: 99000,
    price: 45000,
    image: prod3,
    category: 'tools',
    location: 'Bandung',
    sold: '96 terjual',
    rating: '5.0',
    promo: 'Akses Cepat',
    duration: '30 hari',
  },
  {
    id: 4,
    name: 'CapCut Pro Creator Apps Sharing',
    oldPrice: 79000,
    price: 35000,
    image: prod1,
    category: 'apps',
    location: 'Surabaya',
    sold: '124 terjual',
    rating: '5.0',
    promo: 'Gratis Update',
    duration: '30 hari',
  },
  {
    id: 5,
    name: 'Claude Pro VIP Sharing',
    oldPrice: 189000,
    price: 85000,
    image: prod2,
    category: 'ai',
    location: 'Jakarta Timur',
    sold: '73 terjual',
    rating: '5.0',
    promo: 'Best Seller',
    duration: '1 bulan',
  },
  {
    id: 6,
    name: 'Notion AI Workspace Tools Access',
    oldPrice: 119000,
    price: 59000,
    image: prod3,
    category: 'tools',
    location: 'Bekasi',
    sold: '41 terjual',
    rating: '5.0',
    promo: 'Produktivitas',
    duration: '30 hari',
  },
]

const chips = [
  { key: 'all', label: 'Semua' },
  { key: 'ai', label: 'AI' },
  { key: 'tools', label: 'Tools' },
  { key: 'apps', label: 'Apps' },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ email: '', whatsapp: '' })
  const [products, setProducts] = useState(defaultProducts)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length) setProducts(parsed)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return products.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory
      const matchQuery = !normalized || [item.name, item.category, item.location, item.promo].some((v) => v.toLowerCase().includes(normalized))
      return matchCategory && matchQuery
    })
  }, [activeCategory, products, query])

  return (
    <main className="market-home">
      <section className="market-toolbar-wrap">
        <div className="market-toolbar">
          <button className="icon-btn" aria-label="Back">←</button>
          <div className="market-search">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Cari produk AI, tools, apps"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <a className="icon-btn" href="/admin" aria-label="Admin">＋</a>
          <button className="icon-btn" aria-label="Menu">☰</button>
        </div>
        <div className="market-chip-row">
          <div className="chip-group">
            {chips.map((chip) => (
              <button
                key={chip.key}
                className={`market-chip ${activeCategory === chip.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(chip.key)}
              >
                {chip.label}
              </button>
            ))}
          </div>
          <div className="toolbar-badges">
            <span className="toolbar-pill">⇅</span>
            <span className="toolbar-pill green">2</span>
          </div>
        </div>
      </section>

      <section className="product-section market-listing">
        <div className="market-grid">
          {filteredProducts.map((item) => (
            <article className="market-card" key={item.id} onClick={() => setSelected(item)}>
              <div className="market-thumb-wrap">
                <img src={item.image} alt={item.name} className="market-thumb" />
                <span className="promo-badge">{item.promo}</span>
                <span className="duration-badge">{item.duration}</span>
              </div>
              <div className="market-body">
                <h3>{item.name}</h3>
                <p className="market-price">Rp{item.price.toLocaleString('id-ID')}</p>
                <p className="market-meta discount-line">Hemat dari Rp{item.oldPrice.toLocaleString('id-ID')}</p>
                <p className="market-meta">⭐ {item.rating} · {item.sold}</p>
                <p className="market-location">{item.location}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal market-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selected.name}</h3>
            <p className="muted">Kategori: {selected.category.toUpperCase()} • Durasi: {selected.duration}</p>
            <div className="detail-grid">
              <div><span>Harga</span><strong>Rp{selected.price.toLocaleString('id-ID')}</strong></div>
              <div><span>Lokasi</span><strong>{selected.location}</strong></div>
              <div><span>Rating</span><strong>{selected.rating}</strong></div>
              <div><span>Terjual</span><strong>{selected.sold}</strong></div>
            </div>
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
