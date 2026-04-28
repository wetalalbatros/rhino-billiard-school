import { useParams, Link, Navigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { blogPosts } from "../data/blogs";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/blogs">
          <Button variant="ghost" className="text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад до блогу
          </Button>
        </Link>

        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-6 text-sm text-gray-300 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>
            <h1 className="text-5xl text-white">{post.title}</h1>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-xl text-gray-300 mb-8 leading-relaxed italic border-l-4 border-emerald-600 pl-6 py-2">
            {post.excerpt}
          </div>

          <div className="text-gray-300 leading-relaxed space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-4xl text-white mt-12 mb-6">
                    {paragraph.replace('# ', '')}
                  </h1>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-3xl text-white mt-10 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="text-2xl text-emerald-400 mt-8 mb-3">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={index} className="list-none space-y-2 my-4">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-emerald-500 mt-1">•</span>
                        <span>{item.replace('- ', '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800">
          <h3 className="text-2xl text-white mb-6">Інші статті</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blogs/${relatedPost.slug}`}
                  className="group bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-600/50 transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-emerald-400 text-sm mb-2">{relatedPost.date}</p>
                    <h4 className="text-xl text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
