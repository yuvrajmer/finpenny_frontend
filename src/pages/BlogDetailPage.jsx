import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, User, Calendar, Tag, ArrowLeft } from 'lucide-react';

const API = 'http://localhost:8000/api';

function stripHtml(html) {
  return html ? html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPost();
    fetchSidebar();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/blog/posts/${slug}`);
      const data = await res.json();
      if (data.success) setPost(data.data);
      else navigate('/blog');
    } catch (e) { navigate('/blog'); }
    setLoading(false);
  };

  const fetchSidebar = async () => {
    try {
      const [postsRes, catsRes] = await Promise.all([
        fetch(`${API}/blog/posts`),
        fetch(`${API}/blog/categories`),
      ]);
      const postsData = await postsRes.json();
      const catsData = await catsRes.json();
      if (postsData.success) setRecentPosts(postsData.data.slice(0, 5));
      if (catsData.success) setCategories(catsData.data);
    } catch (e) {}
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#2B5A84] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <>
      {/* Hero */}
      <section
        className="relative w-full py-16 flex items-center"
        style={{
          background: 'linear-gradient(135deg, #1a3a5a 0%, #2B5A84 60%, #1a3a5a 100%)',
          minHeight: 200,
        }}
      >
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: post.cover_image ? `url('${post.cover_image}')` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container mx-auto px-8 relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 max-w-3xl leading-tight">
            {post.title}
          </h1>
          <nav className="flex items-center gap-2 text-white/60 text-xs flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ArrowRight size={12} />
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ArrowRight size={12} />
            <span className="text-white/80 line-clamp-1 max-w-[300px]">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ── Article ── */}
            <article className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">

                {/* Cover image */}
                {post.cover_image && (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full object-cover"
                    style={{ maxHeight: 420 }}
                  />
                )}

                <div className="p-8">
                  {/* Category tag */}
                  {post.category_name && (
                    <Link
                      to={`/blog?category=${post.category_slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B5A84] mb-4 hover:underline"
                    >
                      <Tag size={12} />
                      {post.category_name}
                    </Link>
                  )}

                  {/* Title */}
                  <h1 className="text-2xl lg:text-3xl font-bold text-[#2B5A84] leading-tight mb-5">
                    {post.title}
                  </h1>

                  {/* Meta */}
                  <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={13} className="text-gray-500" />
                      </div>
                      <span>By <strong className="text-[#2B5A84]">{post.author || 'admin'}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <Calendar size={14} />
                      <span>
                        {new Date(post.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'long', year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Rich text content */}
                  <div
                    className="blog-content prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    style={{
                      lineHeight: 1.85,
                      color: '#374151',
                      fontSize: '15px',
                    }}
                  />

                  {/* Back link */}
                  <div className="mt-10 pt-6 border-t border-gray-100">
                    <Link
                      to="/blog"
                      className="inline-flex items-center gap-2 text-[#2B5A84] text-sm font-medium hover:gap-3 transition-all"
                    >
                      <ArrowLeft size={16} />
                      Back to All Posts
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* ── Sidebar ── */}
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">

              {/* Search */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="flex-1 px-4 py-3 text-sm outline-none text-gray-700"
                  />
                  <button
                    onClick={() => searchQuery.trim() && navigate(`/blog?search=${encodeURIComponent(searchQuery.trim())}`)}
                    className="px-4 text-gray-400 hover:text-[#2B5A84] transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  </button>
                </div>
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-[#2B5A84] text-white px-5 py-3 font-semibold text-sm">Category</div>
                  <div className="p-2">
                    {categories.map(c => (
                      <Link
                        key={c.id}
                        to={`/blog?category=${c.slug}`}
                        className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-gray-500 hover:text-[#2B5A84] hover:bg-[#f5f9ff] transition-colors"
                      >
                        <span>{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Articles */}
              {recentPosts.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-[#2B5A84] text-white px-5 py-3 font-semibold text-sm">Recent Articles</div>
                  <div className="p-4 space-y-4">
                    {recentPosts.map(p => (
                      <Link key={p.id} to={`/blog/${p.slug}`} className="flex gap-3 group">
                        <div className="flex-shrink-0 w-14 h-12 rounded-lg overflow-hidden bg-[#e8f1f8]">
                          {p.cover_image ? (
                            <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#2B5A84] text-xs font-bold opacity-40">F</div>
                          )}
                        </div>
                        <div>
                          <p className={`text-xs font-medium leading-snug group-hover:underline line-clamp-2 ${p.slug === slug ? 'text-[#D9231D]' : 'text-[#2B5A84]'}`}>
                            {p.title}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-1">
                            {new Date(p.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </aside>
          </div>
        </div>
      </section>

      {/* Blog content styles */}
      <style>{`
        .blog-content h1,.blog-content h2,.blog-content h3,.blog-content h4{
          color:#2B5A84;font-weight:700;margin-top:1.6em;margin-bottom:0.6em;line-height:1.3
        }
        .blog-content h1{font-size:1.8em}
        .blog-content h2{font-size:1.4em}
        .blog-content h3{font-size:1.15em}
        .blog-content h4{font-size:1em}
        .blog-content p{margin-bottom:1.1em}
        .blog-content ul,.blog-content ol{padding-left:1.5em;margin-bottom:1.1em}
        .blog-content li{margin-bottom:0.4em}
        .blog-content a{color:#2B5A84;text-decoration:underline}
        .blog-content a:hover{color:#1a3a5a}
        .blog-content strong{color:#1a2332;font-weight:600}
        .blog-content blockquote{border-left:4px solid #2B5A84;background:#f0f7ff;padding:12px 18px;border-radius:0 8px 8px 0;margin:1.2em 0;color:#374151;font-style:italic}
        .blog-content code{background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:0.88em;color:#1a3a5a}
        .blog-content pre{background:#1a2332;color:#e2e8f0;padding:16px;border-radius:8px;overflow-x:auto;margin:1.2em 0}
        .blog-content img{max-width:100%;border-radius:10px;margin:1em 0}
        .blog-content hr{border:none;border-top:1px solid #e8edf3;margin:1.8em 0}
      `}</style>
    </>
  );
};

export default BlogDetailPage;
