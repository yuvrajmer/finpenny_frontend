import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Tag } from 'lucide-react';

const API = 'http://localhost:8000/api';

const BlogHero = () => (
  <section
    className="relative w-full py-20 flex items-center"
    style={{
      background: 'linear-gradient(135deg, #1a3a5a 0%, #2B5A84 60%, #1a3a5a 100%)',
      minHeight: 240,
    }}
  >
    <div
      className="absolute inset-0 z-0 opacity-10"
      style={{
        backgroundImage: `url('https://finpenny.com/wp-content/uploads/2026/03/Untitled-design-1-1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <div className="container mx-auto px-8 relative z-10">
      <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
      <nav className="flex items-center gap-2 text-white/70 text-sm">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ArrowRight size={14} />
        <span className="text-white">Blog</span>
      </nav>
    </div>
  </section>
);

const BlogCard = ({ post }) => {
  const excerpt = post.excerpt || stripHtml(post.content).substring(0, 120) + '...';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
      {/* Cover Image */}
      <div className="relative overflow-hidden" style={{ height: 260 }}>
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#e8f1f8] to-[#c8dff0] flex items-center justify-center">
            <span className="text-[#2B5A84] opacity-40 text-6xl font-bold">F</span>
          </div>
        )}
        {/* Category badge over image */}
        {post.category_name && (
          <span
            className="absolute bottom-4 left-4 text-white text-xs font-semibold px-4 py-2 rounded-full"
            style={{ background: 'rgba(43, 90, 132, 0.85)', backdropFilter: 'blur(4px)' }}
          >
            {post.category_name}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Author */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={14} className="text-gray-500" />
          </div>
          <span className="text-sm text-gray-500">By{' '}
            <span className="text-[#2B5A84] font-medium">{post.author || 'admin'}</span>
          </span>
        </div>

        <hr className="border-gray-100 mb-4" />

        {/* Title */}
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-[#2B5A84] leading-tight mb-3 group-hover:underline line-clamp-3">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
          {excerpt}
        </p>

        {/* Continue Reading */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-[#2B5A84] text-sm font-medium hover:gap-3 transition-all"
        >
          <ArrowRight size={16} />
          Continue Reading
        </Link>
      </div>
    </div>
  );
};

function stripHtml(html) {
  return html ? html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [activeCategory, searchQuery]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API}/blog/categories`);
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch (e) {}
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `${API}/blog/posts`;
      const params = new URLSearchParams();
      if (activeCategory) params.set('category', activeCategory);
      if (searchQuery) params.set('search', searchQuery);
      if (params.toString()) url += '?' + params.toString();

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
        setRecentPosts(data.data.slice(0, 5));
      }
    } catch (e) {}
    setLoading(false);
  };

  // Count posts per category
  const catWithCount = categories.map(c => ({
    ...c,
    count: posts.filter(p => p.category_name === c.name).length,
  }));

  return (
    <>
      <BlogHero />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-10 mb-30">

            {/* ── Main Posts Grid ── */}
            <div className="flex-1">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-10 h-10 border-4 border-[#2B5A84] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <div className="text-5xl mb-4">📝</div>
                  <p className="text-lg font-medium">No posts found</p>
                  <p className="text-sm mt-1">Check back soon for new articles</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>

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
                    className="flex-1 px-4 py-3 text-sm outline-none text-gray-700"
                  />
                  <button className="px-4 text-gray-400 hover:text-[#2B5A84] transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-[#2B5A84] text-white px-5 py-3 font-semibold text-sm">Category</div>
                <div className="p-2">
                  <button
                    onClick={() => setActiveCategory('')}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors ${activeCategory === '' ? 'text-[#2B5A84] font-semibold bg-[#e8f1f8]' : 'text-gray-500 hover:text-[#2B5A84] hover:bg-[#f5f9ff]'}`}
                  >
                    <span>All Posts</span>
                    <span className="text-xs text-gray-400">({posts.length})</span>
                  </button>
                  {catWithCount.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(activeCategory === c.slug ? '' : c.slug)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors ${activeCategory === c.slug ? 'text-[#2B5A84] font-semibold bg-[#e8f1f8]' : 'text-gray-500 hover:text-[#2B5A84] hover:bg-[#f5f9ff]'}`}
                    >
                      <span>{c.name}</span>
                      <span className="text-xs text-gray-400">({c.count})</span>
                    </button>
                  ))}
                </div>
              </div>

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
                          <p className="text-xs font-medium text-[#2B5A84] leading-snug group-hover:underline line-clamp-2">{p.title}</p>
                          <p className="text-[11px] text-gray-400 mt-1">{new Date(p.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
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
    </>
  );
};

export default BlogPage;
