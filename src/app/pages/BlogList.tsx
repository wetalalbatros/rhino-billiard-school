import { Link } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { blogPosts } from "../data/blogs";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogList() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Блог
        </h1>
        <p className="text-gray-400 text-xl mb-16 max-w-3xl">
          Корисні поради, техніки та історії зі світу більярду від професійного тренера Валерія Ковтуна
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blogs/${post.slug}`} className="group">
              <Card className="bg-zinc-900/50 border-zinc-800 hover:border-emerald-600/50 transition-all h-full overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl mb-3 text-white group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-emerald-400 gap-2 group-hover:gap-4 transition-all">
                    <span>Читати далі</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
