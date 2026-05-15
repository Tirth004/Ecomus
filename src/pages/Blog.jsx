import { Link } from 'react-router-dom';

const CDN = 'https://themesflat.co/html/ecomus/images';

const posts = [
  { id: 1, title: 'The next generation of leather alternatives', category: 'ACCESSORIES', image: `${CDN}/blog/blog-2.jpg` },
  { id: 2, title: 'An Exclusive Clothing Collaboration',          category: 'ACCESSORIES', image: `${CDN}/blog/blog-3.jpg` },
  { id: 3, title: 'Hello Fashion by Colombian-American',          category: 'ACCESSORIES', image: `${CDN}/blog/blog-4.jpg` },
  { id: 4, title: 'Christine Is A True Style Icon',               category: 'ACCESSORIES', image: `${CDN}/blog/blog-5.jpg` },
  { id: 5, title: 'Effortlessly Blends The Carefree Style',       category: 'DESIGN',      image: `${CDN}/blog/blog-6.jpg` },
  { id: 6, title: 'The Variety Of Styles And Prices Are Endless', category: 'ACCESSORIES', image: `${CDN}/blog/blog-7.jpg` },
  { id: 7, title: 'Something About This Style Of Jeans',          category: 'DESIGN',      image: `${CDN}/blog/blog-8.jpg` },
  { id: 8, title: 'One Of The Most Iconic Fashion Bloggers',      category: 'TECH',        image: `${CDN}/blog/blog-9.jpg` },
];

/* ── Single blog card ── */
const BlogCard = ({ post }) => (
  <div className="blog-card">
    {/* Image wrapper */}
    <Link to={`/blog/${post.id}`} className="blog-card__img-wrap">
      <img
        src={post.image}
        alt={post.title}
        className="blog-card__img"
        onError={e => e.target.style.background = 'var(--light-gray)'}
      />
      <span className="blog-card__badge">{post.category}</span>
    </Link>

    {/* Text */}
    <Link to={`/blog/${post.id}`} className="blog-card__title">{post.title}</Link>

    <Link to={`/blog/${post.id}`} className="blog-card__readmore">
      Read more <i className="bi bi-arrow-up-right" />
    </Link>
  </div>
);

/* ═══ BLOG PAGE ═══ */
const Blog = () => (
  <div>
    {/* Hero banner */}
    <div className="blog-hero">
      <h1 className="blog-hero__title">Blog Grid</h1>
      <div className="blog-hero__breadcrumb">
        <Link to="/" className="blog-hero__bc-link">Home</Link>
        <i className="bi bi-chevron-right" style={{ fontSize: 10 }} />
        <span>Fashion</span>
      </div>
    </div>

    {/* Grid */}
    <section className="section-padding">
      <div className="container">
        <div className="blog-grid">
          {posts.map(post => <BlogCard key={post.id} post={post} />)}
        </div>

        {/* Load more */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <button className="btn-primary-custom">Load More</button>
        </div>
      </div>
    </section>

    <style>{`
      /* ── Blog Hero ── */
      .blog-hero {
        background: #fdf6f0;
        text-align: center;
        padding: 52px 20px 56px;
      }
      .blog-hero__title {
        font-size: 36px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 14px;
        font-family: 'DM Sans', sans-serif;
        letter-spacing: -0.5px;
      }
      .blog-hero__breadcrumb {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 13px;
        color: var(--text-secondary);
        font-family: 'DM Sans', sans-serif;
      }
      .blog-hero__bc-link {
        color: var(--text-secondary);
        text-decoration: none;
        transition: color 0.2s;
      }
      .blog-hero__bc-link:hover { color: var(--text-primary); }

      /* ── Blog Grid ── */
      .blog-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px 24px;
      }

      /* ── Blog Card ── */
      .blog-card {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      /* Image */
      .blog-card__img-wrap {
        position: relative;
        display: block;
        overflow: hidden;
        border-radius: var(--radius);
        aspect-ratio: 4 / 3;
        text-decoration: none;
        background: var(--light-gray);
      }
      .blog-card__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
        transition: transform 0.5s ease;
      }
      .blog-card__img-wrap:hover .blog-card__img {
        transform: scale(1.05);
      }

      /* Category badge */
      .blog-card__badge {
        position: absolute;
        bottom: 12px;
        left: 12px;
        background: #fff;
        color: var(--text-primary);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.6px;
        padding: 4px 12px;
        border-radius: 3px;
        font-family: 'DM Sans', sans-serif;
        text-transform: uppercase;
      }

      /* Title */
      .blog-card__title {
        font-size: 16px;
        font-weight: 500;
        color: var(--text-primary);
        line-height: 1.55;
        text-decoration: none;
        font-family: 'DM Sans', sans-serif;
        transition: color 0.2s;
        display: block;
      }
      .blog-card__title:hover { color: var(--text-secondary); }

      /* Read more */
      .blog-card__readmore {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
        font-weight: 500;
        color: var(--text-primary);
        text-decoration: none;
        font-family: 'DM Sans', sans-serif;
        border-bottom: 1px solid var(--text-primary);
        padding-bottom: 1px;
        width: fit-content;
        transition: opacity 0.2s;
      }
      .blog-card__readmore:hover { opacity: 0.55; }

      /* Responsive */
      @media (max-width: 991px) {
        .blog-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 575px) {
        .blog-grid { grid-template-columns: 1fr; }
        .blog-hero__title { font-size: 28px; }
      }
    `}</style>
  </div>
);

export default Blog;
