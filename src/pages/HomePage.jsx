import { useEffect, useMemo, useState } from 'react'
import prod1 from '../assets/prod1.jpg'
import prod2 from '../assets/prod2.jpg'
import prod3 from '../assets/prod3.jpg'

const STORAGE_KEY = 'bandarakun-products'
const ADMIN_WA = '6283165514217'

const defaultProducts = [
  {
    id: 1,
    name: 'Gemini Pro AI Private 1 Bulan',
    oldPrice: 219000,
    price: 99000,
    image: prod1,
    category: 'ai',
    sold: '250+ terjual',
    rating: '5.0',
    promo: 'Promo Mingguan',
    duration: '30 hari',
    serviceType: 'Private access',
    features: ['Akses AI premium', 'Cocok untuk riset dan writing', 'Support penggunaan harian'],
    detail: 'Paket digital product untuk kebutuhan prompting, riset, drafting, dan workflow kerja harian dengan masa aktif 30 hari.',
  },
  {
    id: 2,
    name: 'Leonardo AI 1 Bulan 8500 Token',
    oldPrice: 149000,
    price: 85000,
    image: prod2,
    category: 'ai',
    sold: '180+ terjual',
    rating: '5.0',
    promo: 'Best Offer',
    duration: '30 hari',
    serviceType: 'Sharing access',
    features: ['8500 token', 'Generate image', 'Generate video', 'Cocok untuk konten visual'],
    detail: 'Produk digital untuk kebutuhan generate image dan video dengan token siap pakai selama 1 bulan.',
  },
  {
    id: 3,
    name: 'Canva Pro Sharing Tools Premium',
    oldPrice: 99000,
    price: 45000,
    image: prod3,
    category: 'tools',
    sold: '96 terjual',
    rating: '5.0',
    promo: 'Akses Cepat',
    duration: '30 hari',
    serviceType: 'Invite access',
    features: ['Template premium', 'Export tanpa watermark', 'Cocok untuk desain konten'],
    detail: 'Layanan digital untuk kebutuhan desain konten, presentasi, dan editing visual dengan akses premium.',
  },
  {
    id: 4,
    name: 'CapCut Pro Creator Apps Sharing',
    oldPrice: 79000,
    price: 35000,
    image: prod1,
    category: 'apps',
    sold: '124 terjual',
    rating: '5.0',
    promo: 'Gratis Update',
    duration: '30 hari',
    serviceType: 'Sharing access',
    features: ['Fitur edit premium', 'Efek dan template tambahan', 'Cocok untuk short video'],
    detail: 'Produk digital untuk editing video creator dengan akses premium selama 30 hari.',
  },
  {
    id: 5,
    name: 'Claude Pro VIP Sharing',
    oldPrice: 189000,
    price: 85000,
    image: prod2,
    category: 'ai',
    sold: '73 terjual',
    rating: '5.0',
    promo: 'Best Seller',
    duration: '30 hari',
    serviceType: 'VIP sharing',
    features: ['Drafting dan analisa', 'Cocok untuk dokumen', 'Pemakaian produktif harian'],
    detail: 'Layanan digital AI premium untuk drafting, analisa, dan penulisan lebih rapi selama masa aktif 30 hari.',
  },
  {
    id: 6,
    name: 'Notion AI Workspace Tools Access',
    oldPrice: 119000,
    price: 59000,
    image: prod3,
    category: 'tools',
    sold: '41 terjual',
    rating: '5.0',
    promo: 'Produktivitas',
    duration: '30 hari',
    serviceType: 'Workspace access',
    features: ['Catatan premium', 'AI assistant', 'Cocok untuk SOP dan knowledge base'],
    detail: 'Produk digital untuk produktivitas dan workspace management dengan fitur AI aktif selama 30 hari.',
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
  const [openDetails, setOpenDetails] = useState({})

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
      const matchQuery = !normalized || [item.name, item.category, item.promo, item.serviceType].some((v) => String(v).toLowerCase().includes(normalized))
      return matchCategory && matchQuery
    })
  }, [activeCategory, products, query])

  const toggleDetail = (id) => {
    setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }))
  }

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
            <span className="toolbar-pill green">{filteredProducts.length}</span>
          </div>
        </div>
      </section>

      <section className="product-section market-listing">
        <div className="market-grid">
          {filteredProducts.map((item) => (
            <article className="market-card" key={item.id}>
              <div className="market-card-click" onClick={() => setSelected(item)}>
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
                  <p className="market-service">{item.serviceType}</p>
                </div>
              </div>
              <button className="showhide-btn" onClick={() => toggleDetail(item.id)}>
                {openDetails[item.id] ? 'Sembunyikan detail' : 'Lihat detail'}
              </button>
              {openDetails[item.id] && (
                <div className="market-detail-box">
                  <p><strong>Masa aktif:</strong> {item.duration}</p>
                  <p><strong>Jenis layanan:</strong> {item.serviceType}</p>
                  <p><strong>Keterangan:</strong> {item.detail}</p>
                  <div className="feature-list">
                    {item.features?.map((feature) => <span key={feature}>{feature}</span>)}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal market-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selected.name}</h3>
            <p className="muted">Kategori: {selected.category.toUpperCase()} • Masa aktif: {selected.duration}</p>
            <div className="detail-grid">
              <div><span>Harga</span><strong>Rp{selected.price.toLocaleString('id-ID')}</strong></div>
              <div><span>Jenis layanan</span><strong>{selected.serviceType}</strong></div>
              <div><span>Rating</span><strong>{selected.rating}</strong></div>
              <div><span>Terjual</span><strong>{selected.sold}</strong></div>
            </div>
            <p className="desc">{selected.detail}</p>
            <div className="feature-list modal-feature-list">
              {selected.features?.map((feature) => <span key={feature}>{feature}</span>)}
            </div>
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="emailkamu@contoh.com" />
            <label>Nomor WhatsApp</label>
            <input type="text" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="08xxxxxxxxxx" />
            <div className="modal-actions">
              <button className="btn" onClick={() => setSelected(null)}>Tutup</button>
              <a
                className="btn primary"
                href={`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(`Halo admin, saya tertarik dengan ${selected.name}. Email: ${form.email || '-'}, WhatsApp: ${form.whatsapp || '-'}`)}`}
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
