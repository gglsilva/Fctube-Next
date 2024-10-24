import { Undo2 } from 'lucide-react';
import Link from 'next/link';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-800 text-gray-100">
      <Link href="/" className="inline-flex items-center gap-2 mb-6 text-white hover:text-amber-400 transition">
        <Undo2 className="w-5 h-5" /> Voltar para Home
      </Link>

      <article className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <header>
          <h1 className="text-5xl font-bold text-amber-400 mb-6">
            {post.title}
          </h1>
        </header>
        
        <section className="post-body text-lg leading-relaxed text-gray-300">
          <p className="mb-4">{post.body}</p>
        
          <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula euismod justo, ut cursus purus luctus ac. Sed vitae ligula id velit vestibulum tincidunt ac in velit.</p>
          <p className="mb-4">Praesent at vehicula nulla. Nulla facilisi. Ut malesuada metus sed nisi accumsan interdum. Integer pretium accumsan urna, et tempus odio dignissim a. Donec tincidunt, sapien vel fringilla posuere, tortor sapien vulputate mauris, sed porttitor lorem sapien ut velit.</p>
        </section>

        <footer className="mt-10 border-t border-gray-700 pt-4 text-sm text-gray-500">
          Escrito por Autor Desconhecido - Publicado em 2024
        </footer>
      </article>
    </div>
  );
}
