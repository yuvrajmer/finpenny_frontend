import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight , User, Tag } from 'lucide-react';

const API = 'http://localhost:8000/api';

const BlogHero = () => (
  <section
    className="relative h-[550px] w-full flex items-center overflow-hidden"
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
    <div className="container px-22 relative pt-40 z-10">
        <div className="max-w-4xl">
          {/* Main Heading - Exact Font Style */}
          <h1 className="text-white text-6xl md:text-6xl font-bold  mb-5 tracking-tight">
            Blog
          </h1>

          {/* Breadcrumbs - Matching the exact arrow and spacing */}
          <div className="flex items-center space-x-3 text-white/90 font-medium text-lg">
            <span className="hover:text-white cursor-pointer transition-colors">Home</span>
            
            <div className="flex items-center">
              <div className="w-8 h-[1px] bg-white/60"></div>
              <ChevronRight size={18} className="-ml-1" />
            </div>

            <span className="text-white/70">Blog</span>
          </div>
        </div>
      </div>
  </section>
);

const BlogCard = ({ post }) => {
  // Limit excerpt to 150 characters
  const excerpt = post.excerpt ? post.excerpt.substring(0, 150) + (post.excerpt.length > 150 ? '...' : '') : stripHtml(post.content).substring(0, 150) + '...';
  
  // Get image dimensions for proper aspect ratio
  const imgWidth = post.image_width || 1200;
  const imgHeight = post.image_height || 630;
  const aspectRatio = imgHeight / imgWidth;

  return (
    <div className="bg-white w-95 rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
      {/* Cover Image with proper aspect ratio */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#e8f1f8] to-[#c8dff0]" style={{ aspectRatio: `${imgWidth} / ${imgHeight}` }}>
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
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
        {/* Meta */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
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
        <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
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
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [activeCategory, searchQuery]);

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
        
        // Only show categories that have published blogs
        const categoriesInPosts = new Set();
        data.data.forEach(post => {
          if (post.category_name) categoriesInPosts.add(JSON.stringify({ id: post.category_id, name: post.category_name, slug: post.category_slug }));
        });
        
        const uniqueCategories = Array.from(categoriesInPosts).map(c => JSON.parse(c));
        setCategories(uniqueCategories);
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
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;